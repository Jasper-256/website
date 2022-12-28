function updatePop() {
    var today = new Date();
    var epoch = 1640995200000; // 2022-01-01
    var popAtEpoch = 7941658000;

    popGrowthOverYear = 66894000;

    var growthRateListed = 0.0084;
    var growthRateExact = 0.008423178132;
    var growthRate = growthRateExact;


    var timeAfterEpoch = today.getTime() - epoch;
    var timeAfterEpochYears = timeAfterEpoch / (365 * 24 * 60 * 60 * 1000); // change days in year on leap years (2024, 2028...)

    var currentPopLinear = popAtEpoch + (timeAfterEpochYears * popGrowthOverYear);
    var currentPopExp = popAtEpoch * Math.pow(1 + growthRate, timeAfterEpochYears);
    
    var currentPopRounded = Math.round(currentPopLinear);
    var currentPopFormatted = currentPopRounded.toLocaleString();

    document.getElementById("population").innerHTML = currentPopFormatted;
}

window.onload = updatePop;
window.setInterval(updatePop, 1);
