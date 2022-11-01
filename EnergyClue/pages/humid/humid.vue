<template>
	<!-- 底层容器 -->
	<view class="content">
		<label>输入区域：</label>
		<!-- 输入部件容器，纵向排列 -->
		<view class="input-content">
			<!-- 选择输入参数类型 -->
			<view class="picker-content">
				<view class="picker-hint">请选择：</view>
				<picker class="picker-item" @change="onSelect" :value="argPickIndex" :range="argPickRange">{{argPickRange[argPickIndex]}} <text class="mark-triangle">&#9660</text></picker>
			</view>
			<!-- 大气压力 -->
			<view class="input-item">
				<view class="input-name">{{atmosphericPressure.name}}</view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="atmosphericPressure.value" />
				<view class="input-unit">{{atmosphericPressure.unit}}</view>
			</view>
			<!-- first -->
			<view class="input-item">
				<view class="input-name">{{inputs[inputIndex[argPickIndex].first].name}}</view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="inputs[inputIndex[argPickIndex].first].value"/>
				<view class="input-unit">{{inputs[inputIndex[argPickIndex].first].unit}}</view>
			</view>
			<!-- second -->
			<view class="input-item">
				<view class="input-name">{{inputs[inputIndex[argPickIndex].second].name}}</view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="inputs[inputIndex[argPickIndex].second].value"/>
				<view class="input-unit">{{inputs[inputIndex[argPickIndex].second].unit}}</view>
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
				<view class="result-item" v-for="(item, idx) in resultIndex[argPickIndex]" :key="idx">
					<view class="result-name"><text>{{results[item].name}}</text></view>
					<view class="result-val"><text>{{results[item].value}}</text></view>
					<view class="result-unit"><text>{{results[item].unit}}</text></view>
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
	import * as air from '@/common/air.js';
	export default {
		data() {
			return {
				argPickRange: [
					'干球温度(θ) + 相对湿度(φ)',
					'干球温度(θ) + 含湿量(d)',
					'露点温度(td) + 比焓(h)'
				],
				argPickIndex: 0,
				atmosphericPressure: {name:'大气压力', value:'', default:'101.325', unit:'kPa'},
				inputs: [
					{name:'干球温度(θ)', value:'', default:'30', unit:'℃'},
					{name:'相对湿度(φ)', value:'', default:'60', unit:'%'},
					{name:'含湿量(d)', value:'', default:'0.016', unit:'kg/kg[DA]'},
					{name:'露点温度(td)', value:'', default:'21.38', unit:'℃'},
					{name:'比焓(h)', value:'', default:'71.06', unit:'kJ/kg[DA]'}
				],
				inputIndex: [
					{first:0, second:1}, // 干球温度(θ) + 相对湿度(φ)
					{first:0, second:2}, // 干球温度(θ) + 含湿量(d)
					{first:3, second:4}  // 露点温度(td) + 比焓(h)
				],
				results: [
					{name:'干球温度(θ)', value:'', unit:'℃'}, // 0
					{name:'相对湿度(φ)', value:'', unit:'%'}, // 1
					{name:'含湿量(d)', value:'', unit:'kg/kg[DA]'}, // 2
					{name:'露点温度(td)', value:'', unit:'℃'}, // 3
					{name:'密度(ρ)', value:'', unit:'kg/m³'}, // 4
					{name:'比焓(h)', value:'', unit:'kJ/kg[DA]'}, // 5
					{name:'水蒸气分压力(pv)', value:'', unit:'kPa'}, // 6
					{name:'水蒸气饱和压力(ps)', value:'', unit:'kPa'}, // 7
					{name:'比容(v)', value:'', unit:'m³/kg[DA]'} // 8
				],
				resultIndex: [
					[2, 3, 4, 5, 6, 7, 8], // 干球温度(θ) + 相对湿度(φ)
					[1, 3, 4, 5, 6, 7, 8], // 干球温度(θ) + 含湿量(d)
					[0, 1, 2, 3, 6, 7, 8], // 露点温度(td) + 比焓(h)
				],
				storageKey: '__humid_input',
				notes: [
					'1、本程序依据《工业冷却塔测试规程》(DL/T 1027-2006)所列方法并参考《工程热力学(第三版)》(沈维道等)编制。',
					'2、水蒸气的参数计算依据 IAPWS-IF97 公式。',
					'3、本程序所采用公式基本出自冷却塔测试规程，使用范围有限，所得结果仅供参考。',
					'4、当前暂定温度有效范围为[0℃, 100℃]。'
				]
			}
		},
		onLoad() {
			// 装载缓存的数据
			// [argPickIndex, atmosphericPressure, firstValue, secondValue]
			try{
				let dat = uni.getStorageSync(this.storageKey);
				if(dat && (dat.length == 4)) {
					this.argPickIndex = parseInt(dat[0]);
					this.atmosphericPressure.value = dat[1];
					this.inputs[this.inputIndex[this.argPickIndex].first].value = dat[2];
					this.inputs[this.inputIndex[this.argPickIndex].second].value = dat[3];
					this.implCalc();
				} else {
					this.argPickIndex = 0;
					this.atmosphericPressure.value = this.atmosphericPressure.default;
					this.inputs[this.inputIndex[0].first].value = this.inputs[this.inputIndex[0].first].default;
					this.inputs[this.inputIndex[0].second].value = this.inputs[this.inputIndex[0].second].default;
				}
			}catch(e){
				//TODO handle the exception
				console.log(e.message);
			}
		},
		computed: {
			isReady: function() {
				let idx1 = this.inputIndex[this.argPickIndex].first;
				let idx2 = this.inputIndex[this.argPickIndex].second;
				return (this.atmosphericPressure.value != '') && !isNaN(parseFloat(this.atmosphericPressure.value)) &&
					(this.inputs[idx1].value != '') && !isNaN(parseFloat(this.inputs[idx1].value)) &&
					(this.inputs[idx2].value != '') && !isNaN(parseFloat(this.inputs[idx2].value))
			}
		},
		methods: {
			onSelect: function(event) {
				// 清除输出结果
				let idxRes = this.resultIndex[this.argPickIndex];
				for(const item of idxRes) {
					this.results[item].value = '';
				}
				// 清空缓存的数据
				uni.removeStorageSync(this.storageKey);
				// 更新索引值
				this.argPickIndex = parseInt(event.detail.value);
				// 设置默认值
				let idx1 = this.inputIndex[this.argPickIndex].first;
				let idx2 = this.inputIndex[this.argPickIndex].second;
				if(this.inputs[idx1].value == '') {
					this.inputs[idx1].value = this.inputs[idx1].default;
				}
				if(this.inputs[idx2].value == '') {
					this.inputs[idx2].value = this.inputs[idx2].default;
				}
			},
			implCalc: function() {
				let pp = parseFloat(this.atmosphericPressure.value); // 大气压力
				let idx = this.argPickIndex;
				let rf = this.resultIndex[idx];
				const precision = 6; // 输出精度
				switch(idx) {
					case 0: { // 干球温度(θ) + 相对湿度(φ)
						let theta = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].first].value);
						let phi = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].second].value);
						if(theta<0 || theta>100 || phi<0 || phi>100) {
							uni.showModal({
								title: '警告',
								content: '输入数据超出有效范围！',
								showCancel: false
							});
							return false;
						}
						let ps;
						try{
							ps = air.ps(theta);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let pv = phi / 100 * ps;
						let dd = air.specificHumidity(pp, pv); // 含湿量
						let hh = air.enthalpy(theta, dd);
						let rho = air.density(theta, pp, pv); // 密度
						let td;
						try{
							td = air.ts(pv);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let vv = air.specificVolume(pp, theta, dd); // 比容
						// 输出结果
						this.results[rf[0]].value = dd.toPrecision(precision);
						this.results[rf[1]].value = td.toPrecision(precision);
						this.results[rf[2]].value = rho.toPrecision(precision);
						this.results[rf[3]].value = hh.toPrecision(precision);
						this.results[rf[4]].value = pv.toPrecision(precision);
						this.results[rf[5]].value = ps.toPrecision(precision);
						this.results[rf[6]].value = vv.toPrecision(precision);
					}
						break;
					case 1: { // 干球温度(θ) + 含湿量(d)
						let theta = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].first].value);
						let dd = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].second].value);
						if(theta<0 || theta>100) {
							uni.showModal({
								title: '警告',
								content: '输入数据超出有效范围！',
								showCancel: false
							});
							return false;
						}
						let ps;
						try{
							ps = air.ps(theta);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let pv = air.pv(pp, dd);
						let phi = pv / ps * 100;
						if(phi<0 || phi>100) {
							uni.showModal({
								title: '警告',
								content: '输入数据超出有效范围！',
								showCancel: false
							});
							return false;
						}
						let hh = air.enthalpy(theta, dd);
						let rho = air.density(theta, pp, pv); // 密度
						let td;
						try{
							td = air.ts(pv);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let vv = air.specificVolume(pp, theta, dd); // 比容
						// 输出结果
						this.results[rf[0]].value = phi.toPrecision(precision);
						this.results[rf[1]].value = td.toPrecision(precision);
						this.results[rf[2]].value = rho.toPrecision(precision);
						this.results[rf[3]].value = hh.toPrecision(precision);
						this.results[rf[4]].value = pv.toPrecision(precision);
						this.results[rf[5]].value = ps.toPrecision(precision);
						this.results[rf[6]].value = vv.toPrecision(precision);
					}
						break;
					case 2: { // 露点温度(td) + 比焓(h)
						let td = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].first].value);
						let hh = parseFloat(this.inputs[this.inputIndex[this.argPickIndex].second].value);
						let pv;
						try{
							pv = air.ps(td);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let dd = air.specificHumidity(pp, pv);
						let theta = air.theta(hh, dd);
						let ps;
						try{
							ps = air.ps(theta);
						}catch(e){
							uni.showModal({
								title: '警告',
								content: e.message,
								showCancel: false
							});
							return false;
						}
						let phi = pv / ps * 100;
						if(theta<0 || theta>100 || phi<0 || phi>100) {
							uni.showModal({
								title: '警告',
								content: '输入数据超出有效范围！',
								showCancel: false
							});
							return false;
						}
						let rho = air.density(theta, pp, pv); // 密度
						let vv = air.specificVolume(pp, theta, dd); // 比容
						// 输出结果
						this.results[rf[0]].value = theta.toPrecision(precision);
						this.results[rf[1]].value = phi.toPrecision(precision);
						this.results[rf[2]].value = dd.toPrecision(precision);
						this.results[rf[3]].value = rho.toPrecision(precision);
						this.results[rf[4]].value = pv.toPrecision(precision);
						this.results[rf[5]].value = ps.toPrecision(precision);
						this.results[rf[6]].value = vv.toPrecision(precision);
					}
						break;
					default:
						uni.showModal({
							title: '警告',
							content: '输入参数类型错误',
							showCancel: false
						});
						return false;
				}
				return true;
			},
			onCalc: function(event) {
				let ok = this.implCalc();
				if(ok) {
					// 保存输入参数
					// [argPickIndex, atmosphericPressure, firstValue, secondValue]
					let dat = ['', '', '', ''];
					dat[0] = this.argPickIndex.toString();
					dat[1] = this.atmosphericPressure.value;
					dat[2] = this.inputs[this.inputIndex[this.argPickIndex].first].value;
					dat[3] = this.inputs[this.inputIndex[this.argPickIndex].second].value;
					try{
						uni.setStorageSync(this.storageKey, dat);
					}catch(e){
						//TODO handle the exception
						console.log('无法保存输入数据-cleanliness');
					}
				}
			},
			onClear: function(event) {
				// 清除输入数据
				let idx1 = this.inputIndex[this.argPickIndex].first;
				let idx2 = this.inputIndex[this.argPickIndex].second;
				this.atmosphericPressure.value = '';
				this.inputs[idx1].value = '';
				this.inputs[idx2].value = '';
				// 清除输出结果
				let idxRes = this.resultIndex[this.argPickIndex];
				for(const item of idxRes) {
					this.results[item].value = '';
				}
				// 清空缓存的数据
				uni.removeStorageSync(this.storageKey);
			},
			onReset: function(event) {
				// 设置默认值
				this.atmosphericPressure.value = this.atmosphericPressure.default;
				let idx1 = this.inputIndex[this.argPickIndex].first;
				let idx2 = this.inputIndex[this.argPickIndex].second;
				this.inputs[idx1].value = this.inputs[idx1].default;
				this.inputs[idx2].value = this.inputs[idx2].default;
				// 清除输出结果
				let idxRes = this.resultIndex[this.argPickIndex];
				for(const item of idxRes) {
					this.results[item].value = '';
				}
				// 清空缓存的数据
				uni.removeStorageSync(this.storageKey);
			}
		}
	}
</script>

<style>
	
</style>
