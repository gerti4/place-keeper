'use strict'

const MAX_LOCATIONS = 6;
const LOCATION_KEY = 'locations';
const ID_KEY = 'id';
var gLocations;
var gCurrPage = 0;
const DEFAULT_LOCATION = {
    name: 'Eilat',
    lat: 29.557669,
    lng: 34.951923
};
var gNextId = (!loadFromLocalStorage(ID_KEY))? 100:loadFromLocalStorage(ID_KEY);


function getLocationByName(name) {
    var location = gLocations.find(function (location) {
        return location.name === name;
    })
    return location;

}



function createLocations(firstLoc) {
    var locations = loadFromLocalStorage(LOCATION_KEY);
    if (locations && locations.length > 0) {
        gLocations = locations;
    }
    else {
        gLocations = [];
        gLocations.unshift(firstLoc);
    }
    saveLocToLocalStorage(LOCATION_KEY, gLocations);
}

function getNxtId() {
    gNextId++;
    saveToLocalStorage(ID_KEY,gNextId);
    return gNextId;
}


function createDefaultLocation(gMap) {
    var firstLoc = {};
    firstLoc['name'] = 'Eilat';
    firstLoc['latLngFunc'] = gMap.center;
    firstLoc['id'] = getNxtId();
    return firstLoc;
}



function addNewLocation(newLocation) {
    gLocations.unshift(newLocation);
    saveLocToLocalStorage(LOCATION_KEY, gLocations);
}

function removeLocation(locationName) {
    var placeIdx = gLocations.findIndex(function (location) {
        return location.name === locationName;
    })
    if (placeIdx === -1) return;
    gLocations.splice(placeIdx, 1);
    saveLocToLocalStorage(LOCATION_KEY, gLocations);
}



function getDefaultLocation() {
    return DEFAULT_LOCATION;
}


function getLocations() {
    return gLocations.slice(gCurrPage * MAX_LOCATIONS, MAX_LOCATIONS * (gCurrPage + 1));
}


function updateCurrPage(pageNum) {
    if (gCurrPage + pageNum >= gLocations.length / 6) {        
        gCurrPage = 0;
    }
    else {        
        gCurrPage += pageNum;
    }
}

function getLocationsLength(){
    return gLocations.length
}


function saveToLocalStorage(KEY,value){
    localStorage.setItem(KEY, JSON.stringify(value));
}

function saveToLocalStorage(KEY){
    var str = localStorage.getItem(KEY);
    var value = JSON.parse(str);
    return value;
}


function saveLocToLocalStorage(LOCATION_KEY, gLocations) {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(gLocations));
}

function loadFromLocalStorage(LOCATION_KEY) {
    var str = localStorage.getItem(LOCATION_KEY);
    var value = JSON.parse(str);
    return value;
}