if (localStorage.role !== 'ADMIN') {
  window.location.href = ('./index.html');
}




const importElementsData = document.getElementById("importElements");
const importUsersData = document.getElementById("importUsers");
const importActionsData = document.getElementById("importActions");
const adminEmail = localStorage.email;
const adminSmartspace = localStorage.smartspace;
const elementUrl = `http://localhost:9052/smartspace/admin/elements/${adminSmartspace}/${adminEmail}`;
const userUrl = `http://localhost:9052/smartspace/admin/users/${adminSmartspace}/${adminEmail}`;
const actionUrl = `http://localhost:9052/smartspace/admin/actions/${adminSmartspace}/${adminEmail}`;
const warningsUsers = document.getElementById("warningsUsers");
const warningsElements = document.getElementById("warningsElements");
const warningsActions = document.getElementById("warningsActions");

function doPostRequestForElements() {
  var data;

  data = importElementsData.value;

  fetch(elementUrl, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(
          warningsElements,
          "danger",
          "Something went wrong... The user has not been added to the system"
        );

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .then(function () {
      setWarningMessage(
        warningsElements,
        "success",
        "The user: " + userName.value + " successfully added to the system"
      );
    })
    .catch(error => console.log("Error:", error));
}

function doPostRequestForUsers() {
  var data;

  data = importUsersData.value;

  fetch(userUrl, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(
          warningsUsers,
          "danger",
          "Something went wrong... The user has not been added to the system"
        );

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .then(function () {
      setWarningMessage(
        warningsUsers,
        "success",
        "The user: " + userName.value + " successfully added to the system"
      );
    })
    .catch(error => console.log("Error:", error));
}

function doPostRequestForActions() {
  var data;
  data = importUsersData.value;

  fetch(actionUrl, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(warnings, "danger", "Something went wrong... The user has not been added to the system");

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .then(function () {
      setWarningMessage(warnings, "success", "The user: " + userName.value + " successfully added to the system");
    })
    .catch(error => console.log("Error:", error));
}

function doGetRequestForActions() {
  let page = document.getElementById("pageActions").value;
  let size = document.getElementById("sizeActions").value;
  let modifyedURL = actionUrl + `?page=${page}&size=${size}`;


  fetch(modifyedURL, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(
          warningsActions,
          "danger",
          "Something went wrong... "
        );

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(function (responseObejcts) {
      document.getElementById("exportActions").value = JSON.stringify(
        responseObejcts
      );
      console.log("Success:", JSON.stringify(responseObejcts));
      setWarningMessage(
        warningsActions,
        "success",
        "successfully export from the system"
      );
    })
    .catch(error => console.log("Error:", error));
}

function doGetRequestForUsers() {
  let page = document.getElementById("pageUsers").value;
  let size = document.getElementById("sizeUsers").value;
  let modifyedURL = userUrl + `?page=${page}&size=${size}`;

  fetch(modifyedURL, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(
          warningsUsers,
          "danger",
          "Something went wrong... The user has not been added to the system"
        );

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(function (responseObejcts) {
      document.getElementById("exportUsers").value = JSON.stringify(
        responseObejcts
      );
      console.log("Success:", JSON.stringify(responseObejcts));
      setWarningMessage(
        warningsUsers,
        "success",
        "successfully export from the system"
      );
    })
    .catch(error => console.log("Error:", error));
}

function doGetRequestForElements() {
  let page = document.getElementById("pageElement").value;
  let size = document.getElementById("sizeElement").value;
  let modifyedURL = elementUrl + `?page=${page}&size=${size}`;

  fetch(modifyedURL, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  })
    .then(function (response) {
      if (!response.ok) {
        setWarningMessage(
          warningsElements,
          "danger",
          "Something went wrong..."
        );

        throw Error("The error code: " + response.status + response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(function (responseObejcts) {
      document.getElementById("exportElements").value = JSON.stringify(
        responseObejcts
      );
      console.log("Success:", JSON.stringify(responseObejcts));
      setWarningMessage(
        warningsElements,
        "success",
        "successfully export from the system"
      );
    })
    .catch(error => console.log("Error:", error));
}

function setWarningMessage(warningElement, type, message) {
  warningElement.innerText = message;
  warningElement.hidden = false;
  warningElement.className = "alert alert-" + type;
}


// const usersExportSubmit = document
//   .getElementById("exportUsersBtn")
//   .addEventListener("click", e => {
//     e.preventDefault();
//     const exportUsers = document.getElementById("exportUsers");
//     const adminEmail = localStorage.email;
//     const adminSmartspace = localStorage.smartspace;
//     const url = `http://localhost:9052/smartspace/admin/users/${adminSmartspace}/${adminEmail}`;
//   });
