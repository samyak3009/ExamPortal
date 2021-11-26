//  //Initialize Firebase
//   function initializeFirebase(){
//     var config = {
//     apiKey: "AIzaSyCyDZJ1nQo27cilCtAQXerlgCpvaZuF1yg",
//     authDomain: "erp-new.firebaseapp.com",
//     databaseURL: "https://erp-new.firebaseio.com",
//     projectId: "erp-new",
//     storageBucket: "erp-new.appspot.com",
//     messagingSenderId: "398725481389"
//   };
//   firebase.initializeApp(config);
//     requestPermission();

//   }

//   function requestPermission(){
//     const messaging = firebase.messaging();
//     // Add the public key generated from the console here.
//     //messaging.usePublicVapidKey("BNj0kKgunzRkGQ3yHa2IHy21Pgnx_N8GtQnrv3GcTYz7OqX3ldAzcENi4LmJijQLm9c2pQ6v1wOhwbqES3_JSFw");
//     messaging.requestPermission()
//       .then(function() {
//         console.log('Notification permission granted.');
//         // TODO(developer): Retrieve an Instance ID token for use with FCM.
//         // ...
//       })
//       .catch(function(err) {
//         console.log('Unable to get permission to notify.', err);
//       });
//       getToken();
//     }

//     function getToken(){

//       const messaging = firebase.messaging();
//        messaging.getToken()
//           .then(function(currentToken) {
//             if (currentToken) {
//               console.log(currentToken);
//               sendTokenToServer(currentToken);
//               updateUIForPushEnabled(currentToken);
//             } else {
//               // Show permission request.
//               console.log('No Instance ID token available. Request permission to generate one.');
//               // Show permission UI.
//               updateUIForPushPermissionRequired();
//               setTokenSentToServer(false);
//             }
//           })
//           .catch(function(err) {
//             console.log('An error occurred while retrieving token. ', err);
//             //showToken('Error retrieving Instance ID token. ', err);
//             //setTokenSentToServer(false);
//           });
//           tokenRefresh();
//     }

//     function tokenRefresh(){

//         const messaging = firebase.messaging();

//         messaging.onTokenRefresh(function() {
//           messaging.getToken()
//           .then(function(refreshedToken) {
//             console.log('Token refreshed.');
//             // Indicate that the new Instance ID token has not yet been sent to the
//             // app server.
//             setTokenSentToServer(false);
//             // Send Instance ID token to app server.
//             sendTokenToServer(refreshedToken);
//             // ...
//           })
//           .catch(function(err) {
//             console.log('Unable to retrieve refreshed token ', err);
//             showToken('Unable to retrieve refreshed token ', err);
//           });
//         });
//     }


//     initializeFirebase();
//   const messaging = firebase.messaging();
//   messaging.onMessage(function(payload) {
//   console.log('Message received. ', payload);
//   // ...
// });
