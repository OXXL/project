const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

let player1 = {
    player: 1,
    name:'Scorpion',
    hp:100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

let player2 = {
    player: 2,
    name:'Sonya',
    hp:100,
    img:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['bamboo sticks'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + '  Win'; 
    return $winTitle;
}

function changeHP(player) {
    const playerLife = document.querySelector('.player' + player.player +' .life');
    player.hp -= getRandomInt(1, 20);
    playerLife.style.width = player.hp + '%';

    if (player.hp <= 0) {
        randomButton.disabled = true;
        if (player2.hp > player1.hp) {
            arenas.appendChild(playerWin(player2.name));
            playerLife.style.width = player1.hp = 0 + '%';

        } else {
            arenas.appendChild(playerWin(player1.name));
            playerLife.style.width = player2.hp = 0 + '%';

        }
    }
}

function createPlayer(object) {
    
    const player = createElement('div', 'player' + object.player);
    const progressbar = createElement('div', 'progressbar');
    const life = createElement('div', 'life');
    const name = document.createElement('div', 'name');
    const character = createElement('div', 'character');
    const img = createElement('img');
    
    player.appendChild(character);
    player.appendChild(progressbar);
    progressbar.appendChild(name);
    progressbar.appendChild(life);
    character.appendChild(img);
    
    life.style.width = object.hp + '%';
    name.innerText = object.name;
    img.src = object.img;

    return player
}

randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
})

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));