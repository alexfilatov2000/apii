$(function() {
    $.ajax({
        url: 'https://api.spotify.com/v1/search?q=Where+are+U&type=track&limit=1',
        type: 'GET',
        dataType: 'json'
    })
        .done(function(resp) {

            //ручной вывод чего-то на страницу
            $('div.man').append('<img src=' + resp.tracks.items[0].album.images[2].url + '>')
                .append('<div><b><u>' + resp.tracks.items[0].album.name + '</u></b></div>');

            $(resp.tracks.items[0].artists).each(function(index, el) {
                $('div.man').append('<div>' + resp.tracks.items[0].artists[index].name + '</div>');
            });

            //вывод всего json
            $('div.div').text(JSON.stringify(resp));
        });
});
