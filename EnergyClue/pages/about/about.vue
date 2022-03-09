<template>
	<view class="content">
		<label>关于软件：</label>
		<view class="notes">
			<text>
				1、本软件基于 (uni-app)(https://uniapp.dcloud.io/) 制作，采用 MIT 版权协议。
				2、当前软件版本：v{{_version}}。
				3、本软件代码托管[GitHub](https://github.com/simumis/MiniProgram) 网站。
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_version: '0.1.0'
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
