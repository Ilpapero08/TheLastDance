let viaggi = [];

// Elementi comuni
let container2 = document.getElementById("container2");

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

// Gestione dinamica dei Modal
let modalElement1 = document.getElementById('mymodal');
let modalElement2 = document.getElementById('mymodal1');
let myModal, myModal1, p1, p2, p3;

if (modalElement1 && modalElement2) {
    myModal = new bootstrap.Modal(modalElement1);
    p1 = document.getElementById("p1");
    
    myModal1 = new bootstrap.Modal(modalElement2);
    p2 = document.getElementById("p2");
    p3 = document.getElementById("p3");
}

// Lettura iniziale dei dati memorizzati nel Browser
let datiSalvati = localStorage.getItem("registroViaggi");
if (datiSalvati) {
    viaggi = JSON.parse(datiSalvati);
}

// Disegna la tabella dei dati caricati al boot su qualunque pagina si trovi
lista();

// Attivazione ascoltatori eventi solo se siamo nella pagina del form (index.html)
if (btn) btn.addEventListener("click", aggiungi);
if (btn1) btn1.addEventListener("click", mostraModalSpesa);
if (btn2) btn2.addEventListener("click", mostraModalVoli);
if (btn3) btn3.addEventListener("click", eliminaTutti);
if (btn4) btn4.addEventListener("click", eliminaCittà);
if (btnSave) btnSave.addEventListener("click", salvaInLocalStorage);


// --- Logica delle Funzioni ---

function aggiungi() {
    let cit = città.value.trim();
    let date = data.value;
    let pr = parseFloat(prezzo.value);
    let check = checkbox.checked;

    if (cit === "" || date === "" || isNaN(pr)) {
        alert("Compila tutti i campi correttamente prima di procedere.");
        return;
    }

    let partiData = date.split("-");
    let dataIt = `${partiData[2]}-${partiData[1]}-${partiData[0]}`;

    if (controllaDuplicati(cit) == -1) {
        let viaggio = {
            città: cit,
            data: dataIt,
            prezzo: pr,
            checkbox: check
        };

        viaggi.push(viaggio);
        alert("Viaggio registrato in elenco!");
        lista();
        
        città.value = "";
        data.value = "";
        prezzo.value = "";
        checkbox.checked = false;
    } else {
        alert("Questa città esiste già nel tuo registro storico!");
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
        alert("Viaggio eliminato con successo.");
        città1.value = "";
        lista();
    } else {
        alert("La città indicata non è presente nell'elenco.");
    }
}

function eliminaTutti() {
    if (confirm("Attenzione: vuoi svuotare completamente l'elenco corrente e i record di Local Storage?")) {
        viaggi = [];
        localStorage.removeItem("registroViaggi");
        lista();
        alert("Archivio azzerato.");
    }
}

function lista() {
    if (!container2) return;
    container2.innerHTML = "";
    
    if (viaggi.length === 0) {
        container2.innerHTML = `<div class="alert alert-secondary text-center">Nessun viaggio presente in memoria.</div>`;
        return;
    }

    let p = document.createElement("p");
    p.innerHTML = "<strong>Numero complessivo di viaggi salvati:</strong> " + viaggi.length;
    container2.appendChild(p);

    let table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Città</th>
                <th>Data</th>
                <th>Costo Totale</th>
                <th>Volo aereo</th>
            </tr>
        </thead>
    `;

    let tbody = document.createElement("tbody");
    for (let i = 0; i < viaggi.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${viaggi[i].città}</td>
            <td>${viaggi[i].data}</td>
            <td>${viaggi[i].prezzo.toFixed(2)} €</td>
            <td>${viaggi[i].checkbox ? "Sì ✈️" : "No 🚗"}</td>
        `;
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container2.appendChild(table);
}

// Gestione dei dati nei pannelli a comparsa (Modal)
function mostraModalSpesa() {
    let tot = 0;
    for (let i = 0; i < viaggi.length; i++) {
        tot += viaggi[i].prezzo;
    }
    p1.innerHTML = "La somma totale calcolata ammonta a: <strong>" + tot.toFixed(2) + " €</strong>";
    myModal.show();
}

// Elenco tratte aeree
function mostraModalVoli() {
    let aereoCitta = [];
    let contatoreVoli = 0;

    for (let i = 0; i < viaggi.length; i++) {
        if (viaggi[i].checkbox === true) {
            contatoreVoli++;
            aereoCitta.push(viaggi[i].città);
        }
    }
    
    p2.innerHTML = "L'utente ha preso il volo per un totale di <strong>" + contatoreVoli + "</strong> volte.";
    p3.innerHTML = aereoCitta.length > 0 ? aereoCitta.join(", ") : "Nessun volo inserito.";
    myModal1.show();
}

function salvaInLocalStorage() {
    localStorage.setItem("registroViaggi", JSON.stringify(viaggi));
    alert("Database locale aggiornato e sincronizzato nel browser con successo!");
}