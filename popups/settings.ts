let enable = document.getElementById("enable") as HTMLSelectElement;
let smile = document.getElementById("smile") as HTMLSelectElement;
let redirect = document.getElementById("redirect-to") as HTMLSelectElement;
let save = document.getElementById("save") as HTMLButtonElement;

save.onclick = () => {
    browser.storage.local.set({"enabled": enable.value, "force_smile": smile.value, "redirect_to": redirect.value});
}

function getSettingTLD(): string | null {
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

browser.storage.local.get(["enabled", "force_smile", "redirect_to"]).then(results => {
    if(Object.keys(results).length == 3){
        console.log("Storage hit");

        enable.value = results.enabled as string;
        smile.value = results.force_smile as string;
        redirect.value = results.redirect_to as string;
    }
    else {
        let redirect_to = getSettingTLD();
        console.log(`Should go to ${redirect_to}`);

        if(redirect_to != null){
            redirect.value = redirect_to;
        }
    }
});

