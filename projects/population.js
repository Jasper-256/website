function updatePop() {
    var today = new Date();
    var epoch = 1672531200000; // 2023-01-01
    var popAtEpoch = 8008551995;
    var popGrowthOverYear = 73518905;
    // var growthRateListed = 0.0084;
    // var growthRateExact = 0.008423178132;
    // var growthRate = growthRateExact;

    var timeAfterEpoch = today.getTime() - epoch;
    var timeAfterEpochYears = timeAfterEpoch / (365 * 24 * 60 * 60 * 1000); // change days in year on leap years (2024, 2028...)

    var currentPopLinear = popAtEpoch + (timeAfterEpochYears * popGrowthOverYear);
    // var currentPopExp = popAtEpoch * Math.pow(1 + growthRate, timeAfterEpochYears);
    
    var currentPopRounded = Math.round(currentPopLinear);
    var currentPopFormatted = currentPopRounded.toLocaleString();

    document.getElementById("population").innerHTML = currentPopFormatted;
}

window.onload = updatePop;
window.setInterval(updatePop, 1);
