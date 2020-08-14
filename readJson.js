const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let reshObj = JSON.parse(rawdata);
for(let i = 0; i < reshObj.allResh.length; i++){
    console.log(reshObj.allResh[i].title);
    console.log(reshObj.allResh[i].date.replace(/\n/g,"").replace(/                                                                                /g," ").replace(/                                                                /g," "));
}
