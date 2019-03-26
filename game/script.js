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

var roundInfo = [
    {
        "round": 0,
        "instructions": "nothing",
        "points": 0,
        "timer": 0
    },
    {
        "round": 1,
        "instructions": "Whack 5 sad moles.",
        "points": 5,
        "timer": 5,
        "img": "art/sad-mole.png"
    },
    {
        "round": 2,
        "instructions": "Get 15 points. Don't whack the happy bouncy moles.",
        "points": 15,
        "timer": 15,
        "img": "art/happy-mole.png"
    },
    {
        "round": 3,
        "instructions": "Get 30 points!",
        "points": 30,
        "timer": 15
    },
    {
        "round": 4,
        "instructions": "Squeeze pimples! Get 50 points.",
        "points": 50,
        "timer": 15
    }
];

/* Modal */

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function showModal(roundNumber) {
  modal.style.display = "block";

    document.getElementById('round').innerText = "Round " + roundInfo[roundNumber]["round"];
    document.getElementById('instructions').innerText = roundInfo[roundNumber]["instructions"];
    document.getElementById('example').src = roundInfo[roundNumber]["img"];

    if (roundNumber === 2) {
        document.getElementById('example').setAttribute('class','happy-mole');
    }

}


// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
//   startRound();
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     startRound();
//   }
// }


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
        var randomNumber = Math.floor(Math.random() * 35) + 1;
    document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:none')}, timeToDisappear);
    },timeToAppear)
}

function makeHappyMoles(timeToAppear,timeToDisappear) {
    setTimeout(function(){
            var randomNumber = Math.floor(Math.random() * 35) + 1;
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

// hide game
var game = document.getElementById('main');
game.setAttribute('style','background-image:url("")');


        var gameOverPopUp = document.getElementsByClassName('game-over')[0];
        gameOverPopUp.setAttribute('style','display:flex');
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

    function startRound() {
    makeMoles(2200,3000);
    makeMoles(1500,3000);
    makeMoles(1000,4000);
    makeMoles(2800,3000);
    makeMoles(2000,3000);
    makeMoles(2500,3000);
    makeMoles(1900,4000);

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

            if (c === 7) {
            clearTimeout(t);

                if (score >= 5) {
                    round++;
                    roundTwo();

                } else {
                    console.log("Failed.")
                    status = "lost";
                    gameOver();
                }
            }

    }

    timedCount();
    }

}

function roundTwo() {

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
    makeMoles(1000,4000);
    makeMoles(2000,3000);
    makeMoles(2500,3000);
    makeMoles(3000,2500);
    makeMoles(3500,3000);
    makeMoles(4000,1500);
    makeMoles(4500,2000);
    makeMoles(5000,3000);
    makeMoles(6000,1500);
    makeMoles(6500,2000);
    makeMoles(7000,3000);
    makeMoles(7500,2000);
    makeMoles(8000,3000);
    makeMoles(8500,2300);
    makeMoles(9000,2000);
    makeMoles(9500,3000);
    makeMoles(10000,4000);
    makeMoles(11000,3000);

    makeHappyMoles(2000,3000);
    makeHappyMoles(5500,3000);
    makeHappyMoles(6500,3000);
    makeHappyMoles(10000,3000);
    makeHappyMoles(12000,1800);

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

                if (c === 16) {
                clearTimeout(t);

                    if (score >= 15) {
                            console.log("Won");
                            round++;
                            roundThree();

                    } else {
                        gameOver();
                    }
                }
        }

        timedCount();
}

}


function roundThree() {

alert(roundInfo[3]["instructions"]);

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

            if (c === 16) {
            clearTimeout(t);

                if (score >= 30) {
                    function message() {
                        console.log("Won");
                    round++;
                    setTimeout(roundFour,2000);
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

function roundFour() {

alert(roundInfo[4]["instructions"]);

makeMoles(1000,2000);
makeMoles(2000,2500);
makeMoles(2500,2700);
makeMoles(3000,1500);
makeMoles(3500,2000);
makeMoles(4000,2500);
makeMoles(4500,1000);
makeMoles(5000,3000);
makeMoles(6300,1500);
makeMoles(7000,2500);
makeMoles(8000,1500);
makeMoles(9000,2500);
makeMoles(10500,2500);
makeMoles(11000,1000);
makeMoles(11500,1000);
makeMoles(12000,1300);
makeMoles(12500,2200);
makeMoles(13000,2000);

makePimples(2000,2000);
makePimples(5000,1500);
makePimples(8000,2000);
makePimples(10000,3000);
makePimples(12000,1500);

makeHappyMoles(1500,2000);
makeHappyMoles(3000,3000);
makeHappyMoles(5500,3000);
makeHappyMoles(6500,3000);
makeHappyMoles(11700,2500);
makeHappyMoles(12500,1300);

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

            if (c === 16) {
            clearTimeout(t);

                if (score >= 50) {
                    function message() {
                        console.log("Won");
                    round++;
                    setTimeout(roundFour,2000);
                    }

                    setTimeout(message,1000);


                } else {
                    gameOver();
                }
            }

    }

    timedCount();

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