const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

let player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    atack: function() {
        console.log(this.name + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
}

let player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['bamboo sticks'],
    atack: function(){
        console.log(this.name + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
}

function changeHP (getRandom_max) {
    this.hp -= getRandom_max;
    if (this.hp <= 0) {
        this.hp = 0; 
    }
    console.log(this.hp);
}

function elHP() {
    return  document.querySelector('.player' + this.player + ' .life');
    // return document.querySelector(`.player${this.player} .life`);
}

function renderHP () {
    this.elHP().style.width = this.hp + '%';
}

function getRandom(max, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElement(element, className) {
    const tag = document.createElement(element);
    if (className) {
        tag.classList.add(className);
    }
    return tag;
}

function createReloadButton(){
    const reloadWrap = createElement('div', 'reloadWrap');
    const button = createElement('button', 'button');

    reloadWrap.appendChild(button);
    button.innerText = '  Restart'; 
    button.addEventListener('click', function () {
        window.location.reload();
    })
    return reloadWrap;
}

function playerWin(name) {
    const winTitle = createElement('div', 'loseTitle');
    if (name) {
        winTitle.innerText = name + '  WIN'; 
    } else {
        winTitle.innerText = '  DRAW'; 
    }
    return winTitle;
}

function createPlayer(object) {
    
    const player = createElement('div', 'player' + object.player);
    const progressbar = createElement('div', 'progressbar');
    const life = createElement('div', 'life');
    const nameDiv = createElement('div', 'name');
    const character = createElement('div', 'character');
    const img = createElement('img');
    
    player.appendChild(character);
    player.appendChild(progressbar);
    progressbar.appendChild(nameDiv);
    progressbar.appendChild(life);
    character.appendChild(img);
    
    life.style.width = object.hp + '%';
    nameDiv.innerText = object.name;
    img.src = object.img;

    return player
}

randomButton.addEventListener('click', function () { 
    
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP();
    player2.renderHP();
    

    if (player1.hp === 0 || player2.hp === 0) {
        randomButton.disabled = true;
        arenas.appendChild(createReloadButton());
    }
    
    if (player1.hp === 0 && player1.hp < player2.hp) {
            arenas.appendChild(playerWin(player2.name));
    } else if ((player2.hp === 0 && player2.hp < player1.hp)) {
            arenas.appendChild(playerWin(player1.name));     
    } else if (player2.hp === 0 && player1.hp === 0){
            arenas.appendChild(playerWin());
    }

})

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));