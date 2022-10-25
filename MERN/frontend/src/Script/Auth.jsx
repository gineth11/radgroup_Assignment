const IsAdmin=()=>{
    if(JSON.parse(sessionStorage.getItem("user")) === null) {
        return false;
    }else{
        return JSON.parse(sessionStorage.getItem("user")).role === "admin";
    }

}

const IsSeller=()=>{
    if(JSON.parse(sessionStorage.getItem("user")) === null) {
        return false;
    }else{
        return JSON.parse(sessionStorage.getItem("user")).role === "seller";
    }
}

const IsLoggedIn=()=>{
    if(JSON.parse(sessionStorage.getItem("user")) === null) {
        return false;
    }else{
        return JSON.parse(sessionStorage.getItem("user")).username !== "";
    }
}

export {IsAdmin,IsSeller,IsLoggedIn}