import {
    AsyncStorage,
    Alert
} from 'react-native';



class Http {

    /**
    * options: {
    *  url,
    *  params
    * }
    */
    _jsonToQueryString(json) {
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }).join('&');
    }
    async get(options) {
        const { url,
                params,
                headers } = options;
        let newParms = Object.assign({},params);
        const paramsString = this._jsonToQueryString(newParms);
        const URL = `${url}${paramsString}`;
        console.log(URL)
        let response;
        try {
            response = await fetch(URL);
            let json = await response.json();
            return json
        }catch(error) {

            Alert.alert('',
                `网络异常，请重试`
            );
            return {
                code: -999,
                message: '网络异常，请重试'
            }
        }
    }

    async post(options) {
        const {
            url,
            params,
            headers
        } = options;
        let newParms = Object.assign(params);
        const URL = `${url}`;
        let response;
        try {
            response = await fetch(URL,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(newParms)
                });
            let json = await response.json();

            return json
        }catch(error) {

                Alert.alert('',
                    `网络异常，请重试`
                );
            return {
                code: -999,
                message: '网络异常，请重试'
            }
        }
    }
}

const http = new Http();

export default http;
