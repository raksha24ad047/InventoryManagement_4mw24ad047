
async function loadData(type) {

    document.getElementById("title").innerText = type.toUpperCase();

    const res = await fetch(`http://localhost:3000/${type}`);
    const data = await res.json();

    const thead = document.getElementById("thead");
    const tbody = document.getElementById("tbody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (data.length === 0) return;

    // headers
    Object.keys(data[0]).forEach(key => {
        thead.innerHTML += `<th>${key}</th>`;
    });

    // rows
    data.forEach(row => {
        let tr = "<tr>";
        Object.values(row).forEach(val => {
            tr += `<td>${val}</td>`;
        });
        tr += "</tr>";
        tbody.innerHTML += tr;
    });
}

// LOAD PRODUCTS PAGE
async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    data.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.product_id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.price}</td>
                <td>
                    <button onclick="editProduct(${p.product_id}, '${p.name}', '${p.category}', ${p.price})">Edit</button>
                    <button onclick="deleteProduct(${p.product_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
async function addProduct() {

    const product = {

        product_id: document.getElementById("pid").value,
        name: document.getElementById("pname").value,
        category: document.getElementById("pcategory").value,
        price: document.getElementById("pprice").value
    };

    await fetch("http://localhost:3000/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
    });

    loadProducts();
}
async function updateProduct() {

    const id = document.getElementById("eid").value;

    const product = {

        name: document.getElementById("ename").value,
        category: document.getElementById("ecategory").value,
        price: document.getElementById("eprice").value
    };

    await fetch(`http://localhost:3000/products/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
    });

    loadProducts();
}
async function deleteProduct() {

    const id = document.getElementById("did").value;

    await fetch(`http://localhost:3000/products/${id}`, {

        method: "DELETE"
    });

    loadProducts();
}
if (document.getElementById("productTable")) {
    loadProducts();
}
async function loadSuppliers() {

    const res = await fetch("http://localhost:3000/suppliers");
    const data = await res.json();

    const table = document.getElementById("supplierTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(supplier => {

        table.innerHTML += `
        <tr>
            <td>${supplier.supplier_id}</td>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.address}</td>

            <td>
                <button onclick="editSupplier(
                    ${supplier.supplier_id},
                    '${supplier.name}',
                    '${supplier.phone}',
                    '${supplier.address}'
                )">Edit</button>

                <button onclick="deleteSupplier(${supplier.supplier_id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
async function addSupplier() {

    const supplier = {

        supplier_id: document.getElementById("sid").value,
        name: document.getElementById("sname").value,
        phone: document.getElementById("sphone").value,
        address: document.getElementById("saddress").value
    };

    await fetch("http://localhost:3000/suppliers", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(supplier)
    });

    loadSuppliers();
}
function editSupplier(id, name, phone, address) {

    document.getElementById("esid").value = id;
    document.getElementById("esname").value = name;
    document.getElementById("esphone").value = phone;
    document.getElementById("esaddress").value = address;
}
async function updateSupplier() {

    const id = document.getElementById("esid").value;

    const supplier = {

        name: document.getElementById("esname").value,
        phone: document.getElementById("esphone").value,
        address: document.getElementById("esaddress").value
    };

    await fetch(`http://localhost:3000/suppliers/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(supplier)
    });

    loadSuppliers();
}
async function deleteSupplier(id) {

    await fetch(`http://localhost:3000/suppliers/${id}`, {

        method: "DELETE"
    });

    loadSuppliers();
}
if (document.getElementById("supplierTable")) {
    loadSuppliers();
}
async function loadWarehouses() {

    const res = await fetch("http://localhost:3000/warehouse");
    const data = await res.json();

    const table = document.getElementById("warehouseTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(warehouse => {

        table.innerHTML += `
        <tr>
            <td>${warehouse.warehouse_id}</td>
            <td>${warehouse.location}</td>

            <td>
                <button onclick="editWarehouse(
                    ${warehouse.warehouse_id},
                    '${warehouse.location}'
                )">
                    Edit
                </button>

                <button onclick="deleteWarehouse(
                    ${warehouse.warehouse_id}
                )">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}async function addWarehouse() {

    const warehouse = {

        warehouse_id: document.getElementById("wid").value,
        location: document.getElementById("wlocation").value
    };

    await fetch("http://localhost:3000/warehouse", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(warehouse)
    });

    loadWarehouses();
}
function editWarehouse(id, location) {

    document.getElementById("ewid").value = id;
    document.getElementById("ewlocation").value = location;
}
async function updateWarehouse() {

    const id = document.getElementById("ewid").value;

    const warehouse = {

        location: document.getElementById("ewlocation").value
    };

    await fetch(`http://localhost:3000/warehouse/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(warehouse)
    });

    loadWarehouses();
}
async function deleteWarehouse(id) {

    await fetch(`http://localhost:3000/warehouse/${id}`, {

        method: "DELETE"
    });

    loadWarehouses();
}
if (document.getElementById("warehouseTable")) {
    loadWarehouses();
}
async function loadStock() {

    const res = await fetch("http://localhost:3000/stock");
    const data = await res.json();

    const table = document.getElementById("stockTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(stock => {

        table.innerHTML += `
        <tr>
            <td>${stock.stock_id}</td>
            <td>${stock.product_id}</td>
            <td>${stock.warehouse_id}</td>
            <td>${stock.quantity}</td>

            <td>
                <button onclick="editStock(
                    ${stock.stock_id},
                    ${stock.product_id},
                    ${stock.warehouse_id},
                    ${stock.quantity}
                )">
                    Edit
                </button>

                <button onclick="deleteStock(${stock.stock_id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
async function addStock() {

    const stock = {

        stock_id: document.getElementById("sid").value,
        product_id: document.getElementById("sproduct").value,
        warehouse_id: document.getElementById("swarehouse").value,
        quantity: document.getElementById("sqty").value
    };

    await fetch("http://localhost:3000/stock", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(stock)
    });

    loadStock();
}
function editStock(id, productId, warehouseId, quantity) {

    document.getElementById("estid").value = id;
    document.getElementById("espid").value = productId;
    document.getElementById("eswid").value = warehouseId;
    document.getElementById("esqty").value = quantity;
}
async function updateStock() {

    const id = document.getElementById("estid").value;

    const stock = {

        product_id: document.getElementById("espid").value,
        warehouse_id: document.getElementById("eswid").value,
        quantity: document.getElementById("esqty").value
    };

    await fetch(`http://localhost:3000/stock/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(stock)
    });

    loadStock();
}
async function deleteStock(id) {

    await fetch(`http://localhost:3000/stock/${id}`, {

        method: "DELETE"
    });

    loadStock();
}
if (document.getElementById("stockTable")) {
    loadStock();
}
async function loadPurchase() {

    const res = await fetch("http://localhost:3000/purchase");
    const data = await res.json();

    const table = document.getElementById("purchaseTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(p => {

        table.innerHTML += `
        <tr>
            <td>${p.purchase_id}</td>
            <td>${p.supplier_id}</td>
            <td>${p.product_id}</td>
            <td>${p.quantity}</td>
            <td>${p.purchase_date?.split("T")[0] || p.purchase_date}</td>

            <td>
                <button onclick="editPurchase(
                    ${p.purchase_id},
                    ${p.supplier_id},
                    ${p.product_id},
                    ${p.quantity},
                    '${p.purchase_date?.split("T")[0] || p.purchase_date}'
                )">Edit</button>

                <button onclick="deletePurchase(${p.purchase_id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
async function addPurchase() {

    const purchase = {

        purchase_id: document.getElementById("pid").value,
        supplier_id: document.getElementById("psupplier").value,
        product_id: document.getElementById("pproduct").value,
        quantity: document.getElementById("pqty").value,
        purchase_date: document.getElementById("pdate").value
    };

    await fetch("http://localhost:3000/purchase", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(purchase)
    });

    loadPurchase();
}

function editPurchase(id, supplier, product, qty, date) {

    document.getElementById("epid").value = id;
    document.getElementById("epsupplier").value = supplier;
    document.getElementById("epproduct").value = product;
    document.getElementById("epqty").value = qty;
    document.getElementById("epdate").value = date;
}
async function updatePurchase() {

    const id = document.getElementById("epid").value;

    const purchase = {

        supplier_id: document.getElementById("epsupplier").value,
        product_id: document.getElementById("epproduct").value,
        quantity: document.getElementById("epqty").value,
        purchase_date: document.getElementById("epdate").value
    };

    await fetch(`http://localhost:3000/purchase/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(purchase)
    });

    loadPurchase();
}
async function updatePurchase() {

    const id = document.getElementById("epid").value;

    const purchase = {

        supplier_id: document.getElementById("epsupplier").value,
        product_id: document.getElementById("epproduct").value,
        quantity: document.getElementById("epqty").value,
        purchase_date: document.getElementById("epdate").value
    };

    await fetch(`http://localhost:3000/purchase/${id}`, {

        method: "PUT",
 
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(purchase)
    });

    loadPurchase();
}
if (document.getElementById("purchaseTable")) {
    loadPurchase();
}
async function loadSales() {

    const res = await fetch("http://localhost:3000/sales");
    const data = await res.json();

    const table = document.getElementById("salesTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(sale => {

        table.innerHTML += `
        <tr>
            <td>${sale.sales_id}</td>
            <td>${sale.product_id}</td>
            <td>${sale.quantity}</td>
            <td>${sale.sales_date?.split("T")[0] || sale.sales_date}</td>
            <td>${sale.selling_price}</td>

            <td>
                <button onclick="editSale(
                    ${sale.sales_id},
                    ${sale.product_id},
                    ${sale.quantity},
                    '${sale.sales_date?.split("T")[0] || sale.sales_date}',
                    ${sale.selling_price}
                )">Edit</button>

                <button onclick="deleteSale(${sale.sales_id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
async function addSale() {

    const sale = {

        sales_id: document.getElementById("saleid").value,
        product_id: document.getElementById("saleproduct").value,
        quantity: document.getElementById("saleqty").value,
        sales_date: document.getElementById("saledate").value,
        selling_price: document.getElementById("saleprice").value
    };

    await fetch("http://localhost:3000/sales", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(sale)
    });

    loadSales();
}

function editSale(id, product, qty, date, price) {

    document.getElementById("esaleid").value = id;
    document.getElementById("esaleproduct").value = product;
    document.getElementById("esaleqty").value = qty;
    document.getElementById("esaledate").value = date;
    document.getElementById("esaleprice").value = price;
}
async function deleteSale(id) {

    await fetch(`http://localhost:3000/sales/${id}`, {

        method: "DELETE"
    });

    loadSales();
}
if (document.getElementById("salesTable")) {
    loadSales();
}