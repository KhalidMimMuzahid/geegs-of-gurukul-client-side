import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalForAlert = ({
  alertMessage = "",
  modalIsOpenTemp = false,
  isForEmailVerification = false,
  setModalForAlertCom,
}) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpenTemp}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" ">
          <h2 className="hidden" ref={(_subtitle) => (subtitle = _subtitle)}>
            Hello
          </h2>
          <h1 className="text-lg font-semibold">{alertMessage}</h1>
          {isForEmailVerification ? (
            <div className="w-full  justify-end">
              <button
                className=" w-full flex justify-end"
                onClick={() => {
                  setModalForAlertCom(null);
                }}
              >
                <a
                  className="px-4 mt-2   py-1 rounded-lg text-right text-xl font-semibold   bg-green-300 hover:cursor-pointer hover:bg-green-400"
                  href="https://mail.google.com/mail/u/0/#inbox"
                  target="_blank"
                >
                  Open Email
                </a>
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end">
              <button
                className="px-4 mt-2   py-1 rounded-lg text-right text-xl font-semibold   bg-green-300 hover:cursor-pointer hover:bg-green-400"
                onClick={() => {
                  setModalForAlertCom(null);
                }}
              >
                Ok
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalForAlert;

//  <div>
// <Modal
//   isOpen={modalIsOpen}
//   onAfterOpen={afterOpenModal}
//   onRequestClose={closeModal}
//   style={customStyles}
//   contentLabel="yourAppElement"
// >
//   <div>
//     <button onClick={() => setIsOpen(true)}>Open Modal</button>
//     {/* <h1>{alertMessage}</h1> */}
//     {/* {isForEmailVerification ? ( */}
//     <div>
//       <button onClick={setIsOpen(false)}>
//         <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
//           Open Email
//         </a>
//       </button>
//     </div>
//     {/* ) : (
//       <div>
//         <button onClick={setIsOpen(false)}>Ok</button>
//       </div>
//     )} */}
//   </div>
// </Modal>
// </div>

// {/* <div>
// {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
// <Modal
//   isOpen={modalIsOpen}
//   onAfterOpen={afterOpenModal}
//   onRequestClose={closeModal}
//   style={customStyles}
//   contentLabel="Example Modal"
// >
//   <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
//   {/* <button onClick={closeModal}>close</button> */}
//   <div>I am a modal</div>
//   <form>
//     <input />
//     <button>tab navigation</button>
//     <button>stays</button>
//     <button>inside</button>
//     <button>the modal</button>
//   </form>
// </Modal>
// </div> */}
