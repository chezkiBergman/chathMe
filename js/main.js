
const scoreDOM = document.getElementById("score");
const pointsDOM = document.getElementById("points");
const levelDOM = document.getElementById("level");
const missedDOM = document.getElementById("missed");
const timeDOM = document.getElementById("time");
var higeScore = document.querySelector("#numHigh");
const hiScore = document.getElementById("highS")
const badClicks = document.querySelector(".bgblack");


var speedEscape = 300;
var points = 10;
var score = 0;
var level = 1;
var time = 60;
var missed = 0;
var levelUP = 0;
var animation = 2

var players = []

// Get names from local srotrage
var nameJSON = localStorage.getItem("allNames");
if (nameJSON != null) {
    var arr = JSON.parse(nameJSON);

    players = arr

}


function updatePlayers() {
    nameJSON = JSON.stringify(players);
    localStorage.setItem("allNames", nameJSON);

}
createScoreHige();
function createScoreHige() {
    hiScore.innerHTML = "high score:"
    toAppend = "";
    players.forEach(function (player) {
        toAppend += ` <div id="name"  class="eachName"> 
         <p>${player.yourName}: ${player.scoreHigh}</p> <span id="spanDate">${player.date}</span></div>
      `;
    });
    hiScore.innerHTML += toAppend;
}

scoreDOM.innerHTML = ` <br> ${score} `;
levelDOM.innerHTML = `<br> ${level}`;
pointsDOM.innerHTML = `<br> ${points} `;
timeDOM.innerHTML = ` <br> ${time}`;
missedDOM.innerHTML = ` <br> ${missed} `;


const catchMe = document.getElementById("catch");
var start = document.querySelector(".start");
// var tryAgain = false;
var removeDivSpin = false;

const gameFunction = {

    startGame: function () {
        score = 0;
        scoreDOM.innerHTML = ` <br> ${score}`;
        points = 10;
        pointsDOM.innerHTML = `<br> ${points}`;
        missed = 0;
        missedDOM.innerHTML = ` <br> ${missed}`;
        time = 60;
        timeDOM.innerHTML = ` <br> ${time}`;
        level = 1;
        levelDOM.innerHTML = ` <br> ${level}`;
        animation = 2

        start.removeEventListener("click", gameFunction.startGame);
        catchMe.style.animation = "catchanim " + animation + "s   linear infinite";
        catchMe.addEventListener("mouseover", gameFunction.escape);
        sec = setInterval(function () {
            time--
            timeDOM.innerHTML = ` <br> ${time}`;
            if (time > 0) {
                catchMe.addEventListener("click", gameFunction.gameScore)
                badClicks.addEventListener("click", gameFunction.numMiss)




                // removeDivSpin = false;
            }
            if (time < 0) {
                catchMe.removeEventListener("mouseover", gameFunction.escape);
                catchMe.removeEventListener("click", gameFunction.gameScore);
                badClicks.removeEventListener("click", gameFunction.numMiss);
                clearInterval(sec);
                catchMe.style.left = 0 + "px";
                catchMe.style.top = 0 + "px";
                score = 0;
                scoreDOM.innerHTML = ` <br> ${score}`;
                points = 10;
                pointsDOM.innerHTML = `<br> ${points}`;
                missed = 0;
                missedDOM.innerHTML = ` <br> ${missed}`;
                time = 60;
                timeDOM.innerHTML = ` <br> ${time}`;
                level = 1;
                levelDOM.innerHTML = ` <br> ${level}`;

                catchMe.style.animation = "none"
                // tryAgain = false
                alert("Try Again")

                start.addEventListener("click", gameFunction.startGame);
            }
        }, 1000);
    },
    escape: function () {
        Escape = setTimeout(function () {
            catchMe.style.left = Math.floor(Math.random() * 650) + "px";
            catchMe.style.top = Math.floor(Math.random() * 440) + "px";
        }
            , speedEscape);
    },
    gameScore: function (e) {
        e.stopPropagation();
        // removeDivSpin = true;
        levelUP++;

        score += level * 10;
        scoreDOM.innerHTML = ` <br> ${score}`;
        points--;
        pointsDOM.innerHTML = ` <br> ${points}`;

        // catchMe.removeEventListener("click", gameFunction.gameScore);
        if (levelUP % 10 == 0) {
            // clearInterval(sec);
            level++;
            levelDOM.innerHTML = ` <br> ${level}`;
            time += 10
            timeDOM.innerHTML = `<br> ${time}`;
            points = 10;
            pointsDOM.innerHTML = ` <br> ${points}`;
            speedEscape -= 50;
            animation -= 0.25;
            catchMe.style.animation = "catchanim " + animation + "s   linear infinite";
            alert("Are you redy to the next level?");
            start.addEventListener("click", gameFunction.startGame);
        }
        if (level == 6) {
            level = 5
            levelDOM.innerHTML = ` <br> ${level}`
            // time
            clearInterval(sec);
            catchMe.removeEventListener("mouseover", gameFunction.escape);
            catchMe.removeEventListener("click", gameFunction.gameScore);
            badClicks.removeEventListener("click", gameFunction.numMiss);

            catchMe.style.animation = "none";
            start.removeEventListener("click", gameFunction.startGame);

            var mydate = new Date();

            var date = [mydate.getDate(),
            mydate.getMonth() + 1,
            mydate.getFullYear()]

            var dateJoin = date.join('/')
            var scoreHigh = score;
            var pushPlayers = prompt("What your name")
            var newNames = new namesScore(pushPlayers, scoreHigh, dateJoin);

            players.push(newNames);
            displayNames();

            if (players.length == 6) {
                players.pop();
            }

            // hiScore.innerHTML = "";
            createScoreHige();


            updatePlayers();
            alert("game over! " + pushPlayers + " you are the winner")
            start.addEventListener("click", gameFunction.startGame);
            function displayNames() {
                players.sort(function (a, b) { return b.scoreHigh - a.scoreHigh });

            }

        }
    },
    numMiss: function () {

        if (score > 0) {
            score -= level;
            scoreDOM.innerHTML = ` <br> ${score}`
            missed++
            missedDOM.innerHTML = ` <br> ${missed}`;

        }
    },
}

start.addEventListener("click", gameFunction.startGame);
class namesScore {
    constructor(_yourName, _scoreHigh, _date) {
        this.yourName = _yourName;
        this.scoreHigh = _scoreHigh;
        this.date = _date;

    }
}




