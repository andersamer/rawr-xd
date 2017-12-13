window.addEventListener("load", () => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            initUser();
        } else {
            sysMsg("Welcome to rawr-xd.");
            sysMsg("**Uh oh!** Looks like you're not logged in. Type **\"/login\"** to log in with Google.")
        }
    });
});

function initUser(nick) {
    clearMessages();
    loadAllMessages();
    old = getTimestamp();
    listenMessages();
}

function logIn() {
    var provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        var user = result.user;
        console.log(user);
        initUser();
    });
}