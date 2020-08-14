let express = require('express'),
app = express(),
fs = require("fs"),
request = require("request"),
cheerio = require('cheerio'),
$,
jsonBody = {},
allResh = [],
id = 32100,
chk = 0;
//app.get('/', function (req, res) {
//for(let i = 32199; i <= 32203; i++){
   //console.log('i '+ i);
fInterval = setInterval(function()  {
                    chk ++;
                    console.log(chk);

                    if (chk === 100) {
                      clearInterval(fInterval);
                      jsonBody = {
                        allResh: allResh
                      }
                      fs.writeFileSync("data.json", JSON.stringify(jsonBody));
                      console.log(jsonBody);
                    }
      
                    request("https://zp.gov.ua/uk/sessions/11/resolution/" + id, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                    
                      //console.log(body);
                      //fs.writeFileSync("data.html", body);
                    // res.send('File downloaded.');
                        $ = cheerio.load(body);
                        
                        let chkContent = $(".block-title").text();
                        
                        if(chkContent && chkContent.includes('Рішення міської ради')){
                          
                            $(".cms-post").each((i, elem) => {
                                //console.log($(elem).find('.page-content').text().trim());
                                let resh = {
                                    id: id,
                                    title: $(elem).find('a').text().trim(),
                                    subTitle: $(elem).find('.title').text().trim(),
                                    date:  $(elem).find('.date').text().trim(),
                                    text: $(elem).find('.page-content').text().trim()
                                }
                                
                                allResh.push(resh);
                                id ++;
                                console.log(id);
                                //console.log(jsonBody);

                            });
                            /*if (chk === 32203) {
                                console.log(jsonBody);
                                fs.writeFileSync("data.json", JSON.stringify(jsonBody));
                              }*/

                        } else {
                            id ++;
                            console.log('false');
                        }
                        
                        /*let content = $(".cms-post").text();
                        fs.writeFileSync("data.txt", content);*/
                    } else {
                      id ++;
                    }
                  });
                
                }, 500);



//}
    
//});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

