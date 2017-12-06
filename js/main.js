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

    function displayMsg(content, presaved) {
        var li;
        li = $("<li class='msg unsaved'>")
        if (presaved){ li = $("<li class='msg saved'>"); }
        li.text(content);
        $messages.append(li);
        $messages.scrollTop($messages[0].scrollHeight);
    }

    function submitMsg() {
        let txt = $msgInput.val().trim();
        $msgInput.val("");
        if (txt) {
            displayMsg(txt);
            saveMsg(txt);
        }
    }


    function loadMessages() {
        messages.get().then((docs) => {
            docs.forEach((doc) => {
                let data = doc.data();
                displayMsg(data.content, true);
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
            $("#messages li:last-child").removeClass("unsaved").addClass("saved");
            console.log("message saved!") 
        });
    }
});

function getTimestamp() {
    let now = new Date();
    return now.toString();
}
