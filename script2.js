const firebaseConfig = {
    apiKey: "AIzaSyDjdHKJiE9_0-pGZTqfRWIc_YNvYh7dIyg",
    authDomain: "new-ascii-test.firebaseapp.com",
    projectId: "new-ascii-test",
    storageBucket: "new-ascii-test.appspot.com",
    messagingSenderId: "455636189959",
    appId: "1:455636189959:web:ceb7d59a1702505e86bba2",
    measurementId: "G-F38CHL5MY7"
};
firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref();
var fileInput =  document.getElementById('image');
fileInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    var fileName = file.name;
    var extension = fileName.split('.').pop();
    var currentDate = new Date();
    var dateTimeString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '_' + currentDate.getHours() + '-' + currentDate.getMinutes() + '-' + currentDate.getSeconds();
    var deviceModel = getDeviceModel();
    var newFileName = dateTimeString + '_' + deviceModel + '.' + extension;
    var uploadTask = storageRef.child(newFileName).put(file);
    uploadTask.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    }, function(error) {
    
    }, function() {
    
    });
});

function getDeviceModel() {
    var userAgent = navigator.userAgent;
    var model = 'Unknown';
    if (/iPad/i.test(userAgent)) {
        model = 'iPad';
    } else if (/iPhone/i.test(userAgent)) {
        model = 'iPhone';
    } else if (/iPod/i.test(userAgent)) {
        model = 'iPod';
    } else if (/Android/i.test(userAgent)) {
        model = 'Android';
    } else if (/webOS/i.test(userAgent)) {
        model = 'webOS';
    } else if (/BlackBerry/i.test(userAgent)) {
        model = 'BlackBerry';
    } else if (/Windows Phone/i.test(userAgent)) {
        model = 'Windows Phone';
    }
    return model;
};
