window.addEventListener("load", () => {

    var db = firebase.firestore();
    var messages = db.collection("messages");
    var update = messages.doc("update");

    var $msgInput = $("#msgInput");
    var $messages = $("#messages");

    loadAllMessages();
    $msgInput.focus();

    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });
    
    update.onSnapshot((doc) => {
        var query = messages.where("timestamp", ">=", doc.data().timestamp);
        loadMessages(query);
    });
    
    function displayMsg(content, timestamp, presaved) {
        var li = $("<li class='msg unsaved'>");
        if (presaved){ li = $("<li class='msg saved'>"); }
        li.text(content);
        
        var span = $("<i>");
        span.text(" - " + new Date(timestamp).toLocaleString());
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

    function loadAllMessages() {
        loadMessages(messages);
    }

    function loadMessages(query) {
        query.get().then((docs) => {
            docs.forEach((doc) => {
                let data = doc.data();
                if(doc.id !== "update") {
                    displayMsg(data.content, parseInt(data.timestamp), true); 
                }
            });
            console.log("Messages loaded.");
        });
    }
    
    function setUpdate() {
        update.set({ timestamp: getTimestamp() }).then(() => {
            console.log("Updated update timestamp.");
        });
    }
    
    function saveMsg(text) {
        var timestamp = getTimestamp();
        var data = {
            content: text,
            timestamp: timestamp
        };
        displayMsg(text, timestamp);
        var $last = $("#messages li:last-child"); 
        var stringStamp = timestamp.toString();
        messages.doc(stringStamp).set(data).then(() => { 
            $last.removeClass("unsaved").addClass("saved");
            console.log("Message saved.");
        });
        setUpdate();
    }
});

function getTimestamp() {
    let now = Date.now();
    return now;
}
