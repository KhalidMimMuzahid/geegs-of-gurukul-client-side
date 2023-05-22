import React from 'react'

const EditCoupon = ({ setIsEditable, coupon }) => {
    console.log(coupon)
  return (
      <div>
          <div className="fixed inset-0 flex items-center justify-center z-[100000] bg-transparent">
          <div className="w-[60vw] h-[60vh] relative bg-green-50 rounded-md p-6 max-w-md mx-auto animate-modal-enter">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p className="mb-4">Modal content goes here...</p>
            <button
              onClick={()=>setIsEditable(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full"
            >
              X
            </button>
          </div>
        </div>
    </div>
  )
}

export default EditCoupon