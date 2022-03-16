# EnergyClue

## 简介
基于 [uni-app](https://uniapp.dcloud.net.cn/) 制作的小程序，主要用于实现日常工作中使用的简便计算工具。目前仅发布在了微信小程序平台。

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。

## 版本发布
### v0.1.0
首次发布版本，实现了水和水蒸气热力性质计算（使用 IAPWS-IF97 公式），以及基于 DL/T 932-2019 凝汽器变工况计算和清洁度计算。

### v0.1.1
为if97、condenser 和 cleanliness 添加缓存页面状态功能，重新进入页面时能恢复上次正确计算时的状态。

## 小程序码
### 微信
![EnergyClue](images/gh_785b42133d7c_344.jpg "EnergyClue 微信小程序")