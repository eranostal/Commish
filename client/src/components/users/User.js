import React from 'react';


const User = ({user: {userName, email, thumbnailGallery}}) => {

    return (
        <div className='card-holder'>
            <div className='card2'>
                <div className='inner'>
                    <div className='name'>
                        <h2><img src={thumbnailGallery[0]}/></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;