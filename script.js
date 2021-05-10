document.addEventListener("DOMContentLoaded",()=>{
    let keys=0;
    let secrets=document.querySelectorAll(".material-title")
    secrets.forEach(a=>a.onclick=found)
    function found(e){
        keys++;
        alert(`Pog! You have now found ${keys}/${secrets.length} secrets`);
        if(keys===secrets.length) alert("Challenge Completed!\n\nDear Client\nYou have been qualified to become a dev.\n Ring +61 0401 483 207 to finish the application process.")
        e.preventDefault()
        e.target.onclick=null
    }
})