(function () {
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        init = init || {};
        init.headers = init.headers || {};

        // request interceptor starts
        const token = localStorage.getItem('memoryToken');

        if (!token && !input.endsWith("login_check") && !input.endsWith("register")) {
            localStorage.removeItem('memoryToken');
            document.location.href = '/login.html';
            return Promise.reject('Token has expired');
        }
        if (token && input.startsWith('http://localhost:')) {
            const exp = parseJwt(token).exp;
            if (Date.now() >= exp * 1000) {
                localStorage.removeItem('memoryToken');
                document.location.href = '/login.html';
                return Promise.reject('Token has expired');
            }
            init.headers['Authorization'] = `Bearer ${token}`;
        }
        // request interceptor ends

        return originalFetch(input, init);
    };

})();

async function registerUser() {
    username = document.getElementById('username').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    var res = await fetch('http://localhost:8000/register', {
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
    if (res.status === 201) {
        loginUser();
    }
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

async function saveGame(id, score) {
    const preferences = await getPreferences(getCurrentUserId());
    await fetch('http://localhost:8000/game/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            score: score,
            api: preferences.preferred_api === "" ? 'images' : preferences.preferred_api,
            'color_found': preferences.color_found === ""? 'green' : preferences.color_found,
            'color_closed': preferences.color_closed === ""? 'red' : preferences.color_closed
        }),
    })
}

async function getPlayers() {
    const res = await fetch('http://localhost:8000/api/admin/players');
    const response = await res.json();
    return response;
}

async function getScores() {
    const res = await fetch('http://localhost:8000/scores');
    const response = await res.json();
    return response;
}

async function getPreferences(id) {
    const res = await fetch(`http://localhost:8000/api/player/${id}/preferences`);
    const response = await res.json();
    response.preferred_api = response.api === "" ? 'images' : response.preferred_api;
    response.color_found = response.color_found === "" ? 'green' : response.color_found;
    response.color_closed = response.color_closed === "" ? 'red' : response.color_closed;
    return response;
}

async function savePreferences(id, preferences) {
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
    return res;
}

async function getMail(id) {
    const res = await fetch(`http://localhost:8000/api/player/${id}/email`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    response = await res.json();
    return response
}

async function changeMail(id, mail) {
    const res = await fetch(`http://localhost:8000/api/player/${id}/email`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            email: mail
        }),
    })
    return res;
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function getCurrentUserId() {
    const token = localStorage.getItem('memoryToken');
    if (token) {
        return parseJwt(token).sub;
    }
    return null;
}


