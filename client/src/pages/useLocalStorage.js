import { useState, useEffect } from "react";
function useLocalStorage(key, initalState){
    const [myAddress, setMyAddress] = useState(
        () => JSON.parse(window.localStorage.getItem("myAddress")) || 0 
     );
  
     const [myBalance, setMyBalance] = useState("0");
     const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  
     useEffect(() => {
        window.localStorage.setItem("myAddress", JSON.stringify(myAddress));
     }, [myAddress]);
}