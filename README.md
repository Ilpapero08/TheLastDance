# 🌍 Registro Viaggi con Integrazione Gemini IA

Un'applicazione web frontend pulita ed elegante progettata per registrare e gestire lo storico dei propri viaggi, monitorare le spese complessive, calcolare le statistiche dei voli e ricevere consigli di viaggio personalizzati tramite l'API ufficiale di Google Gemini.

---

## 🚀 Funzionalità Principali

*   **Gestione Itinerari:** Inserimento dinamico dei viaggi completi di Città, Data, Spesa in Euro (€) e opzione per specificare l'utilizzo dell'aereo.
*   **Zona Rimozione:** Possibilità di cancellare un singolo viaggio cercandolo per nome della città oppure di svuotare completamente l'intero archivio.
*   **Archivio Persistente:** Integrazione con il `localStorage` del browser per caricare automaticamente i dati salvati all'avvio dell'applicazione.
*   **Statistiche Interattive (Modal Bootstrap):** Finestre a comparsa per visualizzare il totale speso aggiornato e l'elenco specifico delle città visitate in aereo.
*   **Consigli con Intelligenza Artificiale:** Un sistema semplificato che legge la prima città del tuo storico e interroga Gemini per suggerirti una meta simile.

---

## 🛠️ Tecnologie Utilizzate

*   **HTML5** - Struttura semantica del layout e gestione dei moduli di inserimento.
*   **Bootstrap 5** - Stilizzazione responsiva, griglie flessibili, bottoni e gestione dei pannelli a comparsa (Modal).
*   **JavaScript (ES6)** - Logica di controllo degli input, gestione dell'array dei viaggi, persistenza dati e chiamate asincrone.
*   **Gemini API** - Modello `gemini-2.5-flash` integrato via endpoint REST per la generazione dei contenuti.

---

## 📦 Struttura dei File

Il progetto si basa su una struttura frontend leggera e immediata:
1.  `index.html` - Interfaccia utente con il form di inserimento, la pulsantiera delle statistiche, la zona IA e le strutture dei Modal.
2.  `script.js` - Gestione degli eventi, calcolo dei dati memorizzati e funzione di chiamata a Google Gemini.
3.  `style.css` - Foglio di stile personalizzato per la componente grafica e l'identità visiva del portale.

---

## 💡 Configurazione della Chiave API

Per abilitare il funzionamento corretto del modulo di Intelligenza Artificiale, apri il file `script.js` e inserisci il tuo token personale nella costante dedicata in cima al file:

```javascript
const CHIAVE_GEMINI = "LA_TUA_API_KEY_REALE_QUI";
