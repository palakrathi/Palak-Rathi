import React, {Component} from "react";
import "../css/app.css";

export default function(props) {
    if (props.searchResults) {
        if (props.searchResults.count) {
            const mapped = props.searchResults.results.map(function(key, index) {
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
            return <tbody>No Result found!</tbody>;
        }
    } else {
        return <div />;
    }
}
