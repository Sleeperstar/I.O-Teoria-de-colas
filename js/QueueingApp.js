//Utilidades
function clearAll() {
    location.reload();
}

//App

function factorial(n) {
    var total = 1;
    for (var i = 1; i <= n; i++) {
        total *= i;
    }
    return total;
}

function calcInvLambda(lambda) {
    var invLambda = 1 / lambda * 60;
    return 1 / lambda * 60;
}

function calcInvMu(mu) {
    return 1 / mu * 60;
}

function calcRho(lambda, mu) {
    return lambda / mu;
}

function calcP0(denom) {
    return 1 / denom;
}

function calcLq(rho, s, p0) {
    return ((Math.pow(rho, (s + 1))) / (factorial(s - 1) * Math.pow(s - rho, 2))) * p0;
}

function calcLs(rho, lq) {
    return lq + rho;
}

function calcWs(ls, lambda) {
    return ls / lambda;
}

function calcWq(lq, lambda) {
    return lq / lambda;
}

function calcSps(rho, s) {
    return (Math.pow(rho, s)) / factorial(s);
}

function calcPS(lambda, s, mu) {
    return 1 / (1 - (lambda / s * mu));
}

function iteration(lambda, mu, i) {
    return ((Math.pow(calcRho(lambda, mu), i)) / factorial(i));
}

function appendElement(content, id) {
    var header = document.createElement("td");
    var text = document.createTextNode(content);
    header.appendChild(text);
    var element = document.getElementById(id);
    element.appendChild(header);
}

function tabla(lambda, mu, s) {
    var denom = 0,
        it = 0,
        rho = calcRho(lambda, mu);
    for (var i = 0; i < s; i++) {
        it = iteration(lambda, mu, i);
        denom += it;
        appendElement(i, "tableHeader");
        appendElement(parseFloat(it).toFixed(8), "firstRow");
    }
    denom = denom + ((Math.pow(rho, s)) / factorial(s)) * (1 / (1 - (rho / s)));
    return denom;
}

function modifyDocument() {
    var button = document.getElementById("buttonAnalizar");
    button.style.display = "none";
    var input = document.getElementById("lambda");
    input.disabled = true;
    input = document.getElementById("mu");
    input.disabled = true;
    input = document.getElementById("s");
    input.disabled = true;
}

function timing(n, m = 0) {
    var hours = Math.floor(n / 1);
    n = n - hours;
    var minutesR = parseInt(n * 100) / 100;
    var minutes = minutesR * 60;
    n = n - minutesR;
    n = n.toFixed(4);
    var seconds = n * 6000;
    return m == 0 ? hours + "h :" + minutes.toFixed(0) + "m : " + seconds.toFixed(0) + " s" : "0 :" + hours + ": " + minutes.toFixed(0);
}

function toPercent(n) {
    return (n * 100).toFixed(2) + "%";
}

function QueueingApp() {
    modifyDocument();
    var lambda = 0,
        mu = 0,
        s = 0,
        invLambda = 0,
        invMu = 0,
        rho = 0,
        denom = 0,
        p0 = 0,
        lq = 0,
        ls = 0,
        ws = 0,
        wq = 0,
        sps = 0,
        ps = 0;
    /*Input */
    lambda = parseFloat(document.getElementById("lambda").value);
    mu = parseFloat(document.getElementById("mu").value);
    s = parseFloat(document.getElementById("s").value);
    /*OutPut */
    invLambda = calcInvLambda(lambda);
    invMu = calcInvMu(mu);
    rho = calcRho(lambda, mu);
    denom = tabla(lambda, mu, s);
    p0 = calcP0(denom);
    lq = calcLq(rho, s, p0);
    ls = calcLs(lq, rho);
    ws = calcWs(ls, lambda);
    wq = calcWq(lq, lambda);
    sps = calcSps(rho, s);
    ps = calcPS(lambda, s, mu);
    document.getElementById("invLambda").innerHTML = invLambda;
    document.getElementById("invMu").innerHTML = invMu;
    document.getElementById("rho").innerHTML = rho;
    document.getElementById("sumatoria").innerHTML = denom;
    document.getElementById("p0").innerHTML = p0;
    document.getElementById("lq").innerHTML = lq;
    document.getElementById("ls").innerHTML = ls;
    document.getElementById("ws").innerHTML = ws;
    document.getElementById("wq").innerHTML = wq;
    document.getElementById("wMin").innerHTML = ws * 60;
    document.getElementById("sps").innerHTML = sps;
    document.getElementById("ps").innerHTML = ps;
    document.getElementById("p0t").innerHTML = p0;
    document.getElementById("lambdaIn").innerHTML = lambda;
    document.getElementById("invLambdaIn").innerHTML = timing(1 / lambda);
    document.getElementById("muIn").innerHTML = mu;
    document.getElementById("invMuIn").innerHTML = timing(1 / mu);
    document.getElementById("sIn").innerHTML = s;
    document.getElementById("rhoIn").innerHTML = timing(rho);
    document.getElementById("p0In").innerHTML = toPercent(p0);
    document.getElementById("lqIn").innerHTML = lq;
    document.getElementById("lsIn").innerHTML = ls;
    document.getElementById("wqIn").innerHTML = wq;
    document.getElementById("wsIn").innerHTML = timing(ws);
}