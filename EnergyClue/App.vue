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
	.calc-button {
		flex: 1 1 auto;
		margin-left: 2px;
		margin-right: 2px;
		font-weight: bold;
	}
	
	.calc-button-main {
		background-color: lime;
	}
	.calc-button-clear {
		background-color: red;
	}
	.calc-button-reset {
		background-color: yellow;
	}
	.calc-button-main-hover {
		background-color: green;
	}
	.calc-button-clear-hover {
		background-color: FireBrick;
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
