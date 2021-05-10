document.addEventListener("DOMContentLoaded",()=>{
    let keys=0;
    let secrets=document.querySelectorAll(".material-title")
    secrets.forEach(a=>a.onclick=found)
    function found(e){
        keys++;
        alert(`Pog! You have now found ${keys}/${secrets.length} secrets`);
        e.preventDefault()
        e.target.onclick=null
    }
})