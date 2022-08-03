export function initStorage(){
    const defaultFavs = JSON.stringify({"list": [9998899]});
    const defaultFriends = JSON.stringify([{"favorites": [9998899],"friendName" : "test"}]);
    let defaultDate = moment().unix()
    if (moment().dayOfYear()<222) {
        defaultDate = moment().dayOfYear(222).hour(0).minute(0).second(0).unix()
    } else {
        defaultDate = moment().dayOfYear(moment().dayOfYear()).hour(0).minute(0).second(0).unix()
    }

    //initiate favorite storage
     if (!localStorage.getItem("favorites")) {
        localStorage.favorites = defaultFavs;
    }
    else{
        console.log("favorites list allready initialized")
    } 

    ///initiate dateFilter storage
     if (!localStorage.getItem("startTime")) {
        localStorage.startTime = defaultDate
        localStorage.endTime = 1691011792
    }
    else{
        console.log("date filters list allready initialized")
    } 
    if (!localStorage.getItem("friends")) {
        localStorage.friends = defaultFriends
        
    } else {
        console.log("friends list allready initialized")
    }

}
    