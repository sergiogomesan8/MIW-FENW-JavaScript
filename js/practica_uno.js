var baraja = [];
var indexCouple;
var checkIt = 0;

var score = 0;

var contador = 0;
var cont = -1;

var idTimer;

var modHome, modGame, modPref, modRecords, modLogin, modSignin;

var http_request = new XMLHttpRequest();
var url = 'http://fenw.etsisi.upm.es:10000';

window.onload = function () {
    addEventsNavbar();
    
    document.getElementById('submit-login').onclick = submitFormLogin;
    document.getElementById('submit-signin').onclick = submitFormSignin;
    document.getElementById('password-repeat').onblur = equalPass;

    document.getElementById('prefs-submit').onclick = setPrefsValues;
};

function addEventsNavbar() {
    modHome = document.getElementById('mod-home');
    modGame = document.getElementById('mod-game');
    modPref = document.getElementById('mod-preferences');
    modRecords = document.getElementById('mod-records');
    modLogin = document.getElementById('mod-login');
    modSignin = document.getElementById('mod-signin');

    /*-- Navbar --*/
    document.getElementById('acces-home').onclick = goToHome;
    document.getElementById('acces-game').onclick = goToGame;
    document.getElementById('acces-preferences').onclick = goToPrefs;
    document.getElementById('acces-records').onclick = goToRecords;
    document.getElementById('acces-login').onclick = goToLogin;
    document.getElementById('acces-signin').onclick = goToSignin;

    /*-- Navbar Dropdown --*/
    document.getElementById('acces-home2').onclick = goToHome;
    document.getElementById('acces-game2').onclick = goToGame;
    document.getElementById('acces-preferences2').onclick = goToPrefs;
    document.getElementById('acces-records2').onclick = goToRecords;
    
}

function goToHome(){
    modHome.setAttribute('class', 'd-flex');
    modGame.setAttribute('class', 'd-none');
    modPref.setAttribute('class', 'd-none');
    modRecords.setAttribute('class', 'd-none');
    modLogin.setAttribute('class', 'd-none');
    modSignin.setAttribute('class', 'd-none');
}

function goToGame(){
    modGame.setAttribute('class', 'd-flex');
    modHome.setAttribute('class', 'd-none');
    modPref.setAttribute('class', 'd-none');
    modRecords.setAttribute('class', 'd-none');
    modLogin.setAttribute('class', 'd-none');
    modSignin.setAttribute('class', 'd-none');

    numNaipes = localStorage.getItem("numNaipes");
    time = localStorage.getItem("time");

    document.getElementById('score').innerHTML = score;
    document.getElementById('time').innerHTML = time;
    document.getElementById('num-naipes-info').innerHTML = numNaipes;
    
    restartGame();

    if(time!=0){
        idTimer = setInterval(() => {
            time-=1;
            document.getElementById('time').innerHTML = time;
            if(time==0){
                clearInterval(idTimer);
                alert("Se te acabó el tiempo!!");
            }
        }, 1000);
    }
}

function goToPrefs(){
    modPref.setAttribute('class', 'd-flex');
    modHome.setAttribute('class', 'd-none');
    modGame.setAttribute('class', 'd-none');
    modRecords.setAttribute('class', 'd-none');
    modLogin.setAttribute('class', 'd-none');
    modSignin.setAttribute('class', 'd-none');
}

function goToRecords(){
    modRecords.setAttribute('class', 'd-flex');
    modHome.setAttribute('class', 'd-none');
    modGame.setAttribute('class', 'd-none');
    modPref.setAttribute('class', 'd-none');
    modLogin.setAttribute('class', 'd-none');
    modSignin.setAttribute('class', 'd-none');

    getRecords();
}

function goToLogin(){
    modLogin.setAttribute('class', 'd-flex');
    modHome.setAttribute('class', 'd-none');
    modGame.setAttribute('class', 'd-none');
    modPref.setAttribute('class', 'd-none');
    modRecords.setAttribute('class', 'd-none');
    modSignin.setAttribute('class', 'd-none');
}

function goToSignin(){
    modSignin.setAttribute('class', 'd-flex');
    modHome.setAttribute('class', 'd-none');
    modGame.setAttribute('class', 'd-none');
    modPref.setAttribute('class', 'd-none');
    modRecords.setAttribute('class', 'd-none');
    modLogin.setAttribute('class', 'd-none');
}


function startGame(){
    score = 0;
    
    putCards();
    clickCards();
}

function restartGame(){
    clearInterval(idTimer);
    baraja = [];
    myNode = document.getElementById('template-naipes');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
    startGame();
}


function finGame(){
    clearInterval(idTimer);
    numNaipes = localStorage.getItem("numNaipes");
    if(numNaipes == 26){
        score+=25;
    }
    if(numNaipes == 32){
        score+=50;
    }
    
    time = localStorage.getItem("time");
    if(time == 60){
        score+=100;
    }
    if(time == 90){
        score+=75;
    }
    if(time == 120){
        score+=50;
    }
    if(time == 150){
        score+=25;
    }
}


/*-- Preferences --*/
function setPrefsValues(){
    localStorage.clear();
    numNaipes = document.getElementById('num-naipes').value;
    time = document.getElementById('time-game').value;
    
    localStorage.setItem("numNaipes", numNaipes);
    localStorage.setItem("time", time);

    goToGame();
}
/*-- Preferences --*/



/*-- Inicio Game --*/
function putCards() {
    numNaipes = localStorage.getItem("numNaipes");

    for(i=0; i<numNaipes; i++){
        createCard(i);
    }
}

function createCard(i){
    let type = randomCard();

    baraja.push(type);

    newCard = document.createElement('img');
    newCard.setAttribute('src', '/assets/img/reverso.jpg');
    newCard.setAttribute('alt', type);

    newAnchor = document.createElement('a');
    newAnchor.setAttribute('id', 'naipe' + i);
    newAnchor.setAttribute('class', 'naipe col-2');

    document.getElementById('template-naipes').appendChild(newAnchor);
    document.getElementById('naipe' + i).appendChild(newCard);
}

function randomCard(){
    contador++;
    if(contador <= (numNaipes/2)){
        var number = Math.floor(Math.random()*8+1);
        let type;

        if(number == 1){
            type = "bastos1.jpg";
        }
        if(number == 2){
            type = "bastos12.jpg";
        }
        if(number == 3){
            type = "copas1.jpg";
        }
        if(number == 4){
            type = "copas12.jpg";
        }
        if(number == 5){
            type = "espadas1.jpg";
        }
        if(number == 6){
            type = "espadas12.jpg";
        }
        if(number == 7){
            type = "oros1.jpg";
        }
        if(number == 8){
            type = "oros12.jpg";
        }

        return type;
    }
    else{
        cont++;
        return baraja[cont];
    }
}
/*-- Inicio Game --*/



/*-- Game --*/
function clickCards(){
    document.querySelectorAll("#template-naipes .naipe").forEach((element, index) => {
        element.onclick = () => {       
            anchor = document.getElementById('naipe' + index);
            card = anchor.firstElementChild;

            if(baraja[index]!=""){
                card.setAttribute('src', '/assets/img/'+ baraja[index]);
                card.setAttribute('alt', baraja[index]);
            
                setTimeout(() => {
                    if(checkIt==0){
                        indexCouple=index;
                        checkIt+=1;
                    }
                    else{
                        checkCouple(index);
                        checkIt-=1;
                    }
                },700);
            }
        }
    });
}

function checkCouple(i){
    if(baraja[indexCouple]!=baraja[i]){
        anchor = document.getElementById('naipe' + i);
        card = anchor.firstElementChild;

        card.setAttribute('src', '/assets/img/reverso.jpg');
        card.setAttribute('alt', 'reverso.jpg');

        coupleAnchor = document.getElementById('naipe' + indexCouple);
        coupleCard = coupleAnchor.firstElementChild;

        coupleCard.setAttribute('src', '/assets/img/reverso.jpg');
        coupleCard.setAttribute('alt', 'reverso.jpg');
        score-=5;
        document.getElementById('score').innerHTML = score;
    }
    else{
        baraja[indexCouple]="";
        baraja[i]="";
        score+=15;
        document.getElementById('score').innerHTML = score;
        if(baraja.every(isEmpty)){
            finGame();
        }
    }
}

function isEmpty(str){
    return str == "";
  }
/*-- Game --*/



/*-- Records --*/
function getRecords(){
    url = url + "/records";

    http_request.open('GET', url, true);
    http_request.responseType = 'json';
    http_request.onload = processResponseRecords;
    http_request.send();
}

function processResponseRecords(){
    var top10Scores;
    if(http_request.status = 200){
        top10Scores = http_request.response;
        body = document.getElementById('body');
        body.innerHTML = ``;
        let cont = 1;
        
        for(let item of top10Scores){            
            body.innerHTML += `
            <tr>
                <th scope="row"></th>
                <td>${cont++}</td>
                <td>${item.username}</td>
                <td>${item.punctuation}</td>
                <td>${item.cards}</td>
                <td>${item.disposedTime}</td>
                <td>${new Date(item.recordDate).toLocaleDateString()}</td>
                </tr>
            `;                   
        }
    }
    else{
        alert(response);
    }
}
/*-- Records --*/



/*-- LogIn y SignIn --*/
function submitFormLogin(){
    goToGame();
}

function submitFormSignin(){
    let pass = document.getElementById('passwordS').value;
    let pass2 = document.getElementById('password-repeat').value;

    if(pass==pass2){
        goToLogin();
    }
}

function equalPass(){
    let pass = document.getElementById('passwordS').value;
    let pass2 = document.getElementById('password-repeat').value;

    if(pass!=pass2){
        document.getElementById('passwordS').style.borderColor = "red";
        document.getElementById('password-repeat').style.borderColor = "red";
    }
    else{
        document.getElementById('passwordS').style.borderColor = "#918b8b";
        document.getElementById('password-repeat').style.borderColor = "#918b8b";
    }
}
/*-- LogIn y SignIn --*/
