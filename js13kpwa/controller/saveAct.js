export function add2Favorites(actID){
    var favoritesStored = JSON.parse(localStorage.getItem("favorites"))
   

    if (favoritesStored.list.includes(actID)) {
        //.log(`act with id ${actID} allready in the favorites`)
    }
    else{
        favoritesStored.list.push(actID)
        //console.log(`act with id ${actID} added to favorites`)
        //console.log(favoritesStored.list)
    }
    
    localStorage.favorites = JSON.stringify({ "list": favoritesStored.list});

}