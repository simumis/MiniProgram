<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			try{
				this.autoUpdate();
			}catch(e){
				//TODO handle the exception
				console.log(e.message);
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			autoUpdate: function() {
				console.log(new Date());
				let self = this;
				// 获取小程序更新机制兼容
				if(uni.canIUse('getUpdateManager')) {
					const um = uni.getUpdateManager();
					//1. 检查小程序是否有新版本发布
					um.onCheckForUpdate(function(res){
						// 请求完新版本信息的回调
						if(res.hasUpdate) {
							//2. 小程序有新版本，则静默下载新版本，做好更新准备
							um.onUpdateReady(function(){
								console.log(new Date());
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success:function(res){
										if(res.confirm) {
											//3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											um.applyUpdate();
										} //if(res.confirm)
									}
								}); //uni.showModal
							}); //onUpdateReady
							// 当新版本下载失败
							um.onUpdateFailed(function(){
								uni.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
									showCancel: false
								});
							}); //onUpdateFailed
						} //if(res.hasUpdate)
					}); //onCheckForUpdate
				} //if(uni.canIUse('getUpdateManager'))
			} //autoUpdate
		} //methods
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: lightgrey;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
	}
	
	label {
		color: red;
		font-weight: bold;
		font-size: larger;
		width: 100%;
		padding-left: 5px;
	}
	
	.calc {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-left: 5px;
		padding-right: 5px;
	}
	.calc-button-main, .calc-button-clear, .calc-button-reset,
	 .calc-button-main-hover, .calc-button-clear-hover,
	 .calc-button-reset-hover {
		flex: 1 1 auto;
		margin-left: 2px;
		margin-right: 2px;
		font-weight: bold;
	}
	
	.calc-button-main {
		background-color: ForestGreen;
	}
	.calc-button-main-hover {
		background-color: green;
	}
	.calc-button-clear {
		background-color: red;
	}
	.calc-button-clear-hover {
		background-color: FireBrick;
	}
	.calc-button-reset {
		background-color: yellow;
	}
	.calc-button-reset-hover {
		background-color: Gold;
	}
	
	.input-content, .result-content {
		display: flex;
		flex-direction: column;
	}
	
	.input-item, .result-item {
		display: flex;
		flex-direction: row;
		margin-top: 5px;
	}
	
	.input-name, .result-name {
		text-align: right;
		width: 300rpx;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.input-val, .result-val {
		background-color: WhiteSmoke;
		flex: 1 1 auto;
		padding-left: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: center;
		margin-left: 5px;
	}
	
	.input-unit, .result-unit {
		width: 200rpx;
		padding-left: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.picker-content {
		display: flex;
		flex-direction: row;
		margin-top: 5px;
	}
	.picker-hint {
		text-align: right;
		width: 300rpx;
		background-color: lightgray;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	.picker-item {
		background-color: silver;
		color: blue;
		flex: 1 1 auto;
		text-align: center;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-right: 5px;
		border: 1px solid red;
	}
	
	.notes {
		padding-left: 5px;
		padding-right: 5px;
		padding-bottom: 10px;
	}
	
	.mark-triangle{
		color: red;
	}
</style>
