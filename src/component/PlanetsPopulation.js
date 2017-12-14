import React from "react";
import "../css/app.css";

export default function({results}) {
    if (results && results.count) {
        const mapped = results.results.map(function(key, index) {
            let cname = `f${index}`;
            return (
                <tr key={index} className={cname}>
                    <td>{key.name}</td>
                    <td>{key.population}</td>
                </tr>
            );
        });
        const thead = (
            <tr>
                <th>Planet</th>
                <th>Population</th>
            </tr>
        );
        return [thead, mapped];
    } else {
        if (results) {
            return <tbody>No Result found!</tbody>;
        } else {
            return null;
        }
    }
}
