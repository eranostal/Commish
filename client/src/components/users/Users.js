import React, {Fragment, useContext, useEffect} from 'react';
import UserContext from '../../context/user/userContext';
import User from './User';

const Users = () => {

    const userContext = useContext(UserContext);

    const {users} = userContext;

    return (
        <Fragment>
            {users.map(user => (
                <User key={user.id} user={user}/>
            ))}
        </Fragment>
    )
}

export default Users;