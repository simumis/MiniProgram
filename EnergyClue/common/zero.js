/** 求根
 *
 * @author simumis@hotmail.com
 * @license MIT
 */

/// Bisection
//
function bisection(f, xa, xb, tol) {
	let ya = f(xa);
	let yb = f(xb);
	let xm, ym, res;

	if (Math.abs(ya) < tol) {
		res = xa;
		return res;
	} else if (Math.abs(yb) < tol) {
		res = xb;
		return res;
	} else if ((ya < 0.0 && yb < 0.0) || (ya > 0.0 && yb > 0.0)) {
		if (Math.abs(ya) < Math.abs(yb)) {
			res = xa;
		} else {
			res = xb;
		}
		return res;
	}
	for (;;) {
		xm = (xa + xb) / 2.0;
		ym = f(xm);
		if (Math.abs(ym) < tol || Math.abs((xb - xa) / xa) < tol) {
			res = xm;
			return res;
		}

		if ((ya < 0.0 && ym < 0.0) || (ya > 0.0 && ym > 0.0)) {
			xa = xm;
			ya = ym;
		} else {
			xb = xm;
			yb = ym;
		}
	}
}

/// Newton
//
function newton(f, df, x0, tol) {
	let x1, y0, dy0;
	let res;

	for (;;) {
		y0 = f(x0);
		if (Math.abs(y0) < tol) {
			res = x0;
			return res;
		}
		dy0 = df(x0);
/*		//dy == 0
		if (Math.abs(dy0) < Math.MIN_VALUE) {
			res = x0;
			throw new Error("Newton:Does not converge");
			return res;
		}
*/
		x1 = x0 - y0/dy0;
		let eps = Math.abs((x1 - x0) / x0);
		if (eps < tol) {
			res = x1;
			return res;
		}
		x0 = x1;
	}
}

/// Secant
//
function secant(f, x0, x1, tol) {
	var y0, y1, x2;
	var res;

	for (let i = 0; ; i++) {
		y0 = f(x0);
		if (Math.abs(y0) < tol) {
			res = x0;
			return res;
		}
		y1 = f(x1);
/*		// y1 == y0
		if (Math.abs(y1 - y0) < Number.MIN_VALUE) {
			res = (x0 + x1) / 2.0;
			throw new Error("Secant:Does not converge");
			return res;
		}
*/
		x2 = x1 - y1*(x1-x0)/(y1-y0);
		if (Math.abs((x2 - x1) / x1) < tol) {
			res = x2;
			return res;
		}
		x0 = x1;
		x1 = x2;
	}
}

/// Brent
// Reference: Brent, R. P. (1973), "Chapter 4: An Algorithm with Guaranteed Convergence for Finding a Zero of a functiontion", Algorithms for Minimization without Derivatives, Englewood Cliffs, NJ: Prentice-Hall, ISBN 0-13-022335-2
function brent(f /*Zerofunction*/, xa /*float64*/, xb /*float64*/, tol /*float64*/) {
	let res;

	let a = xa;
	let b = xb;
	let fa = f(a);
	let fb = f(b);

	let c = a;
	let fc = fa;

	let d = b - a;
	let e = d;

	var tol_act, m, p, q, r, s;

	for(;;) {
		if (Math.abs(fc) < Math.abs(fb)) {
			a = b;
			b = c;
			c = a;
			fa = fb;
			fb = fc;
			fc = fa;
		}

		tol_act = 2.0 * Number.MIN_VALUE * Math.abs(b) + tol;
		m = (c - b) / 2.0;
		if (Math.abs(m) <= tol_act || fb == 0.0) {
			res = b;
			return res;
		}

		if (Math.abs(e) < tol_act || Math.abs(fa) <= Math.abs(fb)) {
			d = m;
			e = m;
		} else {
			s = fb / fa;

			if (a == c) {
				p = 2.0 * m * s;
				q = 1.0 - s;
			} else {
				q = fa / fc;
				r = fb / fc;
				p = s * (2.0*m*q*(q-r) - (b-a)*(r-1.0));
				q = (q - 1.0) * (r - 1.0) * (s - 1.0);
			}

			if (p > 0.0) {
				q = -q;
			} else {
				p = -p;
			}

			s = e;
			e = d;

			if (2.0*p < 3.0*m*q-Math.abs(tol_act*q) && p < Math.abs(0.5*s*q)) {
				d = p / q;
			} else {
				d = m;
				e = m;
			}
		}

		a = b;
		fa = fb;

		if (Math.abs(d) > tol_act) {
			b += d;
		} else {
			if (m > 0) {
				b += tol_act;
			} else {
				b -= tol_act;
			}
		}

		fb = f(b);

		if ((fb > 0 && fc > 0) || (fb < 0 && fc < 0)) {
			c = a;
			fc = fa;
			d = b - a;
			e = d;
		}
	} // for
} // function

/** fzero - 求形如 f(x)=0 方程的根
 * @param f - function，需要求根的方程 f(x)，形式为接受一个number型参数，并返回一个number型值。
 * @param xa - number，根区间[xa, xb]端点
 * @param xb - number，根区间[xa, xb]端点
 * @param tol - number，容差
 * @param x0 - number，初始值[可选]
 * @param df - function，f(x)的一阶导函数[可选]
 * @return 计算出的根
 */
function fzero(f, xa, xb, tol, x0=null, df=null) {
	if(typeof xa != "number" || typeof xb != "number" || typeof tol != "number") {
		throw new Error("Please check the arguments in fzero.");
	}
	let y0, x1, y1;
	let res;

	if (xa > xb) {
		let tmp = xa;
		xa = xb;
		xb = tmp;
	}
	
	let ya = f(xa);
	if (Math.abs(ya) < tol) {
		res = xa;
		return res;
	}
	
	let yb = f(xb);
	if (Math.abs(yb) < tol) {
		res = xb;
		return res;
	}
	// If ya and yb have opposite sign, we can use brent method
	if ((ya < 0.0 && yb > 0.0) || (ya > 0.0 && yb < 0.0)) {
		return brent(f, xa, xb, tol);
	}

	// Now we shoud use the newton method or secant method.
	// So we have to get the initial value of x0 (and x1) in necessary.
	if (x0 == null || typeof x0 !="number") {
		let dh = 1.0e-1 * (xb - xa);
		x0 = xa;
		y0 = f(x0);
		x1 = x0 + dh;
		y1 = f(x1);
		while (x1 < xb) {
			if (Math.abs(y0) > Math.abs(y1)) {
				x0 = x1;
				y0 = y1;
			}
			x1 += dh;
			y1 = f(x1);
		}
		if (Math.abs(y0) > Math.abs(yb)) {
			x0 = xb;
		}
	}

	// Newton
	if (df != null) {
		return newton(f, df, x0, tol);
	} else {
		let dh = 1.0e-4 * (xb - xa);
		if (x0-dh < xa) {
			x1 = x0 + dh;
		} else if (x0+dh > xb) {
			x1 = x0 - dh;
		} else {
			let m = x0 - dh;
			let p = x0 + dh;
			if (Math.abs(f(m)) < Math.abs(f(p))) {
				x1 = m;
			} else {
				x1 = p;
			}
		}
		return secant(f, x0, x1, tol);
	}
}

export {fzero};