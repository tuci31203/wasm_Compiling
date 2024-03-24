import { useEffect, useRef, useState } from 'react'
import Message from "./components/Message"
import { Editor } from '@monaco-editor/react'
import runWasm from './runWasm'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const App = () => {
  const [compiled, setCompiled] = useState(false)
  // const [code, setCode] = useState('')
  const editorRef = useRef(null)
  const [inputValue, setInput] = useState('')
  const [output, setOutput] = useState('')
  const defaultMess = {
    message: '✨✨✨',
    type: 0,
  }
  const [message, setMessage] = useState(defaultMess)

  // useEffect(() => {
  //   setCompiled(false)
  // }, [])


  const handleCompile = async (e) => {
    e.preventDefault()
    setCompiled(false)
    setMessage(defaultMess)
    setOutput('')
    // console.log('Clicked')
    const code = editorRef.current.getValue()
    if (!code) return
    try {
      const response = await fetch('http://localhost:3000/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: code
      })
      const data = await response.json()
      console.log(data.EM)
      if (data) {
        if (+data.EC === 0) {
          setCompiled(true)
          setMessage({ message: data.EM, type: 2 })
        } else {
          setMessage({ message: data.DT, type: 1 })
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleRun = (e) => {
    e.preventDefault()
    if (compiled) { runWasm({ inputValue, setOutput }) }

  }


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  }


  return (
    <>
      <div className="bg-black" style={{ height: '60dvh' }} >

        <Editor

          height="100%"
          width="100%"
          // className='shadow-md shadow-purple-900'
          language="cpp"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            inlineSuggest: true,
            fontSize: "16px",
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { scale: 1 }
          }}
        />
        {/* <textarea value={code} onChange={(e) => setCode(e.target.value)} cols="30" rows="10"></textarea> */}





        <div className="bottomPart pl-4 flex gap-4 bg-white" style={{ height: '40dvh' }} >
          <div className="BtnNMs flex-1 flex flex-col justify-center gap-5">

            <div className="buttons flex gap-4 items-center flex-wrap">
              <div
                onClick={(e) => handleCompile(e)}
                className={"w-fit shadow-md shadow-purple-400 h-10 px-2 rounded-lg bg-blue-600 flex items-center text-white font-bold border-2 border-blue-300 hover:cursor-pointer hover:h-12 hover:px-4 hover:text-xl transition-all hover:bg-orange-100 hover:border-orange-300 hover:text-orange-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300"
                }
              >Compile</div>

              <div
                onClick={(e) => handleRun(e)}
                className={
                  "w-fit shadow-md shadow-purple-400 h-10 px-2 rounded-lg bg-green-600 flex items-center text-white font-bold border-2 border-green-300 hover:cursor-pointer hover:h-12 hover:px-4 hover:text-xl transition-all hover:bg-pink-100 hover:border-pink-300 hover:text-pink-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300"
                }
              >Run</div>

              <Message message={message.message} type={message.type} />
            </div>
            <div className="txtarea">
              <textarea
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
                className="rounded-lg w-full ring ring-blue-200 p-2.5 shadow-lg shadow-purple-400"
                name="input" id="input" rows="10">
              </textarea>
              <svg
                onClick={() => setInput('')}
                className='w-10 h-10 icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
            </div>
            {/* <Input value={inputValue} setInput={setInput} /> */}

          </div>
          <textarea
            readOnly
            value={output}
            className="bg-black flex-1 w-full text-white text-xl p-3 "
            name="output" id="output" rows="14"></textarea>

        </div>

        {/* <textarea id="cppCode" rows="10" cols="80"></textarea>
      <button id="compileButton">Compile</button>
      <div id="compileMessage"></div>
      <textarea id="inputValue" rows="10" cols="80"></textarea>
      <button id="run">run</button>
      <div id="result"></div> */}
      </div>
    </>
  )
}

export default App
