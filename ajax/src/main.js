const $ = require( "jquery" );
const Handlebars = require("handlebars");

$(document).ready(function(){

    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
        url: 'dischi.php',
        method: 'GET',
        success: function(response){

            // estraggo i generi contenuti nella raccolta
            var genres = [];

            response.forEach((item, i) => {
                if (!genres.includes(item.genre)) {
                    genres.push(item.genre);
                };
            });

            genres.forEach((item, i) => {
                $('.generi').append(`<option value="${item}">${item}</option>`);
            });

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

        $.ajax({
            url: 'dischi.php',
            method: 'GET',
            data: {
                genre: genreFilter,
            },
            success: function(response){

                // raggruppo i risultati degli oggetti contenuti nella chiamata per poi stamparli in pagina con handlebars

                $('.card-container').empty();

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
    });
// in jquery .data()
});
