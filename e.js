function factorial(input) {
    let fac = 1;
    for (upToF = 1; upToF <= input; upToF++) {
        fac = fac * upToF;
    }
    return fac;
}

function calculateE() {
    let e = 0;
    let iteration = 0;
    while (iteration < 42) {
        e += 1 / factorial(iteration);
        console.log(e);
        iteration++;
        document.getElementById("e").innerHTML = e.toFixed(20);
    }
}

calculateE();
