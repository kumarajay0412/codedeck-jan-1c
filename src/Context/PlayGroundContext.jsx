import { createContext, useState, useEffect } from "react";
import { v4 as uuid } from 'uuid'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';


export const PlayGroundContext = createContext();

export const languageMap = {
    "cpp": {
        id: 54,
        defaultCode:
            "#include <iostream>\n"
            + "using namespace std;\n\n"
            + "int main() {\n"
            + '\tcout << "Hello World!";\n'
            + "\treturn 0;\n"
            + "}",
    },
    "java": {
        id: 62,
        defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
    },
    "python": {
        id: 71,
        defaultCode: `print("Hello World!")`,
    },
    "javascript": {
        id: 63,
        defaultCode: `console.log("Hello World!");`,
    }
}

function PlayGroundProvider({ children }) {
    const [user] = useAuthState(auth);
    const [firstLoad, setFirstLoad] = useState(true)
    const intialItems = {
        [uuid()]: {
            title: 'DSA',
            playgrounds: {
                [uuid()]: {
                    title: 'Arrays',
                    language: 'cpp',
                    code: languageMap['cpp'].defaultCode,
                }, [uuid()]: {
                    title: 'stack',
                    language: 'python',
                    code: languageMap['python'].defaultCode,
                },

            }
        }
    }

    const [folders, setFolders] = useState(() => {
        let localData = localStorage.getItem('playgrounds-data');
        if (localData === null || localData === undefined) {
            return intialItems
        }
        return JSON.parse(localData);
    })

    useEffect(() => {
        if (firstLoad && user) { //fetch dfata from firestore
            const resultRef = db.collection('usersData').doc(user.uid);
            resultRef.get().then((respose) => {
                setFolders(respose.data())
                setFirstLoad(false)
            })
        }
        if (user && !firstLoad) {
            const resultRef = db.collection('usersData').doc(user.uid)
            resultRef.set(folders).then(() => {
                console.log('data saved')
            }).catch((err) => { console.log(err) })
        }
        else {
            localStorage.setItem('playgrounds-data', JSON.stringify(folders))

        }

    }, [folders, user])

    const deleteCard = (folderId, cardId) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            delete newFolders[folderId].playgrounds[cardId];
            return newFolders;
        })
    }
    const deleteFolder = (folderId) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            delete newFolders[folderId];
            return newFolders;
        })
    }
    const addFolder = (folderName) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[uuid()] = {
                title: folderName,
                playgrounds: {}
            }
            return newFolders;
        })
    }

    const addCard = (folderId, cardName, language) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[folderId].playgrounds[uuid()] = {
                title: cardName,
                language: language,
                code: languageMap[language].defaultCode,
            }
            return newFolders;
        })
    }

    const addPlayGround = (folderId, playGroundName, language) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[folderId].playgrounds[uuid()] = {
                title: playGroundName,
                language: language,
                code: languageMap[language].defaultCode,
            }
            return newFolders;
        })
    }
    const addPlayGroundAndFolder = (folderName, playGroundName, language) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[uuid()] = {
                title: folderName,
                playgrounds: {
                    [uuid()]: {
                        title: playGroundName,
                        language: language,
                        code: languageMap[language].defaultCode,
                    }
                }
            }
            return newFolders;
        })
    }
    const editFolderTitle = (folderId, newTitle) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[folderId].title = newTitle;
            return newFolders;
        })
    }
    const editPlayGroundTitle = (folderId, playGroundId, newTitle) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[folderId].playgrounds[playGroundId].title = newTitle;
            return newFolders;
        })
    }

    const editPlayGroundCode = (folderId, playGroundId, newCode) => {
        setFolders((prev) => {
            const newFolders = { ...prev };
            newFolders[folderId].playgrounds[playGroundId].code = newCode;
            return newFolders;
        })
    }

    const PlayGroundFeatures = {
        folders: folders,
        deleteCard: deleteCard,
        deleteFolder: deleteFolder,
        addFolder: addFolder,
        addPlayGround: addPlayGround,
        addPlayGroundAndFolder: addPlayGroundAndFolder,
        editFolderTitle: editFolderTitle,
        editPlayGroundTitle: editPlayGroundTitle,
        editPlayGroundCode: editPlayGroundCode,
    }
    return (
        <PlayGroundContext.Provider value={PlayGroundFeatures}>
            {children}
        </PlayGroundContext.Provider>
    )

}
export default PlayGroundProvider;