// app/index.js
import fs from 'fs';

console.log("Start reading file...");
fs.readFile('app/file.md','utf-8', function (err,content) {
    if (err) {
        console.log("ERROR: " + err.message);
        return console.log(err);
    }
    console.log(content);
});
console.log("End of file");
