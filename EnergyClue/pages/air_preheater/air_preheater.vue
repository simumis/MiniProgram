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
					{name:'入口氧量', value:'', default:'3.373', unit:'%'},
					{name:'出口氧量', value:'', default:'4.209', unit:'%'}
				],
				results: [
					{name:'漏风率', value:'', unit:'%'} // 0
				],
				storageKey: '__air_preheater_input',
				notes: [
					'1、本程序依据《电站锅炉性能试验规程》（GB/T 10184-2015）编制。',
					'2、入口和出口氧量为干烟气中氧气的体积分数(%)',
					'3、根据《电力技术监督导则》(DL/T 1052-2016)规定：管式预热器漏风率不大于3%；回转式预热器漏风率不大于6%。'
				]
			}
		},
		onLoad() {
			// 装载缓存的数据
			try{
				let dat = uni.getStorageSync(this.storageKey);
				let len = this.inputs.length;
				if(dat && (dat.length == len)) {
					for (let i=0; i<dat.length; i++) {
						this.inputs[i].value = dat[i];
					}
					this.implCalc();
				} else {
					for (let i=0; i<len; i++) {
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
					if((this.inputs[i].value == '') || (isNaN(parseFloat(this.inputs[i].value)))) {
						return false;
					}
				}
				return true;
			}
		},
		methods: {
			implCalc: function() {
				const precision = 4; // 输出精度
				let A0 = parseFloat(this.inputs[0].value);
				let B0 = parseFloat(this.inputs[1].value);
				// 计算过量空气系数
				let A1 = 21.0 / (21.0 - A0);
				let B1 = 21.0 / (21.0 - B0);
				let cc = B1 - A1;
				let dd = (cc / A1) * 90.0;
				// 设置输出
				this.results[0].value = dd.toPrecision(precision);
				return true;
			},
			onCalc: function(event) {
				let ok = this.implCalc();
				if(ok) {
					// 保存输入参数
					let dat = ['', ''];
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
