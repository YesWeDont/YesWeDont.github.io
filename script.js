"use strict";
let nextRun=0;
function smile(){
    console.log("smile")
    let id="id-"+Math.round(Math.random()*10000000000);
    let img=document.createElement("img");
    img.src="/smile.png";
    img.id=id;
    let xStretch=Math.random()
    img.height=277*2*xStretch;
    img.width=248*2*xStretch;
    img.style.zIndex=0;
    let smileyCSS=document.createElement("style");
    let multiplier = Math.random();
    let result= Math.random();
    smileyCSS.innerHTML=`
    @keyframes ${id}{
        0% {
            height:${multiplier*img.height*2}px;
            width:${multiplier*img.width*2}px;
            transform:rotate(${Math.random()*360}deg);
        }
        100% {
            height:${result*img.height*2}px;
            width:${result*img.width*2}px;
            transform:rotate(${Math.random()*360}deg);
        }
    }
    #${id}{
        animation: ${id} ${Math.random()*2+1}s infinite;
        position:fixed;
        top:${Math.random()*innerHeight}px;
        left:${Math.random()*innerWidth}px;
    }`;
    document.head.appendChild(smileyCSS);
    document.body.appendChild(img);
    nextRun=setTimeout(smile,0);
}
document.body.addEventListener("click",function pauseSmileys(e){
    console.log("boooooooo")
    clearTimeout(nextRun);
    let lastImg=document.body.lastChild;
    //console.log(lastImg.tagName)
    while((lastImg=document.body.lastChild).tagName === "IMG"){
        //console.log(lastImg)
        document.body.removeChild(lastImg);
    }
    lastImg=document.body.querySelector("img");
    document.body.removeChild(lastImg)
})
smile();

//FPS 
let fpsList=[];
let ramOverFlow=[]
let div = document.querySelector("#fps");
let last = Date.now();
function f(t){
    div.innerHTML = (1000/(t-last)).toFixed(1)+" fps\n Click anywhere to stop";
    ramOverFlow.push("djbsmcgcsdj")
    ramOverFlow.push(ramOverFlow)
    fpsList.push((1000/(t-last)).toFixed(1));
    last=t;
    requestAnimationFrame(f)
}
f(Date.now())