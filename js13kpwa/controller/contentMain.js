import {showInfo} from "./showInfo.js";
import {add2Favorites} from "./saveAct.js";
import {removeFavorites} from "./deleteAct.js";

export function contentMain(){
    // Generating content based on the template
    const actsSorted = acts.sort(function(a,b){return a.start-b.start})
    const template = `<article>
    <div class="actData">
        <ul>
        <li><strong>ACT_NAME</strong></li>
        <li>TYPE</li>
        <li><span>FROM</span> - <span>TO</span> @ <span>WHERE</span></li>
        <li><span>More:</span> <a href='MFW_LINK'>MMM</a></li>
        </ul>
    </div>

    <div class="actButtons">
        <button class="round-btn" id="info_ID" data-id="ID">info</button>
        <button class="round-btn" id="save_ID" data-id="ID">save</button>
        <button class="round-btn"><a href='MFW_LINK'>MFW</a></button>
	</div>
    </article>`;
    let content = '';
    for (let i = 0; i < actsSorted.length; i++) {
        if (actsSorted[i].start>=localStorage.startTime && actsSorted[i].start<=localStorage.endTime) {
            let entry = template.replace(/POS/g, (i + 1))
                .replace(/ACT_NAME/g, actsSorted[i].name)
                .replace(/TYPE/g, actsSorted[i].style)
                .replace(/MFW_LINK/g, actsSorted[i].mfwLink)
                .replace(/FROM/g, moment.unix(actsSorted[i].start).format("HH:mm"))
                .replace(/TO/g, moment.unix(actsSorted[i].end).format("HH:mm"))
                .replace(/WHERE/g, stages[actsSorted[i].location-1].name)
                .replace(/ID/g, actsSorted[i].id);
                
            entry = entry.replace('<a href=\'http:///\'></a>', '-');
            content += entry;
            
        }
    
    }
    const mainPage = document.getElementById('content-main');
    mainPage.innerHTML=content;

        for (let i = 0; i < actsSorted.length; i++) {
            const infoButton = document.getElementById(`info_${actsSorted[i].id}`)
            if (infoButton) {
                infoButton.addEventListener("click",()=>{
                    showInfo(actsSorted[i].id)
                })  
        }
        const saveButton= document.getElementById(`save_${actsSorted[i].id}`)
            if(saveButton){
                saveButton.addEventListener("click",()=>{
                    add2Favorites(actsSorted[i].id)
                    saveButton.classList.add("selected")
                })          
            }
            
        
        }
 


}