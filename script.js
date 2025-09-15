const registerServiceWorker = async() => {
    if ("serviceWorker" in navigator){
        try {
            const registration = await 
            navigator.serviceWorker.register("/sw.js");
            if (registration.active){
                console.log ("Service Worker installed");
            }
            
        }catch (error){
            console.error("Registration failed")
        }
    }
}

registerServiceWorker().then(()=>console.log("oi"));