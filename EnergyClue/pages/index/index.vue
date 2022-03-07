<template>
	<view>
		<view class="utils">
			<view class="utils-item" v-for="(item, idx) in utils" :key=idx @click="goto(item.page)">
				<image class="utils-item-img" :src="item.image"></image>
				<view class="utils-item-text">{{item.name}}</view>
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
						name: '水蒸汽性质',
						image: '/static/steam.png',
						page: '/pages/if97/if97'
					},
					{
						name: '凝汽器',
						image: '/static/condenser.png',
						page: '/pages/condenser/condenser'
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
			console.log("onLoad func");
			try {
				const res = uni.getSystemInfoSync();
				var w = res.windowWidth/2-20;
				this.btnStyle = `width: ${w}px; height: ${w}px`;
				console.log(this.btnStyle)
			} catch (e) {
				// error
				console.log("error");
			}

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
	.utils {
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
