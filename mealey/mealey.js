var tablediv,gecici=[],gecici2=[],durumlar=[];
var i,b=0,a=0;
var addTable="";
var input = [];
var sonuclar = [];
var durumDizisi,gecisDizisi;
var aranacaKelime=[];
var sonuc="";
var inputHeader="";
var durum="";

function add() {
    instring = document.getElementById('search').value.toUpperCase();
    for(i=0;i<instring.length;i++){
        aranacaKelime[i]=instring.charAt(i);
    }

    durumDizisi=document.getElementById('state').value;
    durumDizisi = durumDizisi.split(',');

    gecisDizisi=document.getElementById('transition').value.toUpperCase();
    gecisDizisi = gecisDizisi.split(',');

    tablediv = document.getElementById('tablediv');
    tablediv.innerHTML += "<table class='table' id='stateTable'></table>";

    var table = document.getElementById('stateTable');

    inputHeader+="<tr><th></th>";
    for( i=0 ; i < gecisDizisi.length ; i++ ){
        inputHeader += "<th colspan='2'>after "+gecisDizisi[i]+"</th>";
    }
    inputHeader+="</tr>";

    addTable+=inputHeader;
    addTable += "<tr><th>Old State</th>";

    for( i=0 ; i < durumDizisi.length*(gecisDizisi.length)*2;i++ ){
        input[i]="<td><input id='"+i+"' class = 'tableinput' placeholder='Enter State...'  type='durumDizisi'></td>";    
    }

    for( i=0 ; i < gecisDizisi.length ; i++ ){
        addTable += "<th>New State</th>";
        addTable += "<th>Output</th>";
    }
    addTable += "</tr>";
    a=0;
    for( i=0 ; i < durumDizisi.length ; i++ ){
        addTable += "<tr><td>"+durumDizisi[i]+"</td>";
        for( j=0 ; j < gecisDizisi.length*2 ; j++ ){
            addTable += input[a];
            a++;
        }
        addTable += "</tr>";
    }

    table.innerHTML+=addTable;
}


function mealeyCalc(){
    getInput();
    a=0;
    for(i=0;i<aranacaKelime.length;i++){
        for(j=0;j<gecisDizisi.length;j++){
            if(aranacaKelime[i]==gecisDizisi[j]){
                sonuc+=sonuclar[a][j];
                durum+=durumlar[a][j];
                if(durumDizisi[a]!=durumlar[a][j]){
                    a=durumDizisi.indexOf(durumlar[a][j]);
                }
            }
        }
    }
    document.getElementById('resultdiv').innerHTML+="Durumlar : "+durum;
    document.getElementById('outputdiv').innerHTML+="Sonuclar : "+sonuc;
    document.getElementById('calculate').disabled=true;
}


function getInput(){
    aranacaKelime = document.getElementById("search").value;
    durumDizisi = document.getElementById("state").value.split(",");
    gecisDizisi = document.getElementById("transition").value.split(",");
    a=0;b=0;
    for(i=0;i<input.length;i++){
        if(i%2==0){
            gecici2[b]=document.getElementById(i).value;b++;
        }else{
            gecici[a]=document.getElementById(i).value;a++;
        }
    }
    while(gecici.length) sonuclar.push(gecici.splice(0,gecisDizisi.length));
    while(gecici2.length) durumlar.push(gecici2.splice(0,gecisDizisi.length));

}


function del(){
    tablediv.innerHTML="";
    i=0,b=0,a=0;
    addTable="";
    input = [];
    durumDizisi,gecisDizisi;
    aranacaKelime=[];
    sonuc;
    document.getElementById('search').value = "";
    document.getElementById('state').value = "";
    document.getElementById('transition').value = "";
    document.getElementById('resultdiv').innerHTML = "";
    document.getElementById('outputdiv').innerHTML = "";
    document.getElementById('calculate').disabled = false;
    document.getElementById('confirm').disabled = false;
}
