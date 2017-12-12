window.addEventListener("load", () => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            initUser();
        } else {
            sysMsg("Welcome to rawr-xd.");
            sysMsg("**Uh oh!** Looks like you're not logged in. Type \"/login\" to log in or \"/signup\" to sign up.")
        }
    });
});

function initUser() {
    clearMessages();
    loadAllMessages();
    old = getTimestamp();
    listenMessages();
}