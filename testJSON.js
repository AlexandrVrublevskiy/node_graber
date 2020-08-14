let express = require('express'),
fs = require("fs"),
request = require("request")

//console.log(urlObj.SessionsUrl[0].url);


request({headers: {
         "Authorization": "Basic " + Buffer.from("restcam" + ":" + "Camitmc2020").toString('base64')
         },url: "http://zmr-aps-rada.zmr.local:8080/ords/sc_units/cam/list"} ,
   function(error, response, body) {
        console.log(response.body);

  })


