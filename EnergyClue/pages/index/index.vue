<template>
	<!-- 首页放置导航按钮，每行并排放两个 -->
	<view class="content">
		<!-- 创建工具按钮 -->
		<label><text>实用工具：</text></label>
		<view class="utils-area">
			<view class="utils-panel" v-for="(item, idx) in utils" :key="idx">
				<view class="utils-item" hover-class="utils-item-hover" v-for="(util,i) in item" :key="i" @click="goto(util.page)">
					<image class="utils-item-img" :src="util.image"></image>
					<text class="utils-item-text">{{util.name}}</text>
				</view>
			</view>
		</view>
		<!-- 创建帮助按钮 -->
		<label><text>帮助：</text></label>
		<view class="utils-area">
			<view class="utils-panel" v-for="(item, idx) in helps" :key="idx">
				<view class="utils-item" hover-class="utils-item-hover" v-for="(help,i) in item" :key="i" @click="goto(help.page)">
					<image class="utils-item-img" :src="help.image"></image>
					<text class="utils-item-text">{{help.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				utils: [
					{
						left: {
							name: '水蒸汽性质',
							image: '/static/steam.png',
							page: '/pages/if97/if97'
						},
						right: {
							name: '湿空气性质',
							image: '/static/air.png',
							page: '/pages/humid/humid'
						}
					},
					{
						left: {
							name: '凝汽器变工况',
							image: '/static/condenser.png',
							page: '/pages/condenser/condenser'
						},
						right: {
							name: '凝汽器清洁度',
							image: '/static/clean.png',
							page: '/pages/condenser/cleanliness'
						}
					},
					{
						left: {
							name: '缸效率计算',
							image: '/static/turbine.png',
							page: '/pages/turbine/turbine'
						},
						right: {
							name: '过桥汽封泄漏量',
							image: '/static/leakage.png',
							page: '/pages/leakage/leakage'
						}
					}
				],
				helps: [
					{
						left: {
							name: '关于',
							image: '/static/about.png',
							page: '/pages/about/about'
						},
					},
				]
			}
		},
		onLoad() {
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	
	.utils-area {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		width: 100%;
	}
	
	.utils-panel {
		display: flex;
		flex-direction: row;
		align-items: flex;
		justify-content: flex-start;
	}
	
	.utils-item, .utils-item-hover {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 300rpx;
		height: 300rpx;
		margin: 10px;
	}
	.utils-item {
		border: 2px solid blue;
		color: blue;
	}
	.utils-item-hover {
		border: 2px solid red;
		color: red;
	}
	.utils-item-img {
		width: 200rpx;
		height: 200rpx;
	}
	
	.utils-item-text {
		margin-top: 2px;
	}

</style>
