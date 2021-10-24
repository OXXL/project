const arenas = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

function changeHP (getRandom_max) {
    this.hp -= getRandom_max;
    if (this.hp <= 0) {
        this.hp = 0; 
    }
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


arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

function playerHPWin() {
    if (player1.hp === 0 || player2.hp === 0) {
        fightButton.disabled = true;
        arenas.appendChild(createReloadButton());
    }
    
    if (player1.hp === 0 && player1.hp < player2.hp) {
        arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2,  player1);
    } else if ((player2.hp === 0 && player2.hp < player1.hp)) {
        arenas.appendChild(playerWin(player1.name));    
        generateLogs('end', player1,  player2); 
    } else if (player2.hp === 0 && player1.hp === 0) {
        arenas.appendChild(playerWin());
        generateLogs('draw', player2,  player1);
    }
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};

    for (let item of formFight) {
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

function generateLogs(type, player1, player2, playerAttack) { 
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
    chat.insertAdjacentHTML('afterbegin', el);
}
    
formFight.addEventListener('submit', function (e) {
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