import { USER_API } from "./APIurls";

USER_API

export async function register(e) {
    e.preventDefault();
    const name = document.getElementById("fullName").value
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const rol = document.getElementById("roleSelect").value;
    if (name && email && password) {
        try {
            const resGet = await fetch(USER_API);
            const data = await resGet.json();
            const exist = data.some(item => item.email === email);
            if (exist) {
                alert("Este usuario ya existe")
            } else {
                if (rol == "user") {
                    const res = await fetch(USER_API, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password,
                            "rol": rol,
                            "skills": [],
                            "experience": []
                        })
                    })
                    const user = await res.json()
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
                    localStorage.setItem("userType", "user");
                    closeRegister()
                    loadPage()
                } else if (rol == "company") {
                    const res = await fetch(USER_API, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password,
                            "rol": rol,
                            "logo": "",
                            "field": "",
                            "description": "",
                            "jobOffers": []
                        })
                    })
                    const user = await res.json()
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
                    localStorage.setItem("userType", "company");
                    closeRegister()
                    loadPage()
                }
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Error al registrar el usuario. Inténtalo de nuevo más tarde.");
        }
    }
}