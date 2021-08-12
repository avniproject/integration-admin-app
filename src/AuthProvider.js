import _ from 'lodash';
import AppConfig from "./AppConfig";

class AuthProvider {
    login({username, password}) {
        let postObject = {email: username, password: password};

        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");


        const request = new Request(`${AppConfig.dataProviderUrl}/login`, {
            method: 'POST',
            body: formBody,
            headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
        });

        const verifyLoginRequest = new Request(`${AppConfig.dataProviderUrl}/currentUser`, {
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
            }).then((user) => {
                localStorage.setItem("user", user);
            });
    }

    logout() {
        console.log("AuthProvider.logout");
        localStorage.removeItem("user");
        return fetch(new Request(`${AppConfig.dataProviderUrl}/logout`, {
            method: 'GET'
        })).catch(() => {});
    }

    checkAuth() {
        console.log("AuthProvider.checkAuth");
        return localStorage.getItem("user") ? Promise.resolve() : Promise.reject();
    }

    checkError(error) {
        console.log("AuthProvider.checkError", error.status);
        const status = error.status;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    }

    getPermissions() {
        console.log("AuthProvider.getPermissions");
        return Promise.resolve([]);
    }
}

export default new AuthProvider();
