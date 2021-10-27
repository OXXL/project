import {ATTACK, HIT, $formFight, $fightButton, $arenas, player1, player2} from './src.js';
import {generateLogs} from './main.js';

export const getRandom = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;


export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

export const playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}


export const createElement = (element, className) => {
    const $element = document.createElement(element);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}


export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $reloadWrap.appendChild($button);
    $button.innerText = '  Restart'; 
    $button.addEventListener('click', () => {
        window.location.reload();
    })
    return $reloadWrap;
}

const playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + '  WIN'; 
    } else {
        $winTitle.innerText = '  DRAW'; 
    }
    return $winTitle;
}

export const playerHPWin = () => {
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