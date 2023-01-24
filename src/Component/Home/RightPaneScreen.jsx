import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import playground from '../../Pages/Playground';
import Card from '../Card';
function RighPaneScreen() {
  return (
    <div className='h-screen p-8'>
      <div className='flex justify-between placeholder:mt-8 items-center'>
        <h1> My <span className='font-semibold text-3xl'>PlayGround</span></h1>
        <h3><span className='font-semibold text-2xl'>+</span> New Folder</h3>
      </div>
      <hr className='mb-12 mt-4 bg-black' />
      <div className='flex-col flex my-8'>
        <div className='flex justify-between items-center  placeholder:mt-8 '>
          <div className='flex gap-4 items-center'>
            <FcOpenedFolder size={'2em'} />
            <h5 className='font-semibold'>Title</h5>
          </div>
          <div className='flex gap-4 items-center'>
            <BiEditAlt size={'1.4em'} />
            <IoTrashOutline size={'1.4em'} />
            <h5 className='font-semibold'>+ <span>{" "}New playground</span></h5>
          </div>
        </div>
      </div>
      <hr className='mb-12 mt-4 bg-black' />
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <img src="/logo-small.png" />
              <div>
                <h5>Title dummy</h5>
                <h5>C++</h5>
              </div>

            </div>
            <div className='flex gap-4 items-center '>
              <BiEditAlt size={'1.4em'} />
              <IoTrashOutline size={'1.4em'} />
            </div>
          </div>
        </Card>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <img src="/logo-small.png" />
              <div>
                <h5>Title dummy</h5>
                <h5>C++</h5>
              </div>

            </div>
            <div className='flex gap-4 items-center '>
              <BiEditAlt size={'1.4em'} />
              <IoTrashOutline size={'1.4em'} />
            </div>
          </div>
        </Card>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <img src="/logo-small.png" />
              <div>
                <h5>Title dummy</h5>
                <h5>C++</h5>
              </div>

            </div>
            <div className='flex gap-4 items-center '>
              <BiEditAlt size={'1.4em'} />
              <IoTrashOutline size={'1.4em'} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default RighPaneScreen