let fieldSize = 2;
let masss = [];
let imgs = ["../resources/1.png", "../resources/2.png", "../resources/3.png", "../resources/4.png", "../resources/5.png", "../resources/6.png", "../resources/7.png", "../resources/8.png", "../resources/9.png", "../resources/10.png", "../resources/11.png", "../resources/12.png", "../resources/13.png", "../resources/14.png", "../resources/15.png", "../resources/16.png", "../resources/17.png", "../resources/18.png", "../resources/19.png", "../resources/20.png", "../resources/21.png", "../resources/22.png", "../resources/23.png", "../resources/24.png", "../resources/25.png", "../resources/26.png", "../resources/27.png", "../resources/28.png", "../resources/29.png", "../resources/30.png", "../resources/31.png", "../resources/32.png"];
let field = document.getElementById('field');

let timer = document.getElementById('timer');
let time;
let content = document.getElementById('content');
let cards = document.getElementsByClassName('card');
let counterOfCards = 0;

let seconds = 20;

let flag = true;
let firstcard;
let secondcard;

let level = 1;
let wins = document.getElementById('win');
let lvl = document.getElementById('level');

lvl.innerHTML = `Level ${level}`;

// function r(){
//     let a = document.getElementsByClassName('card');
//     for(let i = 0; i < masss.length; i++){
//         a[i].style.background = `url(${imgs[masss[a[i].id]]})`;
//     }
// }

if(fieldSize == 6){
    field.style.height = '612px';
	field.style.width = '612px';
}
else if(fieldSize == 8){
    field.style.height = '816px';
	field.style.width = '816px';
}
else if(fieldSize == 2){
    field.style.height = '204px';
	field.style.width = '204px';
}

function generate(){
    
    let countCard = 0;
    for(let i = 0; i < fieldSize; i++){
        for(let j = 0; j < fieldSize; j++){
            field.innerHTML += `<div class="card" id="${countCard}" onclick="checkCard(this)" style="rotate3d(0, 1, 0, 0deg)"></div>`;
            countCard++;
        }
    }
}
generate();

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    } 
    return array;
}

function mass(){
    let massSize = fieldSize * fieldSize;
    for(let i = 0; i < massSize; i++){
        if(i < massSize / 2){
            masss[i] = i;
        }
        else{
            masss[i] = i - massSize / 2;
        }
    }
    shuffle(masss);
    console.log(masss);
}

mass();
// r();

function checkCard(cardid){
    let card = document.getElementById(cardid.id);
    card.style.transform = `rotate3d(0, 1, 0, 180deg)`;
    card.style.background = `url(${imgs[masss[cardid.id]]})`;
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';
    if(flag){
        firstcard = card;
        firstcard.classList.add('fix');
        flag = false;
    }
    else{
        secondcard = card;
        flag = true;
    }
    if(firstcard && secondcard){
        if(firstcard.id == secondcard.id && firstcard.classList.contains('fixed') == false){
            setTimeout(()=>{
                firstcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
                secondcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
                firstcard.style.background = 'none';
                secondcard.style.background = 'none';
                firstcard.style.backgroundColor = '#bedac3';
                secondcard.style.backgroundColor = '#bedac3';
                firstcard.classList.remove('fix');
                secondcard.classList.remove('fix'); 
                firstcard = null;
                secondcard = null;
            }, 500)
        }
        else if(secondcard.classList.contains('fixed') && firstcard.classList.contains('fixed') == false){
            firstcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
            firstcard.style.background = 'none';
            firstcard.style.backgroundColor = '#bedac3';
            firstcard.classList.remove('fix');
            firstcard = null;
            secondcard = null;
        }
        else if(secondcard.classList.contains('fixed') == false && firstcard.classList.contains('fixed')){
            secondcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
            secondcard.style.background = 'none';
            secondcard.style.backgroundColor = '#bedac3';
            secondcard.classList.remove('fix'); 
            secondcard = null;
            firstcard = null;
        }
        else if(masss[firstcard.id] != masss[secondcard.id] && secondcard.classList.contains('fix') == false && secondcard.classList.contains('fixed') == false && firstcard.classList.contains('fixed') == false){
            setTimeout(()=>{
                firstcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
                secondcard.style.transform = 'rotate3d(0, 1, 0, 0deg)';
                firstcard.style.background = 'none';
                secondcard.style.background = 'none';
                firstcard.style.backgroundColor = '#bedac3';
                secondcard.style.backgroundColor = '#bedac3';
                firstcard.classList.remove('fix');
                secondcard.classList.remove('fix'); 
                firstcard = null;
                secondcard = null;
            }, 500)
        }
        else if(masss[firstcard.id] == masss[secondcard.id] && firstcard.classList.contains('fix') && secondcard.classList.contains('fix') == false && secondcard.classList.contains('fixed') == false && firstcard.classList.contains('fixed') == false){
            firstcard.classList.add('fix');
            secondcard.classList.add('fix');
            firstcard.classList.add('fixed');
            secondcard.classList.add('fixed');
            firstcard = null;
            secondcard = null;
        }
    }
}

function timerStart(){
    time = setInterval(countingTime, 1000);
}
timerStart();

function countingTime(){
    let sec = Math.floor( seconds % 60 );  
    let min = Math.floor( (seconds/60) % 60 ); 
    if(sec < 10){
       timer.innerHTML = `0${min}:0${sec}`; 
    }
    else{
        timer.innerHTML = `0${min}:${sec}`; 
    }
    
    if(seconds == 0){
        clearInterval(time);
        content.insertAdjacentHTML('beforeend', `<div class="message" id="message"><span>You've lost!</span><button class="restart" onclick="restart()">Restart</button></div>`)
    }
    for(let i = 0; i < cards.length; i++){
        if(cards[i].classList.contains('fixed') == true){
            counterOfCards++; 
        }
    }
    if(counterOfCards == fieldSize * fieldSize){
        clearInterval(time);
        wins.classList.add('animation');
        setTimeout(() => {
            content.insertAdjacentHTML('beforeend', `<div class="message" id="message"><span>Great!!!!</span><button class="restart" onclick="nextlvl()">Next LVL</button></div>`);
        }, 500);
    }
    counterOfCards = 0;
    seconds -= 1;
}

function restart(){
    window.location.reload();
}

function nextlvl(){
    level++;
    counterOfCards++;
    for(let i = 0; i < fieldSize * fieldSize; i++){
        document.getElementById(i).remove();
    }
    if(level <= 3){
        fieldSize = 2;
        seconds = 20;
    }
    else if(level > 3 && level <= 10){
        fieldSize = 4;
        seconds = 70;
    }
    else if(level > 10 && level <= 18){
        fieldSize = 6;
        seconds = 150;
    }
    else{
        seconds = 300;
        fieldSize = 8;
    }

    if(fieldSize == 6){
        field.style.height = '612px';
        field.style.width = '612px';
    }
    else if(fieldSize == 8){
        field.style.height = '816px';
        field.style.width = '816px';
    }
    else if(fieldSize == 4){
        field.style.height = '408px';
        field.style.width = '408px';
    }

    wins.classList.remove('animation');
    document.getElementById('message').remove();
    lvl.innerHTML = `Level ${level}`;
    generate();
    mass();
    timerStart();
}