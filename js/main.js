// Firebase shortcuts
const db = firebase.firestore(), 
      messages = db.collection("messages"),
      auth = firebase.auth();

var update = messages.doc("update")
var $msgInput, $messages;

window.addEventListener("load", () => {

    // Assign Jquery shortcuts
    $msgInput = $("#msgInput");
    $messages = $("#messages");

    // The last time we chekced for messages is right now
    old = getTimestamp();
    
    $msgInput.focus();

    // Start listening for enter
    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });

});

// Returns the current time in milliseconds
function getTimestamp() {
    let now = Date.now();
    return now;
}
