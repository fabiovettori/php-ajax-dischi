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
            for (var i = 0; i < response.length; i++) {
                if (!genres.includes(response[i].genre)) {
                    genres.push(response[i].genre);
                };
            };

            for (var i = 0; i < genres.length; i++) {
                $('.generi').append(`<option value="${genres[i]}">${genres[i]}</option>`);
            }

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
});
