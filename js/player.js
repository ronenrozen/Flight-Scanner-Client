if (localStorage.role !== 'PLAYER') {
  window.location.href = ('./index.html');
}

href = window.location.href;
href = href.split('_').join(' ');
console.log('href -', href);
parmaters = href.split("?");
if (parmaters.length > 1) {
  parmaters = parmaters[1].split("&");
  parmaters.forEach(item => {
    it = item.split("=");
    if (it[0] !== undefined && document.getElementById(it[0]) != null) {
      document.getElementById(it[0]).value = it[1];
    }
  });
}
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
        item["elementProperties"]["municipality"]
      );
    });
    console.log("Success import flights from DB");
  })
  .catch(error => console.log("Error:", error));

//Bring currencies
const currencyArr = [];
const currURL = `http://localhost:9052/smartspace/elements/${userSmartspace}/${userEmail}?search=type&page=0&size=650&value=currency`;
fetch(currURL, {
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
      currencyArr.push(item["name"]);
    });
    let select = document.getElementById("selectCurrency");
    for (let i = 0; i < currencyArr.length; i++) {
      let opt = currencyArr[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
    console.log("Success import currencies from DB");
  })
  .catch(error => console.log("Error:", error));


var markers = [];
var map;

var radioOrig = document.getElementById("radioOrig");
var radioDest = document.getElementById("radioDest");
// var pickerDepart = new Pikaday(document.getElementById('datepickerDepart'));
// var pickerReturn = new Pikaday(document.getElementById('datepickerReturn'));
var pickerReturn = new Pikaday({
  field: document.getElementById("datepickerReturn")
});
var pickerDepart = new Pikaday({
  field: document.getElementById("datepickerDepart")
});

function initMap() {
  //Map options
  var options = {};

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6, //the zoom of the map when the site is loaded
    center: {
      lat: 32.0853,
      lng: 34.7818
    }, //tel aviv
    mapTypeId: "terrain"
  });
  var geocoder = new google.maps.Geocoder();

  // This event listener will call addMarker() when the map is clicked.
  // map.addListener("click", function(event) {
  //   addMarker(event.latLng);
  // });

  // addMarkersForAllAirports();

  // document.getElementById("submit").addEventListener("click", function() {
  //   geocodeAddress(geocoder, map);
  // });
}

function addMarkersForAllAirports() {
  var len = arrayOfAirports.length;
  for (var i = 0; i < len; i++) {
    addMarkerForAriport(
      arrayOfAirports[i][0],
      arrayOfAirports[i][1],
      arrayOfAirports[i][2],
      arrayOfAirports[i][3]
    );
  }
}

function addMarkerForAriport(lat, lng, airportName, cityName) {
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
      document.getElementById("latitudeInputOrig").value = lat;
      document.getElementById("longitudeInputOrig").value = lng;
      document.getElementById("cityOrig").value = cityName;
    } else {
      document.getElementById("latitudeInputDest").value = lat;
      document.getElementById("longitudeInputDest").value = lng;
      document.getElementById("cityDest").value = cityName;
    }
  });
}

function clearDetails() {
  document.getElementById("latitudeInputOrig").value = "";
  document.getElementById("longitudeInputOrig").value = "";
  document.getElementById("cityOrig").value = "";
  document.getElementById("latitudeInputDest").value = "";
  document.getElementById("longitudeInputDest").value = "";
  document.getElementById("cityDest").value = "";
  pickerDepart.setDate(null);
  pickerReturn.setDate(null);
}

// // Adds a marker to the map and push to the array.
// function addMarker(location) {
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map
//   });
//   document.getElementById("latitudeInput").value = location.lat();
//   document.getElementById("longitudeInput").value = location.lng();
//   markers.push(marker);
// }

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// // Deletes all markers in the array by removing references to them.
// function deleteMarkers() {
//   clearMarkers();
//   markers = [];
// }

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("address").value;
  var x = "";
  geocoder.geocode(
    {
      address: address
    },
    function (results, status) {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        markers.push(marker);

        document.getElementById("latitudeInput").value = results[0].geometry.location.lat();
        document.getElementById("longitudeInput").value = results[0].geometry.location.lng();
      } else {
        // alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}
let theButton1 = document.getElementById("showFlights");
const showFlights = document
  .getElementById("showFlights")
  .addEventListener("click", e => {
    e.preventDefault();
    const origLat = document.getElementById("latitudeInputOrig").value;
    const origLan = document.getElementById("longitudeInputOrig").value;
    const destLat = document.getElementById("latitudeInputDest").value;
    const destLan = document.getElementById("longitudeInputDest").value;
    const returnedDate = document.getElementById("datepickerReturn").value;
    const departDate = document.getElementById("datepickerDepart").value;
    const loader = document.getElementById("loaderWrapper");
    const map = document.getElementById("map");
    const curr = document.getElementById("selectCurrency").value;
    map.style.display = 'none';
    loader.style.display = 'flex';
    if (
      !isAllFieldsHasBeenFilled(
        origLat,
        origLan,
        destLat,
        destLan,
        returnedDate,
        departDate
      )
    ) {
      // alert("Please fill all the fields in order to get the flights");
      return;
    }

    let url = "http://localhost:9052/smartspace/actions";

    let data = {
      type: "FlightRequest",
      player: {
        smartspace: localStorage.smartspace,
        email: localStorage.email
      },
      properties: {
        origin: {
          lat: parseFloat(origLat),
          lng: parseFloat(origLan)
        },
        destination: {
          lat: parseFloat(destLat),
          lng: parseFloat(destLan)
        },
        departure_date: departDate,
        arrival_date: returnedDate,
        currency: curr
      }
    };
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(function (response) {
        if (!response.ok) {
          loader.style.display = 'none';
          map.style.display = 'block';
          throw Error(
            "The error code: " + response.status + response.statusText
          );
        }
        return response;
      })
      .then(res => res.json())
      .then(function (response) {
        localStorage.setItem("flightsJson", JSON.stringify(response));
        localStorage.setItem("flights", response);
        localStorage.setItem("origin", response.name.toLocaleLowerCase().substring(0, 3));
        localStorage.setItem("destination", response.name.toLocaleLowerCase().substring(4, 7));
        localStorage.setItem("minPrice", response.elementProperties.minPrice);
        localStorage.setItem("currency", curr);
        localStorage.setItem("currencySign",response.elementProperties.currency);
        localStorage.setItem("cityNameOrig", document.getElementById("cityOrig").value);
        localStorage.setItem("cityNameDest", document.getElementById("cityDest").value);
        localStorage.setItem("departDate", document.getElementById("datepickerDepart").value);
        localStorage.setItem("returnDate", document.getElementById("datepickerReturn").value);
        console.log("Success:", JSON.stringify(response));
        window.location.href = "./tickets.html";
      })
      .catch(error => {
        loader.style.display = 'none';
        map.style.display = 'block';
        console.log("Error:", error);
      });

    // window.location.href = "/tickets.html";
  });

function isAllFieldsHasBeenFilled(
  origLat,
  origLan,
  destLat,
  destLan,
  returnedDate,
  departDate
) {
  if (
    origLan === "" ||
    origLat === "" ||
    destLan === "" ||
    destLat === "" ||
    returnedDate === "" ||
    departDate === ""
  )
    return false;
  return true;
}
