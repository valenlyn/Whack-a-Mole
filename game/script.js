console.log("Linked");

var score = 0;
var round = 1;
var status = "";

var info = document.getElementsByClassName('info')[0];
var displayScore = document.createElement('p');
displayScore.innerText = "Score: " + score;
info.appendChild(displayScore);

var area = document.getElementById('main');
var boxes = [];

/* Leaderboard */

var topScores = [];

var name = "";

const nameInput = document.querySelector('input');
nameInput.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        getInput();
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

// When there's time, loop through the scores, get position, and do insertBefore instead of removing the entire table

    var oldScoreBoard = document.querySelector('table');
    var scoreBoardNames = oldScoreBoard.getElementsByTagName('tr');

    for (var i = scoreBoardNames.length -1; i > 0; i--) {
        oldScoreBoard.removeChild(scoreBoardNames[i]);
    }

        getAirtableRecords();

}


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyS3h9yowOlUCiPJ'}).base('appEpG8UUPlhXYBpU');


function getAirtableRecords() {
//Get all records from table 1
base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 10,
    view: "Grid view",
    sort: [{field: "Score", direction:"desc"}]
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.


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

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'), record.get('Score'));
        var name = record.get('Name');
        var record = record.get('Score');
        topScores.push(record);


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


    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

/* Create images */
function createDivs() {

    for (var i = 0; i <= 45; i++) {
        var div = document.createElement('div');
        div.setAttribute('class','box');
        div.innerText = " ";
        area.append(div);
        boxes.push(div);

        var moles = document.createElement('img');
        moles.setAttribute('src','art/sad-mole.png');
        moles.setAttribute('style','width:50px;height:50px;display:none');
        moles.setAttribute('class','mole');
        // moles.setAttribute('style','height:20px');
        // moles.setAttribute('style','display:none');
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

    }

}

// function startGame()


// // add event listener only when the moles are displayed.
// // mole.addEventListener('click',hit);

createDivs();

function hit() {

    var pointDisplay = document.createElement('span');
    pointDisplay.setAttribute('class','point');
    this.parentNode.insertBefore(pointDisplay, this);
    setTimeout(function(){pointDisplay.setAttribute('style','display:none')},700);

    if (event.target.classList[0] === "mole") {
    score++;
    displayScore.innerText = "Score: " + score;
    pointDisplay.innerText = "+1";

    } else if (event.target.classList[0] === "happy-mole") {
        score--;
        displayScore.innerText = "Score: " + score;
        pointDisplay.setAttribute('style','color:red');
        pointDisplay.innerText = "-1";
    } else if (event.target.classList[0] === "pimple") {
        score += 5;
        displayScore.innerText = "Score: " + score;
        pointDisplay.innerText = "+5";
    }


    this.setAttribute('style','display:none');

}

function makeMoles(timeToAppear,timeToDisappear) {
    setTimeout(function(){
        var randomNumber = Math.floor(Math.random() * 45) + 1;
    document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:none')}, timeToDisappear);
    },timeToAppear)
}

function makeHappyMoles(timeToAppear,timeToDisappear) {
    setTimeout(function(){
            var randomNumber = Math.floor(Math.random() * 30) + 1;
    document.getElementsByClassName('happy-mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('happy-mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('happy-mole')[randomNumber].setAttribute('style','display:none')}, timeToDisappear);
},timeToAppear)
}

function makePimples(timeToAppear,timeToDisappear) {
    setTimeout(function(){
            var randomNumber = Math.floor(Math.random() * 30) + 1;
    document.getElementsByClassName('pimple')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('pimple')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('pimple')[randomNumber].setAttribute('style','display:none')}, timeToDisappear);
},timeToAppear)
}

function restartGame() {
    window.location.reload();
}

function gameOver() {

        var gameOverPopUp = document.getElementsByClassName('game-over')[0];
        gameOverPopUp.setAttribute('style','display:inline-block');
        getAirtableRecords();

        var lowestTopScore = Math.min(...topScores);

        var gameMsg = document.getElementsByClassName('message')[0];

    if ( (score >= lowestTopScore) || (topScores.length <= 10)) {
        gameMsg.innerText = "New high score!";
        document.getElementsByClassName('input-button')[0].setAttribute('style','display:flex');
    }


    var restartButton = document.getElementsByClassName('restart')[0];
    restartButton.addEventListener('click', restartGame);

}


// 😭😭😭😭😭😭😭

var c = 5;
var t;

function countdownTimer(pointsNeeded) {

        if (c <= 9) {
            document.getElementById("timer").innerText = "00:0" + c;
        } else if (c > 9) {
             document.getElementById("timer").innerText = "00:" + c;
        }


        c = c - 1;

        t = setTimeout(countdownTimer, 1000);

            if (c === -1) {

            clearTimeout(t);
                if (score >= pointsNeeded) {
                    function message() {
                        console.log("Won");
                    round++;
                    }

                    setTimeout(message,1000);


                } else {
                    console.log("Failed")
                }
}
}
countdownTimer(2);


function roundOne() {

    alert("Whack 5 sad moles");

    makeMoles(2200,2000);
    makeMoles(1500,3000);
    makeMoles(1000,4000);
    makeMoles(3000,2000);
    makeMoles(2800,2000);
    makeMoles(2000,3000);
    makeMoles(1900,3000);

    var c = 0;
    var t;

    function timedCount() {

        if (c <= 9) {
            document.getElementById("timer").innerText = "00:0" + c;
        } else if (c > 9) {
             document.getElementById("timer").innerText = "00:" + c;
        }


        c = c + 1;
        t = setTimeout(timedCount, 1000);

            if (c === 6) {
            clearTimeout(t);

                if (score >= 5) {
                    function message() {
                    console.log("Won");
                    round++;
                    setTimeout(roundTwo,1500);

                    }

                    setTimeout(message, 1000);


                } else {
                    console.log("Failed.")
                    status = "lost";
                    gameOver();
                }
            }

    }

    timedCount();
    return status;

}

function roundTwo() {

    alert("Get 15 points. Don't whack the bouncing happy moles!");

makeMoles(1000,4000);
makeMoles(2000,3000);
makeMoles(2500,3000);
makeMoles(3000,2500);
makeMoles(3500,3000);
makeMoles(4000,1500);
makeMoles(4500,2000);
makeMoles(5000,2000);
makeMoles(6000,1500);
makeMoles(6500,2000);
makeMoles(7000,1000);
makeMoles(7500,1000);
makeMoles(8000,2000);
makeMoles(8500,1300);
makeMoles(9000,1000);

makeHappyMoles(2000,3000);
makeHappyMoles(5500,3000);
makeHappyMoles(6500,3000);

    var c = 0;
    var t;

    function timedCount() {

        if (c <= 9) {
            document.getElementById("timer").innerText = "00:0" + c;
        } else if (c > 9) {
             document.getElementById("timer").innerText = "00:" + c;
        }


        c = c + 1;
        t = setTimeout(timedCount, 1000);

            if (c === 11) {
            clearTimeout(t);

                if (score >= 15) {
                    function message() {
                        console.log("Won");
                    round++;
                    setTimeout(roundThree,2000);
                    }

                    setTimeout(message,1000);


                } else {
                    console.log("Failed")
                    gameOver();
                }
            }

    }

    timedCount();

}


function roundThree() {

alert("Get 30 points to get to the next round!");

makeMoles(1000,4000);
makeMoles(2000,3000);
makeMoles(2500,3000);
makeMoles(3000,2500);
makeMoles(3500,3000);
makeMoles(4000,1500);
makeMoles(4500,2000);
makeMoles(5000,2000);
makeMoles(6000,1500);
makeMoles(6500,2000);
makeMoles(7000,1000);
makeMoles(7500,1000);
makeMoles(8000,2000);
makeMoles(8500,1300);
makeMoles(9000,1000);
makeMoles(9500,2000);
makeMoles(10000,1000);
makeMoles(10500,2500);
makeMoles(11000,1000);
makeMoles(11500,1000);
makeMoles(12000,1300);
makeMoles(12500,1200);

makeHappyMoles(2000,3000);
makeHappyMoles(5500,3000);
makeHappyMoles(6500,3000);
makeHappyMoles(1500,2000);

    // timedCount(21,30);
}

function roundFour() {
displayRound.innerText = "Round: " + round;
roundMessage.innerText = "Squeeze the pimples! Get 50 points to get to the next round";

makePimples(2000,3000);

}

function roundFive() {
    // make happy moles to fill the screen, use mouseover event listener to trigger point allocation
}


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
    default:
    play = console.log("No game");
}