importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB0xtfJMflFm_2pXdxo5sMPncPQgyE9AAM",
  authDomain: "mytijaara-21638.firebaseapp.com",
  projectId: "mytijaara-21638",
  storageBucket: "mytijaara-21638.firebasestorage.app",
  messagingSenderId: "1017926959065",
  appId: "1:1017926959065:web:fee8e7af199a1d677e23c8",
  measurementId: "G-6XF74RVXXW"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
