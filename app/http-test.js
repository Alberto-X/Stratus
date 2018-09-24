// app/index.js
const http = require('http')
const port = 9080

const requestHandler = (request, response) => {
    const url = request.url
    console.log(url)
    if (url.includes('hello')) { response.end('Hello Node.js Server!') }
    else { response.end('This is a Node.js server.')}
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }
    console.log(`Server is listening on ${port}`)
})