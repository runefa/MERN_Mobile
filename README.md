# MERN_Client
The MERN client created in my Medium story: [MERN Tutorial - Building a Web App](https://medium.com/technology-stacks/mern-tutorial-building-a-web-app-be2b1bc0b828 "My MERN Client Tutorial").

# How to start the server
- Type `mongod-dbpath <mongo-data-dir>` to start the Mongo daemon in the background (the database used for this project)
- Type `DEBUG=server:* npm start` in your server directory to start the server

# How to start the client
- Type `PORT=3001 REACT_APP_SERVER="http://localhost:3000/" npm run start` in your client directory to start the client
  - REACT_APP_SERVER is where your HTTP Requests are made, can be external 
