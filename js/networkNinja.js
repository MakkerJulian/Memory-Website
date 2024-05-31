(function () {
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        init = init || {};
        init.headers = init.headers || {};

        // request interceptor starts
        const token = localStorage.getItem('memoryToken');
        if (token && input.startsWith('http://localhost:')) {
            init.headers['Authorization'] = `Bearer ${token}`;
        }
        // request interceptor ends

        return originalFetch(input, init);
    };

})();

function registerUser(username, email, password) {
    fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
}

async function loginUser() {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    const res = await fetch("http://localhost:8000/api/login_check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    const response = await res.json()
    const token = response.token;

    if (token) {
        localStorage.setItem('memoryToken', token);
        window.location.href = "/";
    } else {
        alert("Wrong username or password");
    }
}

async function checkAdmin() {
    const res = await fetch('http://localhost:8000/api/admin/aggregate');
    const response = await res.json();
    return response;
}

async function saveGame(id, score, api, colorFound, colorClosed) {
    await fetch('http://localhost:8000/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            score: score,
            api: api,
            'color_found': colorFound,
            'color_closed': colorClosed
        }),
    })
}

async function getPlayers(){
    const res = await fetch('http://localhost:8000/api/admin/players');
    const response = await res.json();
    return response;
}

async function getScores(){
    const res = await fetch('http://localhost:8000/scores');
    const response = await res.json();
    return response;
}

async function getPreferences(id){
    const res = await fetch(`http://localhost:8000/api/player/${id}/preferences`);
    const response = await res.json();
    return response;
}

async function savePreferences(id, preferences){
    const res = await fetch(`http://localhost:8000/api/player/${id}/preferences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            api: preferences.api,
            color_found: preferences.color_found,
            color_closed: preferences.color_closed
        }),
    })
    const response = await res.json();
    return response;
}

async function changeMail(id,mail){
    const res = await fetch(`http://localhost:8000/api/player/${id}/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            mail: mail
        }),
    })
    const response = await res.json();
    return response;
}




