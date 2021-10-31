import {$formFight, $arenas, getRandom, createElement, generateLogs,
     createReloadButton, playerWin, $fightButton, enemyAttack} from './src.js';
import Player from './player.js';

let player1;
let player2;
class Game {

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    getEnemyAttak = async ({hit, defence} = enemyAttack()) => {
        const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
            })
        });
        let rezult = await body.json();
        return rezult;
    }

    playerHPWin = () => {
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

    createPlayer = ({player, hp, name, img}) => {
    
        const $player = createElement('div', `player${player}`);
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

    start = async () => {

        const players = await this.getPlayers();
        const p1 = JSON.parse(localStorage.getItem('player1'));
        // const p1 = players[getRandom(players.length) - 1];
        const p2 = players[getRandom(players.length) - 1];
        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        })
        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        })

        // player1.createPlayer();
        // player2.createPlayer();

        $arenas.appendChild(this.createPlayer(player1));
        $arenas.appendChild(this.createPlayer(player2));
        generateLogs('start', player1, player2);

        $formFight.addEventListener('submit', async (e) => {
            e.preventDefault();
           
            const {player1: {hit: hitEmemy, defence: defenceEnemy, value: valueEnemy}, player2: {hit, defence, value}} = await this.getEnemyAttak();
            // const {hit, defence, value} = playerAttack();
    
            if (defence !== hitEmemy) {
                player1.changeHP(valueEnemy);
                player1.renderHP();
                generateLogs('hit', player2, player1, valueEnemy);
            }
    
            if (defenceEnemy !== hit) {
                player2.changeHP(value);
                player2.renderHP();
                generateLogs('hit', player1, player2, value);
            }
    
            if (hitEmemy === defence) {
                generateLogs('defence', player2, player1);
            }
    
            if (hit === defenceEnemy) {
                generateLogs('defence', player1, player2);
            }
       
            this.playerHPWin();
     
        })

    }
    
}

export default Game;