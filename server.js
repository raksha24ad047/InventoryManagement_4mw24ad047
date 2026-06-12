const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// DB
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1239",
    database: "InventoryManagement"
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("MySQL Connected ✅");
});


// ================= PRODUCTS (FULL CRUD) =================
app.get("/products", (req, res) => {
    db.query("SELECT * FROM Product", (err, r) => res.json(r));
});

app.post("/products", (req, res) => {
    const { product_id, name, category, price } = req.body;
    db.query("INSERT INTO Product VALUES (?,?,?,?)",
        [product_id, name, category, price],
        () => res.send("OK"));
});

app.delete("/products/:id", (req, res) => {
    db.query("DELETE FROM Product WHERE product_id=?",
        [req.params.id],
        () => res.send("OK"));
});

app.put("/products/:id", (req, res) => {
    const { name, category, price } = req.body;
    db.query(
        "UPDATE Product SET name=?, category=?, price=? WHERE product_id=?",
        [name, category, price, req.params.id],
        () => res.send("OK")
    );
});


// ================= SUPPLIER =================
app.get("/suppliers", (req, res) => {
    db.query("SELECT * FROM Supplier", (err, r) => res.json(r));
});

app.post("/suppliers", (req, res) => {
    const { supplier_id, name, phone, address } = req.body;
    db.query("INSERT INTO Supplier VALUES (?,?,?,?)",
        [supplier_id, name, phone, address],
        () => res.send("OK"));
});

app.delete("/suppliers/:id", (req, res) => {
    db.query("DELETE FROM Supplier WHERE supplier_id=?",
        [req.params.id],
        () => res.send("OK"));
});

app.put("/suppliers/:id", (req, res) => {
    const { name, phone, address } = req.body;
    db.query(
        "UPDATE Supplier SET name=?, phone=?, address=? WHERE supplier_id=?",
        [name, phone, address, req.params.id],
        () => res.send("OK")
    );
});
app.put("/suppliers/:id", (req, res) => {
    const { name, phone, address } = req.body;

    db.query(
        "UPDATE Supplier SET name=?, phone=?, address=? WHERE supplier_id=?",
        [name, phone, address, req.params.id],
        () => res.send("Updated")
    );
});


// ================= PURCHASE =================
app.get("/purchase", (req, res) => {
    db.query("SELECT * FROM Purchase", (err, r) => res.json(r));
});

app.post("/purchase", (req, res) => {
    const { purchase_id, supplier_id, product_id, quantity, purchase_date } = req.body;
    db.query("INSERT INTO Purchase VALUES (?,?,?,?,?)",
        [purchase_id, supplier_id, product_id, quantity, purchase_date],
        () => res.send("OK"));
});

app.delete("/purchase/:id", (req, res) => {
    db.query("DELETE FROM Purchase WHERE purchase_id=?",
        [req.params.id],
        () => res.send("OK"));
});
app.put("/purchase/:id", (req, res) => {
    const {
        supplier_id,
        product_id,
        quantity,
        purchase_date
    } = req.body;

    db.query(
        `UPDATE Purchase
         SET supplier_id=?,
             product_id=?,
             quantity=?,
             purchase_date=?
         WHERE purchase_id=?`,
        [
            supplier_id,
            product_id,
            quantity,
            purchase_date,
            req.params.id
        ],
        () => res.send("Updated")
    );
});

// ================= SALES ============;
app.post("/sales", (req, res) => {
    const { sales_id, product_id, quantity, sales_date, selling_price } = req.body;
    db.query("INSERT INTO Sales VALUES (?,?,?,?,?)",
        [sales_id, product_id, quantity, sales_date, selling_price],
        () => res.send("OK"));
});

app.delete("/sales/:id", (req, res) => {
    db.query("DELETE FROM Sales WHERE sales_id=?",
        [req.params.id],
        () => res.send("OK"));
});
app.put("/sales/:id", (req, res) => {
    const {
        product_id,
        quantity,
        sales_date,
        selling_price
    } = req.body;

    db.query(
        `UPDATE Sales
         SET product_id=?,
             quantity=?,
             sales_date=?,
             selling_price=?
         WHERE sales_id=?`,
        [
            product_id,
            quantity,
            sales_date,
            selling_price,
            req.params.id
        ],
        () => res.send("Updated")
    );
});


// ================= WAREHOUSE =================
app.get("/warehouse", (req, res) => {
    db.query("SELECT * FROM Warehouse", (err, r) => res.json(r));
});

app.post("/warehouse", (req, res) => {
    const { warehouse_id, location } = req.body;
    db.query("INSERT INTO Warehouse VALUES (?,?)",
        [warehouse_id, location],
        () => res.send("OK"));
});

app.delete("/warehouse/:id", (req, res) => {
    db.query("DELETE FROM Warehouse WHERE warehouse_id=?",
        [req.params.id],
        () => res.send("OK"));
});
app.put("/warehouse/:id", (req, res) => {
    const { location } = req.body;

    db.query(
        "UPDATE Warehouse SET location=? WHERE warehouse_id=?",
        [location, req.params.id],
        () => res.send("Updated")
    );
});

// ================= STOCK =================
app.get("/stock", (req, res) => {
    db.query("SELECT * FROM Stock", (err, r) => res.json(r));
});

app.post("/stock", (req, res) => {
    const { stock_id, product_id, warehouse_id, quantity } = req.body;
    db.query("INSERT INTO Stock VALUES (?,?,?,?)",
        [stock_id, product_id, warehouse_id, quantity],
        () => res.send("OK"));
});

app.delete("/stock/:id", (req, res) => {
    db.query("DELETE FROM Stock WHERE stock_id=?",
        [req.params.id],
        () => res.send("OK"));
});
app.put("/stock/:id", (req, res) => {
    const { product_id, warehouse_id, quantity } = req.body;

    db.query(
        "UPDATE Stock SET product_id=?, warehouse_id=?, quantity=? WHERE stock_id=?",
        [product_id, warehouse_id, quantity, req.params.id],
        () => res.send("Updated")
    );
});

// SERVER
app.listen(3000, () => {
    console.log("Server running on 3000 🚀");
});
