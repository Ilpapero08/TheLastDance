let viaggi = [];

// Elementi comuni
let container2 = document.getElementById("container2");

const alertContainer = document.createElement("div");
alertContainer.className = "custom-alert-container";
document.body.appendChild(alertContainer);

function showAlert(message, variant = "secondary", duration = 3800) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${variant} custom-alert`;
    alertDiv.textContent = message;
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.classList.add("hide");
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 240);
    }, duration);

    alertDiv.addEventListener("transitionend", () => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    });
}

// Elementi specifici di index.html
let città = document.getElementById("city");
let data = document.getElementById("date");
let prezzo = document.getElementById("price");
let checkbox = document.getElementById("checkbox");
let città1 = document.getElementById("city1");

let btn = document.getElementById("butt");
let btn1 = document.getElementById("butt1");
let btn2 = document.getElementById("butt2");
let btn3 = document.getElementById("butt3");
let btn4 = document.getElementById("butt4");
let btnSave = document.getElementById("buttSave");
let btnGemini = document.getElementById("btnGemini");
let geminiOutput = document.getElementById("geminiOutput");

// Elementi pagina di login
let loginButton = document.getElementById("loginButton");
let username = document.getElementById("username");
let password = document.getElementById("password");

// Riferimenti agli elementi dei Modal e del testo interno
let modalElement1 = document.getElementById('mymodal');
let modalElement2 = document.getElementById('mymodal1');
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let p3 = document.getElementById("p3");

// Inizializzazione IMMEDIATA dei Modal globale tramite blocchi if tradizionali
let myModal = null;
let myModal1 = null;

if (window.bootstrap && modalElement1) {
    myModal = new bootstrap.Modal(modalElement1);
}

if (window.bootstrap && modalElement2) {
    myModal1 = new bootstrap.Modal(modalElement2);
}

// Lettura iniziale dei dati memorizzati nel Browser
let datiSalvati = localStorage.getItem("registroViaggi");
if (datiSalvati) {
    viaggi = JSON.parse(datiSalvati);
}

const isIndexPage = document.body.classList.contains("index-page");

// Chiamata immediata della funzione di rendering della tabella
lista();
showLoginWelcome();

// --- ASSEGNAZIONE DEGLI EVENTI ---
loginButton && loginButton.addEventListener('click', gestisciLogin);
btn && btn.addEventListener("click", aggiungi);
btn1 && btn1.addEventListener("click", mostraModalSpesa);
btn2 && btn2.addEventListener("click", mostraModalVoli);
btn3 && btn3.addEventListener("click", eliminaTutti);
btn4 && btn4.addEventListener("click", eliminaCittà);
btnSave && btnSave.addEventListener("click", salvaInLocalStorage);
btnGemini && btnGemini.addEventListener("click", generaConsigliGemini);

// --- LOGICA DELLE FUNZIONI ---

function gestisciLogin() {
    let user = username.value.trim();
    let pass = password.value;

    if (user == "admin" && pass == "admin") {
        sessionStorage.setItem("lastLoginUser", user);
        showAlert("ACCESSO EFFETTUATO! CREDENZIALI CORRETTE", "success");
        setTimeout(() => { window.location.href = 'index.html'; }, 700);
        return;
    } else {
        if (user.length != 0 && pass.length == 0) {
            showAlert("PER FAVORE INSERISCI ANCHE LA PASSWORD PRIMA DI PROSEGUIRE", "warning");
            return;
        } else if (user.length == 0 && pass.length != 0) {
            showAlert("PER FAVORE INSERISCI ANCHE L'USERNAME PRIMA DI PROSEGUIRE", "warning");
            return;
        } else if (user.length != 0 && pass.length != 0) {
            if (pass.length >= 8 && pass.length <= 20) {
                if (/[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass)) {
                    sessionStorage.setItem("lastLoginUser", user);
                    showAlert("ACCESSO EFFETTUATO! PASSWORD VALIDA", "success");
                    setTimeout(() => { window.location.href = 'index.html'; }, 700);
                    return;
                }
                showAlert("LA PASSWORD NON SODDISFA I REQUISITI MINIMI", "warning");
                return;
            }
            showAlert("LA PASSWORD NON SODDISFA I REQUISITI MINIMI", "warning");
            return;
        }
        showAlert("PER FAVORE COMPILA ENTRAMBI I CAMPI PRIMA DI PROSEGUIRE", "warning");
        return;
    }
}

function showLoginWelcome() {
    if (!isIndexPage) return;

    const savedUser = sessionStorage.getItem("lastLoginUser");
    if (!savedUser) return;

    showAlert(`Benvenuto/a ${savedUser}, al diario THE LAST DANCE`, "success", 4200);
    sessionStorage.removeItem("lastLoginUser");
}

function aggiungi() {
    let cit = città.value.trim();
    let date = data.value;
    let pr = parseFloat(prezzo.value);
    let check = checkbox.checked;

    if (cit == "" || date == "" || isNaN(pr)) {
        showAlert("Compila tutti i campi correttamente prima di procedere.", "warning");
        return;
    }

    let partiData = date.split("-");
    let dataIt = partiData[2] + "-" + partiData[1] + "-" + partiData[0];

    if (controllaDuplicati(cit) == -1) {
        let viaggio = {
            città: cit,
            data: dataIt,
            prezzo: pr,
            checkbox: check
        };

        viaggi.push(viaggio);
        localStorage.setItem("registroViaggi", JSON.stringify(viaggi));
        showAlert("Viaggio registrato in elenco!", "success");
        lista();
        
        città.value = "";
        data.value = "";
        prezzo.value = "";
        checkbox.checked = false;
    } else {
        showAlert("Questa città esiste già nel tuo registro storico!", "warning");
    }
}

function controllaDuplicati(nomeCitta) {
    for (let i = 0; i < viaggi.length; i++) {
        if (viaggi[i].città.toLowerCase() == nomeCitta.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

function eliminaCittà() {
    let cit = città1.value.trim();
    let indice = controllaDuplicati(cit);

    if (indice != -1) {
        viaggi.splice(indice, 1);
        localStorage.setItem("registroViaggi", JSON.stringify(viaggi));
        showAlert("Viaggio eliminato con successo.", "success");
        città1.value = "";
        lista();
    } else {
        showAlert("La città indicata non è presente nell'elenco.", "warning");
    }
}

function eliminaTutti() {
    if (confirm("Attenzione: vuoi svuotare completamente l'elenco corrente e i record di Local Storage?")) {
        viaggi = [];
        localStorage.removeItem("registroViaggi");
        lista();
        showAlert("Archivio azzerato.", "success");
    }
}

// --- GENERAZIONE DINAMICA DELLA TABELLA (createElement & appendChild) ---
function lista() {
    if (!container2) return;
    container2.innerHTML = "";
    
    if (viaggi.length == 0) {
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-secondary text-center";
        alertDiv.textContent = "Nessun viaggio presente in memoria.";
        container2.appendChild(alertDiv);
        return;
    }

    let p = document.createElement("p");
    let strongText = document.createElement("strong");
    strongText.textContent = "Numero complessivo di viaggi salvati: ";
    p.appendChild(strongText);
    p.appendChild(document.createTextNode(viaggi.length));
    container2.appendChild(p);

    let table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    // Creazione del Thead
    let thead = document.createElement("thead");
    let headerTr = document.createElement("tr");
    let intestazioni = ["Città", "Data", "Costo Totale", "Volo aereo"];
    
    intestazioni.forEach(testo => {
        let th = document.createElement("th");
        th.textContent = testo;
        headerTr.appendChild(th);
    });
    thead.appendChild(headerTr);
    table.appendChild(thead);

    // Creazione del Tbody
    let tbody = document.createElement("tbody");
    for (let i = 0; i < viaggi.length; i++) {
        let tr = document.createElement("tr");
        
        let tdCitta = document.createElement("td");
        tdCitta.textContent = viaggi[i].città;
        tr.appendChild(tdCitta);
        
        let tdData = document.createElement("td");
        tdData.textContent = viaggi[i].data;
        tr.appendChild(tdData);
        
        let tdPrezzo = document.createElement("td");
        tdPrezzo.textContent = viaggi[i].prezzo.toFixed(2) + " €";
        tr.appendChild(tdPrezzo);
        
        let tdVolo = document.createElement("td");
        // Sostituito l'operatore ternario con un blocco if-else classico
        if (viaggi[i].checkbox == true) {
            tdVolo.textContent = "Sì ✈️";
        } else {
            tdVolo.textContent = "No 🚗";
        }
        tr.appendChild(tdVolo);
        
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container2.appendChild(table);
}

// --- POPOLAMENTO MODAL ---

function mostraModalSpesa() {
    let tot = 0;
    for (let i = 0; i < viaggi.length; i++) {
        tot += viaggi[i].prezzo;
    }
    
    if (p1) {
        p1.textContent = "La somma totale calcolata ammonta a: ";
        let strongSpesa = document.createElement("strong");
        strongSpesa.textContent = tot.toFixed(2) + " €";
        p1.appendChild(strongSpesa);
    }
    
    if (myModal) {
        myModal.show();
    }
}

function mostraModalVoli() {
    let aereoCitta = [];
    let contatoreVoli = 0;

    for (let i = 0; i < viaggi.length; i++) {
        if (viaggi[i].checkbox == true) {
            contatoreVoli++;
            aereoCitta.push(viaggi[i].città);
        }
    }
    
    if (p2) {
        p2.textContent = "L'utente ha preso il volo per un totale di ";
        let strongVoli = document.createElement("strong");
        strongVoli.textContent = contatoreVoli;
        p2.appendChild(strongVoli);
        p2.appendChild(document.createTextNode(" volte."));
    }
    
    if (p3) {
        p3.textContent = "";
        if (aereoCitta.length > 0) {
            p3.textContent = aereoCitta.join(", ");
        } else {
            p3.textContent = "Nessun volo inserito.";
        }
    }
    
    if (myModal1) {
        myModal1.show();
    }
}

function salvaInLocalStorage() {
    localStorage.setItem("registroViaggi", JSON.stringify(viaggi));
    showAlert("Database locale aggiornato e sincronizzato nel browser con successo!", "success");
}

// --- FUNZIONALITA' GEMINI API  ---

async function generaConsigliGemini() {
    if (!geminiOutput) return;

    if (viaggi.length === 0) {
        geminiOutput.innerHTML = '<div class="alert alert-warning">Aggiungi almeno una città visitata per generare suggerimenti.</div>';
        return;
    }

    geminiOutput.innerHTML = '<div class="alert alert-info">Invio richiesta a Gemini... attendere.</div>';

    const API_KEY = "LA_TUA_API_KEY_GEMINI_QUI"; 
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const cittàVisitate = viaggi.map(v => v.città);
    const datiViaggiJSON = JSON.stringify(cittàVisitate);
    
    const prompt = `Leggi i seguenti dati in JSON:\n${datiViaggiJSON}\nRispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuove città che potrei visitare in base ai dati che ti ho fornito. Il JSON che devi fornire deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti dove ogni oggetto ha 2 campi: nome che contiene il nome della città e descrizione che contiene una brevissima descrizione sul perchè quella città è stata proposta.`;

    const oggettoRichiestaGemini = {
        "contents": [
            {
                "parts": [
                    { "text": prompt }
                ]
            }
        ]
    };

    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oggettoRichiestaGemini)
        });

        const data = await response.json();
        
        if (!response.ok) {
            geminiOutput.innerHTML = `<div class="alert alert-danger">Errore Gemini: ${response.status}</div>`;
            return;
        }

        const textOutput = data.candidates[0].content.parts[0].text;
        
        let consigli;
        try {
            consigli = JSON.parse(textOutput);
        } catch (e) {
            let cleanedText = textOutput.replace(/```json/g, "").replace(/```/g, "").trim();
            consigli = JSON.parse(cleanedText);
        }

        let htmlContent = `<h4 class="mb-3 text-primary">Le mete suggerite per te:</h4><ul class="list-group">`;
        
        if (consigli.listaSuggerimenti && consigli.listaSuggerimenti.length > 0) {
            consigli.listaSuggerimenti.forEach(citta => {
                htmlContent += `<li class="list-group-item"><strong>${citta.nome}</strong>: ${citta.descrizione}</li>`;
            });
        } else {
            htmlContent += `<li class="list-group-item text-danger">Nessun suggerimento trovato.</li>`;
        }
        
        htmlContent += `</ul>`;
        
        geminiOutput.innerHTML = `<div class="p-3 border rounded bg-white shadow-sm">${htmlContent}</div>`;

    } catch (error) {
        console.error("Errore completo:", error);
        geminiOutput.innerHTML = `<div class="alert alert-danger">Errore durante la chiamata a Gemini: Assicurati che l'API Key sia valida e di avere una connessione attiva.</div>`;
    }
}