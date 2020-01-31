import React from 'react';
import PropTypes from 'prop-types';

const Header = ({title, icon}) => {
    return (
        <header>
            <h1>{title} <span className='beta'>beta</span></h1>
            <form className='search'>
                <input type='text' placeholder='Search For An Artist Or Style Here'/>
            </form>
            <div className='login-buttons'>
                <a className='login' href='#'>Login</a>
                <a className='register' href='#'>Register</a>
            </div>
        </header>
    )
}

export default Header

//Define proptypes.
Header.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

//Define default values for props
Header.defaultProps = {
    title: 'Commish',
    icon: ''
}