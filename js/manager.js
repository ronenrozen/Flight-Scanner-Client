// if (localStorage.role !== 'MANAGER') {
//   window.location.href = ('./index.html');
// }


const airportSubmit = document
  .getElementById("submitAirport")
  .addEventListener("click", e => {
    e.preventDefault();
    resetNotifactions();
    const apName = document.getElementById("apName");
    const locationx = document.getElementById("locationx");
    const locationy = document.getElementById("locationy");
    const country = document.getElementById("country");
    const type = "Airport";
    const apCode = document.getElementById("apCode");
    const managerSmartspace = localStorage.smartspace;
    const managerEmail = localStorage.email;
    const url = `http://localhost:9052/smartspace/elements/${managerSmartspace}/${managerEmail}`;
    let isEmpty = checkFieldsAirport(
      apName,
      apCode,
      locationx,
      locationy,
      country
    );
    if (!isEmpty) {
      let data = {
        key: null,
        elementType: type,
        name: apName.value,
        expired: "false",
        created: null,
        creator: {
          email: localStorage.email,
          smartspace: localStorage.smartspace
        },
        latlng: {
          lat: locationy.value,
          lng: locationx.value
        },
        elementProperties: {
          country: country.value,
          code: apCode.value
        }
      };

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
            document.getElementById("msgAirportError").style.display = 'block';
            throw Error(
              "The error code: " + response.status + response.statusText
            );
          }
          return response;
        })
        .then(res => res.json())
        .then(function (response) {
          document.getElementById("msgAirport").style.display = 'block';
          console.log("Success:", JSON.stringify(response));
        })
        .catch(error => {
          document.getElementById("msgAirportError").style.display = 'block';
          console.log("Error:", error);
        });
    } else document.getElementById("emptyAirport").style.display = "block";
  });

const routeSubmit = document
  .getElementById("submitRoute")
  .addEventListener("click", e => {
    e.preventDefault();
    resetNotifactions();
    const routeName = document.getElementById("rName");
    const locationxRouteOrigin = document.getElementById("locationxRouteOrigin");
    const locationyRouteOrigin = document.getElementById("locationyRouteOrigin");
    const locationxRouteDestination = document.getElementById("locationxRouteDestination");
    const locationyRouteDestination = document.getElementById("locationyRouteDestination");
    const type = "route";
    const managerSmartspace = localStorage.smartspace;
    const managerEmail = localStorage.email;
    const url = `http://localhost:9052/smartspace/elements/${managerSmartspace}/${managerEmail}`;
    let isEmpty = checkFieldsRoute(routeName, locationxRouteOrigin, locationyRouteOrigin, locationxRouteDestination, locationyRouteDestination);
    if (!isEmpty) {
      let data = {
        key: null,
        elementType: type,
        name: routeName.value,
        expired: "false",
        created: null,
        creator: {
          email: localStorage.email,
          smartspace: localStorage.smartspace
        },
        latlng: {
          lat: null,
          lng: null
        },
        elementProperties: {
          origLocl: {
            x: locationxRouteOrigin.value,
            y: locationyRouteOrigin.value
          },
          destLoc: {
            x: locationxRouteDestination.value,
            y: locationyRouteDestination.value
          }
        }
      };

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
            document.getElementById("msgRouteError").style.display = 'block';
            throw Error("The error code: " + response.status + response.statusText);
          }
          return response;
        })
        .then(res => res.json())
        .then(function (response) {
          document.getElementById("msgRoute").style.display = 'block';
          console.log("Success:", JSON.stringify(response));
        })
        .catch(error => {
          document.getElementById("msgRouteError").style.display = 'block';
          console.log("Error:", error);
        });
    } else document.getElementById("emptyRoute").style.display = "block";
  });

const currencySubmit = document
  .getElementById("submitCurrency")
  .addEventListener("click", e => {
    e.preventDefault();
    resetNotifactions();
    const currencyName = document.getElementById("currencyName");
    const currencyCode = document.getElementById("currencyCode");
    const currencySign = document.getElementById("currencySign");
    const type = "currency";
    const managerSmartspace = localStorage.smartspace;
    const managerEmail = localStorage.email;
    const url = `http://localhost:9052/smartspace/elements/${managerSmartspace}/${managerEmail}`;
    let isEmpty = checkFieldsCurrency(currencyName, currencyCode, currencySign);
    if (!isEmpty) {
      let data = {
        key: null,
        elementType: type,
        name: currencyName.value,
        expired: "false",
        created: null,
        creator: {
          email: localStorage.email,
          smartspace: localStorage.smartspace
        },
        latlng: {
          lat: null,
          lng: null
        },
        elementProperties: {
          code: currencyCode.value,
          sign: currencySign.value
        }
      };

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
            document.getElementById("msgCurrencyError").style.display = 'block';
            throw Error("The error code: " + response.status + response.statusText);
          }
          return response;
        })
        .then(res => res.json())
        .then(function (response) {
          document.getElementById("msgCurrency").style.display='block';
          console.log("Success:", JSON.stringify(response));
        })
        .catch(error => {
          document.getElementById("msgCurrencyError").style.display='block';
          console.log("Error:", error);
        });
    } else document.getElementById("emptyCurrency").style.display = "block";
  });
function checkFieldsAirport(apName, apCode, locationx, locationy, country) {
  if (apName.value === "") return true;
  if (apCode.value === "") return true;
  if (country.value === "") return true;
  if (locationx.value === "") return true;
  if (locationy.value === "") return true;

  return false;
}

function checkFieldsRoute(origin, destination) {
  if (origin.value === "") return true;
  if (destination.value === "") return true;

  return false;
}

function checkFieldsCurrency(currencyName, currencyCode, currencySign) {
  if (currencyName.value === "") return true;
  if (currencyCode.value === "") return true;
  if (currencySign.value === "") return true;

  return false;
}

function resetNotifactions() {
  document.getElementById("emptyAirport").style.display = "none";
  document.getElementById("emptyRoute").style.display = "none";
  document.getElementById("emptyCurrency").style.display = "none";
  document.getElementById("msgAirportError").style.display = "none";
  document.getElementById("msgCurrencyError").style.display = "none";
  document.getElementById("msgRouteError").style.display = "none";
  document.getElementById("msgAirport").style.display = "none";
  document.getElementById("msgCurrency").style.display = "none";
  document.getElementById("msgRoute").style.display = "none";
}
