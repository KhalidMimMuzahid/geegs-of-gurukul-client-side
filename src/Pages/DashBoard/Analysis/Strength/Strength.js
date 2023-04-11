import React from 'react';
import ProgressbarCir from '../../../../Components/ProgressbarCir/ProgressbarCir';
import './Strength.css'
const Strength = () => {
    return (
        <div className='streangth-container'>
            <h4 className='font-poppins text-2xl font-medium'>Strength :</h4>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="col-md-4">
                        <div className="circular-bar">
                            <p className='font-poppins font-medium text-center mb-8'>Math</p>
                            <ProgressbarCir percentage={90}></ProgressbarCir>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="circular-bar">
                            <p className='font-poppins font-medium text-center mb-8'>Proofreading</p>
                            <ProgressbarCir percentage={85}></ProgressbarCir>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="circular-bar">
                            <p className='font-poppins font-medium text-center mb-8'>Data Analysis</p>
                            <ProgressbarCir percentage={80}></ProgressbarCir>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Strength;