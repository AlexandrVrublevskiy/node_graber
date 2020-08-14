let express = require('express'),
fs = require("fs"),
request = require("request"),
cheerio = require('cheerio'),
$,
jsonBody = {},
SessionsUrl = [],
id = 32100,
chk = 0,

timer = setInterval(()=>{
    chk ++;
    request("https://zp.gov.ua/uk/sessions/prev/list/" + chk, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
            $(".session-filter").find( 'a' ).each((i, elem) => {
                
                //console.log($(elem).attr('href'))
               //console.log($a[2].attribs.href);
               //console.log($a[2].children[0].data.trim());
              /*$(elem).each((i, elem2)=> {
                console.log($(elem2));
              })*/
              if(!$(elem).attr('href').includes('prev')){
                let item = {
                    title: $(elem).text().trim(),
                    url: $(elem).attr('href')
                    
                }
                SessionsUrl.push(item);
                
              }
              
                //console.log(SessionsUrl);

            });
          
        } 
        if(chk === 5) {
            console.log(SessionsUrl);
            clearInterval(timer);
            jsonBody = {
                SessionsUrl: SessionsUrl
            }
            fs.writeFileSync("SessionsUrl.json", JSON.stringify(jsonBody));
        }

  });
}, 1000)

   




















/*let fInterval = setInterval(function()  {
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
                        
                       
                        
                        if(true){
                          
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
                            

                        } else {
                            id ++;
                            console.log('false');
                        }
                        
                        
                    } else {
                      id ++;
                    }
                  });
                
                }, 500);*/



//}
    
//});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

