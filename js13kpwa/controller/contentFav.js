import {showInfo} from "./showInfo.js";
import {removeFavorites} from "./deleteAct.js";

export function contentFav(){  
    // Generating content based on the template
    const favoritesStored = JSON.parse(localStorage.getItem("favorites"))
    const actsSorted = acts.sort(function(a,b){return a.start-b.start})
    const template = `<div class="act">
        <div class="actName">
            <h4>ACT_NAME</h4>
        </div>
        <article>
            <div class="actData">
                <ul>
                <li>TYPE</li>
                <li><span>FROM</span> - <span>TO</span> @ <span>WHERE</span></li>
                </ul>
            </div>

            <div class="actButtons">
                <button class="round-btn" id="info_ID" data-id="ID">info</button>
                <button class="round-btn" id="remove_ID" data-id="ID">save</button>
                <button class="round-btn"><a href='MFW_LINK'>MFW</a></button>
            </div>
        </article>
    </div>`;
    let content = '';
    for (let i = 0; i < actsSorted.length; i++) {
    if (favoritesStored.list.includes(i)
        && actsSorted[i].start>=localStorage.startTime 
        && actsSorted[i].start<=localStorage.endTime) {
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
    const nameField =document.getElementById("myName")
    if (localStorage.getItem("pubID")) {
        nameField.value = localStorage.myName;
        nameField.setAttribute("readonly","readonly")
    }
    
    const pubButton = document.getElementById("pub")
    if (pubButton) {
            pubButton.addEventListener("click",()=>{   
                if (!localStorage.getItem("pubID")) {
                    pubButtonEventFirst()
                }
                else{
                    console.log("allready published")
                    publishUpdate()
                }
            })
            

    }
    function pubButtonEventFirst(){
        let userName = document.getElementById("myName").value
        let xhrCheckName = new XMLHttpRequest
        xhrCheckName.open("GET",`https://diariumobscuri.azurewebsites.net/checkName?name=${userName}`)
        xhrCheckName.setRequestHeader('Content-Type', 'application/json') ;
        xhrCheckName.setRequestHeader('Access-Control-Allow-Origin', '*' );
        xhrCheckName.send();
        xhrCheckName.onreadystatechange = function(){
            if (xhrCheckName.readyState == 4) {
                if (JSON.parse(xhrCheckName.response)[0].nameFound == 1) {
                    alert("name schon besetzt")
                } else {
                    let favoritesStored = JSON.parse(localStorage.getItem("favorites"))
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://diariumobscuri.azurewebsites.net/addEntry", true);
                    xhr.setRequestHeader('Content-Type', 'application/json') ;
                    xhr.setRequestHeader('Access-Control-Allow-Origin', '*' );
                    xhr.send(JSON.stringify({
                        "favorites": favoritesStored.list
                        ,"uploadTime" : moment().unix()
                        ,"name" : userName
                        ,"type" : "vorneLinks"
                    }));
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            console.log(JSON.parse(xhr.response).id);
                            localStorage.pubID = JSON.parse(xhr.response).id;
                            localStorage.myName = userName;
                            alert("das hat geklappt")
                        }
                    }
                }
                
            }
        }
        

    }
    function publishUpdate(){
        let favoritesStored = JSON.parse(localStorage.getItem("favorites"))
        let databaseID = localStorage.pubID
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://diariumobscuri.azurewebsites.net/updateItem", true);
        xhr.setRequestHeader('Content-Type', 'application/json') ;
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*' );
        xhr.send(JSON.stringify({
            "value": favoritesStored.list
            ,"key" : "favorites"
            ,"taskID" : databaseID
        }));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log(xhr.responseType);
                console.log(JSON.parse(xhr.response).id);
                localStorage.pubID = JSON.parse(xhr.response).id;
                alert("das hat geklappt")
            }
        }

    }
    const friendButton = document.getElementById("getFriends")
    friendButton.addEventListener("click",()=>{
        const newFriend = document.getElementById("friendsName").value
        let xhrCheckName = new XMLHttpRequest
        xhrCheckName.open("GET",`https://diariumobscuri.azurewebsites.net/checkName?name=${newFriend}`)
        xhrCheckName.setRequestHeader('Content-Type', 'application/json') ;
        xhrCheckName.setRequestHeader('Access-Control-Allow-Origin', '*' );
        xhrCheckName.send();
        xhrCheckName.onreadystatechange = function(){
            if (xhrCheckName.readyState == 4) {
                console.log(JSON.parse(xhrCheckName.response)[0].nameFound)
                if (JSON.parse(xhrCheckName.response)[0].nameFound == 0) {
                    alert("nichts gefunden unter diesem namen")
                }
                else{
                    let friendFav=JSON.parse(xhrCheckName.response)[1].favorites
                    let friendName=JSON.parse(xhrCheckName.response)[1].name
                    let oldList = JSON.parse(localStorage.friends)
                    let newElement = {}
                    newElement["favorites"]=friendFav
                    newElement["friendName"]=friendName
                    let check = 0
                    for (let i = 0; i < oldList.length; i++) {
                        if (oldList[i].friendName == friendName){
                            check =1;
                        }
                        
                    }
                    if (check==0) {
                        oldList.push(newElement)
                        localStorage.friends=JSON.stringify(oldList)
                    }
                    updateFriends()
                } 
            }
        }

    })
    function updateFriends(){
        let friendsList = JSON.parse(localStorage.friends)
        //friendsList.splice(1,friendsList.length)
        let newFriendsList = [];
        for (let i = 0; i < friendsList.length; i++) {
            let xhr = new XMLHttpRequest
            console.log("name",`${friendsList[i].friendName}`)
            xhr.open("GET",`https://diariumobscuri.azurewebsites.net/checkName?name=${friendsList[i].friendName}`)
            xhr.setRequestHeader('Content-Type', 'application/json') ;
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*' );
            xhr.send();
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    let friendFav=JSON.parse(xhr.response)[1].favorites
                    let friendName=JSON.parse(xhr.response)[1].name
                    let newElement = {
                        "favorites" : friendFav,
                        "friendName" : friendName
                    }
                    console.log("newElement",newElement)
                    friendsList.push({
                        "favorites" : friendFav,
                        "friendName" : friendName,
                        "id" : 123

                    })
                }
            
            
            }

            console.log("new Friendslist",JSON.stringify(newFriendsList))
          
            console.log("new Friendslist",newFriendsList)
            console.log("Friendslist",friendsList)
            //localStorage.friends=JSON.stringify(newFriendsList)
        }
    }

}