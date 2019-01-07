
export function fetchJson(uri, options={}){
    let status;
    console.log(`Fetching ${options.method || 'GET'} from `, uri);
    return fetch(uri, options)
        .then(res => {
            console.log(res.status);
            status = res.status;
            if (res.headers.get('content-type').indexOf('json') !== -1){
                return res.json();
            }
            if (res.headers.get('content-type').indexOf('text') !== -1){
                return res.text();
            }
        })
        .then(res => {
            //console.log(res);
            if (status >= 200 || status <= 299) return res;
            return {
                status,
                ...res
            };
        })
        .catch(err => {
            console.log("Networking error", "Error with resource at "+uri);
            console.log(err);
        })
}