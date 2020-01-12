'use strict';
var gMap;
var gMarkers = [];






function initialize() {
    var pos = getDefaultLocation();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: pos
    });
    gMap = map;

    var firstLoc = createDefaultLocation(gMap);

    createLocations(firstLoc);
    addMarkerToLocs();
    onClicklMap();
    renderLocations();
}

function onClicklMap() {
    google.maps.event.addListener(gMap, 'click', function (event) {
        var locationName = prompt('Please enter place name');
        if(!locationName) return;
        createNewLocation(locationName,event.latLng);
        addMarker(event.latLng, gMap, locationName);
        renderLocations();
    });

}

function addMarkerToLocs() {
    var locations = getLocations();

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i].latLngFunc;
        var locationName = locations[i].name;
        addMarker(location, gMap, locationName);
    }
}

// Adds a marker to the map.
function addMarker(location, map, locationName) {
    var marker = new google.maps.Marker({
        position: location,
        label: '✭',
        map: map
    });
    gMarkers.unshift({ name: locationName, marker: marker });    
}


function removeMarker(locationName) {    
    var removeIdx = gMarkers.findIndex(function (location) {
        return location.name === locationName
    })    
    var removeMarker = gMarkers[removeIdx].marker;    
    removeMarker.setMap(null);
    gMarkers.splice(removeIdx, 1);

}

function centerUserMap() {
    var infoWindow;
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            gMap.setCenter(pos);
            addMarker(pos, gMap , 'My location');
            createNewLocation('My location',gMap.center);
            renderLocations();
    
        }, function () {
            handleLocationError(true, infoWindow, gMap.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, gMap.getCenter());
    }
}

function createNewLocation(locationName,latLng){
    var place = {
            name: locationName,
            latLngFunc: latLng,
            id: getNxtId()
    }
    addNewLocation(place);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function renderLocations() {
    updateCurrPage(0);
    var locations = getLocations();
    var strHTML = '';
    for (var i = 0; i < locations.length; i++) {
        strHTML += `<tr data-set="${locations[i].id}"><td class="pointer" onclick="jumpToPlace('${locations[i].name}')">${locations[i].name}</td><td><button onclick="onRemoveLocation('${locations[i].name}')">x</button></td></tr>`;
    }
    var elUl = document.querySelector('tbody');
    elUl.innerHTML = strHTML;
    renderPageBtn();
}

function onRemoveLocation(locationName) {
    removeLocation(locationName);
    removeMarker(locationName);
    renderLocations();
}


function jumpToPlace(placeName) {
    var pos = getLocationByName(placeName);
    var posLatLng = pos.latLngFunc;
    gMap.setCenter(posLatLng);
    gMap.setZoom(14);
}


function pagePlaces(pageNum) {
    updateCurrPage(pageNum);
    renderLocations();
}


function renderPageBtn() {
    var elBtn = document.querySelector('.page-btn');
    var lengthLoc = getLocationsLength();
    if (lengthLoc >= 7) {
        elBtn.style.visibility = 'visible';
    }
    else {
        elBtn.style.visibility = 'hidden';
    }
}