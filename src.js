export const $arenas = document.querySelector('.arenas');
export const $fightButton = document.querySelector('.button');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');

export const getRandom = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
export const ATTACK = ['head', 'body', 'foot'];

export const logs = {
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

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

// const playerAttack = () => {
//     const attack = {};

//     for (let item of $formFight) {
//         if (item.checked && item.name === 'hit') {
//             attack.value = getRandom(HIT[item.value]);
//             attack.hit = item.value;
//         }

//         if (item.checked && item.name === 'defence') {
//             attack.defence = item.value;
//         }

//         item.checked = false;
//     }

//     return attack;
// }

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
        // window.location.reload();
        setTimeout(() => {
            window.location.pathname = 'index.html';
        }, 1000);
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

export const generateLogs = (type, {name} = {}, {name: playerName2, hp} = {}, playerAttack) => { 
    let text = '';
    let el = '';
    const elemRand = getRandom(logs[type].length)-1;
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