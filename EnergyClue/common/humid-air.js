/** 根据 DL/T 1027 计算湿空气性质
 *
 * @author simumis@hotmail.com
 * @license MIT
 */

/** 湿空气比焓
 * @param {Number} theta - 空气干球温度，单位：℃
 * @param {Number}  x - 空气含湿量，kg/kg(DA)
 * @return {Number} 湿空气比焓，单位：kJ/kg
 */
function enthalpy(theta， x) {
	const cd = 1.005; // 干空气比热
	const cv = 1.846; // 水蒸气比热
	const gamma0 = 2500.0; // 水在0℃的汽化潜热 kJ/kg
	h = cd * theta + x * (gamma0 + cv * thehta);
	
	return h;
}

/** 湿空气密度
 * @param {Number} theta - 干球温度，单位：℃
 * @param {Number} pa - 大气压力，单位：Pa
 * @param {Number} phi - 空气相对湿度，单位：%
 * @param {Number} ps - 空气温度为theta时的饱和水蒸气压力，单位：Pa
 * @return {Number} 单位：kg/m³
 */
function density(theta, pa, phi, ps) {
	let T = theta + 273.15;
	return (0.003483 * pa - 0.001316 * phi * ps) / T;
}

/** 空气含湿量 - 每千克干空气中所混合的水蒸气的质量
 * @param {Number} phi - 空气相对湿度，单位：%
 * @param {Number} ps - 空气中饱和水蒸气压力，单位：Pa
 * @param {Number} pa - 大气压力，单位：Pa
 * @return {Number} kg/kg
 */
function x(phi, ps, pa) {
	let tmp = phi * ps;
	return 0.622 * tmp / (pa - tmp);
}

/** 饱和水蒸气压力
 * @param {Number} t - 温度，单位：℃
 * @return {Number} 饱和水蒸气压力，单位：Pa
 * @return {Number}
 */
function ps(t) {
	let T = t + 273.15;
	let lgps = 5.005717 - 3.142305 * (1000.0/T - 1000.0/373.16) + 8.2 * Math.log10(373.16/T) - 0.0024804 * (373.16 - T);
	return Math.pow(10, lgps);
}

/** 空气的相对湿度
 * @param {Number} theta - 空气的干球温度，单位：℃
 * @param {Number} tau - 空气的湿球温度，单位：℃
 * @param {Number} pa - 大气压力，单位：Pa
 * @param {Number} A - 干湿表系数，单位：1/℃
 * @return {Number} 
 */
function phi(theta, tau, pa, A) {
	return (ps(tau) - A * pa * (theta - tau)) / ps(theta);
}