// $(function () {
//   var ChatDiv = $(`chat-container`);
//   var height = ChatDiv[0].scrollHeight;
//   ChatDiv.scrollTop(height);
// });
var firebaseConfig = {
  apiKey: "AIzaSyB-QVenuHN1eM6s0XWJTxvsESpkasQEDE4",
  authDomain: "ping-2b9fb.firebaseapp.com",
  databaseURL: "https://ping-2b9fb-default-rtdb.firebaseio.com",
  projectId: "ping-2b9fb",
  storageBucket: "ping-2b9fb.appspot.com",
  messagingSenderId: "512218787501",
  appId: "1:512218787501:web:8b502c98e02e8bae37e024",
};
// var firebaseConfig = {
//   apiKey: "AIzaSyCeP1lZE5z44YyzjoGz1UZAR1raUBeZqPk",
//   authDomain: "v001-91065.firebaseapp.com",
//   databaseURL: "https://v001-91065-default-rtdb.firebaseio.com",
//   projectId: "v001-91065",
//   storageBucket: "v001-91065.appspot.com",
//   messagingSenderId: "766466343523",
//   appId: "1:766466343523:web:bedd4c34b023d874c8ee56",
//   measurementId: "G-BVWEHVT6RW",
// };
firebase.initializeApp(firebaseConfig);

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
firebase
  .database()
  .ref("messages")
  .on("child_added", function (snapshot) {
    var html = "";
    html += "<li style='word-break: break-word;'>";
    html +=
      "<b >" +
      snapshot.val().sender +
      "</b>" +
      " : <br>" +
      // "<p style='word-break: break-word;'>" +
      snapshot.val().message;
    // "</p>";
    html += "</li><br>";

    document.getElementById("messages").innerHTML += html;
    el = document.getElementById("chat_area");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

function signin() {
  v = document.getElementById("name").value;
  if (v == "sameer" || v == "potti") {
    console.log(v);
    window.localStorage.setItem("NAME", v);

    var v = document.getElementById("chat");
    v.style.display = "block";
    var v = document.getElementById("box");
    v.style.display = "none";
    delay(1000).then(() => console.log("ran after 1 second1 passed"));
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;
  } else {
    alert("WRONG USER");
  }
}
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function load() {
  // var textarea = document.getElementById("message");

  // textarea.onkeyup = function () {
  //   this.scrollTop = this.scrollHeight;
  // };
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
}
// input = document.getElementById("name");
document.getElementById("name").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("signin").click();
  }
});
document
  .getElementById("message")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("send").click();
    }
  });

function signout() {
  firebase.auth().signOut();
  location.reload();
  sessionStorage.clear();

  window.localStorage.clear();
}

// $(document).ready(function () {
//   $("button").click(function () {
//     $(document).scrollTop($(document).height());
//   });
// });
