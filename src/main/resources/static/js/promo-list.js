var pageNumber = 0;

$(document).ready(function(){
    $("#loader-img").hide();
    $("#fim-btn").hide();
});

$(window).scroll(function() {    	
	var scrollTop = $(document).height() + $(this).scrollTop();
	var conteudo = $(document).height() + $(window).height();  	
	if (scrollTop >= conteudo) {
		pageNumber++;
		setTimeout(function(){
			loadScrollBar(pageNumber);
		}, 200);
	}    	
});

function loadScrollBar(pageNumber) {	
	$.ajax({
		method: "GET",
		url: "/promocao/list/ajax",
		data: {
			page: pageNumber
		},
		success: function( response ) {
            
            $('.row').append( $(response).hide().fadeIn(400) );   			
		}, 
		error: function(xhr) {
            $("#alert").addClass("alert alert-danger").text("Ops, ocorreu um erro: " + xhr.status + "," + xhr.statusText);
		}
	})  
}

$(document).on("click", "button[id*='likes-btn-']", function(){
    var id = $(this).attr("id").split('-')[2];

    $.ajax({
        method:'post',
        url: "/promocao/like/" + id, 
        success: function(response){
            $("#likes-count-" + id).text(response);
        },
        error: function(xhr){
            $("#alert").addClass("alert alert-danger").text("Ops, ocorreu um erro: " + xhr.status + "," + xhr.statusText);
        }
    });
});

$("#autocomplete-input").autocomplete({
    source:function(request, response){
        $.ajax({
            method:"GET",
            url:"/promocao/site",
            data:{
                termo: request.term
            },
            success: function(result){
                response(result);
            }
        });
    }
});

$("#autocomplete-submit").on("click", function(){
    var site = $("#autocomplete-input").val();
    
    $.ajax({
        method:"GET",
        url: "/promocao/site/list",
        data:{
            site: site
        },
        beforeSend: function(){
            pageNumber = 0;
            $("#fim-btn").hide();
            $(".row").fadeOut(400, function(){
                $(this).empty();
            });
        },
        success: function(response){
            $(".row").fadeIn(250, function(){
                $(this).append(response);
            });
        },
        error: function(xhr){
            $("#alert").addClass("alert alert-danger").text("Ops, ocorreu um erro: " + xhr.status + "," + xhr.statusText);
        }
    });
});