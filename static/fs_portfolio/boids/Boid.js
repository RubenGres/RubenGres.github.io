class Boid {

    constructor(x, y, boidColor) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D();

      this.mouse = createVector(0, 0);

      this.setMaxSpeed(0.8);
      this.setMaxSize(20);
      this.size = this.maxSize * random(0.5, 1);
      
      /* set color according to size */
      this.color = boidColor;
      //this.setColorAccordingToSize();
  
      this.buddyRadius = 6*this.size;
      this.crowdRadius = this.buddyRadius * 6;
      this.desiredseparation = this.size * 9;

      boids.push(this);
    }

    setColorAccordingToSize(){
      let factor = 1 - this.size/this.maxSize * 1.0;
      this.color.setRed(red(this.color) - factor*200);
      this.color.setGreen(green(this.color) - factor*200);
      this.color.setBlue(blue(this.color) - factor*200);
    }
  
    run() {
      this.findBuddies();
      this.flock();
      this.borders();
            
      this.position.add(this.velocity);
    }

    applyForces(){
      let sep = this.separate(1); // Separation
      let ali = this.align(1);    // Alignment
      let coh = this.cohesion(0.04); // Cohesion
      let bord = this.borderRepulsion();

      let esc = createVector(0,0);
      if(mouseIsPressed != 0){
        if(mouseButton === LEFT)
          esc = this.followCursor();
      } else {
        esc = this.escapeCursor(40)
      }

      this.velocity.add(sep);
      this.velocity.add(ali);
      this.velocity.add(coh);
      this.velocity.add(bord);
      this.velocity.add(esc.mult(30)); // random amplification
    }

    flock() {
      this.applyForces();

      this.velocity.normalize();
      this.velocity.mult(this.maxspeed);
    }


    borderRepulsion() {
      const margin = 80;
      const strength = 4;
      let steer = createVector(0, 0);

      if (this.position.x < margin) {
        steer.x += (1 - this.position.x / margin);
      } else if (this.position.x > width - margin) {
        steer.x -= (1 - (width - this.position.x) / margin);
      }

      if (this.position.y < margin) {
        steer.y += (1 - this.position.y / margin);
      } else if (this.position.y > height - margin) {
        steer.y -= (1 - (height - this.position.y) / margin);
      }

      return steer.mult(strength);
    }

    borders() {
      // Hard clamp as a safety net; primary edge handling is borderRepulsion().
      this.position.x = constrain(this.position.x, 0, width);
      this.position.y = constrain(this.position.y, 0, height);
    }

    escapeCursor(range){
      let mouse_diff = this.mouse.dist(getMousePosition())/10;
      mouse_diff = max(0.7, mouse_diff);
      
      this.mouse = getMousePosition();

      let d = p5.Vector.dist(this.position, this.mouse);

      if(d > range * mouse_diff)
        return createVector(0, 0);

      let diff = p5.Vector.sub(this.position, this.mouse);
      diff.normalize();
      diff.div(d);
      
      return diff;
    }
    
    followCursor(){
      let mouse = getMousePosition();
      let d = p5.Vector.dist(this.position, mouse);
      let diff = p5.Vector.sub(mouse, this.position);
      diff.normalize();
      diff.div(d);
      
      return diff;
    }
    
    separate(factor) {
      let sum = createVector(0, 0);
      
      for (let i = 0; i < this.buddies.length; i++) {
        let bud = this.buddies[i];
        let d = p5.Vector.dist(this.position, bud.position);
        if ((d > 0) && (d < this.crowdRadius)) {
          let diff = p5.Vector.sub(this.position, bud.position);
          diff.normalize();

          if(d < this.size)
            diff.mult(this.desiredseparation); //avoid merging boids

          diff.div(d);
          sum.add(diff);
        }
      }
      
      return sum.mult(factor);
    }
    
    align(factor) {
      let sum = createVector(0, 0);
      for (let i = 0; i < this.buddies.length; i++) {
        let bud = this.buddies[i];
        let d = p5.Vector.dist(this.position, bud.position);
        if ((d > 0) && (d < this.buddyRadius)) {
          let copy = bud.velocity.copy();
          copy.normalize();
          copy.div(d); //the closer, the more influencial
          sum.add(copy);
        }
      }
      
      return sum.mult(factor);
    }
    
    cohesion(factor) {
      let sum = createVector(0, 0);
      let count = 0;
      for (let i = 0; i < this.buddies.length; i++) {
        let bud = this.buddies[i];
        let d = p5.Vector.dist(this.position, bud.position);
        if ((d > 0) && (d < this.buddyRadius)) {
          sum.add(bud.position); // Add location
          count++;
        }
      }
      
      if (count > 0) {
        sum.div(count);
        
        sum.sub(this.position);
        return sum.setMag(factor);
      } else {
        return createVector(0, 0);
      }
      
    }

    kill() {
      boids.splice(boids.indexOf(this), 1);

      if(this.constructor.name == "Prey")
        preys.splice(preys.indexOf(this), 1);
      else
        predators.splice(predators.indexOf(this), 1);
        
      this.chasedPrey = null;
    }
    
    drawConnectionLines() {
      let connectionRadius = this.buddyRadius * 2; // You can adjust this radius as needed
      
      for (let i = 0; i < this.buddies.length; i++) {
        let otherBoid = this.buddies[i];
        let d = p5.Vector.dist(this.position, otherBoid.position);
        
        if (d > 0 && d < connectionRadius) {
          // Calculate opacity based on distance (closer = more opaque)
          let opacity = map(d, 0, connectionRadius, 255, 30);
          
          // Calculate screen positions accounting for camera
          let x1 = (this.position.x - cameraPos.x) * cameraScale;
          let y1 = (this.position.y - cameraPos.y) * cameraScale;
          let x2 = (otherBoid.position.x - cameraPos.x) * cameraScale;
          let y2 = (otherBoid.position.y - cameraPos.y) * cameraScale;
          
          // Draw the line
          stroke(170, 170, 170, opacity);
          strokeWeight(map(d, 0, connectionRadius, 2, 0.5)); // Line weight also varies with distance
          line(x1, y1, x2, y2);
        }
      }
    }

    render() {
      let s = this.size * cameraScale;

      push();
      let x = this.position.x - cameraPos.x;
      let y = this.position.y - cameraPos.y;
      translate(x * cameraScale, y * cameraScale);
      // Mac-style cursor has its tip pointing up-left (-3π/4 from +X in screen coords).
      // Align that direction with the velocity heading.
      rotate(this.velocity.heading() + (3 * PI) / 4);

      fill(this.color);
      stroke(0);
      strokeWeight(1.5);
      strokeJoin(ROUND);

      // Mac-style cursor polygon (tip at 0,0, body extends down-right).
      const k = s * 0.13;
      beginShape();
      vertex(0,        0);
      vertex(0,        16 * k);
      vertex(4.5 * k,  13 * k);
      vertex(7 * k,    19 * k);
      vertex(9 * k,    18 * k);
      vertex(6.5 * k,  11 * k);
      vertex(11 * k,   11 * k);
      endShape(CLOSE);

      pop();
    }

    setSize(size) {
      this.size = size * globalScale;
    }

    setMaxSize(maxSize) {
      this.maxSize = maxSize * globalScale;
    }

    setMaxSpeed(maxSpeed) {
      this.maxspeed = maxSpeed * globalScale;
    }
    
  }
  