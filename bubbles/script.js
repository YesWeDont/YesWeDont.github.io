"use strict";
const canvas=document.getElementById("canvas");
canvas.height=innerHeight;
canvas.width=innerWidth;
const x=innerWidth;
const y=innerHeight;
var curr=Date.now();
const ctx=canvas.getContext("2d");
let fps=60;
const fpsElement=document.querySelector("#fps")
const player=new Bubble([x/2,y/2],10,[0,0],"green");
Bubble.prototype._playerRadius=player.r

const manager=new Manager(player,canvas.getContext("2d"),document.getElementById("score"));
//startup mgr
//derep
/*document.addEventListener("keydown",(e)=>{
    if(!isNaN(parseInt(e.key))){
        manager.difficulty=parseInt(e.key)
        if(manager.difficulty===0) manager.difficulty=1
        ctx.fillStyle="purple"
        ctx.fillRect(0,0,x,y);
        ctx.fillStyle="yellow"
        canvas.onclick=(e)=>{
            canvas.requestPointerLock()
            if(!manager.difficulty) return;
            manager.update();
            manager.bindKeys();
            manager.player.position=[e.pageX,e.pageY]
        }
        showTextSequence(ctx,["Use arrow keys/mouse to move     Click to continue","Avoid Red Bubbles","Blue Bubbles shrink you; You get larger and larger over time","Purple Bubbles add more points","You have invunerability for the first 2 seconds","Click to start"]);
    }
})*/
let layoutDiv=document.createElement("div");
layoutDiv.classList.add("fill")
let center=document.createElement("div");
center.classList.add("center")
layoutDiv.appendChild(center)
let title=document.createElement("h1")
title.innerHTML="Select Difficulty"
layoutDiv.appendChild(title)
document.body.appendChild(layoutDiv)
let temp =["Easy","Medium","Hard"];
temp.forEach((value,i)=>{
    let button=document.createElement("button");
    button.innerHTML=value;
    button.onclick=()=>{
        manager.difficulty=i;
        while(center.firstElementChild?.tagName==="BUTTON"){
            center.removeChild(center.firstElementChild)
        }
        let btn=document.createElement("button");
        btn.innerHTML="Skip"
        btn.style.position="absolute";
        btn.style.bottom="5%"
        btn.style.right="5%"
        btn.style.fontSize="40pt";
        btn.style.borderRadius="50px"
        layoutDiv.appendChild(btn)
        //layoutDiv.hidden=true;
        let text=["Use arrow keys/mouse to move<br><br>Click to continue","Avoid Red Bubbles",`Below is a list of the effects ${table}`,"You have invunerability for the first 2 seconds","Click to start"];
        showTextSequence(layoutDiv,text,{
            backgroundColor:"grey",
            color:"white"
        },btn,function divClickHandler(){
            layoutDiv.hidden=true;
            manager.bindKeys()
            manager.update();
        });
    }
    center.appendChild(button);
});

function showTextSequence(div,text,styleOptions,skip,next){
    let i=0;
    div.style=styleOptions
    div.onclick= ()=>{
        if(i===text.length){
            console.log("exit")
            canvas.requestPointerLock();
            next()
            return;
        }
        else div.innerHTML=`<h1>${text[i]}</h1>`
        div.appendChild(skip)
        i++;
    }
    skip.onclick=()=>{
        console.log("exit")
        canvas.requestPointerLock();
        next()
        skip.onclick=null;
        return;
    }
}
setInterval(()=>{
    if(fps===Infinity) fps=1000
    fpsElement.innerHTML=`FPS: ${fps}\nBubble Count:${manager.bubbles.length}`
},500)
document.body.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
        if((manager.paused=!manager.paused)){
            //if manager is paused
            layoutDiv.hidden=false;
            layoutDiv.innerHTML="<h1>GAME PAUSED<br> PRESS ESCAPE KEY TO CONTINUE</h1>"
        }else{
            layoutDiv.hidden=true;
        }
    }
    console.log("keys")
})