// From https://gist.github.com/bellbind/7ce0a9364d3d43f231b5
// Downloaded 12 Dec 2019

// Complex type
var Complex = function (real, imag) {
    if (real instanceof Complex) return real;
    imag = imag || 0;
    return Object.freeze(Object.create(Complex.prototype, {
        real: {value: real, enumerable: true},
        imag: {value: imag, enumerable: true},
    }));
};
Complex.fromPolar = function (r, theta) {
    return Complex(r * Math.cos(theta), r * Math.sin(theta));
};
Complex.eq = function (aa, bb) {
    let a = Complex(aa), b = Complex(bb);
    return a.real === b.real && a.imag === b.imag;
};
Complex.prototype.r = Complex.prototype.abs = function () {
    return Math.sqrt(this.norm());
};
Complex.prototype.theta = Complex.prototype.arg = function () {
    return Math.atan2(this.imag, this.real);
};
Complex.prototype.add = function (b) {
    b = Complex(b);
    return Complex(this.real + b.real, this.imag + b.imag);
};
Complex.prototype.sub = function (b) {
    b = Complex(b);
    return Complex(this.real - b.real, this.imag - b.imag);
};
Complex.prototype.mul = function (b) {
    b = Complex(b);
    var real = this.real * b.real - this.imag * b.imag;
    var imag = this.real * b.imag + this.imag * b.real;
    return Complex(real, imag);
};
Complex.prototype.neg = function () {
    return Complex(-this.real, -this.imag);
};
Complex.prototype.conj = function () {
    return Complex(this.real, -this.imag);
};
Complex.prototype.norm = function () {
    return this.real * this.real + this.imag * this.imag;
};
Complex.prototype.inv = function () {
    var base = this.norm();
    return Complex(this.real / base, -this.imag / base);
};
Complex.prototype.div = function (b) {
    b = Complex(b);
    var base = b.norm();
    var c = this.mul(b.conj());
    return Complex(c.real / base, c.imag / base);
};
Complex.prototype.pow = function (b) {
    b = Complex(b);
    var r = this.r(), theta = this.theta();
    var abs = Math.pow(r, b.real) * Math.exp(-b.imag * theta);
    var arg = b.imag * Math.log(r) + b.real * theta;
    return Complex.fromPolar(abs, arg);
};
Complex.prototype.exp = function () {
    return Complex.fromPolar(Math.exp(this.real), this.imag);
};
Complex.prototype.log = function (n) {
    n = n || 0;
    return Complex(Math.log(this.r()), this.theta() + 2 * n * Math.PI);
};
Complex.prototype.proj = function () {
    if (this.real === Infinity || this.real === -Infinity ||
        this.imag === Infinity || this.imag === -Infinity) return Complex.inf;
    return this;
};
Complex.c0 = Complex(0);
Complex.c1 = Complex(1);
Complex.c2 = Complex(2);
Complex.i = Complex.c1i = Complex(0, 1);
Complex.inf = Complex(Infinity);


// util
var range = function (start, end) {
    var l = end - start;
    var a = new Array(l);
    for (var i = 0; i < l; i++) a[i] = start + i;
    return a;
};
var csum = function (a) {
    var r = Complex.c0;
    for (var i = 0, l = a.length; i < l; i++) r = r.add(a[i]);
    return r;
};
var binom = function (n, k) {
    k = n - k < k ? n - k : k; // use shorter side for loop
    // use add with array for avoiding overflow by mul n*(n-1)
    //   e.g. 3C2: 1 0 0 => 1 1 0 => 1 2 1  => 1 3 3  <= result
    var a = new Array(k + 1);
    a[0] = 1;
    for (var i = 1; i <= k; i++) a[i] = 0;
    for (var ii = 0; ii < n; ii++) {
        for (var j = k; j >= 1; j--) a[j] += a[j - 1];
    }
    return a[k];
};
//console.log(binom(10, 7));
var sign = function (k) {
    return (k % 2) ? -1 : 1;
};


// Riemann zeta function simple implementations
// python3 version: https://gist.github.com/bellbind/529d283407e707ef3a52
var zeta1 = function (s, t) {
    t = t || 10000;
    // zeta(s) = S(n=1..inf| 1/n^s)
    // (Re[s] > 1)
    var sn = Complex(s).neg();
    return csum(range(1, t).map(function (n) {
        return Complex(n).pow(sn);
    }));
};
//console.log(Math.sqrt(zeta1(2).real * 6)); // => PI = 3.1415...

var zeta2 = function (s, t) {
    t = t || 10000;
    s = Complex(s);
    if (Complex.eq(s, Complex.c1)) return Complex.inf;
    // zeta(s) = 1/(2^(1-s) - 1) * S(n=1..inf| -1^n / n^s)
    // (Re[s] > 0, s != 1)
    var sn = s.neg();
    return csum(range(1, t).map(function (n) {
        return Complex(n).pow(sn).mul(sign(n));
    })).div(Complex.c2.pow(Complex.c1.sub(s)).sub(1));
};  
//console.log(Math.sqrt(zeta2(2).real * 6));
//console.log(zeta2(Complex(0.5, 14.134725142)).abs()); // => 0

var zeta3 = function (s, t) {
    t = t || 100;
    s = Complex(s);
    if (Complex.eq(s, Complex.c1)) return Complex.inf;
    // zeta(s) = 1/(1 - 2^(1-s)) * 
    //           S(n=1..inf| 1/2^(n+1) * S(k=0..n| -1^k * C(n,k) / (k+1)^s))
    // (s != 1)
    var sn = s.neg(), two = Complex.c2;
    
    return csum(range(0, t).map(function (n) {
        return csum(range(0, n + 1).map(function (k) {
            return Complex(k + 1).pow(sn).mul(sign(k) * binom(n, k));
        })).div(two.pow(n + 1));
    })).div(two.pow(sn.add(1)).neg().add(1));
};

export { zeta3, Complex }

/*
console.log(Math.sqrt(zeta3(2).real * 6));
console.log(zeta3(Complex(0.5, 14.134725142)).abs());
console.log(zeta3(1).real);  // => inf
console.log(zeta3(0).real);  // => -1/2
console.log(zeta3(-1).real); // => -1/12
console.log(zeta3(-2).real); // => 0
*/