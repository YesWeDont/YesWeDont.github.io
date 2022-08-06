class Manager{
    /**
     * @constructor
     * @param {Bubble} player - Player object
     * @param {CanvasRenderingContext2D} ctx - Render players
     * @param {HTMLParagraphElement} score - <p> for saving the score
     * @param {Number} fps - Max fps, default 60
     */
    constructor(player,ctx,fps){
        this.agility=2
        this.bubbles=[];
        this.player=player;
        this.ctx=ctx;
        this.ctx.font = '60px Comic Sans MS';
        this.fps=60;
        this._dt=1/60;
        this.difficulty=0;
        this.maxBubble=75;
        this.scoreboard=fps;
        this.paused=false;
    }
    /**
     * Adds bubble to list
     * @param {Bubble} b - New bubble to be pushed
     * @returns {void}
     */
    add(b){
        this.bubbles.push(b);
        return b;
    }
    /**
     * Updates all bubbles and exec game loop
     * @returns {void}
     */
    update(){
        if(this.paused){
            requestAnimationFrame(()=>{this.update()})
            return;
        }
        this.ctx.fillStyle="gray"
        this.ctx.fillRect(0,0,x,y)
        if(this.score>30000){
            this.scoreboard.hidden=true;
            this.agility=2
            this.ctx.fillStyle="blue"
            this.ctx.fillRect(0,0,x,y)
            this.ctx.fillStyle="black";
            this.ctx.font="60px Comic Sans MS"
            this.ctx.fillText("GG! You win! CTRL+R to play again",0,60)
            this.ctx.fillText("Score: "+this.score,0,120)
            document.exitPointerLock();
            this.bindReload()
            return;
        }
        if(this.player.dead){
            this.scoreboard.hidden=true;
            this.ctx.fillStyle="red"
            this.ctx.fillRect(0,0,x,y)
            this.ctx.fillStyle="white";
            this.ctx.font="60px Comic Sans MS"
            document.exitPointerLock();
            this.ctx.fillText("NOOB! You lose. CTRL+R to play again",0,60);
            this.ctx.fillText("Score: "+parseInt(this.scoreboard.innerHTML),0,120)
            this.bindReload();
            return;
        }

        this._dt=Date.now()-curr;
        this.fps=Math.round(1000/this._dt);

        this.player.r*=1.002
        Bubble._radius+=0.001
        Bubble._speed+=0.0008
        if(this.difficulty>0){
            this.player.r*=1.001
            if(this.difficulty>1&&(Math.random()<0.2)){
                this.maxBubble+=1
            }
        }
        this.player.update(this.ctx,this._dt);
        this.bubbles.forEach(i=>{
            i.update(this.ctx,(60/this.fps));
        });
    
        //console.log(`b4: ${this.player.position}`)
        this.player.position[0]%=x;
        this.player.position[1]%=y;
        if(this.player.position[0]<0) this.player.position[0]=x+this.player.position[0]
        if(this.player.position[1]<0) this.player.position[1]=y+this.player.position[1]
        //console.log(`after: ${this.player.position}`)
        this.bubbles=this.bubbles.filter(i=>{
            if((i.position[0]<0)||(i.position[1]<0)){
                //console.log("deconstruct");
                return false;
            }
            if((i.position[0]>x)||(i.position[1]>y)){
                //console.log("deconstruct");
                return false;
            }
            return true;
        })
        let effects=[1,1];
        this.bubbles=this.bubbles.filter((bubble)=>{
            if(player.collide(bubble)){
                console.log(bubble.color)
                this.player.r*=0.9
                if((bubble.color==="red")&&parseInt(this.scoreboard.innerHTML)>50){
                    this.player.dead=true;
                }else{
                    effects=bubble.applyEffect(effects);
                }
                return false;
            }
            return true;
        });
        this.agility*=effects[0];
        this.player.r=Math.max(5,this.player.r*effects[1])

        this.scoreboard.innerHTML=parseInt(this.scoreboard.innerHTML)+1;
        fpsElement.style.color=this.ctx.fillStyle;
     
        manager.spawn(100);
        curr=Date.now();
        requestAnimationFrame(()=>{this.update()});
    }
    /**
     * Spawns bubble
     * @param {Number} spawndistance - Dist. from player
     * @default 20
     * @returns {void}
     */
    spawn(spawndistance){
        var spawndistance=spawndistance||20
        //console.log("before")
        while(this.bubbles.length<this.maxBubble){
            let temp=new Bubble(false,false,false,false,this.player,spawndistance);
            //console.log(temp);
            this.bubbles.push(temp)
            //i++;
        }
    }
    /**
     * Binds keys for Manager.player
     */
    bindKeys(){
        document.onkeydown=((e)=>{
            if(e.key==="ArrowRight") this.player.s[0]+=0.5;
            if(e.key==="ArrowLeft") this.player.s[0]-=0.5;
            if(e.key==="ArrowUp") this.player.s[1]-=0.5;
            if(e.key==="ArrowDown") this.player.s[1]+=0.5;
        })
        document.onkeyup=()=>{
            this.player.s=[0,0]
        }
        onmousemove=(e)=>{
            this.player.position[0]+=e.movementX/(this.agility)
            this.player.position[1]+=e.movementY/(this.agility)
        }
    }
    bindReload(){
        document.addEventListener("click",()=>{
            let a=document.createElement("a");
            a.href=window.location.href;
            a.click();
        })
    }
}