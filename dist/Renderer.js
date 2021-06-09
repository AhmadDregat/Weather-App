class Renderer {
    renderData = function(cities) {
        const source = $('#city-temp').html();
        const template = Handlebars.compile(source)
        let citiesHTML = template({ cities })
        $('#cities').empty().append(citiesHTML)
    }
}