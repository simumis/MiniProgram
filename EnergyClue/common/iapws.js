// iapws - JavaScript Implement of IAPWS
// Created:     2022-02-20
// Copyright:   (c) simumis. All rights reserved.
// Licence:     MIT License
// Reference:   http://www.iapws.org/
import {fzero} from './zero.js';

// constants
const pt = 611.657;
const Tt = 273.16;
const pc = 22.064E6;
const Tc = 647.096;
const sublTmin = 50;

/** 根据输入温度计算升华压力，温度有效范围：[50K, 273.16K]
 * @param {Number} T - 热力学温度，单位：K
 * @return {Number} 单位：Pa
 */
function sublimationPressure(T) {
	const a = [-0.212144006E2, 0.273203819E2, -0.610598130E1];
	const b = [0.333333333E-2, 0.120666667E1, 0.170333333E1];
	const p_star = pt;
	const T_star = Tt;
	let theta = T / T_star;
	let sum = 0.0;
	for(let i=0; i<3; i++) {
		sum += a[i] * Math.pow(theta, b[i]);
	}
	let pi = Math.exp(sum / theta);
	return pi * p_star;
}

/** 根据输入压力计算升华温度
 * @param {Number} p - 压力，单位：Pa
 */
function sublimationTemperature(p) {
	let f = function(T) {
		return sublimationPressure(T) - p;
	};
	let xa = 50;
	let xb = 273.16;
	let tol = 1.0E-6;
	return fzero(f, xa, xb, tol);
}

/** 根据输入温度计算饱和压力，温度有效范围 [273.15K， 647.096K]
 * 参考：IAPWS-IF97
 * @param {Number} T - 热力学温度，单位：K
 */
function saturationPressure(T) {
	const t_star = 1.0;
	const p_star = 1.0e6;
	const nr = [0.0, 0.11670521452767e+04, -0.72421316703206e+06, -0.17073846940092e+02, 0.12020824702470e+05, -0.32325550322333e+07, 0.14915108613530e+02, -0.48232657361591e+04, 0.40511340542057e+06, -0.23855557567849e+00, 0.65017534844798e+03];
	
	let tmp = T / t_star
	let theta = tmp + nr[9]/(tmp-nr[10]);
	let sq_theta = theta * theta;
	let A = sq_theta + nr[1]*theta + nr[2];
	let B = nr[3]*sq_theta + nr[4]*theta + nr[5];
	let C = nr[6]*sq_theta + nr[7]*theta + nr[8];
	
	tmp = 2.0 * C / (Math.sqrt(B*B-4.0*A*C) - B);
	let tmp2 = tmp * tmp; // tmp^2
	tmp2 *= tmp2;      // tmp^4
	return tmp2 * p_star;
}

/** 根据输入压力计算饱和温度
 * @param {Number} p - 压力，单位：Pa
 */
function saturationTemperature(p) {
	const t_star = 1.0;
	const p_star = 1.0e6;
	const nr = [0.0, 0.11670521452767e+04, -0.72421316703206e+06, -0.17073846940092e+02, 0.12020824702470e+05, -0.32325550322333e+07, 0.14915108613530e+02, -0.48232657361591e+04, 0.40511340542057e+06, -0.23855557567849e+00, 0.65017534844798e+03];
	
	let tmp = p / p_star;
	let sq_beta = Math.sqrt(tmp);
	let beta = Math.sqrt(sq_beta);
	let E = sq_beta + nr[3]*beta + nr[6];
	let F = nr[1]*sq_beta + nr[4]*beta + nr[7];
	let G = nr[2]*sq_beta + nr[5]*beta + nr[8];
	let D = 2.0 * G / (-F - Math.sqrt(F*F-4.0*E*G));
	
	tmp = nr[10] + D;
	return (tmp - Math.sqrt(tmp*tmp-4.0*(nr[9]+nr[10]*D))) / 2.0 * t_star;/**/
}

export {sublimationPressure, sublimationTemperature, saturationPressure, saturationTemperature,
		pt, Tt, pc, Tc, sublTmin};