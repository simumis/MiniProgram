<template>
	<view class="content">
		<view class="utils-item" v-for="(item, idx) in utils" :key=idx @click="goto(item.page)">
			<image class="utils-item-img" :src="item.image"></image>
			<text class="utils-item-text">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				utils: [
					{
						name: '水蒸汽性质',
						image: '/static/steam.png',
						page: '/pages/if97/if97'
					},
					{
						name: '凝汽器变工况',
						image: '/static/condenser.png',
						page: '/pages/condenser/condenser'
					},
					{
						name: '凝汽器清洁度',
						image: '/static/logo.png',
						page: '/pages/condenser/cleanliness'
					},
					{
						name: '关于',
						image: '/static/about.png',
						page: '/pages/about/about'
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
	.content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}
		
	.utils-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: lightgray;
		width: 300rpx;
		height: 300rpx;
		margin: 5px;
	}
	
	.utils-item-img {
		width: 200rpx;
		height: 200rpx;
	}
	
	.utils-item-text {
		margin-top: 2px;
		color: blue;
	}

</style>
