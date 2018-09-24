// app/index.js
const fs = require('fs')

function stats (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

Promise.all([
  stats('app/file.md'),
  stats('app/file-read-test.js'),
  stats('app/calc.js')
])
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
