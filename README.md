# real-time-chat
Real time chat app with Node.js, Socket.io and MongoDB
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is real time chat with user view and admin view
	
## Technologies
Project is created with:
* React version 18.2.0
* Redux version 4.2.0
* Socket.io-client version 4.5.1
* Express version 4.18.1
* Mongoose version 6.4.0
	
## Setup
To run this project, install it locally using npm:

Set config file

-create new config file

Our service requires a text config file in `/server/config/config.env` and has following structure

```
PORT = 
NODE_ENV = 
MONGO_URI = 

JWT_SECRET = 

JWT_EXPIRE = 

JWT_COOKIE_EXPIRE = 

CHAT_DEFAULT_PASSWORD = 

```


Run client
```
$ cd ../client
$ npm install
$ npm start
```
and run server
```
$ cd ../server
$ npm install
$ npm start
```

