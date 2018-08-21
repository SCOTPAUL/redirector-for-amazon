
let enable = document.getElementById("enable") as HTMLSelectElement;
let smile = document.getElementById("smile") as HTMLSelectElement;
let redirect = document.getElementById("redirect-to") as HTMLSelectElement;
let save = document.getElementById("save") as HTMLButtonElement;

save.onclick = () => {
    browser.storage.local.set({"enabled": enable.value, "force_smile": smile.value, "redirect_to": redirect.value});
}

browser.storage.local.get(["enabled", "force_smile", "redirect_to"]).then(results => {
    if(Object.keys(results).length == 3){
        enable.value = results.enabled as string;
        smile.value = results.force_smile as string;
        redirect.value = results.redirect_to as string;
    }
});

