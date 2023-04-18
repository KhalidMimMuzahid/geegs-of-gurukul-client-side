import React from 'react';
import './ProfileInfo.css'
const ProfileInfo = () => {
    
    return (
        <div className='container flex flex-col justify-center md:flex-row  md:justify-between'>
            {/* left */}
            <div className='flex items-center gap-4'>
                <div className=''>
                <img className='rounded-full w-20'  src="https://randomuser.me/api/portraits/men/75.jpg" alt="" />
                </div>
                <div className=''>
                <h5 className='font-poppins text-2xl'>Rahul Rane</h5>
                <p className='font-poppins fw-bold'>12th Grade</p>
                <p className='font-poppins'>XYZ Junior College</p>
                </div>
            </div>
            {/* Right */}
            <div className='flex flex-col'>
                <h6 className='font-poppins font-semibold'>Math Assessment Test</h6>
                <span className='font-poppins mx-32'>20 min</span>
            </div>
        </div>
    );
};

export default ProfileInfo;