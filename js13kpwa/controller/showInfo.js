export function showInfo(actID){
    const modal=document.getElementById("modal")
    document.getElementById("closeModal").addEventListener("click",()=>{
    modal.style.display = "none"})
    modal.style.display = "block"
    document.getElementById("infoModal").innerText= acts[actID].info

}