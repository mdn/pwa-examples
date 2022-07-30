//import {showInfo} from "./showInfo.js";
//import {add2Favorites} from "./saveAct.js";

export function contentFav(){
    // Generating content based on the template
    const template = `<article>
    <ul>
    <li><strong>ACT_NAME</strong></li>
    <li>TYPE</li>
    <li><span>FROM</span> - <span>TO</span></li>
    <li><span>More:</span> <a href='MFW_LINK'>MMM</a></li>
    <button class="infoBtn" id="info_ID" data-id="ID">info</button>
    <button class="saveBtn" id="save_ID" data-id="ID">save</button>
    </ul>
    </article>`;
    let content = '';
    for (let i = 0; i < acts.length; i++) {
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

    const favoritePage = document.getElementById('content-favorites');
    if(favoritePage){
        favoritePage.innerHTML = content;
    }


/* 
    for (let i = 0; i < acts.length; i++) {
    document.getElementById(`info_${acts[i].id}`).addEventListener("click",()=>{
        showInfo(acts[i].id)
    })
    
    document.getElementById(`save_${acts[i].id}`).addEventListener("click",()=>{
        add2Favorites(acts[i].id)
    })

    } */
}