import React, { useState } from 'react'
import 'react-tabs/style/react-tabs.css';
 import ticket from '../../assets/ticket/ticket.svg';

const Help = () => {
  const [ticketStatus, setTicketStatus] = useState("Create new ticket");


  return (
    <div className=" bg-[#C4F0CE] h-screen">
      <div 
      
      className='bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl pt-10'
    >

      <div className='flex justify-evenly font-poppins text-xl'>
        <button 
          onClick={()=>setTicketStatus("Create new ticket")}
          className={`${ticketStatus === "Create new ticket" && "border-b-[3px] border-[#0ABD67]"}`}
        >
          Create new ticket
        </button>

        <div className='h-10 w-[0.5px] bg-black'></div>

        <button 
          onClick={()=>setTicketStatus("Previews ticket")} className={`${ticketStatus === "Previews ticket" && "border-b-[3px] border-[#0ABD67]"}`}
        >
          Previews ticket
        </button>
      </div>

      {
        ticketStatus === "Previews ticket" && 
        <div 
          style={{ backgroundImage: `url(${ticket})` }} 
          className='flex flex-col justify-center items-center gap-y-8 h-full bg-center bg-no-repeat'
        >
          <h3 className='text-xl'>You don't have any previous ticket</h3>
          <button 
            onClick={()=>setTicketStatus("Create new ticket")}
            className='py-5 px-4 bg-[#0ABD67] text-white text-xl rounded-2xl font-semibold tracking-wide'
          >
            Create new ticket
          </button>
        </div>
      }

    </div>
    </div>
  )
}

export default Help
