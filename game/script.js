console.log("Linked");

var score = 0;
var round = 1;
// var status = "";

var info = document.getElementsByClassName('info')[0];

var roundDisplay = document.getElementById('displayRound');

var area = document.getElementById('main');
var boxes = [];

var typies = ["mole", "happy-mole", "pimple", "red-happy-mole"];

var roundInfo = [
    {
        "round": 0,
        "instructions": "nothing",
        "points": 0,
        "timer": 0
    },
    {
        "round": 1,
        "instructions": "Whack 5 sad moles",
        "points": 5,
        "timer": 5,
        "img": "art/sad-mole.png"
    },
    {
        "round": 2,
        "instructions": "Get 10 points \n Don't whack the happy bouncy moles",
        "points": 10,
        "timer": 10,
        "img": "art/happy-mole.png"
    },
    {
        "round": 3,
        "instructions": "Get 30 points \n Squeeze the pimples",
        "points": 30,
        "timer": 15,
        "img": "art/pimple.png"
    },
    {
        "round": 4,
        "instructions": "Rack up 50 points \n Avoid the red happy moles",
        "points": 50,
        "timer": 15,
        "img": "art/red-happy-mole.png"
    },
    {
        "round": 5,
        "instructions": "Get 100 points!",
        "points": 100,
        "timer": 20,
        "img": "art/sad-mole.png"
    },
    {
        "round": 6,
        "instructions": "Get 300 points!",
        "points": 300,
        "timer": 20,
        "img": "art/happy-mole.png"
    }
];

/* Modal */

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get image in DOM
var exampleImg = modal.getElementsByTagName('img')[0];

// When the user clicks on the button, open the modal
function showModal(roundNumber) {
  modal.style.display = "block";

    document.getElementById('round').innerText = "Round " + roundInfo[roundNumber]["round"];
    document.getElementById('instructions').innerText = roundInfo[roundNumber]["instructions"];
    document.getElementById('example').src = roundInfo[roundNumber]["img"];

    if (roundNumber === 2) {
        document.getElementById('example').setAttribute('class','happy-mole');
    } if (roundNumber === 3) {
        document.getElementById('example').classList.remove('happy-mole');
    }
}

/* Leaderboard */

var topScores = [];
var lowestTopScore = 0;
var name = "";

const nameInput = document.querySelector('input');
nameInput.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        getInput();
        nameInput.parentNode.remove();
    }
});

function getInput() {

    name = document.querySelector('input').value;

    base('Table 1').create({
        "Name": name,
        "Score": score
    }, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
});

    var oldScoreBoard = document.querySelector('table');
    var scoreBoardNames = oldScoreBoard.getElementsByTagName('tr');
    var currentTable = document.getElementsByTagName('tr');

    for (var i = scoreBoardNames.length -1; i > 0; i--) {
        oldScoreBoard.removeChild(scoreBoardNames[i]);
    }

    setTimeout(getAirtableRecords,300);

}


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyS3h9yowOlUCiPJ'}).base('appEpG8UUPlhXYBpU');

function getHighScores() {
    base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 10,
    view: "Grid view",
    sort: [{field: "Score", direction:"desc"},{field: "Created Time", direction:"desc"}]
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'), record.get('Score'));
        var name = record.get('Name');
        var record = record.get('Score');
        topScores.push(record);
    });

    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

function getAirtableRecords() {
//Get all records from table 1
base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 10,
    view: "Grid view",
    sort: [{field: "Score", direction:"desc"},{field: "Created Time", direction:"desc"}]
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'), record.get('Score'));
        var name = record.get('Name');
        var record = record.get('Score');
        topScores.push(record);

        var leaderboard = document.getElementsByClassName('leaderboard')[0];

     var createTable = document.createElement('table');
     createTable.setAttribute('id','top-scorers');
        var createPlaceholder = document.createElement('tr');
            var createPlaceHolderName = document.createElement('th');
            createPlaceHolderName.innerText = "Name";
            createPlaceholder.appendChild(createPlaceHolderName);
            var createPlaceholderScore = document.createElement('th');
            createPlaceholderScore.innerText = "Score";
            createPlaceholder.appendChild(createPlaceholderScore);
                createTable.appendChild(createPlaceholder);

        var addTable = document.createElement('tr');
        var addName = document.createElement('td');
        addName.innerText = name;
        var addScore = document.createElement('td');
        addScore.innerText = record;
        addTable.appendChild(addName);
        addTable.appendChild(addScore);

        var topScoreTable = document.getElementById('top-scorers');
        topScoreTable.appendChild(addTable);

    });

    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

/* Create images */
function createDivs() {

    for (var i = 0; i <= 35; i++) {
        var div = document.createElement('div');
        div.setAttribute('class','box');
        div.innerText = " ";
        area.append(div);
        boxes.push(div);

        var moles = document.createElement('img');
        moles.setAttribute('src','art/sad-mole.png');
        moles.setAttribute('style','width:50px;height:50px;display:none');
        moles.setAttribute('class','mole');
        div.appendChild(moles);

        var happyMoles = document.createElement('img');
        happyMoles.setAttribute('src','art/happy-mole.png');
        happyMoles.setAttribute('style','width:50px;height:50px;display:none');
        happyMoles.setAttribute('class','happy-mole')
        div.appendChild(happyMoles);

        var pimples = document.createElement('img');
        pimples.setAttribute('src','art/pimple.png');
        pimples.setAttribute('style','width:50px;height:50px;display:none');
        pimples.setAttribute('class','pimple')
        div.appendChild(pimples);

        var redMoles = document.createElement('img');
        redMoles.setAttribute('src','art/red-happy-mole.png');
        redMoles.setAttribute('style','width:50px;height:50px;display:none');
        redMoles.setAttribute('class','red-happy-mole')
        div.appendChild(redMoles);

    }
}

createDivs();

function hit() {

    var pointDisplay = document.createElement('span');
    pointDisplay.setAttribute('class','point');
    this.parentNode.insertBefore(pointDisplay, this);
    setTimeout(function(){pointDisplay.setAttribute('style','display:none')},700);

    var scoreDisplay = document.getElementById('displayScore');

    if (event.target.classList[0] === "mole") {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    pointDisplay.innerText = "+1";

    } else if (event.target.classList[0] === "happy-mole") {
        score--;
        scoreDisplay.innerText = "Score: " + score;
        pointDisplay.setAttribute('style','color:red');
        pointDisplay.innerText = "-1";
    } else if (event.target.classList[0] === "pimple") {
        score += 5;
        scoreDisplay.innerText = "Score: " + score;
        pointDisplay.innerText = "+5";
    } else if (event.target.classList[0] === "red-happy-mole") {
        score -= 5;
        scoreDisplay.innerText = "Score: " + score;
        pointDisplay.setAttribute('style','color:red');
        pointDisplay.innerText = "-10";
    }


    this.setAttribute('style','display:none');

}


function makeClickies(type,timeToAppear,timeToDisappear) {
     setTimeout(function(){
        var randomNumber = Math.floor(Math.random() * 35) + 1;
    document.getElementsByClassName(type)[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName(type)[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName(type)[randomNumber].setAttribute('style','display:none')}, timeToDisappear);
    },timeToAppear)
}

function restartGame() {
    window.location.reload();
}


function gameOver() {
// hide game + hide moles
    var game = document.getElementById('main');
    game.setAttribute('style','background-image:url("")');
    document.getElementsByClassName('info')[0].setAttribute('style','display:none');

    var footer = document.getElementsByTagName('footer')[0];
    footer.setAttribute('style','display:none');


    // show game over "modal"
        var gameOverPopUp = document.getElementsByClassName('game-over')[0];
        gameOverPopUp.setAttribute('style','display:flex');

        getAirtableRecords();

        var gameMsg = document.getElementsByClassName('message')[0];


    if (score === 0) {
        gameMsg.innerText = "Sorry, you lost!";
        console.log("score is 0");
    } else if (score === Math.min(...topScores)) {
        gameMsg.innerText = "New high score!";
        document.getElementsByClassName('input-button')[0].setAttribute('style','display:flex');
    } else if (score > Math.min(...topScores) || (topScores.length <= 9)) {
        gameMsg.innerText = "New high score!";
        document.getElementsByClassName('input-button')[0].setAttribute('style','display:flex');
    } else if (score < Math.min(...topScores)) {
        console.log(topScores);
        console.log(Math.min(...topScores));
         gameMsg.innerText = "Sorry, you lost!\n Your score: " +score;
    } else {
        gameMsg.innerText = "New high score!";
        document.getElementsByClassName('input-button')[0].setAttribute('style','display:flex');
    }


    var restartButton = document.getElementsByClassName('restart')[0];
    restartButton.addEventListener('click', restartGame);

}

    var c = roundInfo[round]["timer"];
    var t;


function timedCount() {

        if (c <= 9) {
            document.getElementById("displayTimer").innerText = "00:0" + c;
        } else if (c > 9) {
             document.getElementById("displayTimer").innerText = "00:" + c;
        }

        c = c - 1;
        t = setTimeout(function(){

        timedCount();

        }, 1000);

        if (c === -1) {
            clearTimeout(t);

                if (score >= roundInfo[round]["points"]) {
                    round++;
                    startGame();
                    c = roundInfo[round]["timer"];

                } else {
                    gameOver();
                }
        }
    return round;
}


function buttonHide() {
    modal.style.display = "none";
}

function roundOne() {

    roundDisplay.innerText = "Round: " + round;
    showModal(1);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    exampleImg.addEventListener('click',buttonHide);
    exampleImg.addEventListener('click',startRound);

    function startRound() {

        for (var i = 0; i < (roundInfo[round]["timer"] * 1.5); i++) {

            var randomInterval = (Math.floor(Math.random() * 4000) + 2000);

            makeClickies('mole',i * 500,randomInterval);
                // console.log(i * 500);
                // console.log(randomInterval);
        }

    timedCount();

    }

}


function roundTwo() { //bouncy

    roundDisplay.innerText = "Round: " + round;
    showModal(2);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    function startRound() {

        var randomInterval;

        for (var i = 0; i < ((roundInfo[round]["timer"]*2)-1); i++) {

            function setInterval() {
                if (i < (roundInfo[round]["timer"]*0.5)) {
                    randomInterval = (Math.floor(Math.random() * 4000) + 2000);
                } else {
                    randomInterval = (Math.floor(Math.random() * 3000) + 1000);
                }
            }

            setInterval();


        function getRandom(){
          var num=Math.random();
          if(num < 0.35) return 1;
          else if(num >= 0.35) return 0;
          else return 0;
        }

        var randomNum = getRandom();
        var randomTypie = typies[Math.floor(randomNum)];

            makeClickies(randomTypie,i * 500,randomInterval);


        }

    timedCount();

    }
}

function roundThree() { //pimple

    roundDisplay.innerText = "Round: " + round;
    showModal(3);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    function startRound() {

        var randomInterval;

        for (var i = 0; i < ((roundInfo[round]["timer"]*2)-1); i++) {

            function setInterval() {
                if (i < (roundInfo[round]["timer"]*0.5)) {
                    randomInterval = (Math.floor(Math.random() * 4000) + 2000);
                } else {
                    randomInterval = (Math.floor(Math.random() * 3000) + 1000);
                }
            }

            setInterval();


        function getRandom(){
          var num=Math.random();
          if(num < 0.20) return 2;
          else if (num > 0.85) return 1;
          else if(num >= 0.35) return 0;
          else return 0;
        }

        var randomNum = getRandom();
        var randomTypie = typies[Math.floor(randomNum)];

            makeClickies(randomTypie,i * 500,randomInterval);


        }

    timedCount();
    }

}


function roundFour() {

    roundDisplay.innerText = "Round: " + round;
    showModal(4);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    function startRound() {

        var randomInterval;

            for (var i = 0; i < ((roundInfo[round]["timer"]*2)-1); i++) {

                function setInterval() {
                    if (i < (roundInfo[round]["timer"]*0.5)) {
                        randomInterval = (Math.floor(Math.random() * 2500) + 2000);
                    } else {
                        randomInterval = (Math.floor(Math.random() * 2000) + 800);
                    }
                }

                setInterval();


            function getRandom(){
              var num=Math.random();
              if(num < 0.20) return 2;
              else if (num > 0.85) return 3;
              else if (num > 0.65) return 1;
              // else if (num >= 0.35) return 0;
              else return 0;
            }

            var randomNum = getRandom();
            var randomTypie = typies[Math.floor(randomNum)];

                makeClickies(randomTypie,i * 500,randomInterval);


            }

            timedCount();
        }
}



function roundFive() {

roundDisplay.innerText = "Round: " + round;
showModal(5);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    function startRound() {

        var randomInterval;

            for (var i = 0; i < ((roundInfo[round]["timer"]*2)-1); i++) {

                function setInterval() {
                    if (i < (roundInfo[round]["timer"]*0.5)) {
                        randomInterval = (Math.floor(Math.random() * 2000) + 1000);
                    } else {
                        randomInterval = (Math.floor(Math.random() * 2000) + 800);
                    }
                }

                setInterval();


            function getRandom(){
              var num=Math.random();
              if(num < 0.15) return 2;
              else if (num > 0.9) return 3;
              else if (num > 0.75) return 1;
              // else if (num >= 0.35) return 0;
              else return 0;
            }

            var randomNum = getRandom();
            var randomTypie = typies[Math.floor(randomNum)];

                makeClickies(randomTypie,i * 500,randomInterval);


            }

            timedCount();
        }

}

function roundSix() {

roundDisplay.innerText = "Round: " + round;
showModal(6);

    span.onclick = function() {
        modal.style.display = "none";
        startRound();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
                startRound();
        }
    }

    function startRound() {

        var randomInterval;

            for (var i = 0; i < ((roundInfo[round]["timer"]*2)-1); i++) {

                function setInterval() {
                    if (i < (roundInfo[round]["timer"]*0.5)) {
                        randomInterval = (Math.floor(Math.random() * 2000) + 1000);
                    } else {
                        randomInterval = (Math.floor(Math.random() * 1500) + 700);
                    }
                }

                setInterval();


            function getRandom(){
              var num=Math.random();
              if(num < 0.35) return 2;
              else if (num > 0.8) return 3;
              else if (num > 0.65) return 1;
              // else if (num >= 0.35) return 0;
              else return 0;
            }

            var randomNum = getRandom();
            var randomTypie = typies[Math.floor(randomNum)];

                makeClickies(randomTypie,i * 500,randomInterval);


            }

            timedCount();
        }

}

function startGame(){
    switch (round) {
        case 1:
        play = roundOne();
        break;
        case 2:
        play = roundTwo();
        break;
        case 3:
        play = roundThree();
        break;
        case 4:
        play = roundFour();
        break;
        case 5:
        play = roundFive();
        break;
        case 6:
        play = roundSix();
        break;
        default:
        play = console.log("No game");
    }

}

startGame();
getHighScores();