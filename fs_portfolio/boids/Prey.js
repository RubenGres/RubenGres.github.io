class Prey extends Boid {
    constructor(x,y) {
        super(x,y, color(255, 255, 255, 255));
        this.escapeRadius = this.size * 5;
        preys.push(this);
    }

    findBuddies(){
        let buddies = [];
        for (let i = 0; i < preys.length; i++) {
          let boid = preys[i];
          if(boid != this){
            if(abs(boid.position.x - this.position.x) < this.buddyRadius && abs(boid.position.y - this.position.y) < this.buddyRadius)
              buddies.push(boid);
          }
        }
        this.buddies = buddies;
    }

    applyForces() {
        super.applyForces();
        let escape = this.escape(); // escape predator
        this.velocity.add(escape);
    }

    escape() {
        let dir = createVector(0, 0);

        let minDist = Number.MAX_VALUE;
        for (let i = 0; i < predators.length; i++) {
          let pred = predators[i];
          let d = p5.Vector.dist(this.position, pred.position);

          if ((d > 0) && (d < this.escapeRadius)) {
            if(d < minDist){
                minDist = d;
                dir = createVector(pred.position.x - this.position.x, pred.position.y - this.position.y);
                dir.mult(-1);
            }
          }
        }
    
        return dir.normalize();
    }

    showHitbox() {
        push();
        let x = this.position.x - cameraPos.x;
        let y = this.position.y - cameraPos.y;
        translate(x * cameraScale, y * cameraScale);
        fill(color(255,255,255,5));
        stroke(color(255,255,255,15));
        circle(0,0,this.escapeRadius * cameraScale);        
        pop();
    }
}