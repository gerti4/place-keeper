'use strict'


function renderUserPref() {
    var prefs = getUserData();
    document.querySelector('input[name="txt"]').value = prefs.txt;
    document.querySelector('input[name="background"]').value = prefs.background;
    document.querySelector('input[name="backgroundHeader"]').value = prefs.backgroundHeader;
}

function showAge(newVal) {
    document.getElementById("sAge").innerHTML = newVal;
}



function onSubmit() {
    var els = document.querySelectorAll('input');
    var isValidData = true;
    var data = {}
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.required) {
            if (!el.value) {
                el.style.boxShadow = '0px 2px #ff2819';
                isValidData = false;
            }
            else{
                el.style.boxShadow = 'none';
            }
        }
        data[el.name] = el.value;
    }
    if(!isValidData) return;
    updateUserData(data);
}

