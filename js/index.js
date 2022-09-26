
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, set, push, child, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrDO-EPsqXw2LRLlz-EQH5JDeqPDnrKKY",
    authDomain: "wedding2-6f306.firebaseapp.com",
    projectId: "wedding2-6f306",
    databaseURL: "https://wedding2-6f306-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "wedding2-6f306.appspot.com",
    messagingSenderId: "784847225164",
    appId: "1:784847225164:web:56be8b060067080da0cfe9",
    measurementId: "G-M8JZS7L6DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const commentRef = ref(db, 'comments');

// Get comment
onValue(commentRef, (snapshot) => {
    resetList();
    if (snapshot.exists()) {
        snapshot.forEach(element => {
            var data = element.val();
            var timestamp = $.format.prettyDate(data.timestamp);
            document.querySelector('.comment-list').innerHTML += `
                <div class="comment">
                    <div class="d-flex align-items-baseline mb-2">
                        <h4 class="name d-block my-0 me-2">${data.name}</h4>
                        <p class="timestamp d-block my-0 ">- ${timestamp}</p>
                    </div>
                    <p class="content-text">●&nbsp;&nbsp;&nbsp;&nbsp;${data.ucapan}</p>
                </div>
            `;
        });
    } else {
        document.querySelector('.comment-list').innerHTML = `
        <div class="comment">
            <div class="d-flex align-items-baseline mb-2">
                <h4 class="name d-block my-0 me-3">Belum Ada ucapan</h4>
            </div>
        </div>
    `
    }
});

// Detect action from form and get input value
document.getElementById("comment-form").addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.getElementById("input-nama").value;
    const ucapan = document.getElementById("input-ucapan").value;

    var obj = {
        name: name,
        ucapan: ucapan,
        date: new Date().toString()
    }

    postComment(obj);

    document.getElementById("comment-form").reset();
})

function postComment(data) {

    const key = push(child(ref(db), 'comments')).key;

    set(ref(db, 'comments/' + key), {
        name: data.name,
        ucapan: data.ucapan,
        timestamp: data.date
    });

}

function resetList() {
    document.querySelector('.comment-list').innerHTML = ``;
}

// Copy Bank to clipboard
$('.copy-rek').on("click", function () {
    var value = $("#no-rek-text").text();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    $temp.remove();
})

// Copy address to clipboard
$('.copy-address').on("click", function () {
    var value = $("#address-text").text();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    $temp.remove();
})

// disable scrolling
$('html, body').css({
    overflow: 'hidden',
});

document.getElementById("audio-button").style.display = "none";
document.getElementById("overlay").style.display = "block"

// Automatically scroll to top after refreshing the page
document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

$('#open-invitation').on("click", function () {
    document.getElementById("open-invitation").style.display = "none";
    document.getElementById("overlay").style.display = "none"
    document.getElementById("reciver").style.display = "none"
    document.getElementById("audio-button").style.display = "block";
    document.getElementById("au").play();

    $('html, body').css({
        overflow: 'auto',
    });

    $('#au').trigger('play');

    window.scrollTo(0, 0);
})

var audio = true;


$('#audio-button').on("click", function () {
    controlAudioIcon();
    audio = !audio;
    controlAudioSound();
})

function controlAudioIcon() {
    if (audio) {
        $('.audio-img').attr('src', "./images/sound_off.png");
    } else {
        $('.audio-img').attr('src', "./images/sound_on.png");
    }
}

function controlAudioSound() {
    if (audio) {
        $('#au').trigger('play');
    } else {
        $('#au').trigger('pause');
        $('#au').prop("currentTime", 0);
    }
}

// $(document).on("scroll", function() {
//     var pageTop = $(document).scrollTop();
//     var pageBottom = pageTop + $(window).height();
//     var tags = $(".content");
  
//     for (var i = 0; i < tags.length; i++) {
//         var tag = tags[i];
//         if ($(tag).position().top < pageBottom) {
//           $(tag).addClass("visible");
//         } else {
//           $(tag).removeClass("visible");
//         }
//     }
// });