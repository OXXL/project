import {ATTACK, HIT, $formFight} from './src.js';

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

export const playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + '  WIN'; 
    } else {
        $winTitle.innerText = '  DRAW'; 
    }
    return $winTitle;
}