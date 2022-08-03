import { contentFav } from "./contentFav.js";
import { contentMain } from "./contentMain.js";

export function setFilterDate(){
    let startTimeStored=localStorage.startTime

    let filterButtons=document.getElementsByClassName("round-btn")
    for (let i = 0; i < filterButtons.length; i++) {
        const btn = filterButtons[i];
        btn.addEventListener("click",()=>{
            changeFilterDate(btn)
        })
        if (parseInt(startTimeStored) == parseInt(btn.dataset.starttime)) {
            btn.classList.add("selected") 
            console.log(parseInt(startTimeStored)-parseInt(btn.dataset.starttime))
        }
        else{
            btn.classList.remove("selected")
        }
        
    }

}

function changeFilterDate(clickedBtn){
    let filterButtons=document.getElementsByClassName("round-btn")
    for (let i = 0; i < filterButtons.length; i++) {
        const btn = filterButtons[i];
        btn.classList.remove("selected")
    }

    let endTime = moment().dayOfYear(moment.unix(clickedBtn.dataset.starttime).dayOfYear()).hour(23).minute(59).second(59).unix()
    localStorage.startTime=clickedBtn.dataset.starttime
    localStorage.endTime=endTime
    clickedBtn.classList.add("selected")

    const mainPage = document.getElementById('content-main');

    if (mainPage) {
        contentMain();
    }
    else{
        contentFav();
    }
    

}