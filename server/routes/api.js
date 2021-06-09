const express = require('express')
const router = express.Router()
const axios = require('axios')
const mongoose = require('mongoose')
const City = require('../../model/City.js')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })
const APIkey = 'eb8fe280b86af8070520c93c227a634c'

router.get('/city/:cityName', function(req, res) {
    const cityName = req.params.cityName;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`)
        .then(function(response) {
            //console.log(response.data);
            res.send(response.data)
        })
})
router.get('/cities', async function(req, res) {
        const cities = await City.find({})
        res.send(cities)

    })
    /**
     * This route should save a new City to your DB
     */
router.post('/city', async function(req, res) {
    const city = req.body;
    const C = new City({
        name: city.name,
        temperature: ((city.temperature - 32) * 5 / 9),
        condition: city.condition,
        conditionPic: city.conditionPic,
        saved: city.saved
    })
    await C.save();
    res.send(C);
})

router.delete("/city/:cityName", function(req, res) {
    const cityName = req.params.cityName;
    City.deleteMany({
        name: cityName
    }, function(error) {
        if (error) {
            res.send(error)
        } else {
            res.send("ok")
        }

    })

})


module.exports = router