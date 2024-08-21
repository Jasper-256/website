function updatePop() {
    var today = new Date();
    var epoch = 1704067200000; // 2024-01-01
    var popAtEpoch = 8082070900;
    var popGrowthOverYear = 73530199;

    var timeAfterEpoch = today.getTime() - epoch;
    var timeAfterEpochFraction = timeAfterEpoch / (366 * 24 * 60 * 60 * 1000); // Fraction of time to 2025-01-01 (2024 is a leap year)

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
