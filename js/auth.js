window.addEventListener("load", () => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            currUser = user;
            initUser(currUser.displayName);
        } else {
            sysMsg("Welcome to rawr-xd.");
            sysMsg("**Uh oh!** Looks like you're not logged in. Type **\"/login\"** to log in with Google.", "warning");
        }
    });
});

function initUser(nick) {
    clearMessages();
    name = nick;
    
    loadAllMessages();
    old = getTimestamp();
    listenMessages();

    sysMsg("Welcome back, **" + nick + "**.", "success");
    sysMsg("Type **/logout** at any time to log out.");
}

function logIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        broadcastMsg("**" + result.user.displayName + "** has joined!");
    })
}

function logOut() {
    if(currUser) {
        broadcastMsg("**" + name + "** has logged off.");
        currUser = undefined;
        auth.signOut();
        clearMessages();
        sysMsg("Signed out successfully.", "success");
    } else {
        sysMsg("You can't log out because you're not logged in yet.", "failure");
    }
}
