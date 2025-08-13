// TO DO: remove globals; blocked by Firefox/browsers;

var now = new Date;
var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
var dataToSend = {
    utc_timestamp: utc_timestamp.toString()
};

async function getBuzzData() {

    var site = window.location.href.toString();
    if (site === null || site === undefined || site === "") {
        site = "buzz-client.html"
    }

    await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            dataToSend = {'utc:': utc_timestamp.toString(), 'site:': site,'ip:': data.ip, 'browser:': navigator.appName, 'browser version:': navigator.appVersion, 'user agent:': navigator.userAgent, 'platform:': navigator.platform, 'language:': navigator.language}; 
        })
        .catch(error => console.error('Error fetching IP:', error));
    
    console.log(dataToSend);
}


async function postBuzzData() {

    await getBuzzData();
    
    const url = "https://teacherbot.uk/api";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // credentials:"include",
            body: JSON.stringify(dataToSend),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error posting data:", error);
    }

}

