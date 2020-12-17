var $ = require( "jquery" );

$(document).ready(function(){

    // console.log('test');

    var source = $("entry-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
        url: '..dischi.php',
        method: 'GET',
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log('source not found');
        }
    });

    // var context = {title: "My New Post", body: "This is my first post!"};
    // var html = template(context);

});
