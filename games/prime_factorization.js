document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let challengeNum = parseInt(urlParams.get("pfc")) || 1;
    if(challengeNum < 1) { challengeNum = 1; }
    loadChallenge(challengeNum);

    document.getElementById("form").addEventListener("submit", function(e) {
        e.preventDefault();
        clearTimeout(this.timeout);
        const userFactors = Array.from(document.querySelectorAll("input[name^='num_']")).map(input => BigInt(input.value));
        const infoTag = document.getElementById("info");
        const checkButton = document.getElementById("check");

        if(isCorrect(challengeNum, userFactors)) {
            infoTag.textContent = "You've entered the correct prime factors!";
            checkButton.textContent = "Next Challenge";
            checkButton.addEventListener("click", function() {
                window.location.href = "prime_factorization.html?pfc=" + (challengeNum + 1);
            });
        } else {
            infoTag.textContent = "Incorrect";
            this.timeout = setTimeout(function() {
                infoTag.textContent = "";
            }, 2000);
        }
    });
});

function getChallengeFactor(challengeNum) {
    // PFC              1   2    3     4       5            6                      7                                         8                                                                               9                                                                                                                                                             10
    const challenges = [6n, 15n, 209n, 47077n, 3832343173n, 17552345699985880033n, 256232121352508651574907120496388278077n, 72766680183024192465551369814503150458222546558848234704938355713516940651863n, 13262731672193470448780743325116019772665759576677515727776495411548264009269567519093017716292704006107273878603003884176732333443602033741369100389077969n, 177748032774801049585813473454166233071051448786439105050809775265897180903587657707756703802010134801630073272729474294819018958041341379185938040845501926277999444830108102681113086699429661248929923879796503681050387479856199883807402036809137931961857422522125145687912211390489700910809760655629875782613n];
    return challenges[challengeNum - 1] || 0n;
}

function isCorrect(challengeNum, userFactors) {
    const factor = getChallengeFactor(challengeNum);
    var product = 1n;
    for(i in userFactors) {
        const userFactor = userFactors[i];
        if(userFactor === factor || userFactor <= 1n) {
            return false;
        } else {
            product *= userFactor;
        }
    }
    return factor === product;
}

function loadChallenge(challengeNum) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    document.getElementById("challenge_num").textContent = zeroPad(challengeNum, 2);
    document.getElementById("factor_text").textContent = getChallengeFactor(challengeNum) == 0n ? "Congratulations on completing all of the challenges, unless you skipped ahead" : "Find the prime factors of " + getChallengeFactor(challengeNum);
}
