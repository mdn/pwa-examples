import {showInfo} from "./showInfo.js";
import {removeFavorites} from "./deleteAct.js";

export function contentFav(){

    const favoritePage = document.getElementById('content-favorites');
    if(favoritePage){
        // Generating content based on the template
        const favoritesStored = JSON.parse(localStorage.getItem("favorites"))
        const template = `<article>
        <ul>
        <li><strong>ACT_NAME</strong></li>
        <li>TYPE</li>
        <li><span>FROM</span> - <span>TO</span></li>
        <li><span>More:</span> <a href='MFW_LINK'>MMM</a></li>
        <button class="infoBtn" id="info_ID" data-id="ID">info</button>
        <button class="saveBtn" id="remove_ID" data-id="ID">remove</button>
        </ul>
        </article>`;
        let content = '';
        for (let i = 0; i < acts.length; i++) {
        if (favoritesStored.list.includes(i)) {
            console.log(`${favoritesStored.list} includes ${i}`)
            let entry = template.replace(/POS/g, (i + 1))
            .replace(/ACT_NAME/g, acts[i].name)
            .replace(/TYPE/g, acts[i].style)
            .replace(/MFW_LINK/g, acts[i].mfwLink)
            .replace(/FROM/g, moment.unix(acts[i].start).format("HH:mm"))
            .replace(/TO/g, moment.unix(acts[i].end).format("HH:mm"))
            .replace(/ID/g, acts[i].id);
            
            entry = entry.replace('<a href=\'http:///\'></a>', '-');
            content += entry;
            }
        }
        favoritePage.innerHTML = content;
    }



    for (let i = 0; i < acts.length; i++) {
    const infoButton = document.getElementById(`info_${acts[i].id}`)
    if (infoButton) {
        infoButton.addEventListener("click",()=>{
            showInfo(acts[i].id)
        })   
    }
    
    const removeButton = document.getElementById(`remove_${acts[i].id}`)
    if (removeButton) {
        removeButton.addEventListener("click",()=>{
            removeFavorites(acts[i].id)

            
        })
    }

    } 
    const pubButton = document.getElementById("pub")
    if (pubButton) {
        pubButton.addEventListener("click",()=>{
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://diariumobscuri.azurewebsites.net/addEntry", true);
            xhr.setRequestHeader('Content-Type', 'application/json') ;
            xhr.setRequestHeader('Access-Control-Allow-Origin:', '*' );
            xhr.send(JSON.stringify({
                "value": [5,4,4,8,7]
                ,"test" : "abc"
            }));
            

            
        })
    }
}