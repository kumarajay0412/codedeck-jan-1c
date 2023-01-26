import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import playground from '../../Pages/Playground';
import Card from '../Card';
import { ModalContext } from '../../Context/ModalContext';
import { PlayGroundContext } from '../../Context/PlayGroundContext';
import { useNavigate } from 'react-router-dom';
function RighPaneScreen() {
  const navigate = useNavigate();
  const { openModal } = React.useContext(ModalContext)
  const { folders, deleteFolder, deleteCard } = React.useContext(PlayGroundContext)
  return (
    <div className='h-screen p-8 overflow-y-auto relative'>
      <div className='flex justify-between placeholder:mt-8 items-center'>
        <h1> My <span className='font-semibold text-3xl'>PlayGround</span></h1>
        <h3 onClick={() =>
                  openModal({
                    show: true,
                    modalType: 1,
                    identifiers: {
                      folderId: "",
                      cardId: "",
                    }
                  })
                }><span className='font-semibold text-2xl'  >+</span> New Folder</h3>
      </div>
      <hr className='mb-12 mt-4 bg-black' />
      {
        folders && Object.entries(folders).map(([folderId, folder]) => (
          <div className='flex-col flex my-8'>
            <div className='flex justify-between items-center  placeholder:mt-8 '>
              <div className='flex gap-4 items-center'>
                <FcOpenedFolder size={'2em'} />
                <h5 className='font-semibold'>{folder.title}</h5>
              </div>
              <div className='flex gap-4 items-center' onClick={(e) => {
                e.stopPropagation(); //stop click propagation from child to parent
              }}>
                <BiEditAlt size={'1.4em'} onClick={() =>
                  openModal({
                    show: true,
                    modalType: 4,
                    identifiers: {
                      folderId: "folderId",
                      cardId: "",
                    }
                  })
                } />
                <IoTrashOutline size={'1.4em'} onClick={() => deleteFolder(folderId)} />
                <h5 className='font-semibold' onClick={() =>
                  openModal({
                    show: true,
                    modalType: 2,
                    identifiers: {
                      folderId: folderId,
                      cardId: "",
                    }
                  })
                } >+ <span>{" "}New playground</span></h5>
              </div>
            </div>
            <hr className='mb-12 mt-4 bg-black' />
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
              {
                Object.entries(folder["playgrounds"]).map(([playgroundId, playground]) => (<>

                  <Card >
                    <div onClick={(e)=>{
                          e.stopPropagation(); //stop click propagation from child to parent
                          console.log(folderId, playgroundId)
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }}className='flex items-center justify-between'>
                      <div className='flex gap-4 items-center'>
                        <img src="/logo-small.png" />
                        <div>
                          <h5>{playground.title}</h5>
                          <h5>Language: {playground.language}</h5>
                        </div>

                      </div>
                      <div className='flex gap-4 items-center ' onClick={(e) => {
                        e.stopPropagation(); //stop click propagation from child to parent
                      }}>
                        <BiEditAlt size={'1.4em'} onClick={() =>
                          openModal({
                            show: true,
                            modalType: 5,
                            identifiers: {
                              folderId: folderId,
                              cardId: playgroundId,
                            }
                          })
                        } />
                        <IoTrashOutline size={'1.4em'} onClick={() => deleteCard(folderId, playgroundId)} />
                      </div>
                    </div>
                  </Card>
                </>))
              }
            </div>


          </div>





        ))

      }






    </div>
  )
}

export default RighPaneScreen