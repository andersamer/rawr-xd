window.addEventListener("load", () => {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
        if(user) {
            loadAllMessages();
        } else {
            sysMsg("Sign in!!!");
        }
    });
});