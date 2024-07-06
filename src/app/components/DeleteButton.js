import { useState } from "react"

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center ">
      
        <div className="bg-white p-4 rounded-lg h-32 w-60">
        <h4>Are you Sure to Delete??</h4>
        <div className="flex gap-2 mt-1">
          <button type='button' onClick={() => setShowConfirm(false)}>Cancel</button>
          <button onClick={()=>{onDelete();setShowConfirm(false)}} type='button' className="primary">Yes,Delete</button>
        </div>
      </div>
      </div>

    )
  }
  return (
    <button type='button' onClick={() => setShowConfirm(true)}>{label}</button>
  )
}

export default DeleteButton