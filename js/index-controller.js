

function renderUserPage(){
    var prefs = getUserData();
    document.body.style.color = prefs.txt;
    document.body.style.backgroundColor = prefs.background;     
    document.querySelector('header').style.backgroundColor = prefs.backgroundHeader;
}





