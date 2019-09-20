var markers = [];
var map;
const userSmartspace = localStorage.smartspace;
const userEmail = localStorage.email;
const airportsURL = `http://localhost:9052/smartspace/elements/${userSmartspace}/${userEmail}?search=type&page=0&size=650&value=Airport`;
fetch(airportsURL, {
    method: "GET", // or 'PUT'
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors"
})
    .then(function (response) {
        if (!response.ok) {
            console.log("danger-Something went wrong...");

            throw Error("The error code: " + response.status + response.statusText);
        }
        return response;
    })
    .then(res => res.json())
    .then(function (responseObejcts) {
        responseObejcts.forEach(item => {
            addMarkerForAriport(
                item["latlng"]["lat"],
                item["latlng"]["lng"],
                item["name"],
                item["elementProperties"]["municipality"],
                item["elementProperties"]["iata_code"]
            );
        });
        console.log("Success import flights from DB");
    })
    .catch(error => console.log("Error:", error));

function initMap() {
    //Map options
    var options = {
        zoom: 6, //the zoom of the map when the site is loaded
        center: {
            lat: 32.0853,
            lng: 34.7818
        }, //tel aviv
        mapTypeId: "terrain"
    };

    map = new google.maps.Map(document.getElementById("map"), options);
    // var geocoder = new google.maps.Geocoder();

}

// function addMarkersForAllAirports() {
//     var len = arrayOfAirports.length;
//     for (var i = 0; i < len; i++) {
//         addMarkerForAriport(
//             arrayOfAirports[i][0],
//             arrayOfAirports[i][1],
//             arrayOfAirports[i][2],
//             arrayOfAirports[i][3]
//         );
//     }
// }


function addMarkerForAriport(lat, lng, airportName, cityName, iata_code) {
    var icon = {
        url: "http://maps.google.com/mapfiles/arrow.png",
        scaledSize: new google.maps.Size(20, 20) // scaled size
    };
    var myLatLng = {
        lat: lat,
        lng: lng
    };

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: icon
    });

    markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
        content: airportName
    });

    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });

    marker.addListener("click", function () {
        if (radioOrig.checked === true) {
            document.getElementById("locationxRouteOrigin").value = lat;
            document.getElementById("locationyRouteOrigin").value = lng;
            document.getElementById("rName").value = iata_code + "_";
        } else {
            document.getElementById("locationxRouteDestination").value = lat;
            document.getElementById("locationyRouteDestination").value = lng;
            document.getElementById("rName").value =  document.getElementById("rName").value + iata_code;

        }
    });
}

