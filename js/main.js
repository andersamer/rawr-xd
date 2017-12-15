// Firebase shortcuts
const db = firebase.firestore(), 
      messages = db.collection("messages"),
      auth = firebase.auth();

// User variables
var currUser;
var name;

// ELement Vars
var $msgInput, $messages;

window.addEventListener("load", () => {

    // Assign Jquery shortcuts
    $msgInput = $("#msgInput");
    $messages = $("#messages");
    
    $msgInput.focus();

    // Start listening for enter
    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });

});

window.onbeforeunload = waitasec;
function waitasec() {
    if(currUser) {
        sysMsg("You must log out before leaving. Type **/logout**.", "failure");
        return "";
    }
}

// Returns the current time in milliseconds
function getTimestamp() {
    let now = Date.now();
    return now;
}
