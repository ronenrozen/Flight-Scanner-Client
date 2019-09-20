let ticketsContainer = document.getElementsByClassName("w3-container");

let flightsJson = localStorage.getItem("flightsJson");
let flightsObject = JSON.parse(flightsJson);

let cityNameOrig = localStorage.getItem("cityNameOrig");
let cityNameDest = localStorage.getItem("cityNameDest");
let departDate = localStorage.getItem("departDate");
let returnDate = localStorage.getItem("returnDate");

// /*Just for now!!!!*/
// let cityNameOrig = "Tel-Aviv";
// let cityNameDest = "Bangkok";
// let departDate = "07/10/2019";
// let returnDate = "08/11/2019";

let numberOfFlightTickets = flightsObject.elementProperties.flights.length;

if (document.getElementById("subscribeButton").disabled === true) {
  document.getElementById("subscribeButton").disabled = false;
}

let i = 0;
for (i = 0; i < numberOfFlightTickets; i++) {
  addFlightTicket(flightsObject.elementProperties.flights[i]);
}

function addFlightTicket(ticket) {
  let divWrapper = document.createElement("div");
  divWrapper.className = "w3-card-4 card-wrapper container";
  divWrapper.style.backgroundColor = "white";
  createTicketHeader(divWrapper, cityNameOrig + " - " + cityNameDest);

  let divSubContainer = document.createElement("div");
  divSubContainer.className = "w3-container";

  addDepartAndReturnText(divSubContainer, departDate, returnDate);

  let numOfOutFlights = ticket.outFlights.length;

  let outFlights = ticket.outFlights;

  let i;
  for (i = 0; i < numOfOutFlights; i++) {
    let stopOrNot = "";
    let stopOrDepartDiv = document.createElement("div");

    if (i !== numOfOutFlights - 1) {
      stopOrNot = "Connection Flight";
    }
    stopOrDepartDiv.className = "stopFlight";

    let fixedHourDepart = outFlights[i].departureDate.replace(".000+0000", " ");

    let fixedHourArrival = outFlights[i].arrivalDate
      .replace("T", " ")
      .replace(".000+0000", " ");

    handleFlightDetailsAndImage(
      divSubContainer,
      stopOrDepartDiv,
      outFlights[i].carrierImgUrl,
      fixedHourDepart,
      outFlights[i].origin,
      fixedHourArrival,
      outFlights[i].destination,
      stopOrNot,
      outFlights[i].duration
    );
  }

  let hrElem = document.createElement("hr");
  hrElem.className = "hrLine";

  divSubContainer.appendChild(hrElem);

  let numOfInFlights = ticket.inFlights.length;

  let inFlights = ticket.inFlights;

  for (i = 0; i < numOfInFlights; i++) {
    let stopOrNot = "";
    let stopOrDepartDiv = document.createElement("div");
    if (i !== numOfInFlights - 1) {
      stopOrNot = "Connection Flight";
    }
    stopOrDepartDiv.className = "stopFlight";

    let fixedHourDepart = inFlights[i].departureDate
      .replace("T", " ")
      .replace(".000+0000", " ");

    let fixedHourArrival = inFlights[i].arrivalDate
      .replace("T", " ")
      .replace(".000+0000", " ");

    handleFlightDetailsAndImage(
      divSubContainer,
      stopOrDepartDiv,
      inFlights[i].carrierImgUrl,
      fixedHourDepart,
      inFlights[i].origin,
      fixedHourArrival,
      inFlights[i].destination,
      stopOrNot,
      inFlights[i].duration
    );
  }

  divWrapper.appendChild(divSubContainer);
  addTheLinkButtonToTicket(divWrapper, ticket.bookingUrl, ticket.price);
  ticketsContainer[0].appendChild(divWrapper);
} //End Of function

function addTheLinkButtonToTicket(divWrapper, flightLink, price) {
  let theButton = document.createElement("button");
  theButton.className = "w3-button w3-block w3-dark-grey ticketButton";
  theButton.innerHTML = "+Buy Ticket" + " -----> " + price + localStorage.currencySign;

  theButton.onclick = function() {
    window.open(flightLink);
  };

  divWrapper.appendChild(theButton);
}

function handleFlightDetailsAndImage(
  divSubContainer,
  returnOrDepart,
  imageName,
  hourTakeoff,
  fromCity,
  hourLanding,
  destinationCity,
  stopOrNot,
  estimatedTime
) {
  let img = document.createElement("img");
  img.src = imageName;
  img.alt = "avatar";
  img.className = "w3-left w3-circle w3-margin-right";
  img.style = "width:100px";

  returnOrDepart.appendChild(img);

  let ticketDetails = document.createElement("div");
  ticketDetails.className = "ticketDetails";

  let ticketDetailsTitleOrig = document.createElement("h6");
  ticketDetailsTitleOrig.className = "boldText";

  ticketDetailsTitleOrig.innerHTML = hourTakeoff + " " + fromCity;

  let ticketDetailsTitleDest = document.createElement("h6");
  ticketDetailsTitleDest.className = "boldText";

  ticketDetailsTitleDest.innerHTML = hourLanding + destinationCity + " ";
  let connectionFlightText;
  if (stopOrNot) {
    connectionFlightText = document.createElement("h5");
    connectionFlightText.className = "connectiondBoldText";
    connectionFlightText.innerHTML = stopOrNot;
  }

  let ticketDetailsPara = document.createElement("p");
  ticketDetailsPara.className = "notBoldText";

  ticketDetailsPara.innerHTML =
    "Estimated time : " + (estimatedTime / 60).toFixed(2) + " Hours";

  ticketDetails.appendChild(ticketDetailsTitleOrig);
  ticketDetails.appendChild(ticketDetailsTitleDest);
  if (connectionFlightText) {
    ticketDetails.appendChild(connectionFlightText);
  }

  ticketDetails.appendChild(ticketDetailsPara);
  returnOrDepart.appendChild(ticketDetails);

  divSubContainer.appendChild(returnOrDepart);
}

function addDepartAndReturnText(
  divSubContainer,
  departDateFlight,
  returnDateFlight
) {
  let departPara = document.createElement("p");
  departPara.className = "boldText";
  departPara.innerHTML = "Depart: " + departDateFlight;

  let returnPara = document.createElement("p");
  returnPara.className = "boldText";
  returnPara.innerHTML = "Return: " + returnDateFlight;

  divSubContainer.appendChild(departPara);
  divSubContainer.appendChild(returnPara);

  let hrElem = document.createElement("hr");
  hrElem.className = "hrHeader";

  divSubContainer.appendChild(hrElem);
}

function createTicketHeader(divWrapper, content) {
  let ticketHeader = document.createElement("header");
  ticketHeader.className = "w3-container w3-light-grey";

  let ticketTitle = document.createElement("h3");

  ticketTitle.innerHTML = content;

  ticketHeader.appendChild(ticketTitle);

  divWrapper.appendChild(ticketHeader);
}
/*elemntId of route,dates,minPrice*/
function subscribe() {
  let url = "http://localhost:9052/smartspace/actions";

  let data = {
    type: "Subscribe",
    player: {
      smartspace: localStorage.smartspace,
      email: localStorage.email
    },
    element: {
      id: flightsObject.key.id,
      smartspace: flightsObject.key.smartspace
    },
    properties: {
      origin: localStorage.origin,
      destination: localStorage.destination,
      minPrice: localStorage.minPrice,
      departure_date: departDate,
      arrival_date: returnDate,
      currency: localStorage.currency,
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
    .then(function(response) {
      if (!response.ok) {
        alert(
          "danger",
          "Something went wrong... The element has not been added to the system"
        );
        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    // .then(res => res.json())
    .then(function() {
      document.getElementById("msg").style.display = "block";
    })
    .catch(error => {
      alert(
        "Danger-Something went wrong... The element has not been added to the system"
      );
      console.log("Error:", error);
    });

  document.getElementById("subscribeButton").disabled = true;

  // window.location.href = "/tickets.html";
}
