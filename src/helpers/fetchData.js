import fetch from "isomorphic-fetch";
export default function(value) {
    return fetch(`https://swapi.co/api/${value}`);
}
