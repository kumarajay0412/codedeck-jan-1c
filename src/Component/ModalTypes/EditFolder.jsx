import React from 'react'
import {RxCross1} from 'react-icons/rx'
import { ModalContext } from '../../Context/ModalContext'
import { PlayGroundContext } from '../../Context/PlayGroundContext'

function EditFolder() {
    const {closeModal,isOpenModal} = React.useContext(ModalContext)
    const {folders,editFolderTitle} = React.useContext(PlayGroundContext)

    const [folderTitle,setFolderTitle] = React.useState('')
    const folderId = isOpenModal.identifiers.folderId
  return (
    <div>
        <div className='flex flex-row justify-end p-4 '>
            <RxCross1 className='cursor-pointer' onClick={()=>closeModal(false)}/>
        </div>
        <div className='px-6 py-4 mb-8 flex flex-col items-center justify-center gap-6 '>
            <h2>Edit Folder</h2>
            <input type='text' 
            className='border-2 border-gray-300 rounded-md p-2 w-full text-sm' 
            placeholder='Folder Title' value={folderTitle} 
            onChange={(e)=>setFolderTitle(e.target.value)}/>

        </div>
        <button className='p-3 w-36 text-black bg-white rounded-lg font-semibold bg-darkBlue border-[0.5px] border-gray shadow-lg'
        onClick={()=>{
            editFolderTitle(folderId,folderTitle)
            closeModal(false)
        }}>
            Proceed
        </button>
        

    </div>
  )
}

export default EditFolder