# 🌍 Registro Viaggi "The Last Dance" con Integrazione Gemini IA

Un'applicazione web frontend completa, pulita ed elegante progettata per gestire il proprio diario di viaggio digitale. Il sistema permette di autenticarsi, registrare e monitorare le tappe degli itinerari, calcolare delle spese complessive, tracciare i voli e ricevere consigli di viaggio personalizzati sfruttando l'API ufficiale di Google Gemini.

---

## 🚀 Funzionalità Principali

* **Autenticazione d'Ingresso:** Pagina di login curata con criteri visivi per password sicure (lunghezza tra 8 e 20 caratteri, presenza di maiuscole, omissione di caratteri banali e presenza di numeri).
* **Gestione Itinerari:** Inserimento dinamico dei viaggi con controllo dei duplicati. Ogni record memorizza Città, Data, Spesa in Euro (€) e specifica se è stato utilizzato l'aereo.
* **Archivio Persistente:** Integrazione nativa con il `localStorage` del browser per garantire che i dati non vadano persi alla chiusura della pagina.
* **Dashboard Storico:** Pagina di riepilogo dedicata che genera tabelle strutturate e dinamiche per consultare rapidamente tutti i dati memorizzati.
* **Statistiche Interattive (Modal Bootstrap):** Finestre a comparsa in tempo reale per calcolare la spesa totale complessiva e tracciare il numero esatto di voli effettuati con le relative mete.
* **Consigli con Intelligenza Artificiale:** Integrazione con il modello `gemini-2.5-flash` per analizzare lo storico dell'utente e suggerire mete affini.

---

## 🛠️ Tecnologie Utilizzate

* **HTML5** - Struttura semantica delle tre sezioni dell'applicazione (Autenticazione, Inserimento, Archivio).
* **Bootstrap 5** - Griglie responsive, classi di formattazione stili, bottoni e finestre modali interattive.
* **JavaScript (ES6)** - Architettura asincrona, manipolazione dinamica del DOM, gestione array e persistenza.
* **Gemini API** - Modello linguistico avanzato interrogato tramite chiamate HTTP REST asincrone.

---

## 📦 Struttura del Progetto

L'applicazione è strutturata in modo modulare su tre schermate principali collegate a un unico motore logico e grafico:

1. **`login.html` (Pagina di Login):** La shell d'ingresso ("The Last Dance") dotata di form di sbarco e indicazioni sui parametri di sicurezza.
2. **`index.html` (Pannello di Gestione):** Il nucleo operativo dove si trova il modulo di aggiunta, la pulsantiera statistica, la sezione di rimozione (singola o totale) e il tasto per attivare l'assistente IA.
3. **`archivio.html` (Storico Archivio):** Schermata di riepilogo raffinata che ospita la tabella generata dinamicamente con lo storico di tutti i viaggi.
4. **`script.js`:** Il file sorgente JavaScript globale che controlla i flussi, i modal, il ciclo di vita del `localStorage` e le chiamate fetch verso Google.
5. **`style.css`:** Il foglio di stile centralizzato che definisce l'identità visiva, le card grafiche e le varianti di layout del portale.

---

## 💡 Configurazione della Chiave API

Per abilitare le funzioni di Intelligenza Artificiale, apri il file `script.js` e inserisci il tuo token ottenuto da Google AI Studio nella costante a riga numero 351:

> `const API_KEY = "LA_TUA_API_KEY_GEMINI_QUI";`

---

## 👥 Suddivisione del Lavoro

Le attività di progettazione, sviluppo del codice e rifinitura grafica sono state ripartite tra i membri del team secondo lo schema seguente:

| Componente del Team | Ruoli e Compiti Principali |
| :--- | :--- |
| **Cristian Innocenti** | **Sviluppo Logica e CSS** |
| **Soufian Hammoudi** | **Sviluppo Logica e Integrazione Bootstrap** |
| **Mattia De Pace** | **Struttura Login e CSS** |
