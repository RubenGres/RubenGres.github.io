/* constants */
const nbPrey = 110;
const nbPred = 4;
const globalScale = 0.5;

const mouseRadius = 10;

/* parameters */
let width, height;
let showHitbox;

/* boids */
let preys = [];
let predators = [];
let boids = [];


/* main button*/
let btn_menu_show, btn_menu_hide;

/* menu */
let isMenuVisible = false;
let cameraMode = {value:""};
let spawnMode = {value:""};
let debugMode = {value:""};
let simMode = {value:""};
let controlMode = {value:""};

let menuItems = []; //all menu itels
let cameraButtons = [];
let spawnButtons = [];
let debugButtons = [];
let simButtons = [];
let controlButtons = [];

let btn_restart_debug, btn_killall_debug, btn_step_sim, btn_reset_cam, btn_settings_sim;

let f_boid;

/* camera */
let cameraPos;
let cameraScale = 1;

/* world */
let canvas;
let isRunning;

/* zoom in and out 
function mouseWheel(event) {
  cameraScale = max(0, cameraScale - event.delta * 0.05);
  cameraPos.x = mouseX - (mouseX / cameraScale);
  cameraPos.y = mouseY - (mouseY / cameraScale);
}
*/

/* get mouse position on map */
function getMousePosition() {
  return createVector(cameraPos.x + (mouseX / cameraScale), cameraPos.y + (mouseY / cameraScale));
}

window.onresize = function(event) {
  canvas = createCanvas(windowWidth, windowHeight);
};

function setup() {
  setupWorld();

  /* disable right click */
  document.addEventListener('contextmenu', event => event.preventDefault());

  /* main buttons */
  /*
  btn_menu_show = createButton("&#9776");
  btn_menu_show.position(0, 0);
  btn_menu_show.mouseClicked(showMenu);
  */

  btn_menu_hide = createButton("x");  
  btn_menu_hide.style('background-color', color(247, 87, 87));
  btn_menu_hide.position(200, 0);
  btn_menu_hide.hide();
  btn_menu_hide.mouseClicked(hideMenu);
  menuItems.push(btn_menu_hide);

  /* add menu buttons */
  newMenuButton.y = 0;
  newMenuButton("follow", cameraButtons, cameraMode);
  newMenuButton("scroll", cameraButtons, cameraMode);
  btn_reset_cam = newMenuButton("reset", cameraButtons, cameraMode);
  newMenuButton.y += 20;
  newMenuButton("+fish", spawnButtons, spawnMode);
  newMenuButton("+shark", spawnButtons, spawnMode);
  newMenuButton("kill", spawnButtons, spawnMode);
  newMenuButton.y += 20;
  newMenuButton("hitbox", debugButtons, debugMode);
  btn_restart_debug = newMenuButton("restart", debugButtons, debugMode);
  btn_killall_debug = newMenuButton("killAll", debugButtons, debugMode);
  newMenuButton.y += 20;
  newMenuButton("pause", simButtons, simMode);
  btn_step_sim = newMenuButton("step", simButtons, simMode);
  btn_settings_sim = newMenuButton("settings", simButtons, simMode);
  newMenuButton.y += 20;
  newMenuButton("attract", controlButtons, controlMode);
  newMenuButton("scare", controlButtons, controlMode);
  newMenuButton("move", controlButtons, controlMode);
  
  isRunning = true;
}

/* create a menu button */
function newMenuButton(name, list, mode) {
  let b = createButton(name);
  
  b.position(20 + list.length * 60, newMenuButton.y);
  b.style('background-color', color(255,255,255));
  b.style('width', "55px");

  b.mouseClicked(function() {
    /* set all buttons white */
    for(let i = 0; i < list.length; i++)
      list[i].style('background-color', color(255,255,255));
      
    if(mode.value != name) {
      mode.value = name;
      b.style('background-color', color(100,100,100));
    } else {
      mode.value = "idle";
      b.style('background-color', color(255,255,255));
    }
  });

  list.push(b);
  menuItems.push(b);
  b.hide();

  return b;
}

function showMenu() {
  isMenuVisible = true;
  btn_menu_show.hide();
  for(let i = 0; i < menuItems.length; i++)
    menuItems[i].show();
}

function hideMenu() {
  isMenuVisible = false;
  btn_menu_show.show();
  for(let i = 0; i < menuItems.length; i++)
    menuItems[i].hide();
}

function setupWorld() {
  /* init camera */
  cameraPos = createVector(0, 0);

  /* set size */
  width = windowWidth;
  height = windowHeight;

  /* create canvas */
  canvas = createCanvas(width, height);

  clearBoids();

  /* spawn boids */
  for (let i = 0; i < nbPrey; i++)
    new Prey(random(width), random(height));
  
  for(let i = 0; i < nbPred; i++)
    new Predator(random(width), random(height));
}

function clearBoids() {
  preys = [];
  predators = [];
  boids = [];
}

/* returns boid close to mouse in a specified radius */
function getBoidCloseToMouse(radius) {
  let boid;
  let dist = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < boids.length; i++){
    let d = p5.Vector.dist(getMousePosition(), boids[i].position);
    if(d < dist && d < radius) {
      dist = d;
      boid = boids[i];
    }
  }
  return boid;
}

/* scroll camera when mouse in on the edge */
function scrollCamera(hitboxWidth){
  let scrollSpeed = 10 * (1/cameraScale);

  if(mouseX >= windowWidth - hitboxWidth)
    cameraPos.x += scrollSpeed;
  else if(mouseX <= 0 + hitboxWidth)
    cameraPos.x -= scrollSpeed;
  
  if(mouseY >= windowHeight - hitboxWidth)
    cameraPos.y += scrollSpeed;
  else if(mouseY <= 0 + hitboxWidth)
    cameraPos.y -= scrollSpeed;
}

/* run all boids */
function runBoids() {
  for (let i = 0; i < boids.length; i++)
    boids[i].run();
}

/* run all boids */
function renderBoids() {
  for (let i = 0; i < boids.length; i++)
    boids[i].render();
}

/* draw on screen */
function draw() {
  document.body.style.cursor = "default";

  /* black rectangle to delimit world */
  rectX = -cameraPos.x * cameraScale;
  rectY = -cameraPos.y * cameraScale;
  fill(0,0,0,20);
  rect(rectX, rectY, width*cameraScale, height*cameraScale);
  clear();
  

  if(mouseX < 195 && mouseY < 100) //cancel clicks in the menu
    mouseIsPressed = false;

  switch (cameraMode.value) {
    case "idle" :
      f_boid = undefined;
      break;

    case "follow":
      if(f_boid == undefined){
        let boid = getBoidCloseToMouse(10);

        if(boid != undefined)
          document.body.style.cursor = "pointer";

        if(mouseIsPressed != 0) {
          f_boid = boid;
        }        
      } else {
        cameraPos.x = f_boid.position.x - (windowWidth/(2 * cameraScale));
        cameraPos.y = f_boid.position.y - (windowHeight/(2 * cameraScale));
      }
      break;

    case "scroll" :
      scrollCamera(5);
      break;

    case "reset" :
      cameraPos = createVector(0,0);
      cameraScale = 1;
      canvas = createCanvas(windowWidth, windowHeight);
      cameraMode.value = "idle";
      btn_reset_cam.style('background-color', color(255,255,255));
      break;
  }  
  
  switch (spawnMode.value)  {
    case "idle" :
        k_boid = null;
        break;

    case "+fish" :
      if(mouseIsPressed != 0){
        if(!justSpwnd){
          let p = new Prey(0, 0);
          p.position = getMousePosition();
          justSpwnd = 1;
        }
      }else {
        justSpwnd = 0;
      }
      break;
  
    case "+shark" :
      if(mouseIsPressed != 0){
        if(!justSpwnd){
          let p = new Predator(0, 0);
          p.position = getMousePosition();
          justSpwnd = true;
        }
      } else {
        justSpwnd = false;
      }
    break;

    case "kill" :
      let boid = getBoidCloseToMouse(10);
      if(boid != undefined)
          document.body.style.cursor = "pointer";

      if(mouseIsPressed != 0) {
        if(!justKilled){
          if(boid != undefined)
            boid.kill();
            justKilled = true;
        }
      } else {
        justKilled = false;
      }
    break;
  }

  switch(debugMode.value){
    case "idle" :
      showHitbox = false;
      break;

    case "hitbox" :
      showHitbox = true;
      break;

    case "restart" :
      setupWorld();

      debugMode.value = "idle";
      btn_restart_debug.style('background-color', color(255,255,255));
      break;

    case "killAll" :
      clearBoids();

      debugMode.value = "idle";
      btn_killall_debug.style('background-color', color(255,255,255));
      break;
  }

  switch(simMode.value){
    case "idle" :
      isRunning = true;
      break;

    case "pause" :
      isRunning = false;
      break;

    case "step" :
      alert("not yet implemented"); //TODO
      simMode.value = "idle";
      btn_step_sim.style('background-color', color(255,255,255));
      break;

    case "settings" :
      alert("not yet implemented"); //TODO
      simMode.value = "idle";
      btn_settings_sim.style('background-color', color(255,255,255));
      ;
  }

  switch(controlMode.value){
    case "attract" :
      break;

    case "scare" :
      break;

    case "move" :
      break;
  }

  if(isRunning)
    runBoids();

  renderBoids();

  let mousePos = getMousePosition()
  fill(200,200,200,30);
  stroke(0,0,0,70);
  circle(mousePos.x,mousePos.y,20);

  /* add menu icons */
  if(isMenuVisible) {
    textSize(15);
    rect(0,0,195, 100);
    text("🎥", 0, 15);
    text("🧬", 0, 35);
    text("🛠️", 0, 55);
    text("⏱️", 0, 75);
    text("🖐️", 0, 95);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}