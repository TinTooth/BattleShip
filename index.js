const root = document.getElementById('root');
const header = createNode('div',root,'','header');
const boardleft = createNode('div',header,"Player's Board",'h1')
const boardRight = createNode('div',header,"AI's Board",'h1')
const gameArea = createNode('div',root,'','gameArea')
const bf = createNode('div',gameArea,'','battlefield');
const middlecontainer = createNode('div',gameArea,'','flex');
const currentSquareDiv = createNode('div',middlecontainer,'','menu currentSqr middle','currentSqrDiv');
const currentSqrTitle = createNode('div',currentSquareDiv,'Currently Selected Tile');
const currentSquare = createNode('div',currentSquareDiv,'1000','text','currentSqr');
const fireButton = createButton('button',middlecontainer,'','currentSqr menu','FIRE!!')
// const instructions = createNode('div',middlecontainer,"Welcome to Battleship\nFirst place your ships on the left grid!\nSelect the square then click on the ship's button you want to place there\nYou can change Horizontal/Vertical with the button in bottom-middle\nShips place Left to Right and Top Down\nOnce all ships are placed, select enemy square and click the Fire Button\nIf it is a Hit you will get an alert and the tile will change color. \nIf it is a miss it will just change color\nThe enemy has superior fire power. They alternate between firing 2 and 1 shots each turn",'menu rules')
const bfAi = createNode('div',gameArea,'','battlefield');
const destroyerButton = createButton('button',gameArea,'','menu taller','Destroyer');
const submarineButton = createButton('button',gameArea,'','menu taller','Submarine');
const battleship1Button = createButton('button',gameArea,'','menu taller','Battleship 1');
const battleship2Button = createButton('button',gameArea,'','menu taller','Battleship 2');
const aircraftCarrierButton = createButton('button',gameArea,'','menu taller','Aircraft Carrier');
const directionButton = createButton('button',middlecontainer,'','menu','Current Ship Placement\nHorizontal');
const squares = [];
const imgs = [];
const squaresAi = [];
const imgsAi = [];
let shipsPlaced = 0;
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
createBattlefieldAi();
let turn = 0;

let direction = 'horz';
let fleet = [destroyer,submarine,battleship1,battleship2,aircraftCarrier];
let fleetAi = [destroyerAi,submarineAi,battleship1Ai,battleship2Ai,aircraftCarrierAi];
let shotsFired = [];
let aiShotsFired = [];
let aiHits = 0;
let hits = 0;
let shipLoc = [];
let aiShipLoc = [];
let fleetscomplete = false
alert("Welcome to Battleship\nFirst place your ships on the left grid!\nSelect the square then click on the ship's button you want to place there\nYou can change Horizontal/Vertical with the button in bottom-middle\nShips place Left to Right and Top Down\nOnce all ships are placed, select enemy square and click the Fire Button\nIf it is a Hit you will get an alert and the tile will change color. \nIf it is a miss it will just change color\nThe enemy has superior fire power. They alternate between firing 2 and 1 shots each turn")

const firePressed = e =>{
   
    if (shipsPlaced != 5){ alert(`You still need to place ${5-shipsPlaced} more ships before you can fire!`); return;}
    if (fleetscomplete == false){getShiplocs();fleetscomplete= true}
    let target = currentSquare.textContent;
    if (target < 100){alert('Pick a Square on the AI Board on the Right!');return;}
    if (shotsFired.includes(target) == false){
        shotsFired.push(target);
        if(aiShipLoc.includes(parseInt(target))){
            hits += 1
            squaresAi[target-100].className = 'hit';
            alert(`${target} was a Hit!!!`)
        }
        else{
            squaresAi[target-100].className = 'miss';
            // alert(`${target} was a Miss!`)
            }
    }
    else{return alert('You Already Fired at that Square!\nPlease Pick Another')}
    let fire = [];
    if (turn%2 == 0){
    do {
        fire[0] = Math.floor(Math.random() * 100);
        fire[1] = Math.floor(Math.random() * 100);
    } while (aiShotsFired.includes(fire[0]) || aiShotsFired.includes(fire[1]));
    }
    else{
        do {
            fire[0] = Math.floor(Math.random() * 100);
        } while (aiShotsFired.includes(fire[0]));
    }
    turn += 1;
    for (let fires of fire){
        aiShotsFired.push(fires);
        if(shipLoc.includes(fires)){
            aiHits +=1;
            squares[fires].className = 'hit';
            alert(`The Enemy Hit Your Ship at ${fires}`);
        }
        else{
            squares[fires].className = 'miss';
            
        }
    }
    if (hits == 18){alert('CONGRATULATIONS YOU WON THE GAME!!')}
    if (aiHits == 18){alert('DEFEAT!\nThe Enemy Prevailed!');showAi()}
    
    console.log(hits);
    console.log(aiHits);
}

function getShiplocs(){
    let shipPos = fleet.map(function(ship){return ship.positions})
    let aiShipPos = fleetAi.map(function(ship){return ship.positions})
    for (let positions of shipPos){
        for (let pos of positions){
            shipLoc.push(pos);
        }
    }
    for (let positions of aiShipPos){
        for (let pos of positions){
            aiShipLoc.push(pos);
        }
    }
}

const bfPressed = e => { 
    const isButton = e.target.nodeName === 'BUTTON';
    if(!isButton){return}
    currentSquare.textContent = `${e.target.id}` 
    let id = `${e.target.id}` ;
}
const bfAiPressed = e => { 
    const isButton = e.target.nodeName === 'BUTTON';
    if(!isButton){return}
    currentSquare.textContent = `${e.target.id}` 
    let id = `${e.target.id}` ;
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
const destroyerPressed = e =>{
    if( shipsPlaced == 5){alert('All Ships Have been Placed! Start Firing!'); return;}
    if( currentSquare.textContent >= 100){alert('Place your ships on the left!'); return;}
    if(destroyer.positions.length == 0) {
        if (noShipThere() && enoughRoom(destroyer)){
        placeShip(destroyer,'destroyer');
        shipsPlaced += 1;}
        else{
            alert(`Can't Place at tile ${currentSquare.textContent}. Another ship is in the way or the Ship would be off the grid`);
        }
    }
    else{ alert('You Already placed this Ship!')}1;
}
const submarinePressed = e =>{
    if( shipsPlaced == 5){alert('All Ships Have been Placed! Start Firing!'); return;}
    if( currentSquare.textContent >= 100){alert('Place your ships on the left!'); return;}
    if(submarine.positions.length == 0) {
        if (noShipThere() && enoughRoom(submarine)){
        placeShip(submarine,'submarine');
        shipsPlaced += 1;}
        else{
            alert(`Can't Place at tile ${currentSquare.textContent}. Another ship is in the way or the Ship would be off the grid`);
        }
    }
    else{ alert('You Already placed this Ship!')}1;
}
const battleship1Pressed = e => {
    if( shipsPlaced == 5){alert('All Ships Have been Placed! Start Firing!'); return;}
    if( currentSquare.textContent >= 100){alert('Place your ships on the left!'); return;}
    if(battleship1.positions.length == 0) {
        if (noShipThere() && enoughRoom(battleship1)){
        placeShip(battleship1,'battleship1');
        shipsPlaced += 1;}
        else{
            alert(`Can't Place at tile ${currentSquare.textContent}. Another ship is in the way or the Ship would be off the grid`);
        }
    }
    else{ alert('You Already placed this Ship!')}1;
}
const battleship2Pressed = e => {
    if( shipsPlaced == 5){alert('All Ships Have been Placed! Start Firing!'); return;}
    if( currentSquare.textContent >= 100){alert('Place your ships on the left!'); return;}
    if(battleship2.positions.length == 0) {
        if (noShipThere() && enoughRoom(battleship2)){
        placeShip(battleship2,'battleship2');
        shipsPlaced += 1;}
        else{
            alert(`Can't Place at tile ${currentSquare.textContent}. Another ship is in the way or the Ship would be off the grid`);
        }
    }
    else{ alert('You Already placed this Ship!')}1;
}
const aircraftcarrierPressed = e => {
    if( shipsPlaced == 5){alert('All Ships Have been Placed! Start Firing!'); return;}
    if( currentSquare.textContent >= 100){alert('Place your ships on the left!'); return;}
    if(aircraftCarrier.positions.length == 0) {
    if (noShipThere() && enoughRoom(aircraftCarrier)){
    placeShip(aircraftCarrier,'aircraftcarrier');
    shipsPlaced += 1;}
    else{
        alert(`Can't Place at tile ${currentSquare.textContent}. Another ship is in the way or the Ship would be off the grid`);
    }
}
else{ alert('You Already placed this Ship!')}
}
destroyerButton.addEventListener('click',destroyerPressed);
submarineButton.addEventListener('click',submarinePressed);
battleship1Button.addEventListener('click',battleship1Pressed);
battleship2Button.addEventListener('click',battleship2Pressed);
aircraftCarrierButton.addEventListener('click',aircraftcarrierPressed);
bf.addEventListener('click',bfPressed);
bfAi.addEventListener('click',bfAiPressed);
directionButton.addEventListener('click',directionPressed);
fireButton.addEventListener('click',firePressed);
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
        squares[buttonNumber] = createButton('button',bf,`${i}${c}`,'grid',`${i}${c}`,'water.jpg')
        imgs[buttonNumber] = createNode('img',window[`${i}${c}`],'','tileImg',`${i}${c}`);
        buttonNumber += 1;
        }
    }
    console.log(squares[1].id)
    }
function createBattlefieldAi(){
    let buttonNumber = 0;
    for (let i = 0; i < 10; i++){
        for(let c = 0 ; c < 10; c++){
        squaresAi[buttonNumber] = createButton('button',bfAi,`1${i}${c}`,'grid',`1${i}${c}`,'water.jpg')
        imgsAi[buttonNumber] = createNode('img',window[`1${i}${c}`],'','tileImg',`$1{i}${c}`);
        buttonNumber += 1;
        }
    }
    console.log(squares[1].id)
    }

function placeShip(ship,colorClass){
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
        squares[pos].className = colorClass;
    }
}
}
function noShipThere(){
    let loc =+currentSquare.textContent;
    let results;
    for (i = 0; i<5;i++){
        hcheck = loc+i;
        vcheck = loc+(i*10)
        if(direction == 'vert'){
        results = fleet.filter(function(ship){return ship.positions.includes(vcheck)});
        }
        else{results = fleet.filter(function(ship){return ship.positions.includes(hcheck)});}
        if (results.length !=0){return false}
    }
    return true;
}
function noShipThereAI(loc,dir){
    let results;
    for (i = 0; i<5;i++){
        hcheck = loc+i;
        vcheck = loc+(i*10)
        if(dir == 'vert'){
        results = fleetAi.filter(function(ship){return ship.positions.includes(vcheck)});
        }
        else{results = fleetAi.filter(function(ship){return ship.positions.includes(hcheck)});}
        if (results.length !=0){return false}
    }
    return true;
}
function enoughRoomAi(loc,dir,ship){
    let locv =loc+((ship.length-1)*10);
    let loch = loc+ship.length-1 
    if (dir == 'vert'){
        return locv <= 200;
    }
    else{
        return loch%10 > +loc%10;
    }
}

function enoughRoom(ship){
    let locv =+currentSquare.textContent+((ship.length-1)*10);
    let loch = +currentSquare.textContent+ship.length-1 
    if (direction == 'vert'){
        return locv <= 100;
    }
    else{
        return loch%10 > +currentSquare.textContent%10;
    }
}

function generateAiBoard(){
    createAiShipPositions(battleship1Ai);
    createAiShipPositions(battleship2Ai);
    createAiShipPositions(destroyerAi);
    createAiShipPositions(submarineAi);
    createAiShipPositions(aircraftCarrierAi);
    
}

function createAiShipPositions(ship){
    do {
    loc = Math.floor(Math.random() * 100) + 100;
    randomDir = Math.floor(Math.random() * 100);
    dir = 'vert'
    if (randomDir > 50){dir = 'horz'}
    }while (!noShipThereAI(loc,dir) || !enoughRoomAi(loc,dir,ship))
    
    for(let i = 0; i<ship.length;i++){
        if (dir == 'horz'){
            ship.positions.push(loc+i);
        }
        else{
            ship.positions.push(loc+(i*10));  
        }
    }
}
function showAi(){
    for( let ship of fleetAi){
        for (let pos of ship.positions){
        
            if(squaresAi[pos-100].className != 'hit'){
            squaresAi[pos-100].className = ship.name;}
        }
    }
}

generateAiBoard();
console.log(destroyerAi.positions);
console.log(submarineAi.positions);
console.log(battleship1Ai.positions);
console.log(battleship2Ai.positions);
console.log(aircraftCarrierAi.positions);

