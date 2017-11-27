import fetch from 'isomorphic-fetch';

export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_FAILURE='LOGIN_FAILURE';
export function loginSuccess(name){
    return{
        type:LOGIN_SUCCESS,
        verify:true,
        name,
    }
}
export function loginFailure(errorMsg){
    return{
        type:LOGIN_FAILURE,
        verify:false,
        error:errorMsg,
    }
}
export function validateUser(event){
    event.preventDefault();
    let name=event.target[0].value;
    let password=event.target[1].value;
    return function(dispatch){
        return fetch(`https://swapi.co/api/people/?search=${name}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                //console.log(data);
                if(data.results.length===0){
                    dispatch(loginFailure('Name not found!'));
                }
                else{
                    let UserName = data.results[0].name;
                    let BirthYear = data.results[0].birth_year;
                    if (name===UserName ) {
                        if(password===BirthYear){
                            dispatch(loginSuccess(UserName));
                        }
                        else {
                            dispatch(loginFailure('Incorrect Password!'));
                        }
                    } else {
                        dispatch(loginFailure('Name not found!'));
                    }
                }

            })
            //.catch(err=>{
        //console.log(err);
    }
}
