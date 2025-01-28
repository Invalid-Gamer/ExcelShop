import mysql from 'mysql2';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// MySQL Verbindungspool erstellen
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true
}).promise();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Beispiel-Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// POST-Route für Bestellungen
app.post("/", async (req, res) => {
    const { bestellung, ID } = req.body;

    console.log(bestellung);

    if (!bestellung) {
        return res.status(400).send("Keine Bestelldaten!");
    }

    // Überprüfen, ob die Kunden-ID existiert
    const checkCustomerQuery = 'SELECT COUNT(*) AS customerExists FROM Kunden WHERE KundenNr = ?';
    try {
        const [customerRows] = await connection.query(checkCustomerQuery, [ID]);
        const customerExists = customerRows[0].customerExists;

        if (customerExists === 0) {
            return res.status(404).json({ message: "Kunden-ID existiert nicht!" });
        }

        // SQL-Abfrage zum Einfügen der Bestellung
        const insertOrderQuery = 'INSERT INTO Rechnungen (ID, Bestellung, Confirmed, Kunde) VALUES (NULL, ?, 0, ?)';
        const [insertResults] = await connection.execute(insertOrderQuery, [bestellung, ID]);
        console.log('Bestellung erfolgreich eingefügt:', insertResults);

        // Neueste OrderNr abfragen
        const getOrderNrQuery = 'SELECT ID FROM Rechnungen ORDER BY ID DESC LIMIT 1';
        const [rows] = await connection.query(getOrderNrQuery);
        const OrderNr = rows[0]?.ID; // Neueste OrderNr

        if (!OrderNr) {
            return res.status(500).send("Fehler beim Abrufen der OrderNr!");
        }

        // SQL-Abfrage zum Aktualisieren der Kunden-Tabelle
        const updateCustomerQuery = `
            UPDATE Kunden
            SET Orders = CONCAT(COALESCE(Orders, ''), ?, ',')
            WHERE KundenNr = ?`;

        // Bestellung in der Kunden-Tabelle aktualisieren
        const [updateResults] = await connection.query(updateCustomerQuery, [OrderNr, ID]);
        console.log('Tabelle Kunden erfolgreich aktualisiert:', updateResults);

        res.status(200).send("Bestellung erfolgreich verarbeitet!");
    } catch (err) {
        console.error('Fehler beim Verarbeiten der Bestellung:', err.message);
        res.status(500).send("Fehler beim Verarbeiten der Bestellung!");
    }
});

// POST-Route für neue Kundenregistrierung
app.post("/register", async (req, res) => {
    const {
        vorname,
        nachname,
        address,
        address2,
        telefon,
        email,
        firmenkunde
    } = req.body;

    // Überprüfen, ob alle Felder vorhanden sind
    if (!vorname || !nachname || !address || !telefon || !email) {
        return res.status(400).json({ message: "Bitte alle erforderlichen Felder ausfüllen!" });
    }

    try {
        // SQL-Abfrage zum Einfügen des neuen Kunden
        const insertCustomerQuery = `
            INSERT INTO Kunden 
            (KundenNr, Vorname, Nachname, Addresse, Addresszusatz, Telefon, EMail, Firmenkunde, Orders) 
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(insertCustomerQuery, [
            vorname,
            nachname,
            address,
            address2, // Leerer String, falls Addresszusatz nicht angegeben
            telefon,
            email,
            firmenkunde ? 1 : 0, // Boolean in 1 oder 0 umwandeln
            "," // Initialer Wert für Orders
        ]);

        console.log("Neuer Kunde erfolgreich eingefügt:", result);

        // Erfolgsantwort
        res.status(201).json({ message: "Kunde erfolgreich registriert!", customerId: result.insertId });
    } catch (err) {
        console.error("Fehler beim Hinzufügen des neuen Kunden:", err.message);
        res.status(500).json({ message: "Fehler beim Hinzufügen des Kunden!" });
    }
});


// Server starten
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Optional: Abfrage von Kunden-Daten (Nicht erforderlich, da du den Pool im POST-Request verwendest)
(async () => {
    try {
        const [result] = await connection.query("SELECT * FROM Kunden");
        console.log(result);
    } catch (err) {
        console.error('Fehler beim Abrufen der Kunden-Daten:', err.message);
    }
})();
