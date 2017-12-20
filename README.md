# Short-an-Article
A web-application to convert a long article text into short text and downloadable audio format. 

Introduction
Short-An-Article is a web application which is used to summarize long article text in text and downloadable audio format.   The application takes an URL of the article as input and produces the desired output of the summarized text in both the   formats.Alternatively, it can take whole or partial article text and produce the desired output.

User interface
The user interface of the application is built using the Bootstrap and Basic HTML tags such as textfield, button, Audio   control etc.

Summary API

The summary API being used in this project takes the URL or the text of the article as parameter and send back the summarized text. If both the URL and text is provided then it gives the priority to the URL. The fetching of the article text is done by the summary api and no additional work is needed to do this 

Summary API :- http://smmry.com/api

Apart from the article text or URL the summary api requires the api_key which is the unique identifier for each user who wants to use the api in their program. Summary api will require the user to form a request URL which must consist of api_Key  and optionally consist of article text or article url. With the URL a request is submitted to http://api.smmry.com/. The summary api returns summarized text which is in encoded in form of json. The extraction of the text from the Json and sending it back to the client side is handled with the help of Mustache.  Additionally, one can extract the title of the article, importance of the words in descending order, total number of characters in the article.  


Responsive-Voice API.
I have used responsive-voice api which achieves the same goal. The summary text sent by the summary api will be sent as the input to the responsive-voice api. The summary api will return the audio of the text in the mp3 downloadable format. The api take the input in the form of URL which is formed with the summary text. The request is sent to http://responsivevoice.org/responsivevoice. The downloading of audio file in mp3 format is handled with the help of html audio control tag.The audio will be played upon clicking the Listen and download button, which will activate the html audio control.  The conversion of the text to downloadable audio format was the hardest part of  this project and i have made my major contribution in that task.

Reference:- https://responsivevoice.org/



