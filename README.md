# MERN_Mobile
The MERN client created in my Medium story: [MERN Tutorial  -  Building a Mobile Application](https://medium.com/technology-stacks/mern-tutorial-deploying-a-mobile-application-ad91bda5cd02 "My MERN Mobile App Tutorial").

# How to start the server
- Type `mongod-dbpath <mongo-data-dir>` to start the Mongo daemon in the background (the database used for this project)
- Type `DEBUG=server:* npm start` in your server directory to start the server

# How to start the client
- Make sure the server is running first
- Type `PORT=3001 REACT_APP_SERVER="http://localhost:3000/" npm run start` in your client directory to start the client
  - REACT_APP_SERVER is where your HTTP Requests are made, can be external 

# How to start the mobapp
- Make sure the server is running first
- Type `react-native run-ios` in your mobapp directory to start the mobapp
