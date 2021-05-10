window.onload=()=>{
    let scorekeeper=document.querySelector("p");
    let canvas=document.querySelector("canvas");
    canvas.height=Math.min(innerHeight,innerWidth);
    canvas.width=canvas.height
    let ctx=canvas.getContext("2d");
    let cd=0;
    let squares=15
    let b=false;
    let pause=false;
    /**
     * @type {(Number[])[]}
     * @description turn loc, eg [[0,0],[5,0],[5,5]], first one is head, last one is tail
     */
    let snake=[[4,4],[4,3]];
    let appleLocation=[4,5];
    let snakeDirection=[0,0];
    let timeout=Date.now()
    console.log("lod")

    //bindkey
    document.addEventListener("keydown",({key})=>{
        if(key==="Escape"){
            pause=!pause;
        }
    })
    document.addEventListener("keydown",(e)=>{
        console.log("keypress "+e)
        if(Date.now()-timeout<=250) return;
        timeout=Date.now()
        if( (e.key==="s"||e.key==="ArrowDown") && (!compare(snakeDirection,[0,-1]))){
            snakeDirection=[0,1]
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="w"||e.key==="ArrowUp") && (!compare(snakeDirection,[0,1])) ){
            snakeDirection=[0,-1]
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="a" || e.key==="ArrowLeft") && (!compare(snakeDirection,[1,0])) ){
            snakeDirection=[-1,0];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }else if( (e.key==="d" || e.key==="ArrowRight") && (!compare(snakeDirection,[-1,0])) ){
            snakeDirection=[1,0];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if(e.key==="b"&&Date.now()-cd>1000){
            b=true;
        }
    });
    let interval=0;


    function gameLoop(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if(pause){
            ctx.font="30px Arial"
            ctx.fillText("Game paused; Press Esc to continue",0,30)
            return;
        }
        snake.unshift([ snakeDirection[0]+snake[0][0] , snakeDirection[1]+snake[0][1] ])
        snake.pop();
        if(b){
            b=false;
            cd=Date.now()
            snake=snake.map(a=>[a[0]+snakeDirection[0],a[1]+snakeDirection[1]])
        }
        
        //growth
        if(appleLocation.toString()===snake[0].toString()){
            scorekeeper.innerHTML=`Score: ${snake.length-1}`
            let finalsnake=snake.slice(snake.length-2);
            let direction=finalsnake[0].map((a,i)=>a-finalsnake[1][i])
            snake.push([finalsnake[1][0]-direction[0],finalsnake[1][1]-direction[1]])
            while(contains(snake,appleLocation)){
                appleLocation=([Math.floor(Math.random()*squares),Math.floor(Math.random()*squares)]);
            }
        }

        //deaths
        if((snake[0][0]<0||snake[0][0]>squares)||(snake[0][1]<0||snake[0][1]>squares)){
            alert("You hit the wall!")
            clearInterval(interval)
        }
        if(snake.slice(1).findIndex(a=>compare(a,snake[0]))>0){
            alert("You hit yourself!")
            clearInterval(interval)
        }

        //render loop
        snake.forEach(drawSquare("green"))
        drawSquare("red")(appleLocation)
    }
    interval=setInterval(gameLoop,500);
    function drawSquare(color){
        /** Renders square
         * @param {Number[]} v square to be rendered
         */
        return function render(v){
            let square=canvas.height/squares;
            ctx.fillStyle=color;
            ctx.fillRect(v[0]*square,v[1]*square,square,square);
        }
    }
    /**
     * Compares s1 and s2 - default one is very buggy
     * @param {Array} s1 
     * @param {Array} s2 
     * @returns 
     */
    function compare(s1,s2){
        return s1.join()===s2.join()
    }
    /**
     * Does v contain a?
     * @param {Array} a 
     * @param {*} v 
     * @returns {Boolean} 
     */
    function contains(a,v){
        return a.some(x=>compare(x,v))
    }
}