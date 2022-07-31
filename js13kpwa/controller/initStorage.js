export function initStorage(){
    const defaultFavs = JSON.stringify({"list": [9998899]});
    console.log(defaultFavs)

     if (!localStorage.getItem("favorites")) {
        console.log(!localStorage.getItem("favorites"))
        localStorage.favorites = defaultFavs;
    }
    else{
        console.log("favorites list allready initialized")
    } 
}
    