var startTime, now, then, elapsed, interval;
var fps = 60;

document.getElementById("framerate").defaultValue = fps;

var frameCount = 0;

var width = 500;
var height = 200;

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
ctx.fillStyle = "red"

var velocity = {
  x: 0.05,
  y: 0.03
}

document.getElementById("xvelocity").defaultValue = velocity.x;
document.getElementById("yvelocity").defaultValue = velocity.y;

var horizontal_direction = true;
var vertical_direction = true;

var horizontal_bounce = false;
var vertical_bounce = false;

var position = {
    x: width / 2,
    y: height / 2
}

loop(fps);

function update() {
      
	// velocity multipled by the change in time
    // keeps movement consistent in case of drop in framerate
    // ie, apparent speed becomes constant
	velx = velocity.x * elapsed;
    vely = velocity.y * elapsed;
      
    if (horizontal_bounce) {
    
      // bounce left/right
      if (horizontal_direction) {
        position.x += velx;
      } else {
        position.x -= velx;
      }

      if (position.x > canvas.width) {
        horizontal_direction = !horizontal_direction;
      }

      if (position.x < 0) {
        horizontal_direction = !horizontal_direction;
      }
    
    } else {
    
    	// loop horizontally
    	position.x += velx;
     
      if (position.x > canvas.width) {
        position.x -= canvas.width;
      }
      
    }
    
    if (vertical_bounce) {
    
      //bounce up/down
      if (vertical_direction) {
        position.y += vely;
      } else {
        position.y -= vely;
      }

      if (position.y > canvas.height) {
        vertical_direction = !vertical_direction;
      }

      if (position.y < 0) {
        vertical_direction = !vertical_direction;
      }
      
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(position.x - 5, position.y - 5, 10, 10);
}

function loop() {

	interval = 1000/fps;

	then = performance.now();
  
  startTime = then;
  
  animate();
  

}

function animate() {

	interval = 1000/fps;

	requestAnimationFrame(animate);
  
  now = performance.now();
  
  elapsed = now - then;
  
  if (elapsed > interval) {
  
 		// Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % interval);
    
    // TESTING...Report #seconds since start and achieved fps.
    var sinceStart = now - startTime;
    var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
    
    document.getElementById("results").innerHTML = "dTime: " + Math.round(sinceStart / 1000 * 100) / 100 + "<br>@ " + currentFps + " fps.";
    
    document.getElementById("position").innerHTML = "max x: " + canvas.width + " | x: " + position.x.toFixed(3) + "<br>max y: " + canvas.height + " | y: " + position.y.toFixed(3);
    
    update();
    draw();
 
  }
}

function update_value(event) {

	//console.log(event.id);
  //console.log(event.checked);
  
  if (event.id == "horizontal_bounce") {
  	horizontal_bounce = event.checked;
  }
  
  if (event.id == "vertical_bounce") {
  	vertical_bounce = event.checked;
  }
  
  if (event.id == "xvelocity") {
    if (isInt(parseInt(event.value)) || isFloat(parseFloat(event.value))) {
    	if (parseFloat(event.value) != 0.0)
    		velocity.x = parseFloat(event.value);
    }
  }
  
  if (event.id == "yvelocity") {
  	if (isInt(parseInt(event.value)) || isFloat(parseFloat(event.value))) {
    	if (parseFloat(event.value) != 0.0)
    		velocity.y = parseFloat(event.value);
    }
  }
  
  if (event.id == "framerate") {
  	if (isInt(parseInt(event.value)) || isFloat(parseFloat(event.value))) {
    	if (parseFloat(event.value) != 0.0)
    		fps = parseFloat(event.value);
    }
  }
  
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
