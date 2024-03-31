import { useEffect, useRef, useState } from 'react'
import Message from "./components/Message"
import { Editor } from '@monaco-editor/react'
import runWasm from './runWasm'
import './index.css'



const App = () => {
  const [compiled, setCompiled] = useState(false)
  const [light, setLight] = useState(true)
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
    setOutput('')
    if (compiled) { runWasm({ inputValue, setOutput }) }

  }


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  }


  return (
    <>
      <div className={`${light ? "bg-white" : "bg-black"} h-[100dvh]`} >

        <div className="h-[59dvh] topPart">
          <Editor
            height="100%"
            width="100%"
            className='editor'
            // className='shadow-md shadow-purple-900'
            language="cpp"
            theme={light ? "vs" : "vs-dark"}
            onMount={handleEditorDidMount}
            options={{
              inlineSuggest: true,
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { scale: 1 }
            }}
          />
          <svg onClick={() => setLight(light => !light)} className="light w-[25px] h-[25px] hover-hover:hover:w-[30px] hover-hover:hover:h-[30px] hover-hover:hover:cursor-pointer hover-hover:hover:fill-yellow-400 hover-hover:hover: active:animate-spin active:fill-orange-500 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" /></svg>

        </div>
        {/* <textarea value={code} onChange={(e) => setCode(e.target.value)} cols="30" rows="10"></textarea> */}





        <div className={`${light ? "bottomPartLight" : "bottomPart"} pl-4 flex gap-4 sm:h-[40dvh]`} >
          <div className="BtnNMs flex-1 flex flex-col justify-center gap-5 h-full">

            <div className="buttons flex gap-4 items-center flex-wrap">
              <div
                onClick={(e) => handleCompile(e)}
                className={"w-fit shadow-md shadow-purple-400 h-10 px-2 rounded-lg bg-blue-600 flex items-center text-white font-bold border-2 border-blue-300 hover-hover:hover:cursor-pointer hover-hover:hover:h-12 hover-hover:hover:px-4 hover-hover:hover:text-xl transition-all hover-hover:hover:bg-orange-100 hover-hover:hover:border-orange-300 hover-hover:hover:text-orange-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300"
                }
              >Compile</div>

              <div
                onClick={(e) => handleRun(e)}
                className={
                  "w-fit shadow-md shadow-purple-400 h-10 px-2 rounded-lg bg-green-600 flex items-center text-white font-bold border-2 border-green-300 hover-hover:hover:cursor-pointer hover-hover:hover:h-12 hover-hover:hover:px-4 hover-hover:hover:text-xl transition-all hover-hover:hover:bg-pink-100 hover-hover:hover:border-pink-300 hover-hover:hover:text-pink-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300"
                }
              >Run</div>

              <Message message={message.message} type={message.type} />
            </div>
            <div className="txtarea h-full">
              <textarea
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
                className="rounded-lg w-full ring ring-blue-200 p-2.5 shadow-lg shadow-purple-400 h-full"
                id="input" >
              </textarea>
              <svg
                onClick={() => setInput('')}
                className='w-10 h-10 icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
            </div>


          </div>
          <textarea
            readOnly
            value={output}
            className={`${light ? "bg-white flex-1 w-full text-black border-[3px] border-blue-200 rounded-lg text-xl p-3 shadow-lg shadow-purple-400" : "bg-black flex-1 w-full text-white text-xl p-3"} h-full`}
            id="output" ></textarea>

        </div>

      </div>
    </>
  )
}

export default App
