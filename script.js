let viaggi=[];

let città= document.getElementById("city");
let data=document.getElementById("date");
let prezzo=document.getElementById("price");
let checkbox=document.getElementById("checkbox");
let container2=document.getElementById("container2");

let città1=document.getElementById("city1");

let btn=document.getElementById("butt");
let btn1=document.getElementById("butt1");
let btn2=document.getElementById("butt2");
let btn3=document.getElementById("butt3");
let btn4=document.getElementById("butt4");

let myModal = new bootstrap.Modal(document.getElementById('mymodal'));
let p2=document.getElementById("p1");

let myModal1 = new bootstrap.Modal(document.getElementById('mymodal1'));
let p3=document.getElementById("p2");

btn.addEventListener("click",aggiungi);
btn1.addEventListener("click",modal);
btn2.addEventListener("click",modal2);
btn3.addEventListener("click",elimina);
btn4.addEventListener("click",eliminaCittà);




function aggiungi(){
    let cit=città.value;
    let date=data.value;
    let pr=prezzo.value;
    let check=checkbox.checked;

    let dat=new Date(date);
    let dataIt=dat.toLocaleDateString("it-IT");

    if(controlla(cit)==-1){
        let viaggio={
            città:cit,
            data:dataIt,
            prezzo:pr,
            checkbox:check,
        };

        if(viaggi.length==0){
            container.innerHTML=" ";
        }
        viaggi.push(viaggio);

        alert("aggiunto");

    }else{
        alert("Viaggio inserito in precedenza");
    }

}

function controlla(città){
    for(let i=0;i<viaggi.length;i++){
        if(viaggi[i].città==città){
            return i;
        }
    }
    return -1;
}

function eliminaCittà(){
    let cit=città1.value;
    for(let i=0;i<viaggi.length;i++){
        if(viaggi[i].città==cit){
            viaggi.pop(i);
            alert("Viaggio eliminato");
            return;
        }
    }
    alert("Viaggio non trovato");
}

function elimina(){
    container2.innerHTML=" ";
    viaggi.length=0;
}

function lista(){
    container2.innerHTML=" ";
    let table=document.createElement("table");
    let p=document.createElement("p");
    p.innerHTML="Lista dei viaggi"+" "+viaggi.length;
    container2.appendChild(p);

    let tr=document.createElement("tr");
    let td3=document.createElement("td");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td4=document.createElement("td");

    td1.innerHTML="Città";
    td2.innerHTML="Data";
    td3.innerHTML="Prezzo";
    td4.innerHTML="Checkbox";


    tr.appendChild(td3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td4);
    table.appendChild(tr);

    for(let i=0;i<viaggi.length;i++){

        let tr=document.createElement("tr");
        let td3=document.createElement("td");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td4=document.createElement("td");
        td1.innerHTML=viaggi[i].città;
        td2.innerHTML=viaggi[i].data;
        td3.innerHTML=viaggi[i].prezzo;
        td4.innerHTML=viaggi[i].checkbox;

        tr.appendChild(td3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td4);
        table.appendChild(tr);

    }
    
    container2.appendChild(table);
}

function modal(){
    let tot=0;
    for(let i=0;i<viaggi.length;i++){
        tot=tot+viaggi[i].prezzo;
    }
    p2.innerHTML=tot;
    myModal.show();

}

function modal2(){
    let str="";
    let tot=0;

    for(let i=0;i<viaggi.length;i++){
        if(viaggi[i].checkbox==true){
            tot=tot+1;
            str=str+" "+viaggi[i].città;
        }
    }
    p2.innerHTML=tot;
    p3.innerHTML=str;
    myModal1.show();

    lista();
    
}