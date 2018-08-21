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

function getTLD(): string | null {
    let language = window.navigator.language;

    switch(language){
        case "en-GB": return ".co.uk";
        case "en-US": return ".com";
        case "en-AU": return ".au";
        case "en-CA": return ".ca";
        case "nl-NL": return ".nl";
        case "it-IT": return ".it";
        case "de-DE": return ".de";
        case "fr-FR": return ".fr";
        case "ja":    return ".co.jp";
        case "es-ES": return ".es";
        case "es-PR": return ".com";
        case "es-MX": return ".mx";
        case "pt-BR": return ".br";
        case "en-IN": return ".in";
        case "zh-CN": return ".cn";
        case "zh-TW": return ".cn";
        case "zh-CN": return ".cn";
        case "zh-HK": return ".cn";
        case "zh-yue": return ".cn";
        default: return null;
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
            main(false, getTLD() || ".com");
        }
    });
}

init();