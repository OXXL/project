const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

let player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

let player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['bamboo sticks'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElement(element, className) {
    const tag = document.createElement(element);
    if (className) {
        tag.classList.add(className);
    }
    return tag;
}

function playerWin(name) {
    const winTitle = createElement('div', 'winTitle');
    winTitle.innerText = name + '  Win'; 
    return winTitle;
}

function changeHP(playerObj) {
    const playerLife = document.querySelector('.player' + playerObj.player + ' .life');
    playerObj.hp -= getRandomInt(1, 20);
    playerLife.style.width = playerObj.hp + '%';
    console.log(playerObj.hp);

    if (playerObj.hp <= 0) {
        randomButton.disabled = true;
        playerLife.style.width = 0 + '%';
        playerObj.hp = 0; 
    };

    return playerObj.hp;

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
    
    life.style.width = 100 + '%';
    nameDiv.innerText = object.name;
    img.src = object.img;

    return player
}

randomButton.addEventListener('click', function () {
    let playerHP1 = changeHP(player1);
    let playerHP2 = changeHP(player2);

    if (playerHP1 <= 0 || playerHP2 <= 0) {
        
        if (player2.hp > player1.hp) {
            arenas.appendChild(playerWin(player2.name));
            
        } else {
            arenas.appendChild(playerWin(player1.name));
           
        }
    }
})

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));