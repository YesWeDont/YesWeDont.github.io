window.onload=()=>{
    let scorekeeper=document.querySelector("p");
    let canvas=document.querySelector("canvas");
    canvas.height=Math.min(innerHeight,innerWidth);
    canvas.width=canvas.height
    let ctx=canvas.getContext("2d");
    let score=0;
    let squares=15
    let square=canvas.height/squares;
    /**
     * @type {(Number[])[]}
     * @description turn loc, eg [[0,0],[5,0],[5,5]], first one is head, last one is tail
     */
    let snake=[[4,4],[4,3]];
    let appleLocation=[4,5];
    let snakeDirection=[0,0];




    //bindkey
    document.body.addEventListener("keypress",(e)=>{
        console.log("keypress "+e)
        if(e.key==="s"&&!(compare(snakeDirection,[0,-1]))){
            snakeDirection=[0,1]
        }else if( e.key==="w" && !(compare(snakeDirection,[0,1])) ){
            snakeDirection=[0,-1]
        }else if( e.key==="a" && !(compare(snakeDirection,[1,0])) ){
            snakeDirection=[-1,0]
        }else if(e.key==="d"&& !(compare(snakeDirection,[1,0])) ){
            snakeDirection=[1,0]
        }
    });
    let interval=0;


    //game loop decalation
    function gameLoop(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        //addHead, rem last
        snake.unshift([ snakeDirection[0]+snake[0][0] , snakeDirection[1]+snake[0][1] ])
        snake.pop();
        //console.log(`apple ${appleLocation[0]},${appleLocation[1]}; snake ${snake[0][0]}, ${snake[0][1]}`)
        if(appleLocation.toString()===snake[0].toString()){
            //pog head crashed into apple
            //snake's final two grids
            let finalsnake=[(snake.reverse())[0],(snake.reverse())[1]];
            //snake's final 2 grid direction
            let direction=[finalsnake[1][0]-finalsnake[0][0],finalsnake[1][1]-finalsnake[0][1]];
            snake.push([finalsnake[0][0]-direction[0],finalsnake[0][1]-direction[1]])
            while(contains(snake,appleLocation)){
                appleLocation=([Math.floor(Math.random()*squares),Math.floor(Math.random()*squares)]);
            }
            console.log(appleLocation)
            //new Apples bro
        }
        if((snake[0][0]<0||snake[0][0]>squares)||(snake[0][1]<0||snake[0][1]>squares)){
            alert("BOOOOOO YOU LOSE!!!!!")
            clearInterval(interval)
        }
        let bite=false;
        snake.forEach((i,t)=>{
            if(compare(i,snake[0])&&t>0&&snake.length>3){
                bite=true;
            }
        })
        if(bite){
            alert("Eating urself?Nope. GG")
            clearInterval(interval)
        }
        snake.forEach(drawSquare("green"))
        drawSquare("red")(appleLocation)
        //console.log(snake)
        //console.log(appleLocations);
    }
    interval=setInterval(gameLoop,500);
    function drawSquare(color){
        return function render(v){
            let square=canvas.height/squares;
            ctx.fillStyle=color;
            ctx.fillRect(v[0]*square,v[1]*square,square,square);
        }
    }
    function compare(s1,s2){
        return s1.toString()===s2.toString()
    }
    function contains(a,v){
        let c=false;
        a.forEach((i)=>{
            if(compare(v,i)){
                c=true;
            }
        });
        return c
    }
}