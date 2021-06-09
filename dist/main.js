const tempManager = new TempManager()
const renderer = new Renderer()



const loadPage = async function() {
    let array = await tempManager.getDataFromDB()
    renderer.renderData(array)
}

const handleSearch = function() {
    const cityName = $('#city-input').val()
        // $('#city-input').val('')
    tempManager.getCityData(cityName).then(function(citeis) {
        renderer.renderData(citeis)
    })
}
$("#search-btn").on('click', function() {

    handleSearch()

})
$('body').on('click', "#save", function() {
    const cityName = $(this).siblings(".city-name").text()
    tempManager.saveCity(cityName)

})
$('body').on('click', "#delete", function() {
    const cityName = $(this).siblings(".city-name").text()
    tempManager.removeCity(cityName)
    renderer.renderData(tempManager.cityData)

})
loadPage()