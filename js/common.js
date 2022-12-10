'use strict';

var currentDate = new Date();
var currentYear = currentDate.getFullYear();
document.querySelector("#displayYear").innerHTML = currentYear;
document.querySelector(".search_form").action = 'http://' + window.location.host + '/search';

document.getElementById("str_q").addEventListener("keyup", function() {
    var q = document.getElementById('str_q').value;
    if (q != "") {
        document.getElementById('send').removeAttribute("disabled");
    } else {
        document.getElementById('send').setAttribute("disabled", null);
    }
});



