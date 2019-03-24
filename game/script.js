console.log("Linked");

var score = 0;

var info = document.getElementsByClassName('info')[0];
var displayScore = document.createElement('p');
displayScore.innerText = "Score: " + score;
info.appendChild(displayScore);


var area = document.getElementById('main');
var boxes = [];

var round = 1;
var roundInfo = document.getElementsByClassName('round')[0];
var displayRound = document.createElement('p');
displayRound.innerText = "Round: " + round;
roundInfo.appendChild(displayRound);
var roundMessage = document.createElement('span');
roundMessage.innerText = "Hit 10 rowlets";
roundInfo.appendChild(roundMessage);



function createDivs() {

    for (var i = 0; i <= 130; i++) {
        var div = document.createElement('div');
        div.setAttribute('class','box');
        div.innerText = " ";
        area.append(div);
        boxes.push(div);

        var moles = document.createElement('img');
        moles.setAttribute('src','rowlet.png');
        moles.setAttribute('style','width:20px;height:20px;display:none');
        moles.setAttribute('class','mole');
        // moles.setAttribute('style','height:20px');
        // moles.setAttribute('style','display:none');
        div.appendChild(moles);

        var pimples = document.createElement('img');
        pimples.setAttribute('src','weedle.gif');
        pimples.setAttribute('style','width:20px;height:20px;display:none');
        pimples.setAttribute('class','pimples')
        div.appendChild(pimples);

    }

}

// function startGame()


// add event listener only when the moles are displayed.
// mole.addEventListener('click',hit);

createDivs();

function hit() {
    this.setAttribute('style','display:none');
    score++;
    displayScore.innerText= "Score: " + score;
    // var parent = this.parentNode;
    // parent.removeChild(this);
}


// function addEventListener(boxes) {
//     boxes.addEventListener('click',hit);
// }


function badHit() {
    this.setAttribute('style','display:none');
    score--;
    displayScore.innerText= "Score: " + score;
}

function makeMoles1000() {

    var randomNumber = Math.floor(Math.random() * 130) + 1;
    document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:none')}, 1000);

}

function makeMoles3000() {

    var randomNumber = Math.floor(Math.random() * 130) + 1;
    document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:none')}, 3000);

}

function makeMoles4000() {

    var randomNumber = Math.floor(Math.random() * 130) + 1;
    document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('mole')[randomNumber].addEventListener('click',hit);

    setTimeout(function(){
        document.getElementsByClassName('mole')[randomNumber].setAttribute('style','display:none')}, 4000);

}


function roundOne() {
    makeMoles3000();
    makeMoles4000();
    setTimeout(makeMoles4000, 3000);
    setTimeout(makeMoles4000, 1000);
    setTimeout(makeMoles4000, 2000);
    setTimeout(makeMoles4000, 5000);
    setTimeout(makeMoles3000, 1000);
    setTimeout(makeMoles3000, 4000);
    setTimeout(makeMoles1000, 4000);
    setTimeout(makeMoles1000, 2000);
}

roundOne();

function makePimples3000() {
    var randomNumber = Math.floor(Math.random() * 130) + 1;
    document.getElementsByClassName('pimples')[randomNumber].setAttribute('style','display:inline');
    document.getElementsByClassName('pimples')[randomNumber].addEventListener('click',badHit);

    setTimeout(function(){
        document.getElementsByClassName('pimples')[randomNumber].setAttribute('style','display:none')}, 3000);
}

makePimples3000();
setTimeout(makePimples3000, 2000);
setTimeout(makePimples3000, 2000);
setTimeout(makePimples3000, 3000);