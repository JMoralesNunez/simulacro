import { PRODUCT_API } from "../APIurls.js";
import { productModals } from "../modals.js";
import { getProductId, setProductId } from "./productGlobal.js";


export const productControl = {
    async save() {
            const name = document.getElementById('productName').value
    
            if (getProductId()) {
                //Edit mode
                try {
                    const res = await fetch(`${PRODUCT_API}${getProductId()}`, {
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
                setProductId(null)
                try {
                    const res = await fetch(PRODUCT_API, {
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
            productModals.close()
            setProductId(null)
    },
    async load() {
        const table = document.getElementById('productTable');
        table.innerHTML = "";
        const res = await fetch(PRODUCT_API)
        const products = await res.json();
        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.idproduct}</td>
                <td>${product.product_name}</td>
                <td></td>
            `;
            const actionsCell = row.querySelector("td:last-child");
            const editBtn = document.createElement("button");
            editBtn.className = "btn btn-sm btn-warning me-1";
            editBtn.textContent = "Editar";
            editBtn.addEventListener("click", () => {
                productModals.open(product.idproduct);
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-sm btn-danger";
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                this.erase(product.idproduct);
            });
            actionsCell.append(editBtn, deleteBtn);
            table.appendChild(row);
        });
    },
    async erase(id) {
        try {
            const res = await fetch(`${PRODUCT_API}${id}`, {
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
