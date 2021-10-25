import {$arenas, $formFight, $chat, logs, $fightButton} from './src.js';
import {getRandom, createElement, enemyAttack, playerAttack, createReloadButton, playerWin} from './util.js';

let player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    atack: function() {
        console.log(this.name + 'Fight...');
    },
    changeHP,
    elHP,
    renderHP
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
    changeHP,
    elHP,
    renderHP
}

function changeHP (value) {
    this.hp -= value;
    if (this.hp <= 0) {
        this.hp = 0; 
    }
}

function elHP() {
    // return  document.querySelector('.player' + this.player + ' .life');
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP () {
    this.elHP().style.width = this.hp + '%';
}

const playerHPWin = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    }
    
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2,  player1);
    } else if ((player2.hp === 0 && player2.hp < player1.hp)) {
        $arenas.appendChild(playerWin(player1.name));    
        generateLogs('end', player1,  player2); 
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw', player2,  player1);
    }
}

const createPlayer = ({player, hp, name, img}) => {
    
    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $nameDiv = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    
    $player.appendChild($character);
    $player.appendChild($progressbar);
    $progressbar.appendChild($nameDiv);
    $progressbar.appendChild($life);
    $character.appendChild($img);
    
    $life.style.width = hp + '%';
    $nameDiv.innerText = name;
    $img.src = img;

    return $player
}

const  generateLogs = (type, player1, player2, playerAttack) => { 
    let text = '';
    let el = '';
    const elemRand = getRandom(logs[type].length)-1;
    const gameTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    // const gameTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    switch(type) {
        case 'hit':
            text = logs['hit'][elemRand].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${gameTime} - ${text} ${-playerAttack} [${player2.hp}/100]</p>`;
            break;
        case 'defence':
            text = logs['defence'][elemRand].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${gameTime} - ${text}</p>`;
            break;
        case 'draw':
            text = logs.draw;
            el = `<p>${gameTime} - ${text}</p>`;
            break;
        case 'start':
            text = logs.start.replace('[time]', gameTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'end':
            text = logs['end'][elemRand].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            el = `<p>${gameTime} - ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
    
$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    }

    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1);
    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);
    }
   
    playerHPWin();
 
})

