<template>
	<!-- 底层容器 -->
	<view class="content">
		<label>工况1输入区域：</label>
		<!-- 输入部件容器，纵向排列 -->
		<view class="input-content">
			<view class="input-item" v-for="(item, idx) in test1" :key=idx>
				<view class="input-name">{{item.name}}</view>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="item.value"/>
				<view class="input-unit">{{item.unit}}</view>
			</view>
		</view>
		<label>工况2输入区域：</label>
		<!-- 输入部件容器，纵向排列 -->
		<view class="input-content">
			<view class="input-item" v-for="(item, idx) in test2" :key=idx>
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
				test1: [
					{name:'泄漏蒸汽压力', value:'', default:'12.44', unit:'MPa'},
					{name:'泄漏蒸汽温度', value:'', default:'452.78', unit:'℃'},
					{name:'再热蒸汽压力', value:'', default:'3.50', unit:'MPa'},
					{name:'再热蒸汽温度', value:'', default:'535.87', unit:'℃'},
					{name:'中压缸排汽压力', value:'', default:'0.9456', unit:'MPa'},
					{name:'中压缸排汽温度', value:'', default:'341.75', unit:'℃'}
				],
				test2: [
					{name:'泄漏蒸汽压力', value:'', default:'12.488', unit:'MPa'},
					{name:'泄漏蒸汽温度', value:'', default:'486.00', unit:'℃'},
					{name:'再热蒸汽压力', value:'', default:'3.54', unit:'MPa'},
					{name:'再热蒸汽温度', value:'', default:'508', unit:'℃'},
					{name:'中压缸排汽压力', value:'', default:'0.954', unit:'MPa'},
					{name:'中压缸排汽温度', value:'', default:'320.42', unit:'℃'}
				],
				results: [
					{name:'过桥汽封泄露率', value:'', unit:'%'}, // 0
					{name:'中压缸效率', value:'', unit:'%'} // 1
				],
				storageKey: '__leakage_input',
				notes: [
					'1、本程序利用变汽温法计算高中压合缸汽轮机过桥汽封泄露率和中压缸实际效率。',
					'2、水蒸气的饱和参数计算依据 IAPWS-IF97 公式。',
					'3、输入的蒸汽压力均为绝对压力。',
					'4、程序中默认输入数据取自参考文献：张志恒, 曹学宝, 孙大川. 变汽温法测试过桥漏汽量的应用分析[J]. 东北电力技术, 2016, 37(5):4.',
					'5、计算结果准确性有待验证，仅供参考。'
				]
			}
		},
		onLoad() {
			// 装载缓存的数据
			try{
				let dat = uni.getStorageSync(this.storageKey);
				if(dat && (dat.length == 2) && (dat[0].length == 6)) {
					for (let i=0; i<dat[0].length; i++) {
						this.test1[i].value = dat[0][i];
						this.test2[i].value = dat[1][i];
					}
					this.implCalc();
				} else {
					for (let i=0; i<6; i++) {
						this.test1[i].value = this.test1[i].default;
						this.test2[i].value = this.test2[i].default;
					}
				}
			}catch(e){
				//TODO handle the exception
				console.log(e.message);
			}
		},
		computed: {
			isReady: function() {
				for (let i=0; i<6; i++) {
					if((this.test1[i].value == '') || (this.test2[i].value == '')) {
						return false;
					}
				}
				return true;
			}
		},
		methods: {
			implCalc: function() {
				const precision = 4; // 输出精度
				let delta; // 泄漏率（过桥汽封漏汽量与再热蒸汽流量比值）
				let eta; // 中压缸效率【0-1】
				let water;
				// 工况1：
				// 泄漏蒸汽参数
				let p10 = parseFloat(this.test1[0].value);
				let t10 = parseFloat(this.test1[1].value);
				water = jif97.props('p', p10, 't', t10);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况1泄漏蒸汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h10 = water.h / 1000.0;
				let s10 = water.s / 1000.0;
				// 再热蒸汽参数
				let p1z = parseFloat(this.test1[2].value);
				let t1z = parseFloat(this.test1[3].value);
				water = jif97.props('p', p1z, 't', t1z);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况1再热蒸汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h1z = water.h / 1000.0;
				let s1z = water.s / 1000.0;
				// 中压缸排汽参数
				let p12 = parseFloat(this.test1[4].value);
				let t12 = parseFloat(this.test1[5].value);
				water = jif97.props('p', p12, 't', t12);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况1中压缸排汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h12 = water.h / 1000.0;
				
				// 工况2：
				// 泄漏蒸汽参数
				let p20 = parseFloat(this.test2[0].value);
				let t20 = parseFloat(this.test2[1].value);
				water = jif97.props('p', p20, 't', t20);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况2泄漏蒸汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h20 = water.h / 1000.0;
				let s20 = water.s / 1000.0;
				// 再热蒸汽参数
				let p2z = parseFloat(this.test2[2].value);
				let t2z = parseFloat(this.test2[3].value);
				water = jif97.props('p', p2z, 't', t2z);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况2再热蒸汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h2z = water.h / 1000.0;
				let s2z = water.s / 1000.0;
				// 中压缸排汽参数
				let p22 = parseFloat(this.test2[4].value);
				let t22 = parseFloat(this.test2[5].value);
				water = jif97.props('p', p22, 't', t22);
				if(water == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.value = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查工况2中压缸排汽参数是否正确。',
						showCancel: false
					});
					return false;
				}
				let h22 = water.h / 1000.0;
				
				// 定义中压缸效率计算函数
				let effi = function(x, h0, s0, hz, sz, p2, t2, h2) {
					let water; //
					// 计算混合蒸汽参数
					let h1 = (x * h0 + hz) / (1.0 + x);
					let s1 = (x * s0 + sz) / (1.0 + x);
					
					// 计算等熵焓
					water = jif97.props('p', p2, 's', s1);
					if(water == null) {
						return null;
					}
					let hs = water.h / 1000.0;
					
					return (h1-h2) / (h1-hs);
				}
				
				// 定义迭代函数
				let f = function(x) {
					let e1 = effi(x, h10, s10, h1z, s1z, p12, t12, h12);
					let e2 = effi(x, h20, s20, h2z, s2z, p22, t22, h22);
					if(e1 == null || e2 == null) {
						return Number.MAX_VALUE;
					}
					return e1-e2;
				}
				
				// 计算泄露率
				let xa = 0;
				let xb = 1;
				try{
					delta = jif97.fzero(f, xa, xb, 1E-6);
				}catch(e){
					//TODO handle the exception
					uni.showModal({
						title: '警告',
						content: '求解过程未收敛，结果可能有误。请检查输入数据是否正确。',
						showCancel: false
					});
					console.log(e);
				}
				
				eta = effi(delta, h10, s10, h1z, s1z, p12, t12, h12);
				
				// 设置输出
				this.results[0].value = (100*delta).toPrecision(precision);
				this.results[1].value = (100*eta).toPrecision(precision);
				return true;
			},
			onCalc: function(event) {
				let ok = this.implCalc();
				if(ok) {
					// 保存输入参数
					let dat = [['', '', '', '', '', ''], ['', '', '', '', '', '']];
					for(let i=0; i<6; i++) {
						dat[0][i] = this.test1[i].value;
						dat[1][i] = this.test2[i].value;
					}
					try{
						uni.setStorageSync(this.storageKey, dat);
					}catch(e){
						//TODO handle the exception
						console.log('无法保存输入数据-leakage');
					}
				}
			},
			onClear: function(event) {
				// 清除输入数据
				for(let item of this.test1) {
					item.value = '';
				}
				for(let item of this.test2) {
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
				for(let item of this.test1) {
					item.value = item.default;
				}
				for(let item of this.test2) {
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
