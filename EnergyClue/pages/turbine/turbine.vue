<template>
	<!-- 底层容器 -->
	<view class="content">
		<label>输入区域：</label>
		<!-- 输入部件容器，纵向排列 -->
		<view class="input-content">
			<view class="input-item" v-for="(item, idx) in inputs" :key=idx>
				<view class="input-name">{{item.name}}</view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="item.value"/>
				<view class="input-unit">{{item.unit}}</view>
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
		<!-- 说明部分 -->
		<label>相关说明：</label>
		<view class="notes">
			<view class="notes-item" v-for="(item, idx) in notes" :key="idx"><text>{{item}}</text></view>
		</view>
	</view>
</template>

<script>
	import * as jif97 from '@/common/jif97.js'
	export default {
		data() {
			return {
				inputs: [
					{name:'进汽压力', value:'', default:'26.25', unit:'MPa'},
					{name:'进汽温度', value:'', default:'600', unit:'℃'},
					{name:'排汽压力', value:'', default:'5.555', unit:'MPa'},
					{name:'排汽温度', value:'', default:'352.7', unit:'℃'}
				],
				results: [
					{name:'进汽比焓', value:'', unit:'kJ/kg'}, // 0
					{name:'进汽比熵', value:'', unit:'kJ/(kg·℃)'}, // 1
					{name:'排汽比焓', value:'', unit:'kJ/kg'}, // 2
					{name:'排汽等熵焓', value:'', unit:'kJ/kg'}, // 3
					{name:'实际焓降', value:'', unit:'kJ/kg'}, // 4
					{name:'等熵焓降', value:'', unit:'kJ/kg'}, // 5
					{name:'缸效率', value:'', unit:'%'} // 6
				],
				storageKey: '__turbine_input',
				notes: [
					'1、本程序适用于过热蒸汽区缸效率计算。',
					'2、水蒸气的饱和参数计算依据 IAPWS-IF97 公式。',
					'3、输入的蒸汽压力均为绝对压力。'
				]
			}
		},
		onLoad() {
			// 装载缓存的数据
			try{
				let dat = uni.getStorageSync(this.storageKey);
				if(dat && (dat.length == 4)) {
					for (let i=0; i<dat.length; i++) {
						this.inputs[i].value = dat[i];
					}
					this.implCalc();
				} else {
				console.log('get in onLoad()')
					for (let i=0; i<4; i++) {
						this.inputs[i].value = this.inputs[i].default;
					}
				}
			}catch(e){
				//TODO handle the exception
				console.log(e.message);
			}
		},
		computed: {
			isReady: function() {
				for (let i=0; i<this.inputs.length; i++) {
					if(this.inputs[i].value == '') {
						return false;
					}
				}
				return true;
			}
		},
		methods: {
			implCalc: function() {
				const precision = 6; // 输出精度
				let inP = parseFloat(this.inputs[0].value);
				let inT = parseFloat(this.inputs[1].value);
				let outP = parseFloat(this.inputs[2].value);
				let outT = parseFloat(this.inputs[3].value);
				// 计算进汽参数
				let water = jif97.props('p', inP, 't', inT);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查进汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let inH = water.h / 1000.0;
				let inS = water.s / 1000.0;
				// 计算排汽参数
				water = jif97.props('p', outP, 't', outT);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查排汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let outH = water.h / 1000.0;
				// 计算等熵参数
				water = jif97.props('p', outP, 's', inS);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查输入参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let sH = water.h / 1000.0;
				// 实际焓降
				let deltaH = inH - outH;
				// 等熵焓降
				let deltaSH = inH - sH;
				// 缸效率
				let effi = deltaH / deltaSH * 100.0;
				// 设置输出
				this.results[0].value = inH.toPrecision(precision);
				this.results[1].value = inS.toPrecision(precision-3);
				this.results[2].value = outH.toPrecision(precision);
				this.results[3].value = sH.toPrecision(precision);
				this.results[4].value = deltaH.toPrecision(precision-1);
				this.results[5].value = deltaSH.toPrecision(precision-1);
				this.results[6].value = effi.toPrecision(precision-2);
				return true;
			},
			onCalc: function(event) {
				let ok = this.implCalc();
				if(ok) {
					// 保存输入参数
					let dat = ['', '', '', ''];
					for(let i=0; i<dat.length; i++) {
						dat[i] = this.inputs[i].value;
					}
					try{
						uni.setStorageSync(this.storageKey, dat);
					}catch(e){
						//TODO handle the exception
						console.log('无法保存输入数据-turbine');
					}
				}
			},
			onClear: function(event) {
				// 清除输入数据
				for(let item of this.inputs) {
					item.value = '';
				}
				// 清除输出结果
				for(let item of this.results) {
					item.value = '';
				}
				// 清空缓存的数据
				uni.removeStorageSync(this.storageKey);
			},
			onReset: function(event) {
				// 设置默认值
				for(let item of this.inputs) {
					item.value = item.default;
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
