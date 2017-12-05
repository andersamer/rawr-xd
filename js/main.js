window.addEventListener("load", () => {

    var db = firebase.firestore();
    var messages = db.collection("messages");

    var $msgInput = $("#msgInput");
    var $messages = $("#messages");

    loadMessages();
    $msgInput.focus();

    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });

    function displayMsg(content, saved) {
        let li;
        if (saved)
        let li = $("<li class='msg'>");
        li.text(content);
        $messages.append(li);
        $messages.scrollTop($messages[0].scrollHeight);
    }

    function submitMsg() {
        let txt = $msgInput.val().trim();
        $msgInput.val("");
        if (txt) {
            saveMsg(txt);
            displayMsg(txt);
        }
    }


    function loadMessages() {
        messages.get().then((docs) => {
            docs.forEach((doc) => {
                let data = doc.data();
                displayMsg(data.content);
            });
            console.log("Messages loaded.");
        })
    }

    function saveMsg(text) {
        var timestamp = getTimestamp();
        var data = {
            content: text
        }
        messages.doc(timestamp).set(data).then(() => { 
            $("#messages:last-child").addClass("s");
            console.log("message saved!") 
        });
    }

});

function getTimestamp() {
    let now = new Date();
    console.log(now);
    return now.toString();
}