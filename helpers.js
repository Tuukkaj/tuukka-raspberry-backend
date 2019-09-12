const secret = require("./secrets.json"); 

module.exports = {
    createDeparturesUrl: stop => {
        let url = new URL("http://api.publictransport.tampere.fi/prod/");
        url.searchParams.append("user", secret.user);
        url.searchParams.append("pass", secret.pass);
        url.searchParams.append("request", "stop");
        url.searchParams.append("format", "json");
        url.searchParams.append("code", stop);
        url.searchParams.append("dep_limit", 20); 
        
        return url; 
    },

    createLinesUrl: stop => {
        let url = new URL("http://api.publictransport.tampere.fi/prod/");
        url.searchParams.append("user", secret.user);
        url.searchParams.append("pass", secret.pass);
        url.searchParams.append("request", "stop");
        url.searchParams.append("format", "json");
        url.searchParams.append("code", stop);
        url.searchParams.append("dep_limit", 1);
        url.searchParams.append("time_limit", 1); 

        
        return url; 
    }, 

    getFirstTime: (data, line) => {
        let departures = data.data[0].departures
        for(let dep of departures) {
            if(dep.code == line) {
                return dep.time; 
            } else if (dep.code == line + "A" || dep.code == line + "B") {
                return dep.time; 
            }
        }
    },

    getLines: (data) => {
        return data.data[0].lines;
    },

    parseLines: (lines) => {
      const regex  = /(\w+) .+/

      return lines.map(line => {
        let match = line.match(regex);
        return match ? match[1] : null
      }).filter((item, index, thisArray) => {
        return thisArray.indexOf(item) === index && item !== null
      })
    }
}