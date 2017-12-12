window.addEventListener("load", () => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            initUser();
        } else {
            sysMsg("Welcome to rawr-xd.");
        }
    });
});

function initUser() {
    clearMessages();
    loadAllMessages();
    listenMessages();
}