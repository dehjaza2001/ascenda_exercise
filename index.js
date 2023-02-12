
const Offers = require('./Offers.js')
const axios = require("axios");
const express = require('express')

const app = express()
const port = 3000
const offersApi = "https://61c3deadf1af4a0017d990e7.mockapi.io/offers/near_by?lat=1.313492&lon=103.860359&rad=20"


app.get('/',  (async (req,res) => {
    let apiResponse = await axios.get(offersApi);
    const offer = new Offers(apiResponse.data,"2019-12-25")
    res.send(offer.filterOffers())
}))

app.listen(port, () => console.log(`example app listenning at http://localhost:${port}`))




