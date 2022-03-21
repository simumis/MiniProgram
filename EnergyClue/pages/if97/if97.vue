<template>
	<!-- 底层容器 -->
	<view class="content">
		<label>输入区域：</label>
		<!-- 输入容器，包含输入区域和计算按钮-->
		<view class="input-content">
			<!-- 输入项，包含选项、数值和单位，横向排列 -->
			<view class="input-item">
				<picker class="input-picker" @change="onSelect1" :value="index1" :range="select1">{{select1[index1]}} <text class="mark-triangle">&#9660</text></picker>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="value1"/>
				<view class="input-unit"><text>{{unit1[index1]}}</text></view>
			</view>
			<!-- 输入项，包含选项、数值和单位，横向排列 -->
			<view class="input-item">
				<picker class="input-picker" @change="onSelect2" :value="index2" :range="select2[index1]">{{select2[index1][index2]}} <text class="mark-triangle">&#9660</text></picker>
				<input class="input-val" type="digit" placeholder="请输入数据" v-model="value2" />
				<view class="input-unit"><text>{{unit2[index1][index2]}}</text></view>
			</view>
			<!-- 计算按钮 -->
			<view class="calc">
				<button class="calc-button-main" hover-class="calc-button-main-hover" @click="onCalc" :disabled="value1=='' || value2==''">开始计算</button>
				<button class="calc-button-clear" hover-class="calc-button-clear-hover" @click="onClear">清除输入</button>
			</view>
		</view>
		<!-- 输出容器，纵向排列 -->
		<view class="result-content">
			<label>计算结果：</label>
			<!-- 输出表头，横向排列 -->
			<view class="result-head">
				<view class="result-head-text" style="width: 10%;"><text>序号</text></view>
				<view class="result-head-text" style="width: 30%;"><text>参数</text></view>
				<view class="result-head-text" style="width: 30%;"><text>数值</text></view>
				<view class="result-head-text" style="width: 30%;"><text>单位</text></view>
			</view>
			<!-- 输出表项，横向排列 -->
			<view class="result-item" v-for="(item, idx) in results" :key="idx">
				<view class="result-item-text" style="width: 10%;"><text>{{idx}}</text></view>
				<view class="result-item-text" style="width: 30%;"><text>{{item.name}}</text></view>
				<view class="result-item-text" style="width: 30%; background-color: WhiteSmoke;"><text>{{item.val}}</text></view>
				<view class="result-item-text" style="width: 30%;"><text>{{item.unit}}</text></view>
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
	import * as jif97 from '../../common/jif97.js'
	export default {
		data() {
			return {
				select1: ['p-压力', 't-温度', 'h-比焓'],
				index1: 0,
				select1_name: ['p', 't', 'h'],
				unit1: ['MPa', '℃', 'kJ/kg'],
				select2: [
					['t-温度', 'h-比焓', 's-比熵', 'x-干度'],
					['x-干度'],
					['s-比熵']
				],
				index2: 0,
				select2_name: [
					['t', 'h', 's', 'x'],
					['x'],
					['s']
				],
				unit2: [
					['℃', 'kJ/kg', 'kJ/(kg·℃)', 'kg/kg'],
					['kg/kg'],
					['kJ/(kg·℃)']
				],
				value1: '',
				value2: '',
				results: [
					{name: '分区', val: '', unit: '-'},
					{name: '压力', val: '', unit: 'MPa'},
					{name: '温度', val: '', unit: '℃'},
					{name: '比容', val: '', unit: 'm³/kg'},
					{name: '密度', val: '', unit: 'kg/m³'},
					{name: '内能', val: '', unit: 'kJ/kg'},
					{name: '比焓', val: '', unit: 'kJ/kg'},
					{name: '比熵', val: '', unit: 'kJ/(kg·℃)'},
					{name: '定容比热', val: '', unit: 'kJ/(kg·℃)'},
					{name: '定压比热', val: '', unit: 'kJ/(kg·℃)'},
					{name: '声速', val: '', unit: 'm/s'},
					{name: '干度', val: '', unit: 'kg/kg'},
				],
				storageKey: '__if97_input',
				notes: [
					'1、基于国际水和水蒸气性质协会（IAPWS）发布的工业用水和水蒸汽热力性质计算公式 IAPWS-IF97 [IAPWS R7-97(2012)]制作。',
					'2、数据有效区域：当 0℃ ≤ t ≤ 800℃ 时，611.213Pa ≤ p ≤ 100MPa；当 800℃ ≤ t ≤ 2000℃ 时，611.213Pa ≤ p ≤ 50MPa。',
					'3、点击数据输入栏左侧的参数类型，选择相应的参数组合，输入有效数值后点击“开始计算”按钮，即可在结果区查看计算结果。如果输入有误，则会弹出提示信息。',
					'4、“x-干度”参数仅适用于饱和蒸汽区，代表每千克湿蒸汽中含有干饱和蒸汽的质量，取值范围为 [0-1]。',
					'5、当处于湿蒸汽区时，不太清楚如何计算声速 w，因此仅以 “NaN”（代表 Not a Number） 显示；而对于其它区，干度 x 没有意义，也以 “NaN” 显示。'
				]
			}
		},
		
		onLoad() {
			// 装载缓存的数据
			try{
				let dat = uni.getStorageSync(this.storageKey);
				if(dat && dat.length == 4) {
					this.index1 = parseInt(dat[0]);
					this.value1 = dat[1];
					this.index2 = parseInt(dat[2]);
					this.value2 = dat[3];
					this.implCalc();
				}
			}catch(e){
				//TODO handle the exception
				console.log(e.message);
			}
		},
		
		methods: {
			//响应第一参数选项改变事件
			//设置参数单位和第二参数选项列表
			onSelect1: function(event) {
				let idx = parseInt(event.detail.value);
				if(idx == this.index1) {
					return;
				}
				this.index1 = idx;
				this.index2 = 0; // 默认选中参数2列表第一项
			},
			
			//响应第二参数选项改变事件
			//设置参数单位
			//arg2为第二参数代码，如"t","h","s","x"
			onSelect2: function(event) {
			    let idx = parseInt(event.detail.value);console.log(typeof idx)
				if(idx == this.index2) {
					return;
				}
				this.index2 = idx;
			},
			implCalc: function() {
				let arg1 = this.select1_name[this.index1];
				let arg2 = this.select2_name[this.index1][this.index2];
				let val1 = parseFloat(this.value1);
				let val2 = parseFloat(this.value2);
				let w = jif97.props(arg1, val1, arg2, val2);
				if(w == null) {
					// 清除计算结果
					for(let item of this.results) {
						item.val = '';
					}
					uni.showModal({
						title: '警告',
						content: '请检查输入数据是否在有效范围。',
						showCancel: false
					});
					return false;
				}
				let res = ["rgn","p" ,"t", "v", "d", "u", "h", "s", "cv", "cp", "w", "x"];
				this.results[0].val = w.rgn;
				for(let i=1; i<this.results.length; i++) {
					let dat;
					if(res[i] == 'd') {
						dat = 1.0 / w.v;
					} else {
						dat = w[res[i]];
					}
					if(res[i] == 'p') {
						dat /= 1.0E6;
					} else if(res[i] == "t") {
						dat -= 273.15;
					} else if(res[i] == "u" || res[i] == "h" || res[i] == "s" || res[i] == "cv" || res[i] == "cp") {
						dat /= 1.0E3;
					}
					this.results[i].val = dat.toPrecision(6);
				}
				return true;
			},
			onCalc: function(event) {
				// 执行计算
				let ok = this.implCalc();
				if(ok) {
					// 保存输入参数
					let dat = ['', '', '', '']; // [index1, value1, index2, value2]
					dat[0] = this.index1.toString();
					dat[1] = this.value1;
					dat[2] = this.index2.toString();
					dat[3] = this.value2;
					try{
						uni.setStorageSync(this.storageKey, dat);
					}catch(e){
						//TODO handle the exception
						console.log('无法保存输入数据-if97');
					}
				}
			},
			onClear: function () {
				// 输入区设为默认值
				this.index1 = 0;
				this.index2 = 0;
				this.value1 = '';
				this.value2 = '';
				// 清空计算结果
				for(let item of this.results) {
					item.val = '';
				}
				// 清空缓存的数据
				uni.removeStorageSync(this.storageKey);
			}
		}
	}
</script>

<style>
	.input-picker {
		background-color: silver;
		width: 180rpx;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-left: 5px;
		text-align: center;
		color: blue;
		border: 1px solid red;
	}
	
	.result-head {
		display: flex;
		flex-direction: row;
		font-weight: bold;
		color: blue;
		text-align: center;
		margin-top: 5px;
	}
	
	.result-item-text {
		text-align: center;
	}
</style>
