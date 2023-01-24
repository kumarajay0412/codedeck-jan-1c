import React from 'react'
import LeftPaneScreen from '../Component/Home/LeftPaneScreen'
import RightPaneScreen from '../Component/Home/RightPaneScreen'
function Home() {
  return (
    <div className='grid md:grid-cols-1 lg:grid-cols-2'>
        <div className='md:w-full sm:w-full'>
            <LeftPaneScreen />
        </div>
        <div className='md:w-full sm:w-full'>
            <RightPaneScreen />
        </div>
    </div>
  )
}

export default Home