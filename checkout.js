document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault();

  const KundenID = document.getElementById('Kunden-ID').value;
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  let bestellung = "";

  // Bestellinformationen aus dem Warenkorb zusammensetzen
  cart.forEach(item => {
    bestellung = bestellung + `${item.id},${item.quantity};`;
  });
  bestellung = bestellung.replace(/;$/, '');  // Entfernen des letzten Semikolons

  console.log(bestellung);

  // Überprüfen, ob die Kunden-ID und die Bestellung vorliegen
  if (!KundenID) {
    document.getElementById('KundenIDNix').style.display = 'block';
    return;
  } else {
    document.getElementById('KundenIDNix').style.display = 'none';
  }

  if (!bestellung) {
    alert('Dein Warenkorb ist leer!');
    return;
  }

  // API-Aufruf, um die Bestellung zu speichern
  fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bestellung: bestellung, ID: KundenID }),
  })
      .then(response => {
        if (response.ok) {
          // Erfolgreiche Antwort vom Backend
          console.log("Bestellung erfolgreich verarbeitet!");
        } else {
          // Fehlerhafte Antwort vom Backend, Fehlermeldung anzeigen
          response.json().then(data => {
            console.error("Fehler:", data.message);
            if (data.message && data.message === 'Kunden-ID existiert nicht!') {
              document.getElementById('KundenIdError').style.display = 'block';
              sessionStorage.removeItem('submitLock');
            } else {
              document.getElementById('KundenIdError').style.display = 'none';
            }
          });
        }
      })

      .catch(err => {
        // Fehler bei der Anfrage (z.B. Netzwerkfehler)
        console.error('Fehler bei der Anfrage:', err);
      });

  // Warenkorb zurücksetzen und Button deaktivieren
  sessionStorage.setItem('cart', JSON.stringify(''));
  document.getElementById('submit').disabled = true;
  sessionStorage.setItem('submitLock', JSON.stringify(true));
  document.getElementById('submitFeedback').style.display = 'block';

  // Button nach 5 Minuten wieder aktivieren
  setTimeout(() => {
    sessionStorage.removeItem('submitLock');
    document.getElementById('submit').disabled = false;
  }, 300000); // 300.000 Millisekunden = 5 Minuten
});
