function setLight() {
    document.body.style.backgroundColor = "white";
    var cols = document.getElementsByTagName("BODY");
    for(i = 0; i < cols.length; i++) {
        cols[i].style.color = "black";
    }
}

function setDark() {
    document.body.style.backgroundColor = "#1a1a1a";
    var cols = document.getElementsByTagName("BODY");
    for(i = 0; i < cols.length; i++) {
        cols[i].style.color = "white";
    }
}

function darkCheck() {
    var checkBox = document.getElementById("check");

    if(checkBox.checked == true) {
        setDark();

        localStorage.setItem("dark", true);
    } else {
        setLight();

        localStorage.setItem("dark", false);
    }
}

function restoreDark() {
    var checkBox = document.getElementById("check");

    if(localStorage.getItem("dark") == "true") {
        setDark()
        checkBox.checked = true;
    } else {
        setLight()
        checkBox.checked = false;
    }
}

restoreDark();

// console.log(localStorage.getItem("dark"));
