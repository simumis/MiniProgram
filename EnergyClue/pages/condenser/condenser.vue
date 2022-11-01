<template>
	<!-- 底层容器 -->
	<view class="content">
		<label>输入区域：</label>
		<!-- 输入部件容器，纵向排列 -->
		<view class="input-content">
			<view class="input-item" v-for="(item, idx) in input_text" :key="idx">
				<view class="input-name"><text>{{item.name}}</text></view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="item.value"/>
				<view class="input-unit"><text>{{item.unit}}</text></view>
			</view>
			<view class="picker-content">
				<view class="picker-hint"><text>请选择冷却管材料：</text></view>
				<picker class="picker-item" @change="onMaterialSelect" :value="material_index" :range="tube_materials">{{tube_materials[material_index]}} <text class="mark-triangle">&#9660</text></picker>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="calc">
			<button class="calc-button-main" hover-class="calc-button-main-hover" @click="onCalc" :disabled="!isReady">开始计算</button>
			<button class="calc-button-clear" hover-class="calc-button-clear-hover" @click="onClear">清除输入</button>
			<button class="calc-button-reset" hover-class="calc-button-reset-hover" @click="onReset">恢复默认</button>
		</view>
		<label>计算结果：</label>
		<!-- 输出结果容器，纵向排列 -->
		<view class="result-content">
			<view class="result-content">
				<view class="result-item" v-for="(item, idx) in results" :key="idx">
					<view class="result-name"><text>{{item.name}}</text></view>
					<view class="result-val"><text>{{item.value}}</text></view>
					<view class="result-unit"><text>{{item.unit}}</text></view>
				</view>
			</view>
		</view>
		<label>相关说明：</label>
		<view class="notes">
			<view class="notes-item" v-for="(item, idx) in notes" :key="idx"><text>{{item}}</text></view>
		</view>
	</view>
</template>

<script>
import * as dlt932 from '../../common/dlt932.js'
import {Water, setupTX} from '../../common/jif97.js'

export default {
	data () {
		return {
			input_text: [
				{name:'凝汽器热负荷', value:'1100', default:'1100', unit:'MW'},
				{name:'冷却水入口温度', value:'20', default:'20', unit:'℃'},
				{name:'冷却水流量', value:'25000', default:'25000', unit:'kg/s'},
				{name:'冷却水比热', value:'4.18', default:'4.18', unit:'kJ/(kg·℃)'},
				{name:'凝汽器换热面积', value:'54000', default:'54000', unit:'m²'},
				{name:'冷却管外径', value:'25', default:'25', unit:'mm'},
				{name:'冷却管壁厚', value:'0.5', default:'0.5', unit:'mm'},
				{name:'冷却管数量', value:'55000', default:'55000', unit:'根'},
				{name:'流程数', value:'2', default:'2', unit:''},
				{name:'清洁系数', value:'0.85', default:'0.85', unit:''},
				{name:'冷却水密度', value:'1000', default:'1000', unit:'kg/m³'}
			],
			tube_materials: ['HSn70-1(锡黄铜)', 'HA177-2(铝黄铜)', 'BFe30-1-1(铁白铜)', 'BFe10-1-1(铁白铜)', '碳钢', 'TP304,TP316,TP317(不锈钢)', 'TA1,TA2(钛合金)'],
			material_index: -1,
			results: [
				{name:'冷却水管内流速', value:'', unit:'m/s'}, // 0
				{name:'基本传热系数', value:'', unit:'kW/(m²·℃)'}, // 1
				{name:'冷却水温修正系数', value:'', unit:''}, // 2
				{name:'管材和壁厚修正系数', value:'', unit:''}, // 3
				{name:'总体传热系数', value:'', unit:'kW/(m²·℃)'}, // 4
				{name:'凝汽器饱和温度', value:'', unit:'℃'}, // 5
				{name:'凝汽器饱和压力', value:'', unit:'kPa'}, // 6
				{name:'冷却水出口温度', value:'', unit:'℃'}, // 7
				{name:'冷却水温升', value:'', unit:'℃'}, // 8
				{name:'凝汽器端差', value:'', unit:'℃'} // 9
			],
			storageKey: '__condenser_input',
			notes: [
		  '1、本程序依据《凝汽器与真空系统运行维护导则》(DL/T 932-2019)所列方法编制。',
		  '2、本程序根据标准公式计算凝汽器变工况特性，未对特定凝汽器进行校核，计算结果仅供参考。'
			]
		}
	},
	onLoad() {
		// 装载缓存的数据
		try{
			let dat = uni.getStorageSync(this.storageKey);
			if(dat && (dat.length == this.input_text.length+1)) {
				this.material_index = parseInt(dat[0])
				for(let i=0; i<this.input_text.length; i++) {
					this.input_text[i].value = dat[i+1];
				}
				this.implCalc();
			} else {
				// 默认管材设为钛合金
				this.material_index = this.tube_materials.length - 1;
			}
		}catch(e){
			//TODO handle the exception
			console.log(e.message);
		}
	},
	computed: {
		isReady: function(){
			for(const item of this.input_text) {
				if((item.value == '') || isNaN(parseFloat(item.value))) {
					return false;
				}
			}
			return true;
		}
	},
	methods: {
		onMaterialSelect: function(event) {
			let idx = parseInt(event.detail.value);
			this.material_index = idx;
		},
		implCalc: function() {
			let Q = parseFloat(this.input_text[0].value); // 凝汽器热负荷
			let tw1 = parseFloat(this.input_text[1].value); // 冷却水入口温度
			let Gw = parseFloat(this.input_text[2].value); // 冷却水流量
			let cp = parseFloat(this.input_text[3].value); // 冷却水比热
			let A = parseFloat(this.input_text[4].value); // 凝汽器换热面积
			let d = parseFloat(this.input_text[5].value); // 冷却管外径
			let m = parseFloat(this.input_text[6].value); // 冷却管壁厚
			let n = parseFloat(this.input_text[7].value); // 冷却管数量
			let fn = parseFloat(this.input_text[8].value); // 流程数
			let bc = parseFloat(this.input_text[9].value); // 清洁系数
			let rho = parseFloat(this.input_text[10].value); // 冷却水密度
			// 
			let v = dlt932.velocity(Gw, d, m, n, fn, rho); // 冷却水管内流速
			let K0; // 基本传热系数
			try{
				K0 = dlt932.K0(d, v);
			}catch(e){
				//TODO handle the exception
				uni.showModal({
					title: '警告',
					content: e.message,
					showCancel: false
				});
				// 清除输出结果
				for(let item of this.results) {
					item.value = '';
				}
				return false;
			}
			
			let bt = dlt932.bt(tw1); // 冷却水进口温度修正系数
			let bm = dlt932.bm(this.material_index, m); // 管材和管壁厚修正系数
			let K = dlt932.K(K0, bt, bm, bc); // 总体传热系数
			let ts = dlt932.satTemperature(Q, tw1, Gw, cp, A, K); // 凝汽器饱和温度
			let water = setupTX(ts, 1);
			if(water == null) {
				// 清除输出结果
				for(let item of this.results) {
					item.value = '';
				}
				uni.showModal({
					title: '警告',
					content: '请检查输入数据是否在有效范围。',
					showCancel: false
				});
				return false;
			}
			let ps = water.p / 1000; // 饱和压力
			let tw2 = dlt932.tw2(Q, tw1, Gw, cp); // 冷却水出口温度
			let dt = tw2 - tw1; // 冷却水温升
			let delta = ts - tw2; // 凝汽器端差
			
			// 输出结果
			this.results[0].value = v.toPrecision(4);
			this.results[1].value = K0.toPrecision(4);
			this.results[2].value = bt.toPrecision(4);
			this.results[3].value = bm.toPrecision(4);
			this.results[4].value = K.toPrecision(4);
			this.results[5].value = ts.toPrecision(4);
			this.results[6].value = ps.toPrecision(4);
			this.results[7].value = tw2.toPrecision(4);
			this.results[8].value = dt.toPrecision(4);
			this.results[9].value = delta.toPrecision(4);
			
			// 成功返回
			return true;
		},
		onCalc: function (event) {
			let ok = this.implCalc();
			if(ok) {
				// 保存输入参数
				let dat = [this.material_index.toString()];
				for(const item of this.input_text) {
					dat.push(item.value);
				}
				try{
					uni.setStorageSync(this.storageKey, dat);
				}catch(e){
					//TODO handle the exception
					console.log('无法保存输入数据-condenser');
				}
			}
		},
		onReset: function(e) {
			for(let item of this.input_text) {
				item.value = item.default;
			 }
			// 默认管材设为钛合金
			this.material_index = this.tube_materials.length - 1;
			// 清除输出结果
			for(let item of this.results) {
				item.value = '';
			}
			// 清空缓存的数据
			uni.removeStorageSync(this.storageKey);
		},
		onClear: function(e) {
			for(let item of this.input_text) {
				item.value = '';
			}
			// 清除输出结果
			for(let item of this.results) {
				item.value = '';
			}
			// 清空缓存的数据
			uni.removeStorageSync(this.storageKey);
		}
	}
}
</script>

<style>
</style>