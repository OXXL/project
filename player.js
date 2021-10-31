class Player {
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
    }
    atack = () => console.log(this.name + 'Fight...');
    changeHP = (value) => {
        this.hp -= value;
         if (this.hp <= 0) {
            this.hp = 0; 
        }
    }
    elHP = () => document.querySelector(`.player${this.player} .life`);
    renderHP = () => this.elHP().style.width = this.hp + '%';
}

export const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
})

export const player2 = new Player({
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['bamboo sticks'],
})
