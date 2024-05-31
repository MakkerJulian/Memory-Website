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

function registerUser() {
    fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "Henk",
            email: "henk@henk",
            password: "henk"
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


