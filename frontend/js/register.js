import { USER_API } from "./APIurls.js";


async function register(e) {
    e.preventDefault();
    const name = document.getElementById("name").value
    const lastname = document.getElementById("lastname").value
    const fullname = `${name} ${lastname}`

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (name && lastname && email && password) {
        try {
            const resGet = await fetch(USER_API);
            const data = await resGet.json();
            const exist = data.some(item => item.email === email);
            if (exist) {
                alert("Este usuario ya existe")
            } else {
                    const res = await fetch(USER_API, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify({
                            "name": fullname,
                            "email": email,
                            "password": password
                        })
                    })
                    window.location = '../../frontend/login.html';
                
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Error al registrar el usuario. Inténtalo de nuevo más tarde.");
        }
    }
}

document.getElementById('registerbtn').addEventListener('click', register)