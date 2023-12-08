export const userAuth = () => {
    if(localStorage.getItem("id")){
        return true;
    }
    else {
        return false;
    }
}