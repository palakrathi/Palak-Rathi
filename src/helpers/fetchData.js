import fetch from "isomorphic-fetch";
export default function(value) {
    return fetch(`https://swapi.co/api/${value}`)
        .then(results => {
            return results.json();
        })
        .then(data => {
            if (value.split("/")[0] == "planets") {
                const results = {};
                results[value.split("=")[1]] = {
                    count: data.results.length,
                    results: data.results
                        .sort(function(obj1, obj2) {
                            let a = Number(obj1.population);
                            let b = Number(obj2.population);
                            if (isNaN(a)) {
                                return 1;
                            } else if (isNaN(b)) {
                                return -1;
                            }
                            return b - a;
                        })
                        .map(function(obj) {
                            return {name: obj.name, population: obj.population};
                        }),
                };
                return results;
            } else {
                return data;
            }
        });
}
