const userSmartspace = localStorage.smartspace;
const userEmail = localStorage.email;
const url = `http://localhost:9052/smartspace/users/login/${userSmartspace}/${userEmail}`;

fetch(url, {
    method: "GET",
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
        console.log(responseObejcts);
        document.getElementById("email").value = responseObejcts["key"]["email"];
        document.getElementById("avatar").value = responseObejcts["avatar"];
        document.getElementById("username").value = responseObejcts["username"];
    })
    .catch(error => console.log("Error:", error));

const sumbit = document.getElementById("submit").addEventListener("click", e => {
    e.preventDefault();
    urlPut = `http://localhost:9052/smartspace/users/login/${userSmartspace}/${userEmail}`;
    let data = {
        "key": {
            "smartspace": localStorage.smartspace,
            "email": document.getElementById("email").value
        },
        "role": localStorage.role,
        "username": document.getElementById("username").value,
        "avatar": document.getElementById("avatar").value
    }
        ;

    fetch(urlPut, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error("The error code: " + response.status + response.statusText);
            }
            return response;
        })
        .then(function () {
            console.log("Success");
        })
        .catch(error => {
            console.log("Error:", error);
        });
});

