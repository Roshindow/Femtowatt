var i=0;
var xmlhttp,nPagine;
var nomeSpecial,bottoneDisabled;
var unaSola;

function nPagina(){
    xmlhttp=GetXmlHttpObject();
    if (xmlhttp==null){
        alert ("Your browser does not support Ajax HTTP");
        return;
    }
    var url="contaElementi.jsp";
    url=url+"?alfa="+nomeSpecial;
    xmlhttp.onreadystatechange=nPagineOut;
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
}

function nPagineOut(){
    if (xmlhttp.readyState==4){
        var selectPages="";
        var stringa= xmlhttp.responseText.trim();
        var Re = new RegExp("%0D%0A","g");
        stringa = stringa.replace(Re,"");
        nPagine=stringa;
        if((unaSola==1)){
            if(nPagine!=0){
                if(nPagine!=1){
                    for(var i=1;i<=nPagine;i++){
                        if(i==1){
                            selectPages=selectPages+"<li id="+i+"  class='disabled' ><a   onclick='cerca1("+i*10+","+i+");'>"+i+"</a></li>";
                        }else{
                            selectPages=selectPages+"<li id="+i+" class='' ><a  onclick='cerca1("+i*10+","+i+");'>"+i+"</a></li>";}
                        }
                        document.getElementById('numeriPagine').innerHTML = selectPages; 
                    }else{
                        document.getElementById('numeriPagine').innerHTML = "";
                }     
            }else{
                document.getElementById('errore').innerHTML = "<h4>Nessun risultato trovato con : &nbsp&nbsp<b><i>"+nomeSpecial+"</i></b></h4>";
                document.getElementById('errore').className = "alert alert-error";
            }
        }
    }
}

function cercaOut(){
    if (xmlhttp.readyState==4){
        var stringa= xmlhttp.responseText.trim();
        /*var Re = new RegExp("%0D%0A","g");
        stringa = stringa.replace(Re,"");*/
        document.getElementById('lista').innerHTML = stringa;
        if(unaSola <= 2){
            unaSola = unaSola + 1;
        }
        nPagina(unaSola);
    }
}

function avvio(valore){
    unaSola=0;
    bottoneDisabled="1";
    nomeSpecial = document.cerca.cerc.value;
    document.getElementById('errore').className = "";
    document.getElementById('errore').innerHTML = "";
    document.getElementById('numeriPagine').innerHTML = "";
    cerca1(valore,0);
}

function cerca1(valore,disabilitare){
    xmlhttp=GetXmlHttpObject();
    document.getElementById('lista').innerHTML = "<img src='images/ajax-loader.gif'/>";
    if (xmlhttp==null){
        alert ("Your browser does not support Ajax HTTP");
        return;
    }
    if(disabilitare!=0){
        document.getElementById(disabilitare).className = "disabled";  
        document.getElementById(bottoneDisabled).className = ""; 
        bottoneDisabled=disabilitare;
    }
    var url="like.jsp?";
    url=url+"alfa="+nomeSpecial+"&nElementi="+valore;
    xmlhttp.onreadystatechange=cercaOut;
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
}
//-------------End--Cerca-------------------//
//-------------Lista------------------------//

function risultato(){
    if (xmlhttp.readyState==4){
        var stringa= xmlhttp.responseText.trim();
        var Re = new RegExp("%0D%0A","g");
        stringa = stringa.replace(Re,"");
        var n=stringa.split("/");
        $('#search').typeahead({source: n});
    }
}

function lista(){
    xmlhttp=GetXmlHttpObject();
    if (xmlhttp==null){
        alert ("Your browser does not support Ajax HTTP");
        return;
    }
    var url="tutto.jsp";
    url=url;
    xmlhttp.onreadystatechange=risultato;
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
}
//-------------END--Lista------------------------//     

function GetXmlHttpObject(){
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    return null;
}