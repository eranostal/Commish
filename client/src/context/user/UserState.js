//useReducer gives us access to state and dispatch
import React, {useReducer} from 'react';
import uuid from 'uuid';
//Why is userReducer lowercase?
import UserContext from './userContext';
import userReducer from './userReducer';
import {GRAB_ARTISTS} from '../types';

const UserState = props => {

    const initialState = {
        users: [
            {
                id: 1,
                userName: 'RishoGhost',
                email: 'eranostal@gmail.com',
                thumbnailGallery: ['/client/src/img/pittsburgh.jpg']
            },
            {
                id: 2,
                userName: 'knova586',
                email: 'knova586@hotmail.com',
                thumbnailGallery: ['/client/src/img/pittsburgh.jpg']
            } 
        ]
    };

    //This allows us to use anything in our state and "dispatch" allows us to dispatch to the reducer.
    const [state, dispatch] = useReducer(userReducer, initialState);


    //STATES
    //Grab Artists


    return (
        <UserContext.Provider
        value={{
            users: state.users
        }}>
            {props.children}
        </UserContext.Provider>   
    );

};

export default UserState;