document.addEventListener("DOMContentLoaded",()=>{
    let keys=0;
    let l=document.querySelectorAll(".material-title")
    l.forEach(a=>!(a.onclick=found)/*||console.log(a)/*)
    let d=document.querySelectorAll(".model")
    d.forEach(a=>!(a.ondblclick=found)/*||console.log(a)*/);
    let r=document.querySelectorAll(".link")
    r.forEach(a=>!(a.oncontextmenu=found)/*||console.log(a)*/);
    function found(e){
        keys++;
        alert(`Pog! You have now found ${keys}/${l.length+d.length+r.length} secrets`);
        if(keys===l.length+d.length+r.length) alert("Challenge Completed!\n\nDear Client\nYou have been qualified to become a dev.\n Ring +61 0401 483 207 to finish the application process.")
        e.preventDefault()
        e.target.onclick=null
        e.target.ondblclick=null
        e.target.oncontextmenu=null
    }
})