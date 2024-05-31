function savePrefs() {
    let selectedImage = document.querySelector('select[title="Image"]').value;
    let colorClosed = document.getElementById('closedInput').value;
    let colorFound = document.getElementById('matchedInput').value;
    let email = document.getElementById('email').value;
    userId = getCurrentUserId();
    const preferences = {
        api: selectedImage,
        color_found: colorFound,
        color_closed: colorClosed
    };
    savePreferences(userId, preferences).then(res => {
        if (res.status === 204) {
            setEmail(userId, email)
        }
    });
}

function setEmail(userId, email) {
    changeMail(userId, email).then(res => {
        if (res.status === 204) {
            window.location.href = 'memory.html';
        }
    });
}

async function setInitialValues() {
    const userId = getCurrentUserId();
    const preferences = await getPreferences(userId);
    const mail  = await getMail(userId)
    document.querySelector('select[title="Image"]').value = preferences.preferred_api;
    document.getElementById('closedInput').value = preferences.color_closed;
    document.getElementById('matchedInput').value = preferences.color_found;
    document.getElementById('email').value  = mail
}

// Call setInitialValues when the window loads
window.onload = setInitialValues;