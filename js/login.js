const submit = document
  .getElementById("submit")
  .addEventListener("click", e => {
    e.preventDefault();
    resetNotifactions();
    let email = document.getElementById("InputEmail");
    let smartspace = document.getElementById("smartspaceSelect");
    let smartspaceValue = smartspace.options[smartspace.selectedIndex].text;
    if (smartspaceValue === "Other Smartspace") {
      smartspaceValue = document.getElementById("otherSmartspaceText").value;
    }
    let url =
      "http://localhost:9052/smartspace/users/login/" +
      smartspaceValue +
      "/" +
      email.value;
    if (email.value === "") {
     
      document.getElementById("alertMsgEmptyMail").style.display = "block";
      document.getElementById("email-feedback").style.display = "block";
    } else {
      if (!checkMail(document.getElementById("InputEmail")))
        document.getElementById("alertMsg").style.display = "block";
      else {
        fetch(url, {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          },
          mode: "cors"
        })
          .then(res => res.json())
          .then(function (responseObejcts) {
            console.log(
              "Logged Output-: responseObejcts",
              responseObejcts.status
            );
            console.log(responseObejcts.status)
            if (!(responseObejcts.status === undefined))
              document.getElementById("alertMsgNet").style.display = "block";
            else {
              console.log("Success:", responseObejcts);
              localStorage.setItem("role", responseObejcts.role);
              localStorage.setItem(
                "smartspace",
                responseObejcts.key.smartspace
              );
              localStorage.setItem("email", responseObejcts.key.email);
              role = localStorage.role;
              if (role === "undefined") localStorage.role = "";
              else if (role === "ADMIN") window.location.href = "./admin.html";
              else if (role === "MANAGER")
                window.location.href = "./manager.html";
              else if (role === "PLAYER")
                window.location.href = "./player.html";
            }
          })
          .catch(error => {
            console.log("Error:", error);
            document.getElementById("alertMsgNet").style.display = "block";
          });
      }
    }
  });

function checkMail(email) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email.value).toLowerCase()) ? true : false;
}

function otherSmartspace() {
  let list = document.getElementById("smartspaceSelect");
  let otherSmartspace = document.getElementById("otherSmartspace");
  list.value === "other"
    ? (otherSmartspace.style.display = "block")
    : (otherSmartspace.style.display = "none");
}
function resetNotifactions() {
  document.getElementById("alertMsg").style.display = "none";
  document.getElementById("alertMsgNet").style.display = "none";
  document.getElementById("alertMsgEmptyMail").style.display = "none";
  document.getElementById("InputEmail").classList.toggle("is-invalid");
}
