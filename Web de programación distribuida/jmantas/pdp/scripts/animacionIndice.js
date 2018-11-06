


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-20960246-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();




$(document).ready( function(){
    InclAnimIndice();
    InclAnimMenu();
    scroll_del_Indice();
    InclDivTotal();
    mostrar_solucion();
});

function getCookie(name){
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

function delCookie (name,path,domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
        ((path == null) ? "" : "; path=" + path) +
        ((domain == null) ? "" : "; domain=" + domain) +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function setCookie(name, value, domain, expires, path, secure) {
    document.cookie = name + "=" + escape(value) +
    ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
    ((path == null) ? "" : "; path=" + path) +
    ((domain == null) ? "" : "; domain=" + domain) +
    ((secure == null) ? "" : "; secure");
}

function InclDivTotal(){

    $("[id*='animacion']").click(function(event){
        var a = document.createElement("div");
        a.setAttribute("id", "medio");
        a.setAttribute("class", "medio");
        document.body.appendChild(a);
		
        a = document.createElement("div");
        a.setAttribute("id", "flash");
		document.body.appendChild(a);
		
		var c = $(this).attr("src");
        c = c.replace("jpg","html");
		
        $("#flash").load(c, function(){
					// Cremos un H3
			var b = document.createElement("h3");
			b.innerHTML = c.substring(c.lastIndexOf("/")+1, c.lastIndexOf(".")).toUpperCase();
			a.appendChild(b);
			var b = document.createElement("h3");
			b.setAttribute("id", "cerrarflash");
			b.setAttribute("title", "Close");
			b.innerHTML = 'Close';
			a.appendChild(b);
			
			$("#cerrarflash").click(function(event){
				$('#medio').detach();
				$("#flash").detach();
			});
			
		});
		
        $("#medio").click(function(event){//Cierra si haces click fuera de la animacion.
            $(this).detach();
            $("#flash").detach();
        });
        event.preventDefault();
    });
//$("#animacion1").click(function(event){animacionClickeada(event);});
}

function InclAnimIndice(){

    var dir = window.location.href;
    $("#enlaceIndice").load( dir.substring(0,dir.lastIndexOf("/")+1) + $("#enlaceIndice").attr("title") + "indice.php");

    $("#enlaceIndice").click(function(event){
        var div = $("#enlaceIndice");
        if( div.height() == $("#indiceDesplegable").height() ){
            $("#enlaceIndice").animate({
                height: "26px"/*,
                opacity: 0.4*/
            }, 1000 );
        }else if(div.height() == "26" && $("#indiceDesplegable").height() > "26") {
            $("#enlaceIndice").animate({
                height: $("#indiceDesplegable").height()/*,
                opacity: 0.4*/
            }, 1000 );
        }
        
    });
}

function InclAnimMenu(){

    /*agregar boton de cierre de menu*/
    var cierre = document.createElement("div");
    cierre.setAttribute("id", "ocultar");
    cierre.setAttribute("class", "menu vista");
    cierre.setAttribute("title", "Ocultar menu");
    var aux = document.getElementById("menu").firstChild;
    document.getElementById("menu").replaceChild(cierre, aux);
    document.getElementById("menu").appendChild(aux);

    function Movimiento(event){
        var menu = document.getElementById("lHome");
        // Si esta oculto...
        if( menu.style.left == "-75px" ){
            setCookie("menu","visible",null,null,"/");
            //document.cookie = "menu=visible";
            // ...lo mostramos
            $("#ocultarIn").animate({
                right: "-20px",
                top: "-25px"
            }, "slow");
            $("#lHome").animate({
                left: "0px"
            }, "slow");
            $("#lTeoria").delay(100).animate({
                left: "0px"
            }, "slow");
            $("#lTutorial").delay(200).animate({
                left: "0px"
            }, "slow");
            $("#lPractica").delay(300).animate({
                left: "0px"
            }, "slow");
            $("#lAyuda").delay(400).animate({
                left: "0px"
            }, "slow");
            $("#lProfesorado").delay(500).animate({
                left: "0px"
            }, "slow");
            //$("#lSalir").delay(600).animate({
            //    left: "0px"
            //}, "slow");
            document.getElementById("ocultarIn").id = "ocultar";
            document.getElementById("ocultar").title = "Ocultar menu";
        }else if( menu.style.left == "0px" || menu.style.left == ""){
            // ... lo ocultamos en caso contrario
            setCookie("menu","oculto",null,null,"/");
            //document.cookie = "menu=oculto";
            $("#ocultar").delay(150).animate({
                right: "50px",
                top: "150px"
            }, "slow");
            $("#lHome").animate({
                left: "-75px"
            }, "slow");
            $("#lTeoria").delay(100).animate({
                left: "-75px"
            }, "slow");
            $("#lTutorial").delay(200).animate({
                left: "-75px"
            }, "slow");
            $("#lPractica").delay(300).animate({
                left: "-75px"
            }, "slow");
            $("#lAyuda").delay(400).animate({
                left: "-75px"
            }, "slow");
            $("#lProfesorado").delay(500).animate({
                left: "-75px"
            }, "slow");
            //$("#lSalir").delay(600).animate({
            //    left: "-75px"
            //}, "slow");
            document.getElementById("ocultar").id = "ocultarIn";
            document.getElementById("ocultarIn").title = "Mostrar menu";
        }
        event.preventDefault();
    }
	
    /*Animacion de ocultacion del menu*/
    $("#ocultar").click(Movimiento);
	
    if( document.cookie.search("menu=oculto") != -1){
        //Movimiento();
        $("#ocultar").css("right", "50px");
        $("#ocultar").css("top", "150px");
        $("#lHome").css("left", "-75px");
        $("#lTeoria").css("left", "-75px");
        $("#lTutorial").css("left", "-75px");
        $("#lPractica").css("left", "-75px");
        $("#lAyuda").css("left", "-75px");
        $("#lProfesorado").css("left", "-75px");
        $("#lSalir").css("left", "-75px");
        document.getElementById("ocultar").id = "ocultarIn";
        document.getElementById("ocultarIn").title = "Mostrar menu";
    }
	
}


function scroll_del_Indice(){
    $("#indiceInterno a").click( function(event){
        $.scrollTo( $(this).attr("href"),{
            duration:800
        },{
            axis:'y'
        });
        event.preventDefault();
    });
        
    var botonSubir = document.createElement("div");
    botonSubir.setAttribute("id", "subir");
    botonSubir.setAttribute("class", "subir");
    var body = document.getElementsByTagName("body");
    body[0].appendChild(botonSubir);
    $('#subir').click( function(){
        $.scrollTo( '#cabecera',{
            duration:800
        },{
            axis:'y'
        });
    });

    if(window.scrollY < 800 && $('#subir').css('opacity') == '1' ){
        $('#subir').fadeTo(0, 0);
    }

    $(window).scroll(function(){
        //$('#subir').animate({top: 20+window.scrollY },500);
        if(window.scrollY > 800 ){
            if( $('#subir').css('opacity') == '0' )
                $('#subir').fadeTo('slow', 1);
        }else{
            if( $('#subir').css('opacity') == '1' )
                $('#subir').fadeTo('slow', 0);
        }
    });
    
}


function mostrar_solucion(){
    $('#solucion + div').slideToggle(0);

    var boton = document.createElement("div");
    boton.setAttribute("id", "versolucion");
    boton.setAttribute("title", "Ver Solucion");

    $('#solucion').append(boton);

    $('#versolucion').click(function(event){
        $('#solucion + div').slideToggle('slow');
        $(this).detach();
    });
}










