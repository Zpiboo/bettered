window.addEventListener("load", () => {
    if (!sessionStorage.getItem("ed_token")) {
        loginPopup();
    }
});

function loginPopup() {
    var popupHtml = `
        <h1>Login</h1>

        <label for="username">Username: </label>
        <input type="text" id="username" autocomplete="off"><br><br>

        <label for="password">Password: </label>
        <input type="password" id="password" autocomplete="off">
        <br><br>
        <button class="submit">Login</button>
    `;
    var popupBg = document.createElement("div");
    popupBg.classList.add("popup-bg");
    var popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = popupHtml;
    popupBg.appendChild(popup);

    document.body.appendChild(popupBg);

    document.querySelector(".submit").addEventListener("click", () => {
        fetch("https://api.ecoledirecte.com/v3/login.awp?v=4.9.0", {
            method: 'POST',
            body: new URLSearchParams({
                data: JSON.stringify({
                    uuid: "",
                    identifiant: document.querySelector("#username").value,
                    motdepasse: document.querySelector("#password").value,
                    isReLogin: false
                })
            })
        }).then(res => {
            return res.json();
        })

        .then(data => {
            if (data["code"] === 200) {
                sessionStorage.setItem("ed_token", data["token"]);
                location.reload();
            } else {
                [...document.querySelectorAll(".error")].forEach(item => {
                    item.parentElement.removeChild(item);
                });
                var error = document.createElement("div");
                error.style = "color: red; font-size: 15px;";
                error.classList.add("error");
                error.innerHTML = data["message"];
                popup.appendChild(error);
            }
        });
    });
}