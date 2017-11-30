$("#msgInput").focus();

rawrxd = {
    displayMsg: (content) => {
        let p = $("<ul>");
        p.text(content);

        let msgList = $("#msgArea");
        msgList.append(p);

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