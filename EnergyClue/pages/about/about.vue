<template>
	<view class="content">
		<label>关于软件：</label>
		<view class="notes">
			<view class="notes-item" v-for="item in notes">
				<text user-select="true" selectable="true">{{item}}</text>
			</view>
			<view class="version">
				<view>版本：</view>
				<view>{{_version}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_version: '0.1.7',
				notes: [
					'1、本软件基于 [uni-app](https://uniapp.dcloud.io/) 制作，采用 MIT 版权协议。',
					'2、本软件代码托管在 [GitHub](https://github.com/simumis/MiniProgram) 网站。',
					'3、欢迎试用，有问题请通过 GitHub issue 反馈，或通过电子邮件联系：simumis@hotmail.com'
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.version {
		display: flex;
		flex-direction: row;
		justify-content: center;
		color: blue;
		padding: 5px;
		padding-left: 5px;
		padding-right: 5px;
	}
</style>
