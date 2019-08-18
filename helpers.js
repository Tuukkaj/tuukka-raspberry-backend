const secret = require("./secrets.json"); 

module.exports = {
    createUrl: stop => {
        let url = new URL("http://api.publictransport.tampere.fi/prod/");
        url.searchParams.append("user", secret.user);
        url.searchParams.append("pass", secret.pass);
        url.searchParams.append("request", "stop");
        url.searchParams.append("format", "json");
        url.searchParams.append("code", stop);
        url.searchParams.append("dep_limit", 20); 
        
        return url; 
    },

    getFirstTime: (departures, line) => {
        for(let dep of departures) {
            if(dep.code == line) {
                return dep.time; 
            } else if (dep.code == line + "A" || dep.code == line + "B") {
                return dep.time; 
            }
        }
    }
}