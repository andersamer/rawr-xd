window.addEventListener("load", () => {

    var $msgInput = $("#msgInput");
    var $messages = $("#messages");

    $msgInput.focus();

    $msgInput.on("keydown", (event) => {
        if (event.which === 13) {
            submitMsg();
        }
    });

    function displayMsg(content) {
        let li = $("<li class='msg'>");
        li.text(content);
        $messages.append(li);
        $messages.scrollTop($messages[0].scrollHeight);
    }

    function submitMsg() {
        let txt = $msgInput.val().trim();
        $msgInput.val("");
        if(txt) { displayMsg(txt); }
    }

});