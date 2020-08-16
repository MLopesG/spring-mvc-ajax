$("#form-add-promo").submit(function(evt){
    evt.preventDefault();

    var promocao = {};
    promocao.linkPromocao =  $("#linkPromocao").val();
    promocao.descricao =  $("#descricao").val();
    promocao.preco =  $("#preco").val();
    promocao.titulo =  $("#titulo").val();
    promocao.categoria =  $("#categoria").val();
    promocao.linkImagem =  $("#linkImagem").attr("src");
    promocao.site =  $("#site").text();

    $.ajax({
        method:"POST",
        url: "/promocao/save",
        data: promocao,
        beforeSend: function(){
            
            $("span").closest('.error-span').remove();
            $("#categoria").removeClass("is-invalid");
            $("#linkPromocao").removeClass("is-invalid");
            $("#titulo").removeClass("is-invalid");
            $("#preco").removeClass("is-invalid");

            $("#form-add-promo").hide();
            $("#loader-form").addClass("loader").show();
        }, 
        success: function(){
            $("#form-add-promo").each(function(){
                this.reset();
            });

            $("#linkImagem").attr("src", "/images/promo-dark.png");
            $("#site").text("");
            $("#alert")
            .removeClass("alert alert-danger")
            .addClass("alert alert-success").text("OK! Promoção cadastrada com sucesso!");
        },
        statusCode:{
            422: function(xhr){
                var errors = $.parseJSON(xhr.responseText);

                $.each(errors, function(key, val){
                    $("#" + key).addClass("is-invalid");
                    $("#error-" + key)
                    .addClass("invalid-feedback")
                    .append("<span class='error-span'>" + val + "</span>" );
                });
            }
        },
        error: function(){
            $("#alert").addClass("alert alert-danger").text("Não foi possivel salvar está promoção!");
        },
        complete: function(){
            $("#loader-form").fadeOut(800,function(){
                $("#form-add-promo").fadeIn(250);
                $("#loader-form").removeClass("loader").show();
            });
        }
    });
});

$('#linkPromocao').on('change', function (){
    var url = $(this).val();

    if(url.length > 7){
        $.ajax({
            method:"POST",
            url: "/meta/info?url=" + url,
            cache: false,
            beforeSend: function(){
                $("#alert").removeClass("alert alert-danger alert-success").text("");
                $("#titulo").val("");
                $("#site").text("");
                $("#linkImagem").attr("src", "");
                $("#loader-img").addClass("loader");
            },
            success: function(data){
                $("#titulo").val(data.title);
                $("#site").text(data.site.replace("@", ""));
                $("#linkImagem").attr("src", data.image);
            },
            statusCode:{
                404: function (error){
                    $("#alert").addClass("alert alert-danger").text("Nenhuma informação pode ser encontrada nessa url!");
                    $("#linkImagem").attr("src", "/images/promo-dark.png");
                }
            },
            error: function(){
                $("#alert").addClass("alert alert-danger").text("Ops.... algo deu errado, tenta mais tarde!");
                $("#linkImagem").attr("src", "/images/promo-dark.png");
            },
            complete: function(){
                $("#loader-img").removeClass("loader");
            }
        });
    }
});