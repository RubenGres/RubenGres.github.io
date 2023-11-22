class Predator extends Boid {
    constructor(x,y) {
        super(x,y, color(255, 100, 100));

        this.setSize(30);
        this.setMaxSpeed(1.3);
        
        this.chaseRadius = this.size * 5;
        this.eatRadius = this.size;
        this.chasedPrey = null;
        this.buddyRadius = 0;

        predators.push(this);
    }
    
    findBuddies(){
        let buddies = [];
        for (let i = 0; i < predators.length; i++) {
          let pred = predators[i];
          if(pred != this){
            if(abs(pred.position.x - this.position.x) < this.buddyRadius && abs(pred.position.y - this.position.y) < this.buddyRadius)
              buddies.push(pred);
          }
        }
        this.buddies = buddies;
    }

    applyForces() {
        super.applyForces();
        let chase = this.chase(); // Chase prey
        this.velocity.add(chase);
    }

    chase() {
        let dir = createVector(0, 0);

        let minDist = Number.MAX_VALUE;
        for (let i = 0; i < preys.length; i++) {
          let prey = preys[i];
          let d = p5.Vector.dist(this.position, prey.position);

          if ((d > this.eatRadius) && (d < this.chaseRadius)) {
            if(d < minDist){
                minDist = d;
                this.chasedPrey = prey;
                dir = createVector(prey.position.x - this.position.x, prey.position.y - this.position.y);
            }
          } else if( d > 0 & d < this.eatRadius) {
              prey.kill();
              this.chasedPrey = undefined;
              this.size += 0.5; //grow
          }
        }
    
        return dir.normalize();
    }

    showHitbox() {
        push();
        let x = this.position.x - cameraPos.x;
        let y = this.position.y - cameraPos.y;
        translate(x * cameraScale, y * cameraScale);
        noFill();
        stroke(this.color);
        circle(0,0,this.chaseRadius*cameraScale);
        
        stroke(150, 100, 100);
        circle(0,0,this.eatRadius*cameraScale);
        pop();
    }
} 