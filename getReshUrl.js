let express = require('express'),
fs = require("fs"),
request = require("request"),
cheerio = require('cheerio'),
$,
jsonBody = {},
reshUrl = [],
chk = 0,
rawdata = fs.readFileSync('SessionsUrl.json'),
urlObj = JSON.parse(rawdata),
page = 1,
session = 0,

//console.log(urlObj.SessionsUrl[0].url);

timer = setInterval(()=>{
    request("https://zp.gov.ua" + urlObj.SessionsUrl[session].url + '/' + page, function(error, response, body) {
    page ++;
    console.log(page);
    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
            $(".vote-list-item").find( 'a' ).each((i, elem) => {
                
              if(!$(elem).attr('href').includes('vote')){
                console.log($(elem).attr('href'));
                let item = {
                    title: $(elem).text().trim(),
                    url: $(elem).attr('href')
                    
                }
                reshUrl.push(item);
                
              }
              
                //console.log(SessionsUrl);

            });
          
        } 
        if(page === 8) {
            //console.log(reshUrl);
            page = 1
            session ++;
        } else if (session === 10) {
            clearInterval(timer);
            jsonBody = {
                reshUrl: reshUrl
            }
            fs.writeFileSync("ReshUrl.json", JSON.stringify(jsonBody));
        }

  });
}, 1000);

