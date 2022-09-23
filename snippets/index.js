// $(function () {
//   var ChatDiv = $(`chat-container`);
//   var height = ChatDiv[0].scrollHeight;
//   ChatDiv.scrollTop(height);
// });
var firebaseConfig = {
  apiKey: "AIzaSyDYC1T69Ue1f07xVbpexF6JHHc-dw7iNxI",
  authDomain: "gv01-f36e8.firebaseapp.com",
  databaseURL: "https://gv01-f36e8-default-rtdb.firebaseio.com",
  projectId: "gv01-f36e8",
  storageBucket: "gv01-f36e8.appspot.com",
  messagingSenderId: "911524810717",
  appId: "1:911524810717:web:be1bf2a915bc5ffcb27034",
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  window.user = user;
});

function signin() {
  v = document.getElementById("name").value;
  if (v == "sameer" || v == "dimple") {
    console.log(v);
    window.localStorage.setItem("NAME", v);
    var anonymouslyAuth = firebase.auth().signInAnonymously();

    anonymouslyAuth
      .then(function () {
        console.log("Logged in as Anonymously!");
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
    var v = document.getElementById("main");
    v.style.display = "block";
    var v = document.getElementById("box");
    v.style.display = "none";
  } else {
    alert("WRONG USER");
  }
}

function signout() {
  firebase.auth().signOut();
  location.reload();
  sessionStorage.clear();

  window.localStorage.clear();
}
function sendMessage() {
  sender = window.localStorage.getItem("NAME");

  var message = document.getElementById("message").value;
  firebase.database().ref("messages").push().set({
    sender: sender,
    message: message,
  });
  document.getElementById("message").value = "";
  return false;
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    set = window.localStorage.getItem("NAME");
    console.log("loged in");

    const db = firebase.database();

    db.ref("messages").on("child_added", function (snapshot) {
      var html = "";
      if (snapshot.val().sender == set) {
        html += '<div class="rmessages">';
        html += snapshot.val().message + " : " + "<b > Me </b>";
        html += "</div>";

        document.getElementById("messages").innerHTML += html;
      }
      if (snapshot.val().sender != set) {
        html += "<div >";
        html +=
          "<b >" +
          snapshot.val().sender +
          "</b>" +
          " : " +
          snapshot.val().message;
        html += "</div> <br>";

        document.getElementById("messages").innerHTML += html;
      }

      el = document.getElementById("chat_area");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
    var v = document.getElementById("main");
    v.style.display = "block";
    var v = document.getElementById("box");
    v.style.display = "none";
  } else {
    console.log("loged out");
  }
});
