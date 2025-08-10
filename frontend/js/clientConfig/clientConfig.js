import { CLIENT_API } from "../APIurls.js"
import { clientModals } from "../modals.js";


export async function loadClients() {
    const table = document.getElementById('clientTable');
    const res = await fetch(CLIENT_API)
    const clients = await res.json();
    clients.forEach(client => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${client.idclient}</td>
            <td>${client.client_name}</td>
            <td>${client.phone}</td>
            <td>${client.school}</td>
            <td></td>
        `;
        const actionsCell = row.querySelector("td:last-child");
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-1";
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => {
            clientModals.open(client.idclient); 
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => {
            erase(client.idclient);
        });
        actionsCell.append(editBtn, deleteBtn);
        table.appendChild(row);
    });
}

// async function editClient(idclient) {
//     try {
//         const res = await fetch(`${CLIENT_API}${idclient}`)
//         const user = await res.json();
        
//     } catch (error) {
        
//     }
    
// }