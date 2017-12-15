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
function displayMsg(content, timestamp, from, spClass, presaved=true) {
    var md = markdownit().render(content);
    var li = $("<li class='msg unsaved'>");
    if (presaved) { li = $("<li class='msg saved'>"); }
    
    li.addClass(spClass);
    li.text(from + ": ");
    li.append(md);

    var span = $("<span class='timestamp'>");
    span.text(" - " + new Date(timestamp).toLocaleString());
    li.append(span);

    $messages.append(li);
    $messages.scrollTop($messages[0].scrollHeight);
}

// Display a local message
function sysMsg(content, type) {
    displayMsg(content, getTimestamp(), ":", type);
}

function broadcastMsg(content) {
    saveMsg("*" + content + "*", getTimestamp(), "@", "broadcast");
}

// Saves a message with text from the message input
function submitMsg() {
    let txt = $msgInput.val().trim();
    $msgInput.val("");
 
    if (txt.charAt(0) !== "/") {
        if(currUser) {
            saveMsg(txt);
        } else {
            sysMsg("You must sign in to send messages.", "failure");
        }
    } else {
        parseCommand(txt);
    }
}

function parseCommand(commandstr) {
    switch(commandstr) {
        case "/login":
            logIn();
            break;
        case "/logout":
            logOut();
            break;
        default:
            sysMsg("Invalid command.", "failure");
    }
}

// Loads the messages from a specific query
function loadMessages(query) {
    query.get().then((docs) => {
        docs.forEach((doc) => {
            let data = doc.data();
            if (doc.id !== "update") {
                displayMsg(data.content, parseInt(data.timestamp), data.from, data.type, true);
            }
        });
    });
}

// Loads every single message
function loadAllMessages() {
    loadMessages(messages);
}

function saveMsg(text, timestamp, from=name, type="") {
    
    var timestamp = getTimestamp();
    var data = {
        content: text,
        from: from,
        timestamp: timestamp,
        type: type
    };

    displayMsg(text, timestamp, from, type, true);
    
    var $last = $("#messages li:last-child");
    messages.doc(timestamp.toString()).set(data).then(() => { $last.removeClass("unsaved").addClass("saved"); });
    
    old = timestamp;
    setUpdate(timestamp);
}

// Clears all messages off of screen
function clearMessages() {
    $messages.empty();
}