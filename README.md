# Little-Maruko
Food ordering webapp

## Setup
+ Make sure you have **NodeJS** install
+ In command run 
```
$ npm install
```
to install all necessary dependencies

+ By default, port number is set at **3000**, but you can change it in .env file just make sure the port is not being used for other service
+ Sign up for a twillio account, follow their direction and buy a number
+ Get **ACCOUNTSID, AUTHTOKEN, PHONE** from twilio. Make sure when filling out .env file prefix number with **+**
+ Put your app outlook email and password in .env (if sending a lot may need to switch to another mail service since there is a limit on how many you could send out)
+ Create a mongodb account and copy the connection string url and put in .env
+ To start app
```
$ node app.js
```
+ Assuming port number is 3000 go to brower type 
```
http://localhost:3000/
```
+ Application now starts on your local server


## MAKE a .env file to for all credentials
```
PORT=3000

ACCOUNTSID=<from twillio>
AUTHTOKEN=<from twillio>
PHONE=+<from twillio>

USER=<outlook email> => this will be where you recevied user feedback
PASS=<outlook password>
HOST=smtp-mail.outlook.com
STMPPORT=25

MONGOOSECONNECTIONSTRING=<mongodb connection string url>

SESSIONSECRET=<any random alphanumberic string used to encrypt session ex: hkdlaf88345hkjdgf62sf>
```


