const root = document.getElementById('root');
const gameArea = createNode('div',root,'','gameArea')
const bf = createNode('div',gameArea,'','battlefield');
const currentSquareDiv = createNode('div',gameArea,'','menu currentSqr','currentSqrDiv');
const currentSqrTitle = createNode('div',currentSquareDiv,'Currently Selected Tile');
const currentSquare = createNode('div',currentSquareDiv,'1000','text','currentSqr');
const destroyerButton = createButton('button',gameArea,'','menu','Destroyer');
const submarineButton = createButton('button',gameArea,'','menu','Submarine');
const battleship1Button = createButton('button',gameArea,'','menu','Battleship 1');
const battleship2Button = createButton('button',gameArea,'','menu','Battleship 2');
const aircraftCarrierButton = createButton('button',gameArea,'','menu','Aircraft Carrier');
const directionButton = createButton('button',gameArea,'','menu','Current Ship Placement\nHorizontal');
const squares = [];
const imgs = [];
let destroyer = createShip('destroyer',2);
let submarine = createShip('submarine',3);
let battleship1 = createShip('battleship1',4);
let battleship2 = createShip('battleship2',4);
let aircraftCarrier = createShip('aircraftcarrier',5);
let destroyerAi = createShip('destroyer',2);
let submarineAi = createShip('submarine',3);
let battleship1Ai = createShip('battleship1',4);
let battleship2Ai = createShip('battleship2',4);
let aircraftCarrierAi = createShip('aircraftcarrier',5);
createBattlefield();

let direction = 'horz';
let fleet = [destroyer,submarine,battleship1,battleship2,aircraftCarrier];
let fleetAi = [destroyerAi,submarineAi,battleship1Ai,battleship2Ai,aircraftCarrierAi];
const bfPressed = e => { 
    const isButton = e.target.nodeName === 'BUTTON';
    if(!isButton){return}
    currentSquare.textContent = `${e.target.id}` 
    let id = `${e.target.id}` ;
    // let target = document.getElementById(id);
    // target.className = 'ship1';
}

const directionPressed = e =>{
    if (direction == 'horz'){
        direction = 'vert';
        directionButton.textContent = 'Current Ship Placement\nVertical';
    }
    else{
        direction = 'horz';
        directionButton.textContent = 'Current Ship Placement\nHorizontal';
    }
}
const submarinePressed = e =>{
    placeShip(submarine);
}
const battleship1Pressed = e => {
    placeShip(battleship1);
}
const battleship2Pressed = e => {
    placeShip(battleship2);
}
const aircraftcarrierPressed = e => {
    placeShip(aircraftCarrier);
}
submarineButton.addEventListener('click',submarinePressed);
battleship1Button.addEventListener('click',battleship1Pressed);
battleship2Button.addEventListener('click',battleship2Pressed);
aircraftCarrierButton.addEventListener('click',aircraftcarrierPressed);
bf.addEventListener('click',bfPressed);
directionButton.addEventListener('click',directionPressed);
function createShip(nme,len){
    let ship = {
        name : nme,
        direction :'',
        length: len,
        positions: [],
        hits:0
    }
    return ship
    }
function createNode(tag, parent, text ='', className='', id='',src =''){
    const element = document.createElement(tag);
    parent.appendChild(element);
    element.textContent = text; 
    element.className = className;
    element.id = id;
    return element
}

function createButton(tag,parent,id,className,text,src = ''){
    const element = document.createElement(tag);
    parent.appendChild(element);
    element.textContent = text; 
    element.className = className;
    element.id = id;
    element.src = src
    return element
}

function createBattlefield(){
    let buttonNumber = 0;
    for (let i = 0; i < 10; i++){
        for(let c = 0 ; c < 10; c++){
        squares[buttonNumber] = createButton('button',bf,`${i}${c}`,'grid',``,'water.jpg')
        imgs[buttonNumber] = createNode('img',window[`${i}${c}`],'','tileImg',`${i}${c}`);
        buttonNumber += 1;
        }
    }
    console.log(squares[1].id)
    }

function placeShip(ship){
    let loc = +currentSquare.textContent;
    ship.direction = direction;
    for(let i = 0; i<ship.length;i++){
    if (ship.direction == 'horz'){
    ship.positions.push(loc+i);
    }
    else{
    ship.positions.push(loc+(i*10));   
    }
    for (let pos of ship.positions){
        squares[pos].className = "ship1";
    }
}
}

// function noShipThere(){
//     let shipsThere = fleet.filter

// }


