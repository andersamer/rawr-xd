var update = messages.doc("update"); // Reference for time of newest message
var old; // Reference for the last time that new messages were loaded

// Start listening for new messages
function listenMessages() {
    update.onSnapshot((doc) => {
        var data = doc.data();
        if (old !== data.timestamp) {
            var query = messages.where("timestamp", ">", old);
            loadMessages(query);
            old = data.timestamp;
        }
    });
}

// Update the timestamp of the newest message
function setUpdate(num) {
    update.set({timestamp: num});
}

// Displays a message w/ timestamp, checks to see if it was already saved 
function displayMsg(content, timestamp, presaved) {
    var md = markdownit().render(content);
    var li = $("<li class='msg unsaved'>");
    if (presaved) {
        li = $("<li class='msg saved'>");
    }

    li.append(md);

    var span = $("<span class='timestamp'>");
    span.text(" - " + new Date(timestamp).toLocaleString());
    li.append(span);

    $messages.append(li);
    $messages.scrollTop($messages[0].scrollHeight);
}

// Display a local message
function sysMsg(content) {
    displayMsg(content, getTimestamp(), true);
}

// Saves a message with text from the message input
function submitMsg() {
    let txt = $msgInput.val().trim();
    $msgInput.val("");
    if (txt.charAt(0) !== "/" && user) {
        saveMsg(txt);
    } else {
        parseCommand(txt);
    }
}

function parseCommand(commandstr) {
    if(commandstr === "/login") {
        logIn();
    } 
}

// Loads the messages from a specific query
function loadMessages(query) {
    query.get().then((docs) => {
        docs.forEach((doc) => {
            let data = doc.data();
            if (doc.id !== "update") {
                displayMsg(data.content, parseInt(data.timestamp), true);
            }
        });
    });
}

// Loads every single message
function loadAllMessages() {
    loadMessages(messages);
}

function saveMsg(text) {
    var timestamp = getTimestamp();
    var data = {
        content: text,
        timestamp: timestamp
    };
    displayMsg(text, timestamp);
    var $last = $("#messages li:last-child");
    messages.doc(timestamp.toString()).set(data).then(() => {
        $last.removeClass("unsaved").addClass("saved");
    });
    old = timestamp;
    setUpdate(timestamp);
}

// Clears all messages off of screen
function clearMessages() {
    $messages.empty();
}