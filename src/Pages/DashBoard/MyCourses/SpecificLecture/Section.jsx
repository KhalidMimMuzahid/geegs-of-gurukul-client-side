import React from 'react';
import style from '../SpecificLecture/SpecificLecture.module.css'
const Section = ({sector,number,urlVideo}) => {
    console.log(sector,number);
    const videoset =(url)=>{
        urlVideo(url)
    }
    return (
        <div>
            <div className= {`${style.sectionVideo}`}>
            <h4>Section {number + 1}</h4>
            {
              sector?.singleData.map(video => <button onClick={()=>videoset(video.videoLink)} className={`${style.urlVideo}`}>{video?.title}</button>)
            }
            
          </div>
        </div>
    );
};

export default Section;