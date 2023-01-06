function updatePop() {
    var today = new Date();
    var epoch = 1672531200000; // 2023-01-01
    var popAtEpoch = 8008551995;
    var popGrowthOverHalfYear = 36759452;
    // var growthRate = 0.008423178132;

    var timeAfterEpoch = today.getTime() - epoch;
    var timeAfterEpochFraction = timeAfterEpoch / (181 * 24 * 60 * 60 * 1000); // Fraction of time to 2023-07-01

    var currentPopLinear = popAtEpoch + (timeAfterEpochFraction * popGrowthOverHalfYear);
    // var currentPopExp = popAtEpoch * Math.pow(1 + growthRate, timeAfterEpochYears);
    
    var currentPopRounded = Math.round(currentPopLinear);
    var currentPopFormatted = currentPopRounded.toLocaleString();

    var fileName = window.location.pathname.split("/").pop();

    if(fileName == "population_raw.html") {
        document.getElementById("population").innerHTML = currentPopRounded;
    } else {
        document.getElementById("population").innerHTML = currentPopFormatted;
    }
}

window.onload = updatePop;
window.setInterval(updatePop, 1);
