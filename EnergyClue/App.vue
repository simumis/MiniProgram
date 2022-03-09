<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
		width: 100%;
		background-color: lightgray;
	}
	
	label {
		color: red;
		font-weight: bold;
		background-color: lightgray;
		width: 100%;
		padding-left: 5px;
	}
	
	.calc {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-left: 5px;
		padding-right: 5px;
	}
	.calc button {
		flex: 1 1 auto;
		margin-left: 2px;
		margin-right: 2px;
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
		background-color: lightgray;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.input-val, .result-val {
		background-color: lightcyan;
		flex: 1 1 auto;
		padding-left: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: center;
	}
	
	.input-unit, .result-unit {
		width: 200rpx;
		background-color: lightgray;
		padding-left: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.picker-content {
		display: flex;
		flex-direction: row;
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
		background-color: lightpink;
		flex: 1 1 auto;
		text-align: center;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.notes {
		padding-left: 5px;
		padding-right: 5px;
		padding-bottom: 10px;
	}
	
</style>
