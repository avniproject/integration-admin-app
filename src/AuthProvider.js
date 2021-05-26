import _ from 'lodash';

const defaultOptions = {
    authGroups: [],
};

const sessionDurationSeconds = 1000 * 60 * 60 * 24 * 5;
const lastActionTimeStorageKey = "LAST_ACTION_TIME";

function sessionExpired() {
    let nowTimeStamp = new Date().getTime();
    let lastActionTime = localStorage.getItem(lastActionTimeStorageKey);
    let difference = Math.abs((lastActionTime ? lastActionTime : nowTimeStamp) - nowTimeStamp);
    console.log('[AUTH PROVIDER][AUTH_LOGIN]', 'Inactivity period duration in seconds: ', difference/1000);
    return difference > sessionDurationSeconds;
}

function updateLocalStoredTime() {
    let lastActionTime = new Date().getTime();
    localStorage.setItem(lastActionTimeStorageKey, lastActionTime);
}

function clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem(lastActionTimeStorageKey);
}

class AuthProvider {
    login({username, password}) {
        let postObject = {email: username, password: password};

        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");

        const request = new Request('/login', {
            method: 'POST',
            body: formBody,
            headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
        });

        const verifyLoginRequest = new Request('/currentUser', {
            method: 'GET'
        });

        console.log(`[AUTH PROVIDER][AUTH_LOGIN]   Request: ${JSON.stringify(request)}`);
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
            })
            .then(() => {
                console.log(`[AUTH PROVIDER][VERIFY_LOGIN]   Request: ${JSON.stringify(verifyLoginRequest)}`);
                return fetch(verifyLoginRequest);
            })
            .then((verifyLoginResponse) => {
                if (verifyLoginResponse.status < 200 || verifyLoginResponse.status >= 300) {
                    throw new Error(verifyLoginResponse.statusText);
                }
                return verifyLoginResponse.json();
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                updateLocalStoredTime();
            });
    }

    logout() {
        console.log(`[AUTH PROVIDER][AUTH_LOGOUT] Clearing local storage`);
        clearLocalStorage();
        return Promise.resolve();
    }

    checkAuth() {
        if (sessionExpired()) {
            console.log("[AuthProvider][AUTH_CHECK]   Session expired");
            return Promise.reject();
        }
        updateLocalStoredTime();
        return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
    }

    checkError() {
        return Promise.resolve();
    }

    getPermissions() {
        return Promise.resolve([]);
    }
}

export default new AuthProvider();
