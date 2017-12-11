var db, messages, update, $msgInput, $messages, old;

window.addEventListener("load", () => {

    db = firebase.firestore();
    messages = db.collection("messages");
    update = messages.doc("update");
    
    $msgInput = $("#msgInput");
    $messages = $("#messages");

    old = getTimestamp();
    $msgInput.focus();
//    loadAllMessages();

    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });

    update.onSnapshot((doc) => {
        var data = doc.data();
        if (old !== data.timestamp) {
            var query = messages.where("timestamp", ">", old);
            loadMessages(query);
            old = data.timestamp;
        }
    });

});

function getTimestamp() {
    let now = Date.now();
    return now;
}
