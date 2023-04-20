import React, { useRef, useState } from "react";
import deos from '../../../../assets/video/2 Minute Timer.mp4'
import { BsArrowClockwise, BsArrowCounterclockwise, BsFillVolumeUpFill, BsBoundingBoxCircles } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
import style from "../../MyCourses/Courses/course.module.css";
import { AiFillSetting } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import ReactPlayer from "react-player";


const SpecificLecture = () => {
  const videoRef = useRef(null);

  const [quality, setQuality] = useState('hd');
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);

  function handleClick() {
    setButtonClicked(true);

    setTimeout(() => {
      // perform your action here
    }, 2000);
  }


  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };



  function skipForward() {
    videoRef.current.currentTime -= 2;
  }

  function skip() {
    videoRef.current.currentTime += 2;
  }

  const [showSettings, setShowSettings] = useState(false);

  function toggleSettings() {
    setShowSettings(!showSettings);
  }


  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    videoRef.current.volume = e.target.value;
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
    videoRef.current.playbackRate = parseFloat(e.target.value);
  };



  const iframeRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement === iframeRef.current);
  };

  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  document.addEventListener('fullscreenchange', handleFullScreenChange);



  return (
    <div>
      {/* <div className=" relative inline-block">
        <video ref={videoRef}  width={500} playbackRate={speed}>
          <source src='https://drive.google.com/file/d/1ORC7MQhBNZxxlPqH5BtL5sKB_L6g1GSM/view?usp=share_link' type="video/mp4" />

        </video>


        <div className={`md:flex justify-between ${style.buttonLeft}`}>
          <div className="first flex">
            <button onClick={skipForward}><BsArrowCounterclockwise></BsArrowCounterclockwise></button>
            <button onClick={togglePlay}>
              {playing ? <FaEquals className={`${style.vitcalEuual}`}></FaEquals> : <GoTriangleRight></GoTriangleRight>}
            </button>
            <button onClick={skip}><BsArrowClockwise></BsArrowClockwise></button>
            

            <button className={`${style.volume}`}>
              <span><BsFillVolumeUpFill></BsFillVolumeUpFill></span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                onChange={handleVolumeChange}
              />

            </button>
          </div>

          <div className="secent">
          <button onClick={toggleSettings}><AiFillSetting></AiFillSetting></button>
            <button className="fulls" onClick={handleFullScreen}><BsBoundingBoxCircles></BsBoundingBoxCircles></button>
          </div>
          
        </div>

        {showSettings && (
          <div className={`${style.videoSitting}`}>

            <p>Video Quality:</p>
            <select>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p>Speed:</p>
            <select value={speed} onChange={handleSpeedChange}>
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="1.75">1.75x</option>
              <option value="2">2x</option>
            </select>
          </div>
        )}




      </div>

      <div>
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
        ></iframe>

        <div className="buttonif">
          <button onClick={handleToggleFullScreen}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button onClick={handleClick}>Click me</button>

        </div>

      </div> */}



<div className="hello">

      <ReactPlayer
        url='https://vimeo.com/tompeyrat/gaucho'
        className='react-player'
        playing
        width='640px'
        height='360px'
        controls

      />
</div>






      <div className={`${style.textVideo} `}>
        <h2 >Figma UI Design Tutorial: Get Started in Just 24 Minutes!</h2>

        <p>Do you want to learn Figma but don’t know where to start? Well, if you follow this step-by-step tutorial, it will only take you 24 minutes to learn all the basics you need to know to start designing apps and websites in Figma.</p>
      </div>
    </div>
  );
};

export default SpecificLecture;
