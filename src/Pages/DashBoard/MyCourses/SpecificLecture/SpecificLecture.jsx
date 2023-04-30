import React, { useRef, useState } from "react";

import style from "../../MyCourses/Courses/course.module.css";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styles from './SpecificLecture.module.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import figma from '../../../../assets/dashBoardIcon/figma.svg'
import Section from "./Section";

const SpecificLecture = () => {
  // video url
  const [videourl, setVideourl]= useState('https://vimeo.com/tompeyrat/gaucho')

  const videoData = [
    {
      singleData: [
        { title: 'Using The Paint Brush sing The Paint Brush', videoLink :  'https://vimeo.com/tompeyrat/gaucho'},
        { title: 'Paint Using The Paint ', videoLink :  'https://vimeo.com/801818003' },
        { title: ' Brush sing The Paint Brush', videoLink :  'https://vimeo.com/805412923' },
      ]
    },
    {
      singleData: [
        { title: 'Using The Paint Brush sing The Paint Brush', videoLink :  'https://vimeo.com/tompeyrat/gaucho'},
        { title: 'Paint Using The Paint ', videoLink :  'https://vimeo.com/801818003' },
        { title: ' Brush sing The Paint Brush', videoLink :  'https://vimeo.com/805412923' },
      ]
    },
    {
      singleData: [
        { title: 'Using The Paint Brush sing The Paint Brush', videoLink :  'https://vimeo.com/tompeyrat/gaucho'},
        { title: 'Paint Using The Paint ', videoLink :  'https://vimeo.com/801818003' },
        { title: ' Brush sing The Paint Brush', videoLink :  'https://vimeo.com/805412923' },
      ]
    },

  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-7 pt-4 px-5">
        <div className="hello md:col-span-3" >
          <ReactPlayer
            url={videourl}
            className="react-player"
            playing
            width="100%"
            height="360px"
            controls
          />

          <div className={`${style.textVideo} `}>
            <h2>Figma UI Design Tutorial: Get Started in Just 24 Minutes!</h2>

            <p>
              Do you want to learn Figma but don’t know where to start? Well, if
              you follow this step-by-step tutorial, it will only take you 24
              minutes to learn all the basics you need to know to start
              designing apps and websites in Figma.
            </p>

            <div className="figma">
              <img src={figma} alt="" />
              <span>Design Master</span>
            </div>

            <div >

              <Tabs className={`${styles.videtab}`}>
                <TabList>
                  <Tab>Notes</Tab>
                  <Tab>Assignment</Tab>
                </TabList>

                <TabPanel>
                  <p>
                    Do you want to learn Figma but don’t know where to start?
                    Well, if you follow this step-by-step tutorial, it will only
                    take you 24 minutes to learn all the basics you need to know
                    to start designing apps and websites in Figma.In this Figma
                    tutorial for beginners, UX designer Amr guides you through
                    Figma’s interface and tools following a very valuable
                    principle to start mastering this tool. “If you want to learn
                    the basics, you should copy other designs”.Do you have more
                    questions about Figma or the next steps you should take? Leave
                    them in the comments below ⬇️✅ If you want to learn about
                    facilitation and workshopping join our FREE FACILITATION
                    COMMUNITY where hundreds of workshop facilitators gather to
                    share their resources, insights and experiences 👉{" "}
                  </p>

                  <div className= {`${styles.discount}`}>
                    <h3>Discussion</h3>

                    <form>
                      <input type="text" />
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className= {`${styles.warBox}`}>
                    <div className= {`${styles.nameAssement}`}>
                      <p>Name</p>
                      <p>Progress </p>
                    </div>
                    <div className= {`${styles.singleAssment}`}>
                      <div className={`${styles.AssmentCss}`}>
                        <p>CSS : Pyspark Evaluation</p>
                        <p>Date: 17 Apr, Time: 10:00 pm - 12 pm</p>
                      </div>
                      <button>In process</button>
                    </div>
                    <div className={`${styles.singleAssment}`}>
                      <div className={`${styles.AssmentCss}`}>
                        <p>CSS : Pyspark Evaluation</p>
                        <p>Date: 17 Apr, Time: 10:00 pm - 12 pm</p>
                      </div>
                      <button className={`${styles.green}`}>Completed</button>
                    </div>
                    <div className={`${styles.singleAssment}`}>
                      <div className={`${styles.AssmentCss}`}>
                        <p>CSS : Pyspark Evaluation</p>
                        <p>Date: 17 Apr, Time: 10:00 pm - 12 pm</p>
                      </div>
                      <button className={`${styles.green}`}>Completed</button>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="videoUrl">
          <h3>Course content</h3>

          {videoData?.map((section, i) => (
            <Section
              urlVideo={setVideourl}
              number={i}
              sector={section}
              key={i}
            ></Section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificLecture;
