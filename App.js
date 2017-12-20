'use strict';
///The  server module of this application is developed in express and mustache. The main functionality of the server is to handle the post request from the front-end.(client)
//The post request will be made by the user with either the URL of the article or full text. 
//The post request will further make a request to the summary API with the input URL or the article Text. The summary api will return the summarized text. The post method will receive this and send it back to the front end using the mustache. 
// to use the summary api I have referred and adopted a part of solution from  https://github.com/Shraddhaz/Photo-Scan-Summary. This reference implementation uses text as input but my implementation mainly uses URL as input as that is the primary source of input to the summary api. 
// 


var express = require('express');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var request = require('request');
var bodyParser = require('body-parser');
var mustache = require('mustache');
var path    = require('path');
var engines = require('consolidate');
const { BingSpeechClient, VoiceRecognitionResponse } = require('bingspeech-api-client');

var app = express();
var apiKey = encodeURIComponent('BEF17ACED7');
var len, url, text, options, summry;

app.use(bodyParser.urlencoded({
    'extended': false}
));

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.render('main', { summ: ''});
});


fs.readFile('views/main.html', 'utf-8', function(error, data) {

    if (error) {
        console.log('in if');
       res.end('Error');
        return;
    }


    app.use(bodyParser.urlencoded({
        'extended': true}
    ));


app.post('/', function(req, res) {

    res.status(200);
    res.set({
            'Content-Type': 'text/html'
        });
    var URL = req.body.URL;
    var comment = req.body.comment;
    console.log(comment);


    // The construction of the URL that needs to be sent to Summary api done independently  without reference as this implementation uses the text. 
    if (comment== '')
        {
    url = `http://api.smmry.com/&SM_API_KEY=${apiKey}&SM_URL=${URL}`;
        }
    else{
        url= `http://api.smmry.com/&SM_API_KEY=${apiKey}`;

        }
    console.log(url);
    // This Implementation uses the URL as input the to the summary api in contrast with the referred implementation which uses just the text as input. 
    // The error error handling of the summary api is adopted from https://github.com/Shraddhaz/Photo-Scan-Summary.
    // The summary api implementation guidelines :- http://smmry.com/api 
                options = {
                    url: url,
                    method: 'POST',
                    form: {'sm_api_input': comment}
                };

               
                request(options, function (err, response, body) {
                    if (err) {
                        res.send(error);
                    }

                    else if(JSON.parse(body).sm_api_message === "TEXT IS TOO SHORT"){
                        res.write(mustache.render(data.toString(), {
                            'summ':text
                        }));
                    }

               
                    else if(JSON.parse(body).sm_api_error === "0" || JSON.parse(body).sm_api_error === "1" || JSON.parse(body).sm_api_error === "2" || JSON.parse(body).sm_api_error === "3"){
                        res.write(mustache.render(data.toString(), {
                            summ: 'Error occurred. Please try again.'
                        }));
                    }

                    
                    else {
                        summry = JSON.parse(body).sm_api_content;
                        res.write(mustache.render(data.toString(), {
                            summ: summry
                        }));
                    }

                    res.end();

                });

                    app.use( ( req, res, next ) => {
                    setTimeout(next,  2000 ) ;
                });

});

});

        
app.listen(8080);

