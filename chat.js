var $form = $('form#frm'),
    url = 'https://script.google.com/macros/s/AKfycbz3Yrr44xbSHjfpBE-BPXvm7-EMuo-yPcWPz54iA7tSBHiVhag/exec'

$(document).on('click', '#submit-form', function(e) {
    var data = 'Message=' + document.getElementById("frm").elements[0].value;
    if (document.getElementById("frm").elements[0].value == '') {return;}
    document.getElementById("status").innerHTML = "Sending...";
    document.getElementById("frm").elements[0].value = "";
    e.preventDefault();
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data, //$form.serializeObject(),
        success: function() {
            document.getElementById("status").innerHTML = "Sent!";
            setTimeout("sentTimedOut()", 1000);
        }
    })
})

function sentTimedOut() {
    document.getElementById("status").innerHTML = "";
}


var w;

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("chat-worker.js");
        }
        w.onmessage = function(event) {
            console.log("got data")
            document.getElementById("history").innerHTML = event.data;
        };
    } else {
        document.getElementById("history").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

window.onload = startWorker();
