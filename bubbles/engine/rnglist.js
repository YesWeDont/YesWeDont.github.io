class RNGList{
    constructor(def){
        this.chances=[];
        this.default=this.def||"";
    }
    addEntry(name,chance){
        //console.log(name,chance)
        let original=this.chances
        this.chances=this.chances.map(element => {
            //console.log(element)
            if(element[0]===name) return [name, element[1]+chance]
            return element
        });
        if((original.toString()===this.chances.toString())||this.chances.length===0){
            //nothing happened, nope
            this.chances.push([name,chance])
        }
        let totalChance=this.sumChances();
        console.log(name,totalChance)
        if(totalChance>1) throw `Impossible term ${name} - chance too high by ${totalChance-1}`;
        //console.log(this.chances)
        return this;
    }
    removeEntry(name){
        this.chances=this.chances.filter(entry=>entry[0]!==name)
    }
    selectEntry(){
        let final="";
        let rng=random();
        console.log(rng)
        let last=0;
        this.chances.forEach((i)=>{
            console.log(i)
            console.log(last)
            if((rng>=last)&&(rng<=last+i[1])) {
                final=i[0]
            }
            last+=i[1]
        })
        if(final.length===0) final=this.default;
        //console.log(final)
        return final
    }
    sumChances(){
        return this.chances.reduce((a,b)=>a+b[1],0)
    }
}