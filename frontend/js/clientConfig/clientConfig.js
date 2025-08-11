import { CLIENT_API } from "../APIurls.js"
import { clientModals } from "../modals.js";
import { getClientId, setClientId } from "./clientGlobal.js";


export const clientControl = {
    async save() {
        const name = document.getElementById('clientName').value
        const school = document.getElementById('clientSchool').value
        const phone = document.getElementById('clientPhone').value

        if (getClientId()) {
            //Edit mode
            try {
                const res = await fetch(`${CLIENT_API}${getClientId()}`, {
                    "method": 'PUT',
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                    "body": JSON.stringify({
                        "name": name,
                        "school": school,
                        "phone": phone
                    })
                });
                const data = await res.json();
            } catch (error) {
                console.error('Error en PUT:', error);
            }
        } else {
            //Create mode
            setClientId(null)
            try {
                const res = await fetch(CLIENT_API, {
                    "method": 'POST',
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                    "body": JSON.stringify({
                        "name": name,
                        "school": school,
                        "phone": phone
                    })
                });
                const data = await res.json();
            } catch (error) {
                console.error('Error en POST:', error);
            }
        }
        this.load();
        clientModals.close()
        setClientId(null)
    },
    async load() {
        const table = document.getElementById('clientTable');
        table.innerHTML = "";
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
            deleteBtn.type = "button"
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                this.erase(client.idclient);
            });
            actionsCell.append(editBtn, deleteBtn);
            table.appendChild(row);
        });
    },
    async erase(id) {
        try {
            const res = await fetch(`${CLIENT_API}${id}`, {
                "method": 'DELETE'
            });
            if (res.ok) {
                console.log('DELETE: Recurso eliminado');
            } else {
                console.error('DELETE falló');
            }
        } catch (error) {
            console.error('Error en DELETE:', error);
        }
        this.load();
    }
}