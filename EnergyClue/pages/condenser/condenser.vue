<template>
  <view id="arg">
	  <button id="btn" @click="setupSelect(this)">click me</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      style: 'color: red; font-size: 300rpx'
    }
  },
  onLoad() {
	console.log("get in onLoad");
  },
  methods: {
	  setupSelect(obj) {
		  console.log("get in setupSelect");
		  console.log("obj: ",obj);
		  var btn = document.getElementById("btn");
		  var arg = document.getElementById("arg");
		  console.log("btn: ", btn);
		  console.log("arg: ", arg);
	  }
  }
}
</script>

<style>
</style>