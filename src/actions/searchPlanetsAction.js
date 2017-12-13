const searchPlanetsAction = {
    UpdatePlanetsSearch: function(results) {
        return {
            type: "UPDATE_PLANET_SEARCH",
            results,
        };
    },
};
export default searchPlanetsAction;
