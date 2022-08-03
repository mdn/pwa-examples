import {showInfo} from "./showInfo.js";
import {removeFavorites} from "./deleteAct.js";

export function contentFav(){  
    // Generating content based on the template
    const favoritesStored = JSON.parse(localStorage.getItem("favorites"))
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
        <button class="round-btn" id="remove_ID" data-id="ID">remove</button>
        <button class="round-btn"><a href='MFW_LINK'>MFW</a></button>
	</div>
    </article>`;
    let content = '';
    for (let i = 0; i < actsSorted.length; i++) {
    if (favoritesStored.list.includes(i)
        && actsSorted[i].start>=localStorage.startTime 
        && actsSorted[i].start<=localStorage.endTime) {
        console.log(`${favoritesStored.list} includes ${i}`)
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
    const favoritePage = document.getElementById('content-favorites');   
    favoritePage.innerHTML = content;



    for (let i = 0; i < actsSorted.length; i++) {
    const infoButton = document.getElementById(`info_${actsSorted[i].id}`)
    if (infoButton) {
        infoButton.addEventListener("click",()=>{
            showInfo(actsSorted[i].id)
        })   
    }
    
    const removeButton = document.getElementById(`remove_${actsSorted[i].id}`)
    if (removeButton) {
        removeButton.addEventListener("click",()=>{
            removeFavorites(actsSorted[i].id)

            
        })
    }

    } 
    const pubButton = document.getElementById("pub")
    if (pubButton) {
        pubButton.addEventListener("click",()=>{
            let favoritesStored = JSON.parse(localStorage.getItem("favorites"))
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "https://diariumobscuri.azurewebsites.net/addEntry", true);
            xhr.setRequestHeader('Content-Type', 'application/json') ;
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*' );
            xhr.send(JSON.stringify({
                "value": favoritesStored.list
                ,"test" : "abc"
                ,"name" : "kingKasi"
            }));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    console.log(xhr.responseType);
                    console.log(JSON.parse(xhr.response).id);
                    localStorage.pubID = JSON.parse(xhr.response).id;
                }
              }
            

            
        })
    }
}