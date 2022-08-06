"use strict";
let nextRun=0;
let audio=0
function playback(){
    let au= document.createElement("audio")
    au.src="owosad.mp3"
    au.playbackRate=1.5
    au.loop="loop"
    au.play();//.then(playback)
    //audio=setTimeout(playback,100)
}
function smile(e){
    console.log("smile")
    //document.body.style.backgroundColor=`rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`
    let id="id-"+Math.round(Math.random()*10000000000);
    let img=document.createElement("img");
    img.src=(["frame.jpg","smile.png"])[Math.floor(Math.random()*2)];
    img.id=id;
    let xStretch=Math.random()
    img.height=277*2*xStretch;
    img.width=248*2*xStretch;
    img.style.zIndex=0;
    let smileyCSS=document.createElement("style");
    let multiplier = Math.random()*2;
    let result= Math.random()*2;
    smileyCSS.innerHTML=`
    @keyframes ${id}{
        0% {
            height:${100+multiplier*img.height}px;
            width:${100+multiplier*img.width}px;
            transform:rotate(${Math.random()*360}deg);
        }
        100% {
            height:${50+result*img.height*0.5}px;
            width:${50+result*img.width*0.5}px;
            transform:rotate(${Math.random()*360}deg);
        }
    }
    #${id}{
        animation: ${id} ${Math.random()*2+1}s infinite;
        position:fixed;
        top:${e.pageY}px;
        left:${e.pageX}px;
    }`;
    document.head.appendChild(smileyCSS);
    document.body.appendChild(img);
    //nextRun=setTimeout(smile,0);
    if(document.body.children.length>300){
        setTimeout(()=>{
            document.body.removeChild(document.body.children[2]);
        },0)
    }
}
let amt=1;
function addPopup(e){
    console.log("fire")
    for(let i=amt;i<2*amt;i++){
        smile(e);
        playback();
    }
    amt*=2;
}
document.addEventListener("click",addPopup)
document.addEventListener("mousemove",addPopup)
document.addEventListener("scroll",playback)
document.addEventListener("keydown",function pauseSmileys(e){
    if(e.key!==" ") return true;
    document.removeEventListener("click",addPopup);
    document.removeEventListener("mousemove",smile)
    document.removeEventListener("scroll",playback)
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
//smile();
//playback();
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
f(Date.now());
function rgba(){
    console.log("rgba")
    document.body.classList.add("doge")
}
document.addEventListener("click",rgba)
document.addEventListener("mousemove",rgba)
