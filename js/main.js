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

    messages.onSnapshot((doc) => {
        console.log(doc);
    })

    function displayMsg(content, timestamp, presaved) {
        var li = $("<li class='msg unsaved'>");
        if (presaved){ li = $("<li class='msg saved'>"); }
        li.text(content);
        
        var span = $("<i>");
        span.text(" - " + timestamp);
        li.append(span);
        
        $messages.append(li);
        $messages.scrollTop($messages[0].scrollHeight);
    }

    function submitMsg() {
        let txt = $msgInput.val().trim();
        $msgInput.val("");
        if (txt) {
            saveMsg(txt);
        }
    }


    function loadMessages() {
        messages.get().then((docs) => {
            docs.forEach((doc) => {
                let data = doc.data();
                let date = new Date(getTimestamp()).toLocaleString();
                displayMsg(data.content, date, true);
            });
            console.log("Messages loaded.");
        });
    }

    function saveMsg(text) {
        var timestamp = getTimestamp();
        var string = new Date(timestamp).toLocaleString();
        var stringStamp = timestamp.toString();
        var data = {
            content: text,
            timestamp: string
        };
        displayMsg(text, string);
        var $last = $("#messages li:last-child"); 
        messages.doc(stringStamp).set(data).then(() => { 
            $last.removeClass("unsaved").addClass("saved");
            console.log("Message saved.");
        });
    }
});

function getTimestamp() {
    let now = Date.now();
    return now;
}
