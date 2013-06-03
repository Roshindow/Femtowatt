<%@page import="java.sql.*" import="database.CreaConnessione" import="database.Login" import="database.Query" contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="connect.jsp"%>
<script src="js/scrivipagina.js"></script>
<script src="tinymce/tinymce.min.js"></script>
<script type="text/javascript">
tinymce.init({
selector: "textarea",
theme: "modern",
language : 'it',
resize : false,
entity_encoding : "raw",
forced_root_block: false,
force_p_newlines : true,
force_br_newlines: false,
plugins: [
    "advlist anchor autolink charmap code contextmenu",
    "emoticons fullscreen hr image insertdatetime",
    "link media nonbreaking paste preview print",
    "save searchreplace table textcolor visualblocks visualchars wordcount"
    ],
content_css: "css/content.css",
toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | nonbreaking link image | save print preview media fullpage | forecolor backcolor emoticons", 
save_onsavecallback: function testo1(){
    if((errTitolo=="0") && (errArgomento="0")){
        var stringa = tinyMCE.activeEditor.getContent();
        xmlhttp=GetXmlHttpObject();
        if (xmlhttp==null){
            alert ("Your browser does not support Ajax HTTP");
            return;
        }
        var url="insertPage.jsp?";
        url=url+"titolo="+titolo+"&testo="+encodeURIComponent(stringa).replace(/'/g,"%27").replace(/"/g,"%22")+"&argomento="+arg;

        xmlhttp.onreadystatechange=testout;

        xmlhttp.open("GET",url,true);
        xmlhttp.send(null);
    }else{
        document.getElementById("errore").innerHTML="<div class='alert alert-error'><h4><b>Attenzione!</b> Titolo e argomento sono errati o assenti!</h4></div>"
    }
 }
});
</script>
<%
if(session.getAttribute("idSession") == null){
    out.print("Per poter scrivere un nuovo articolo devi effettuare il login");
}else{
    %>
    <div id="preview2"></div>
        <div id="inserito">
        <form name="scrivi" width="100%" >            
            <table border="0" width="100%" >
                <tr>

                    <td>
                        <div id="ak1" class="control-group ">
                            <label class="control-label"></label>
                            <div class="controls">
                                <div id="titoloEs" data-animation="true" data-title="Errore!" data-content="Numeri o caratteri speciali non ammessi.">
                                    <input type="text" name="titolo"  onChange="titolo1();"  placeholder="Titolo" class="input-xlarge">
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                     <tr>

                    <td>
                        <div id="ak2" class="control-group ">
                            <label class="control-label"></label>
                            <div class="controls" >
                                    <select name="argomento" onchange="controlA();">
                                    <option value="0">---Segli Argomento---</option>
                                    <option value="Elettronica">Elettronica</option>
                                    <option value="Informatica">Informatica</option>
                                    <option value="Inglese">Inglese</option>
                                    <option value="Italiano">Italiano</option>
                                    <option value="Matematica">Matematica</option>
                                    <option value="Storia">Storia</option>
                                    <option value="Sistemi">Sistemi</option>
                                    <option value="Statistica">Statistica</option>
                                     </select>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="testoEs" data-animation="true" data-title="Errore!" data-content="Testo mancante o minore di 100 caratteri.">   
                            <textarea   style="width: 100%;" id="area2" type="text" cols="100" rows="20" name="testo"></textarea>
                        </div>
                   </td>
                </tr>
            </table>
        </form>
    </div>
    <%
}
%>
