import React, {Component} from "react";

export default function(props, state) {
    if (props.SearchResults && props.SearchResults[state.key]) {
        if (props.SearchResults[state.key].count) {
            const mapped = props.SearchResults[state.key].results.map(function(key, index) {
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
