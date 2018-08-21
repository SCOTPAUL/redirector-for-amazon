function main(force_smile: boolean, redirect_to: string){

    let domain = window.location.hostname;
    if (!domain.endsWith(redirect_to) || (force_smile && !domain.startsWith("smile"))) {
        let remainder = window.location.pathname;

        if(force_smile){
            window.location.href = "https://smile.amazon" + redirect_to + remainder;
        }
        else {
            window.location.href = "https://www.amazon" + redirect_to + remainder;
        }
    }
}

function handleChange(changes: object, areaName: string){
    if("enabled" in changes || "force_smile" in changes || "redirect_to" in changes){
        init();
    }
}

function init(){
    browser.runtime.sendMessage("showAction");
    
    if(!browser.storage.onChanged.hasListener(handleChange)){
        browser.storage.onChanged.addListener(handleChange);
    }

    browser.storage.local.get(["enabled", "force_smile", "redirect_to"]).then(results => {
        if(Object.keys(results).length == 3){
            let force_smile = results.force_smile == "Yes";
            let enabled = results.enabled == "Yes";
            let redirect_to = results.redirect_to as string;

            if(enabled){
                main(force_smile, redirect_to);
            }

        }
        else {
            main(false, ".com");
        }
    });
}

init();