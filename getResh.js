let fs = require("fs"),
    request = require("request"),
    cheerio = require('cheerio'),
    $,
    jsonBody = {},
    allResh = [],
    resh = -1,
    rawdata = fs.readFileSync('ReshUrl.json'),
    urlObj = JSON.parse(rawdata),

    fInterval = setInterval(function()  {
                        resh ++;
                    
                        let url = urlObj.reshUrl[resh].url;

                        if (resh === 100) {
                        clearInterval(fInterval);
                        jsonBody = {
                            allResh: allResh
                        }
                        fs.writeFileSync("data.json", JSON.stringify(jsonBody)); 
                        }
        
                        request("https://zp.gov.ua/" + url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('url '+  url);
                        //console.log(body);
                        //fs.writeFileSync("data.html", body);
                        // res.send('File downloaded.');
                            $ = cheerio.load(body);
                            
                            let chkContent = $(".block-title").text();
                            
                            if(chkContent && chkContent.includes('Рішення міської ради')){
                            
                                $(".cms-post").each((i, elem) => {
                                    //console.log($(elem).find('.page-content').text().trim());
                                    let resh = {
                                        id: url,
                                        title: $(elem).find('a').text().trim(),
                                        subTitle: $(elem).find('.title').text().trim(),
                                        date:  $(elem).find('.date').text().trim(),
                                        text: $(elem).find('.page-content').text().trim()
                                    }
                                    allResh.push(resh);
                                    console.log('id ' + resh.id);
                                });
                            } 
                            
                        } 
                    });
                    
                    }, 500);



//}
    
//});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

