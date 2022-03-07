<template>
	<view class="content">
		<!-- 输入容器，包含输入区域和计算按钮-->
		<view class="input-content">
			<!-- 输入区域，包含参数1和参数2，纵向排列 -->
			<view class="input-area">
				<!-- 输入项，包含选项、数值和单位，横向排列 -->
				<view class="input-item">
					<picker class="arg" @change="onSelect1" :value="index1" :range="select1">{{select1[index1]}}</picker>
					<input class="val" type="digit" placeholder="请输入数据" v-model="value1"/>
					<view class="unit"><text>{{unit1}}</text></view>
				</view>
				<!-- 输入项，包含选项、数值和单位，横向排列 -->
				<view class="input-item">
					<picker class="arg" @change="onSelect2" :value="index2" :range="select2">{{select2[index2]}}</picker>
					<input class="val" type="digit" placeholder="请输入数据" v-model="value2" />
					<view class="unit"><text>{{unit2}}</text></view>
				</view>
			</view>
			<!-- 计算按钮 -->
			<view class="calc"><button type="primary" @click="onCalc" :disabled="value1=='' || value2==''">计算</button></view>
		</view>
		<!-- 输出容器，纵向排列 -->
		<view class="result-content">
			<view style="width: 100%; text-align: center; color: blue;">计算结果</view>
			<!-- 输出表头，横向排列 -->
			<view class="result-head">
				<view class="result-head-text" style="width: 10%;">序号</view>
				<view class="result-head-text" style="width: 30%;">参数</view>
				<view class="result-head-text" style="width: 30%;">数值</view>
				<view class="result-head-text" style="width: 30%;">单位</view>
			</view>
			<!-- 输出表项，横向排列 -->
			<view class="result-item" v-for="(item, idx) in result" :key="idx">
				<view class="result-item-text" style="width: 10%;">{{item.sn}}</view>
				<view class="result-item-text" style="width: 30%;">{{item.arg}}</view>
				<view class="result-item-text" style="width: 30%;">{{item.val}}</view>
				<view class="result-item-text" style="width: 30%;">{{item.unit}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as jif97 from '../../common/jif97.js'
	export default {
		data() {
			return {
				select1: ["p-压力", "t-温度", "h-比焓"],
				index1: 0,
				select1_name: ['p', 't', 'h'],
				unit1: 'MPa',
				select2: ["t-温度", "h-比焓", "s-比熵", "x-干度"],
				index2: 0,
				select2_name: ['t', 'h', 's', 'x'],
				unit2: '℃',
				value1: '',
				value2: '',
				result: [
					{sn: '0', arg: '分区', val: '', unit: '-'},
					{sn: '1', arg: '压力', val: '', unit: 'MPa'},
					{sn: '2', arg: '温度', val: '', unit: '℃'},
					{sn: '3', arg: '比容', val: '', unit: 'm³/kg'},
					{sn: '4', arg: '内能', val: '', unit: 'kJ/kg'},
					{sn: '5', arg: '比焓', val: '', unit: 'kJ/kg'},
					{sn: '6', arg: '比熵', val: '', unit: 'kJ/(kg·℃)'},
					{sn: '7', arg: '定容比热', val: '', unit: 'kJ/(kg·℃)'},
					{sn: '8', arg: '定压比热', val: '', unit: 'kJ/(kg·℃)'},
					{sn: '9', arg: '声速', val: '', unit: 'm/s'},
					{sn: '10', arg: '干度', val: '', unit: 'kg/kg'},
				]
			}
		},
		
		onLoad() {
			
		},
		
		methods: {
			//响应第一参数选项改变事件
			//设置参数单位和第二参数选项列表
			onSelect1: function(e) {
				let idx = e.target.value;
				if(idx == this.index1) {
					return;
				}
				this.index1 = idx;
				this.unit1 = ["MPa", "℃", "kJ/kg"][idx]
				// 设置参数2选项
				this.index2 = 0; // 默认选中参数2列表第一项
				if(idx == 0) { // p
					this.select2 = ["t-温度", "h-比焓", "s-比熵", "x-干度"];
					this.select2_name = ['t', 'h', 's', 'x'];
					this.unit2 = ["℃", "kJ/kg", "kJ/(kg·℃)", "kg/kg"][0];
				} else if(idx == 1) { // t
					this.select2 = ["x-干度"];
					this.select2_name = ['x'];
					this.unit2 = "kg/kg"
				} else if(idx == 2) { // h
					this.select2 = ["s-比熵"];
					this.select2_name = ['s']
					this.unit2 = "kJ/(kg·℃)"
				} else {
					console.log("Wrong index of select 1 in function setupSelect2: ", idx);
				}
			},
			
			//响应第二参数选项改变事件
			//设置参数单位
			//arg2为第二参数代码，如"t","h","s","x"
			onSelect2: function(e) {
			    let idx = e.target.value;
				if(idx == this.index2) {
					return;
				}
				this.index2 = idx;
				if(this.index1 == 0) {
					this.unit2 = ["℃", "kJ/kg", "kJ/(kg·℃)", "kg/kg"][idx];
				} else if(this.index1 == 1) {
					this.unit2 = "kg/kg";
				} else if(this.index1 == 2) {
					this.unit2 = "kJ/(kg·℃)";
				} else {
					console.log("Wrong index of select 1 in function onSelect2: ", this.index1);
				}
			},
			onCalc: function() {
				let arg1 = this.select1_name[this.index1];
				let arg2 = this.select2_name[this.index2];
				let val1 = parseFloat(this.value1);
				let val2 = parseFloat(this.value2);
				let w = jif97.props(arg1, val1, arg2, val2);
				if(w == null) {
					uni.showModal({
						title: '警告',
						content: '请检查输入数据是否在有效范围。',
						showCancel: false
					})
				}
				let res = ["rgn","p" ,"t", "v", "u", "h", "s", "cv", "cp", "w", "x"];
				this.result[0].val = w.rgn;
				for(let i=1; i<this.result.length; i++) {
					let dat = w[res[i]];
					if(res[i] == 'p') {
						dat /= 1.0E6;
					} else if(res[i] == "t") {
						dat -= 273.15;
					} else if(res[i] == "u" || res[i] == "h" || res[i] == "s" || res[i] == "cv" || res[i] == "cp") {
						dat /= 1.0E3;
					}
					this.result[i].val = dat.toPrecision(6);
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.input-content {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		margin-left: 5rpx;
		margin-right: 5rpx;
		margin-top: 5rpx;
	}
	
	.input-area {
		flex: 1 1 auto;
	}
	
	.input-item {
		display: flex;
		flex-direction: row;
	}
	
	.arg {
		width: 100rpx;
		margin-right: 5rpx;
		background-color: lightgray;
		padding-left: 5px;
	}
	
	.val {
		margin-right: 5rpx;
		background-color: lightgreen;
		flex: 1 1 auto;
		padding-left: 5px;
	}
	
	.unit {
		width: 100rpx;
		background-color: lightgray;
		padding-left: 5px;
	}
	
	.calc {
		background-color: gray;
		margin-left: 5rpx;
		color: blue;
	}
	
	.result-content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	
	.result-head {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		color: red;
		font-weight: bold;
		text-align: center;
		border: 1px solid lightgray;
	}
	
	.result-head-text {
		border-right: 1px solid lightgray;
	}
	
	.result-item {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		text-align: center;
		border-bottom: 1px solid lightgray;
		border-left: 1px solid lightgray;
		border-right: 1px solid lightgray;
	}
	
	.result-item-text {
		border-right: 1px solid lightgray;
	}
</style>
