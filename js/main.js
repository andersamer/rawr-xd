$("#msgInput").focus();

rawrxd = {
    displayMsg: (content) => {
        let p = $("<p>");
        p.text(content);

        let msg = $("<div class='msg'>");
        msg.append(p);

        let msgList = $("#msgList");
        msgList.append(msg);

        msgList.scrollTop = msgList.scrollHeight;
    },

    submitMsg: () => {
        let txt = $("#msgInput").val();
        $("#msgInput").val("");
        rawrxd.displayMsg(txt);
    },

    clearMsgList: () => {
        $("#msgList").empty();
    }
};