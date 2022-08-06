//By @YesWeDont, under the MIT licence
//bubbles system

class Bubble{
    /**
     * @constructor
     * @description Bubble constructor
    * @param {Number[]} coord - Coordinates of bubble in [x,y]
    * @param {Number} r - Radius of bubble, default 5-10
    * @param {Number[]} s - [x,y] Components of spped, default Ran[10,10]
    * @param {String} color - colour on render
    * @param {Bubble} avoid - Circle of unspwawned-ness: [x,y]
    * @param {Number} avoidDist radius of unspwnedness
    */
    constructor(coord,r,s,color,avoid,avoidDist){
        this.position=coord||[(Math.random()*x),(Math.random()*y)]
        this.r=r||Math.max(( Bubble._radius*0.2 + Bubble._radius*Math.random()*0.8 ),5);
        this.s=s||[(Math.random()-0.5)*Bubble._speed,(Math.random()-0.5)*Bubble._speed];
        if(color) this.color="green";
        else{
            this.color=Bubble.RNGList.selectEntry()
        }
        this.dead=false;
        if(color==="green"){
            this.s=[0,0]
        }
        if(avoid && (avoid instanceof Bubble)){
            this.reposition(avoid,avoidDist)
        }
        this.init();
    }
    init(){
        if(this.color==="blue"){
            this.s[1]=0;
            if(this.s[0]>0){
               this.position[0]=0
            }else{
                this.position[0]=x;
            }
        }
        if(this.color==="purple"){
            this.s[0]=0;
            if(this.s[1]>0){
                this.position[1]=0
            }else{
                this.position[1]=y
            }
        }
    }
    static _radius=10
    static _speed=5
    /**
     * Collision testing
     * @param {Bubble} that - The bubble for collison testing
     * @returns {Boolean}
     */
    collide(that){
        return this.distance(that)<(this.r+that.r)
    }
    /**
     * Repositions bubble
     */
    reposition(avoid,avoidDist){
        while(this.distance(avoid)<avoidDist){
            this.position=[(Math.random()*x),(Math.random()*y)];
        }
    }
    /**
     * Distance between centres of bubbles
     * @param {Bubble} that - The bubble for dist. measuring
     * @returns {Number}
     */
    distance(that){
        //console.log(`This:${this.position}; that:${that.position}`)
        var xdist=this.position[0]-that.position[0],
        ydist=this.position[1]-that.position[1];
        return Math.hypot(xdist,ydist)
    }
    /**
     * Update and Render
     * @param {CanvasRenderingContext2D} ctx - Context for rendering
     * @param {Number} speedMultiplier - SpeedMultiplier to accommadate for FPS change
     * @returns {void}
     */
    update(ctx,speedMultiplier){
        if(this.color==="black") speedMultiplier*=3
        if(this.color==="white") speedMultiplier/=3
        if(this.color==="") this.color=Bubble.RNGList.selectEntry()
        //if(this.color==="green"&&this.s!==[0,0]) this.color="yellow"
        this.position[0]+=(this.s[0]*(speedMultiplier));
        this.position[1]+=(this.s[1]*(speedMultiplier));
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.position[0],this.position[1],this.r,0,2*Math.PI,false);
        ctx.fill();
    }
    /**
     * 
     * @param {Number[]} list list of effects 
     * @returns {Number[]} new list of effects
     */
    applyEffect(list){
        //list format: [speed,radius]
        let effects={
            white:()=>{
                return [2,1]
            },
            black:(effects)=>{
                return [effects[0]*0.6,effects[1]]
            },
            yellow:(effects)=>{
                return [(effects[0]*1.2),(effects[1])]
            },
            blue:(effects)=>{
                return [effects[0],effects[1]*0.6]
            },
            orange:(effects)=>{
                Bubble._radius*=0.8;
                Bubble._speed*=0.8;
                return [effects[0]*0.8,effects[1]*0.8]
            }
        }
        if(!(this.color in effects)) return list
        return effects[this.color](list);
    }
    static RNGList=new RNGList("yellow")
}
Bubble.RNGList
.addEntry("purple",0.05)
.addEntry("orange",0.1)
.addEntry("yellow",0.1)
.addEntry("blue",0.15)
.addEntry("white",0.15)
.addEntry("black",0.2)
.addEntry("red",0.25)
console.log(Bubble.RNGList.sumChances())