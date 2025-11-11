import React from 'react'

function Loading() {
  return (
    <div className="flex items-center justify-center">
      {/* Smooth, modern circular loader */}
      <div className="h-8 w-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading
