export function initStorage(){
    localStorage.clear();
    const defaultFavs = JSON.stringify({"list": [9998899]});

     if (!localStorage.getItem("favorites")) {
        console.log(!localStorage.getItem("favorites"))
        localStorage.favorites = defaultFavs;
    } 
}
    