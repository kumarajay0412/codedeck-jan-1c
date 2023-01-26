import React from 'react'
import NavBar from '../Component/Playground/NavBar'
import EditContainer from '../Component/Playground/EditContainer'
import axios from "axios"
import InputConsole from '../Component/Playground/InputConsole'
import OutputConsole from '../Component/Playground/OutputConsole'
import { Buffer } from 'buffer'
import Modal from '../Component/Modal';
import { useParams } from 'react-router-dom'
import { ModalContext } from '../Context/ModalContext'
import { PlayGroundContext, languageMap } from '../Context/PlayGroundContext'
import { useNavigate } from 'react-router-dom';
function Playground() {
  const navigate = useNavigate();
  const { folderId, playgroundId } = useParams();
  const { openModal, isOpenModal, closeModal } = React.useContext(ModalContext);
  const { folders, savePlayground } = React.useContext(PlayGroundContext);
  const { title, language, code } = folders[folderId].playgrounds[playgroundId];

  const [currentLanguage, setCurrentLanguage] = React.useState(language);
  const [currentCode, setCurrentCode] = React.useState(code);
  const [currentOutput, setCurrentOutput] = React.useState("");
  const [currentInput, setCurrentInput] = React.useState("");
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage);
  }


  const enCode = (data) => {
    return Buffer.from(data, "binary").toString("base64")
  }
  const deCode = (data) => {
    return Buffer.from(data, "base64").toString()
  }

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '298dc37bc4msh976681f74d3a7f2p1d7994jsn916f1cce26fe',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({ language_id: language_id, source_code: source_code, stdin: stdin })
    };
    const response = await axios.request(options);
    return response?.data?.token;
  }

  const getOutput = async (token) => {

    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': '298dc37bc4msh976681f74d3a7f2p1d7994jsn916f1cce26fe',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    // call the api to get status of our token 

    const response = await axios.request(options);
    if (response.data.status_id <= 2) {
      const response2 = await axios.request(options);
      return response2.data;
    }
    return response.data;
  }

  const runCode = async () => {

    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: "",
        playgroundId: "",
      }
    })

    const language_id = languageMap[currentLanguage];
    const source_code = enCode(currentCode);
    const stdin = enCode(currentInput);

    // post the code to the api and get the token
    const token = await postSubmission(language_id, source_code, stdin);

    // get the output from the api using the token
    const res = await getOutput(token);

    const status_name = res.status.description;
    const decoded_output = deCode(res.stdout ? res.stdout : "");
    const decoded_compile_output = deCode(res.compile_output ? res.compile_output : "");
    const decoded_error = deCode(res.stderr ? res.stderr : "");

    let final_ouput = "";
    if (res.status_id !== 3) {
      if (decoded_compile_output === "") {
        final_ouput = decoded_error;
      }
      else {
        final_ouput = decoded_compile_output;
      }
    }

    else {
      final_ouput = decoded_output;
    }
    setCurrentCode(status_name + "\n" + final_ouput);
    closeModal();
  }
  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(
        input.files[0], setState
      );
    }
  }
  const placeFileContent = (file, setState) => {
    readFileContent(file).then(content => {
      setState(content);
    }).catch(error => console.log(error));
  }
  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }



  return (
    <div>
      <NavBar isFullScreen={isFullScreen} />
      <div className="flex flex-col lg:flex-row h-full ">
        <div className={`${isFullScreen ? "w-full" : "w-full lg:w-3/4"}`}>
          <EditContainer
            title={title}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            folderId={folderId}
            playgroundId={playgroundId}
            saveCode={saveCode}
            runCode={runCode}
            getFile={getFile}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />

        </div>
        {
          !isFullScreen &&
          <div className="w-full lg:w-1/4">
            <InputConsole
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              getFile={getFile} />
            <OutputConsole
              currentOutput={currentOutput}
            />
          </div>
        }
      </div>
      {isOpenModal.show && <Modal />}
    </div>
  )
}

export default Playground