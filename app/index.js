// app/index.js
const express = require('express')
const app = express()
const port = 4000

app.get('/', (request, response) => {
    response.send('Whatcha need?')
    console.log(' \'/\' request served.')
})

app.get('/hello', (request, response) => {
    response.send('Hello from Express!')
})

app.listen(port, (err) => {
    if (err) {
        console.log('Something bad happened, while listening', err)
    }
    console.log(`Server is listening on ${port}`)
})