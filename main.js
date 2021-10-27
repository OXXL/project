import {$arenas, $formFight, $chat, logs, player1, player2} from './src.js';
import {getRandom, createElement, enemyAttack, playerAttack, playerHPWin} from './util.js';


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

export const  generateLogs = (type, player1, player2, playerAttack) => { 
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

