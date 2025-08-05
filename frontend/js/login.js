import { USER_API } from "./APIurls.js";

async function login(e) {
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        const res = await fetch(USER_API)
        const data = await res.json();
        const user = data.find(user => user.email === email && user.password === password);
        console.log(user);
        if (user) {
            localStorage.setItem("auth", "true")
            localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
            window.location = '../home.html';
        } else {
            alert("Usuario incorrecto")
        }
    } else {
        alert("Rellena los campos")
    }
}

document.getElementById('logbtn').addEventListener('click', login)