// Imports
const express = require("express")
const bodyparser = require("body-parser")
const axios = require("axios")

// App entry point
const app = express()

app.use(bodyparser.urlencoded({extended: true}))

// Set up routes
app.get('/',(req,res) =>{
    res.sendFile(__dirname+'/index.html')
})
app.post("/",  async (req,res)=>{
    let crypto = req.body.crypto
    let curr = req.body.fiat
    let amount = req.body.amount
    let symbol = crypto+curr
    // let response = await axios.get(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${symbol}`)
    let response = await axios
    .get(`https://apiv2.bitcoinaverage.com/convert/global?from=${crypto}&to=${curr}&amount=${amount}`)
    let data =  response.data // Extract data from response, already a JS object
    
    // Send more than 1 thing to the browser.
    let date = data.time
    res.write(`<h1>The current date is: </h1> <h2>${date}</h2>`)
    res.write(`<h1>${amount} ${crypto} in ${curr} is: </h1> <h2>${data.price}</h2>`)

    res.send()

    

})

// Set up port for server listening
app.listen(3000, ()=>
    console.log('Listening on port 3000...')
)

