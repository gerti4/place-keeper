'use strict'

const PREF_KEY = 'pref';
var gUserData;



createUserPref();

function defaultData(){
    return{
        background: '#C0C0C0',
        backgroundHeader: '#bc7272',
        txt: '#202020',
        data:'2012-1-1',
        time: '01:00',
        email:'',
        age: 18
    }
}

function createUserPref(){
    var prefs = loadPrefFromStorage(PREF_KEY);
    if(!prefs || prefs.length === 0){
        prefs = defaultData();
    }
    gUserData = prefs;
    savePrefToLocalStorage(PREF_KEY,gUserData);
}

function getUserData(){
    return gUserData;
}


function updateUserData(data){
    gUserData = data;
    savePrefToLocalStorage(PREF_KEY,gUserData);
}

function loadPrefFromStorage(PREF_KEY){
    var str = localStorage.getItem(PREF_KEY);
    var value = JSON.parse(str);
    return value;
}

function savePrefToLocalStorage(PREF_KEY,gUserPref){
    localStorage.setItem(PREF_KEY,JSON.stringify(gUserPref));
}