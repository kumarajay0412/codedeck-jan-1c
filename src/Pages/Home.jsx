import React from 'react'
import LeftPaneScreen from '../Component/Home/LeftPaneScreen'
import RightPaneScreen from '../Component/Home/RightPaneScreen'
import { ModalContext } from '../Context/ModalContext'
import Modal from '../Component/Modal';
function Home() {
  const {isOpenModal} = React.useContext(ModalContext)
  return (
    <div className='grid md:grid-cols-1 lg:grid-cols-2'>
        <div className='md:w-full sm:w-full'>
            <LeftPaneScreen />
        </div>
        <div className='md:w-full sm:w-full'>
            <RightPaneScreen />
        </div>
        {console.log(isOpenModal)}
        {isOpenModal?.show && <Modal/>}
    </div>
  )
}

export default Home