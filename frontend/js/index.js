import { CLIENT_API } from "./APIurls.js"

const userName = document.getElementById("userName")
const userInfo = localStorage.getItem("userInfo")

document.addEventListener('DOMContentLoaded', () => {
    const name = JSON.parse(userInfo).name
    userName.textContent = name
})

async function loadClients() {
    const table = document.getElementById('tableBody');
    const res = await fetch(CLIENT_API)
    const clients = await res.json();
    clients.forEach(client => {
        table.innerHTML += `<tr>
                                <td>${client.idclient}</td>
                                <td>${client.client_name}</td>
                                <td>${client.phone}</td>
                                <td>${client.school}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" onclick="details(${client.idclient})">Detalles</button>
                                    <button class="btn btn-sm btn-warning" onclick="edit(${client.idclient})">Editar</button>
                                    <button class="btn btn-sm btn-danger" onclick="erase(${client.idclient})">Eliminar</button>
                                </td>
                            </tr>`
    });
}