function getHistory() {
    theUrl = "https://script.google.com/macros/s/AKfycbzMscVnvXNBOjP-99B6MRTTm8Wy1wWW6y2eygJvQnvQIwIVGYU/exec"
    // if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    // }
    // else { // code for IE6, IE5
    //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            // Something...
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    postMessage(xmlhttp.responseText);
    getHistory();
}

getHistory();
