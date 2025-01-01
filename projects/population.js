function updatePop() {
    var today = new Date();
    var epoch = 1735689600000; // 2025-01-01T00:00:00.000Z
    var popAtEpoch = 8196980849;
    var popGrowthOverYear = 69264442;

    var timeAfterEpoch = today.getTime() - epoch;
    var timeAfterEpochFraction = timeAfterEpoch / (365 * 24 * 60 * 60 * 1000); // Fraction of time to next year (2025 is NOT a leap year)

    var currentPopLinear = popAtEpoch + (timeAfterEpochFraction * popGrowthOverYear);
    
    var currentPopRounded = Math.round(currentPopLinear);
    var currentPopFormatted = currentPopRounded.toLocaleString();

    var fileName = window.location.pathname.split("/").pop();

    if(fileName == "population-raw.html") {
        document.getElementById("population").innerHTML = currentPopRounded;
    } else {
        document.getElementById("population").innerHTML = currentPopFormatted;
    }
}

window.onload = updatePop;
window.setInterval(updatePop, 1);
