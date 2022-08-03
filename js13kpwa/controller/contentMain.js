import {showInfo} from "./showInfo.js";
import {add2Favorites} from "./saveAct.js";

export function contentMain(){
    // Generating content based on the template
    const actsSorted = acts.sort(function(a,b){return a.start-b.start})
    const template = `<article>
    <ul>
    <li><strong>ACT_NAME</strong></li>
    <li>TYPE</li>
    <li><span>FROM</span> - <span>TO</span> @ <span>WHERE</span></li>
    <li><span>More:</span> <a href='MFW_LINK'>MMM</a></li>
    <button class="infoBtn" id="info_ID" data-id="ID">info</button>
    <button class="saveBtn" id="save_ID" data-id="ID">save</button>
    </ul>
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

            if (document.getElementById(`info_${actsSorted[i].id}`)) {

                document.getElementById(`info_${actsSorted[i].id}`).addEventListener("click",()=>{
                    showInfo(actsSorted[i].id)
                })
                
                document.getElementById(`save_${actsSorted[i].id}`).addEventListener("click",()=>{
                    add2Favorites(actsSorted[i].id)
                })
                
            }
            
        
        }
 


}