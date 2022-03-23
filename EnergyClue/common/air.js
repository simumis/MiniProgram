/** 根据 DL/T 1027 计算湿空气性质
 *
 * @author simumis@hotmail.com
 * @license MIT
 */
import * as iapws from './iapws.js';

/** 饱和水蒸气压力
 * @param {Number} t - 温度，单位：℃
 * @return {Number} 饱和水蒸气压力，单位：kPa
 */
function ps(t) {
	let T = t + 273.15; // ℃->K
	if(T<iapws.sublTmin || T>iapws.Tc) {
		throw new Error('输入数值超出有效范围！');
		return NaN;
	}
	let res;
	if(T >= iapws.Tt) {
		res =  iapws.saturationPressure(T);
	} else {
		res = iapws.sublimationPressure(T);
	}
	// Pa->kPa
	return res / 1E3;
	
	// 纪利公式，暂时不用
	//let lgps = 5.005717 - 3.142305 * (1000.0/T - 1000.0/373.16) + 8.2 * Math.log10(373.16/T) - 0.0024804 * (373.16 - T);
	//return Math.pow(10, lgps);
}

/**
 * @param {Number} p - 绝对压力，单位：kPa
 * @return {Number} 单位：℃
 */
function ts(p) {
	let pp = p * 1E3; // kPa->Pa
	let pmin = iapws.sublimationPressure(iapws.sublTmin);
	if(p<iapws.pmin || p>iapws.pc) {
		throw new Error('输入数值超出有效范围！');
		return NaN;
	}
	let res;
	if(pp >= iapws.pt) {
		res = iapws.saturationTemperature(pp);
	} else {
		res = iapws.sublimationTemperature(pp);
	}
	// K->℃
	return res - 273.15;
}

/** 湿空气比焓
 * @param {Number} theta - 空气干球温度，单位：℃
 * @param {Number}  d - 空气含湿量，kg/kg(DA)
 * @return {Number} 湿空气比焓，单位：kJ/kg
 */
function enthalpy(theta, d) {
	const cd = 1.005; // 干空气比热
	const cv = 1.846; // 水蒸气比热
	const gamma0 = 2500.9; // 水在0℃的汽化潜热 kJ/kg
	return cd * theta + d * (gamma0 + cv * theta);
}

function theta(h, d) {
	const cd = 1.005; // 干空气比热
	const cv = 1.846; // 水蒸气比热
	const gamma0 = 2500.9; // 水在0℃的汽化潜热 kJ/kg
	return (h - d * gamma0) / (cd + d * cv);
}

/** 湿空气密度
 * @param {Number} theta - 干球温度，单位：℃
 * @param {Number} pa - 大气压力，单位：kPa
 * @param {Number} pv - 水蒸气分压力，单位：kPa
 * @return {Number} 单位：kg/m³
 */
function density(theta, pa, pv) {
	let T = theta + 273.15;
	return (0.003483 * 1000 * pa - 0.001316 * 1000 * pv) / T;
}

/** 空气含湿量(d) - 每千克干空气中所混合的水蒸气的质量
 * @param {Number} pa - 大气压力，单位：kPa
 * @param {Number} pv - 大气压力，单位：kPa
 * @return {Number} kg/kg
 */
function specificHumidity(pa, pv) {
	return 0.622 * pv / (pa - pv);
}

/** 计算水蒸气分压力
 * @param {Number} pa - 大气压力，单位：kPa
 * @param {Number} d - 含湿量，单位：kg/kg[DA]
 * @return {Number} 单位：kPa
 */
function pv(pa, d) {
	return pa * d / (0.622 + d);
}

/** 空气的相对湿度
 * @param {Number} theta - 空气的干球温度，单位：℃
 * @param {Number} tau - 空气的湿球温度，单位：℃
 * @param {Number} pa - 大气压力，单位：kPa
 * @param {Number} A - 干湿表系数，单位：1/℃
 * @return {Number} [0-1]
 */
function relativeHumidity(theta, tau, pa, A) {
	return (ps(tau) - A * pa * 1000 * (theta - tau)) / ps(theta);
}

export {ps, ts, enthalpy, theta, density, specificHumidity, pv, relativeHumidity};