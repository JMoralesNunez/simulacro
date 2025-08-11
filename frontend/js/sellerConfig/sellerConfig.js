import { SELLER_API } from "../APIurls.js"
import { sellerModals } from "../modals.js";
import { getSellerId, setSellerId } from "./sellerGlobal.js";

export const sellerControl = {
    async save() {
                const name = document.getElementById('sellerName').value
        
                if (getSellerId()) {
                    //Edit mode
                    try {
                        const res = await fetch(`${SELLER_API}${getSellerId()}`, {
                            "method": 'PUT',
                            "headers": {
                                'Content-Type': 'application/json'
                            },
                            "body": JSON.stringify({
                                "name": name,
                            })
                        });
                        const data = await res.json();
                    } catch (error) {
                        console.error('Error en PUT:', error);
                    }
                } else {
                    //Create mode
                    setSellerId(null)
                    try {
                        const res = await fetch(SELLER_API, {
                            "method": 'POST',
                            "headers": {
                                'Content-Type': 'application/json'
                            },
                            "body": JSON.stringify({
                                "name": name,
                            })
                        });
                        const data = await res.json();
                    } catch (error) {
                        console.error('Error en POST:', error);
                    }
                }
        this.load();
        sellerModals.close()
        setSellerId(null)
    },
    async load() {
        const table = document.getElementById('sellerTable');
        table.innerHTML = "";
        const res = await fetch(SELLER_API)
        const sellers = await res.json();
        sellers.forEach(seller => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${seller.idseller}</td>
                <td>${seller.seller_name}</td>
                <td></td>
            `;
            const actionsCell = row.querySelector("td:last-child");
            const editBtn = document.createElement("button");
            editBtn.className = "btn btn-sm btn-warning me-1";
            editBtn.textContent = "Editar";
            editBtn.addEventListener("click", () => {
                sellerModals.open(seller.idseller); 
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-sm btn-danger";
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                this.erase(seller.idseller);
            });
            actionsCell.append(editBtn, deleteBtn);
            table.appendChild(row);
        });
    },
    async erase(id) {
            try {
                const res = await fetch(`${SELLER_API}${id}`, {
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
