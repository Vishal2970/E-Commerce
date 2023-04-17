import React from 'react';
import { json } from 'react-router-dom';
const ProfilePage= ()=>{
    let result=localStorage.getItem('user');
    result=JSON.parse(result);
    
    return (
        
        <div className='profile-div ' >
            <h1> User Profile</h1>
            <ul >
                <li className='user-detail'>NAME :- {result.name.toUpperCase()}</li>
                <li className='user-detail'>EMAIL-ID :- {result.email}</li>
                <li className='user-detail'>USER-ID :- {result._id}</li>
            </ul>
        </div>
    
    )
}
export default ProfilePage;