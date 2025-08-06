let isAuth = localStorage.getItem("auth");

if (isAuth != "true") {
    window.location = "../../frontend/login.html"
}