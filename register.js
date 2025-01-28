document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const checkbox = form.querySelector("#firmenkunde");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Verhindert das Standardformular-Verhalten

        const inputs = form.querySelectorAll("input");
        let isValid = true;

        // Validierung der Eingabefelder
        const vorname = document.getElementById("vorname").value;
        const nachname = document.getElementById("nachname").value;
        const address = document.getElementById("address").value;
        const address2 = document.getElementById("address2").value;
        const telefon = document.getElementById("telefon").value;
        const email = document.getElementById("email").value;
        if (vorname === "" || nachname === "" || address === "" || address2 === "" || telefon === "" || email === "") {
            document.getElementById("submitFalse").style.display = "block";
            isValid = false;
        }


        // Wenn alle Eingaben gültig sind
        if (isValid) {
            // Formulardaten sammeln
            const vorname = document.getElementById("vorname").value;
            const nachname = document.getElementById("nachname").value;
            const address = document.getElementById("address").value;
            const address2 = document.getElementById("address2").value;
            const telefon = document.getElementById("telefon").value;
            const email = document.getElementById("email").value;
            const firmenkunde = document.getElementById("firmenkunde").value;
            const formData = {
                vorname,
                nachname,
                address,
                address2,
                telefon,
                email,
                firmenkunde
            };

            console.log(formData);
            try {
                // Daten über fetch an den Server senden
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // Daten in JSON konvertieren
                });

                if (response.ok) {
                    const data = await response.json(); // Antwort als JSON parsen
                    console.log("Erfolgreich:", data.customerId); // Serverantwort im Log anzeigen
                    alert("Registrierung erfolgreich!"); // Erfolgsnachricht für den Benutzer
                    document.getElementById('submitFalse').style.display = "none";
                    const submitFeedback = document.getElementById('submitFeedback');
                    submitFeedback.textContent = `Du wurdest erfolgreich registriert! Kunden-ID: ${data.customerId} Merke sie dir gut!`;
                    submitFeedback.style.display = "block";
                } else {
                    throw new Error("Fehler beim Absenden des Formulars", err.message);
                }
            } catch (error) {
                console.error("Fehler:", error); // Fehler im Log anzeigen
                alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."); // Fehlermeldung für den Benutzer
            }
        }
    });
});
