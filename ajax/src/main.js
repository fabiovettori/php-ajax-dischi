const $ = require( "jquery" );
const Handlebars = require("handlebars");

$(document).ready(function(){

    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var genres = [];
    $.ajax({
        url: 'dischi.php',
        method: 'GET',
        success: function(response){
            $.each(response, function(i, item){
                if (!genres.includes(item.genre)) {
                    genres.push(item.genre);
                };
            });

            for (var i = 0; i < genres.length; i++) {
                $('.generi').append(`<option value="${genres[i]}">${genres[i]}</option>`);
            };
        },
        error: function(){
            console.log('source not found');
        }
    });

    $.ajax({
        url: 'dischi.php',
        method: 'GET',
        success: function(response){

            // estraggo i generi contenuti nella raccolta
            // var genres = [];
            // for (var i = 0; i < response.length; i++) {
            //     if (!genres.includes(response[i].genre)) {
            //         genres.push(response[i].genre);
            //     };
            // };
            //
            // for (var i = 0; i < genres.length; i++) {
            //     $('.generi').append(`<option value="${genres[i]}">${genres[i]}</option>`);
            // }

            // raggruppo i risultati degli oggetti contenuti nella chiamata per poi stamparli in pagina con handlebars

            for (var i = 0; i < response.length; i++) {
                var context = {
                    poster: response[i].poster,
                    title: response[i].title,
                    author: response[i].author,
                    genre: response[i].genre,
                    year: response[i].year
                };

                var html = template(context);
                $('.card-container').append(html);
            };
        },
        error: function(){
            console.log('source not found');
        }
    });

    var filter = $('select.generi').change(function(){
        let genreFilter = $(this).val();

        for (var i = 0; i < $('.card').length; i++) {
            let element = $('.card').eq(i);
            let genre = $('.card').eq(i).children('h3.genre').text();

            element.removeClass('d-none');

            if (genre != genreFilter && genreFilter != 'all') {
                element.addClass('d-none');
            }
        }
    });
});
