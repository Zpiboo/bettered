window.addEventListener("load", () => {
    if (!sessionStorage.getItem("ed_token")) {
        loginPopup();
    }
});

function loginPopup() {
    var popup = document.createElement("div");
    popup.classList.add("popup");
    var username = document.createElement("input");
    username.type = "text";
    var password = document.createElement("input");
    password.type = "password";
    popup.appendChild(username);
    popup.appendChild(password);

    document.body.appendChild(popup);
}