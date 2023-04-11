import React from 'react';
import './AreaOfImprovement.css'
import ProgressbarCir from '../../../../Components/ProgressbarCir/ProgressbarCir';
const AreaOfImprovement = () => {
    return (
        <div>
            <div className='my-24'>
                <h4 className='font-poppins text-2xl font-medium mb-16'>Areas of Improvement :</h4>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="md:mb-20">
                            <div className="areaOfImprovement-bar">
                                <p className='font-poppins text-center font-medium mb-8'>Time Mangement</p>
                                <ProgressbarCir percentage={70}></ProgressbarCir>
                            </div>
                        </div>
                        <div className="sm:mb-20">
                            <div className="areaOfImprovement-bar">
                                <p className='font-poppins text-center font-medium mb-8'>Grammer</p>
                                <ProgressbarCir percentage={75}></ProgressbarCir>
                            </div>
                        </div>
                        <div className="md:mb-20">
                            <div className="areaOfImprovement-bar">
                                <p className='font-poppins text-center font-medium mb-8'>Critical Thinking</p>
                                <ProgressbarCir percentage={72}></ProgressbarCir>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaOfImprovement;