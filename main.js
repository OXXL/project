
let player1 = {
    name:'Scorpion',
    hp:80,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

let player2 = {
    name:'Sonya',
    hp:50,
    img:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['bamboo sticks'],
    atack: function(){
        console.log(this.name + 'Fight...');
    }
}

function createPlayer(playerclass, object) {
    
    const player = document.createElement('div');
    const progressbar = document.createElement('div');
    const life = document.createElement('div');
    const name = document.createElement('div');
    const character = document.createElement('div');
    const img = document.createElement('img');
    
    player.classList.add(playerclass);
    progressbar.classList.add('progressbar');
    character.classList.add('character');
    life.classList.add('life');
    name.classList.add('name');
    
    player.appendChild(character);
    player.appendChild(progressbar);
    progressbar.appendChild(name);
    progressbar.appendChild(life);
    character.appendChild(img);
    

    life.style.width = object.hp + '%';
    name.innerText = object.name;
    img.src = object.img;

    const arenas = document.querySelector('.arenas');
    arenas.appendChild(player);
}


createPlayer('player1', player1);
createPlayer('player2', player2);