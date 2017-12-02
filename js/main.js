var $msgInput = $("#msgInput");
var $messages = $("#messages");

window.addEventListener("load", (e) => {
    $msgInput.focus();
});

$msgInput.keydown((e) => {
    console.log("yeet");
    if(event.which === 13) {
        console.log("ENTER!!");
    }
});

function displayMsg(content) {
    let p = $("<ul>");
    p.text(content);

    $messages.append(p);

    $messages.scrollTop($messages[0].scrollHeight);
}

function submitMsg() {
    let txt = $msgInput.val();
    $msgInput.val("");
    displayMsg(txt);
}

function clearMsgList() {
    $messages.empty();
}