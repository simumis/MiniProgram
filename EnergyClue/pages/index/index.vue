<template>
	<!-- 首页放置导航按钮，每行并排放两个 -->
	<view class="content">
		<view class="utils-panel" v-for="(item, idx) in utils" :key=idx>
			<view class="utils-item" hover-class="utils-item-hover" @click="goto(item.left.page)">
				<image class="utils-item-img" :src="item.left.image"></image>
				<text class="utils-item-text">{{item.left.name}}</text>
			</view>
			<view class="utils-item" hover-class="utils-item-hover" @click="goto(item.right.page)">
				<image class="utils-item-img" :src="item.right.image"></image>
				<text class="utils-item-text">{{item.right.name}}</text>
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
							name: '凝汽器变工况',
							image: '/static/condenser.png',
							page: '/pages/condenser/condenser'
						}
					},
					{
						left: {
							name: '凝汽器清洁度',
							image: '/static/clean.png',
							page: '/pages/condenser/cleanliness'
						},
						right: {
							name: '关于',
							image: '/static/about.png',
							page: '/pages/about/about'
						}
					}
				],
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
	.utils-panel {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
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
