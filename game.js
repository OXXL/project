import {ATTACK, HIT, $formFight, $fightButton, $arenas, $chat, logs} from './src.js';
import {player1, player2} from './player.js';

class Game {
    constructor(props) {
    }
    getRandom = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;
    enemyAttack = () => {
        const hit = ATTACK[this.getRandom(3) - 1];
        const defence = ATTACK[this.getRandom(3) - 1];
        return {
            value: this.getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () => {
        const attack = {};

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = this.getRandom(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;
        }

        return attack;
    }


    createElement = (element, className) => {
        const $element = document.createElement(element);
        if (className) {
            $element.classList.add(className);
        }
        return $element;
    }


    createReloadButton = () => {
        const $reloadWrap = this.createElement('div', 'reloadWrap');
        const $button = this.createElement('button', 'button');

        $reloadWrap.appendChild($button);
        $button.innerText = '  Restart'; 
        $button.addEventListener('click', () => {
            window.location.reload();
        })
        return $reloadWrap;
    }

    playerWin = (name) => {
        const $winTitle = this.createElement('div', 'loseTitle');
        if (name) {
            $winTitle.innerText = name + '  WIN'; 
        } else {
            $winTitle.innerText = '  DRAW'; 
        }
        return $winTitle;
    }

    playerHPWin = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            $fightButton.disabled = true;
            $arenas.appendChild(this.createReloadButton());
        }
    
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(this.playerWin(player2.name));
            this.generateLogs('end', player2,  player1);
        } else if ((player2.hp === 0 && player2.hp < player1.hp)) {
            $arenas.appendChild(this.playerWin(player1.name));    
            this.generateLogs('end', player1,  player2); 
        } else if (player2.hp === 0 && player1.hp === 0) {
            $arenas.appendChild(this.playerWin());
            this.generateLogs('draw', player2,  player1);
        }
    }

    createPlayer = ({player, hp, name, img}) => {
    
        const $player = this.createElement('div', `player${player}`);
        const $progressbar = this.createElement('div', 'progressbar');
        const $life = this.createElement('div', 'life');
        const $nameDiv = this.createElement('div', 'name');
        const $character = this.createElement('div', 'character');
        const $img = this.createElement('img');
        
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

    generateLogs = (type, {name} = {}, {name: playerName2, hp} = {}, playerAttack) => { 
        let text = '';
        let el = '';
        const elemRand = this.getRandom(logs[type].length)-1;
        const gameTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        // const gameTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        switch(type) {
            case 'hit':
                text = logs['hit'][elemRand].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
                el = `<p>${gameTime} - ${text} ${-playerAttack} [${hp}/100]</p>`;
                break;
            case 'defence':
                text = logs['defence'][elemRand].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
                el = `<p>${gameTime} - ${text}</p>`;
                break;
            case 'draw':
                text = logs.draw;
                el = `<p>${gameTime} - ${text}</p>`;
                break;
            case 'start':
                text = logs.start.replace('[time]', gameTime).replace('[player1]', name).replace('[player2]', playerName2);
                el = `<p>${text}</p>`;
                break;
            case 'end':
                text = logs['end'][elemRand].replace('[playerWins]', name).replace('[playerLose]', playerName2);
                el = `<p>${gameTime} - ${text}</p>`;
                break;
        }
        $chat.insertAdjacentHTML('afterbegin', el);
        }

    start = () => {
        console.log(this);
        $arenas.appendChild(this.createPlayer(player1));
        $arenas.appendChild(this.createPlayer(player2));
        this.generateLogs('start', player1, player2);

        $formFight.addEventListener('submit', (e) => {
            e.preventDefault();
            const {hit: hitEmemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
            const {hit, defence, value} = this.playerAttack();
    
            if (defence !== hitEmemy) {
                player1.changeHP(valueEnemy);
                player1.renderHP();
                this.generateLogs('hit', player2, player1, valueEnemy);
            }
    
            if (defenceEnemy !== hit) {
                player2.changeHP(value);
                player2.renderHP();
                this.generateLogs('hit', player1, player2, value);
            }
    
            if (hitEmemy === defence) {
                this.generateLogs('defence', player2, player1);
            }
    
            if (hit === defenceEnemy) {
                this.generateLogs('defence', player1, player2);
            }
       
            this.playerHPWin();
     
        })

    }
    
}

export default Game;