class TempManager {
    constructor() {
        this.cityData = []

    }

    /**
     *  which sends a GET request to the /cities route on your server 
     *  update the cityData array
     */
    getDataFromDB = async function() {
        let cities = await $.get('/cities')
        this.cityData = cities
        return this.cityData
    }

    getCityData = async function(cityName) {

        let self = this.cityData
        $.ajax({
            url: `/city/${cityName}`,
            type: 'get',
            async: false,
            success: function(data) {
                self.push({
                    name: data.name,
                    temperature: (data.main.temp - 273.15).toFixed(2),
                    condition: data.weather[0].main,
                    conditionPic: data.weather[0].icon,
                    saved: false
                })
            }
        });

        return self

    }
    saveCity = async function(cityName) {

        const index = this.cityData.findIndex(city => city.name === cityName)
        if (index == -1) {
            return
        }
        this.cityData[index].saved = true

        $.post('/city', this.cityData[index])
    }
    removeCity = function(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            async: false,
            success: function() {}
        })

    }
}