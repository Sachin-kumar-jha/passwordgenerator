import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {

  let [length, setLength] = useState(8);
  let [numberAllowed, setAllowed] = useState(false);
  let [charAllowed, setCharallowed] = useState(false);
  let [password, setPassword] = useState("");
  

  
  //useRef
  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+-={}[];'<>,.?/~";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed]);

   const copyPasswordToClipboard = useCallback(() => {
    let btn= document.getElementById("copy");
    btn.innerText="copied";
   setTimeout(()=>{
   btn.innerText="copy"
   },1000)
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0, 999);
     window.navigator.clipboard.writeText(password);
  
 }
 , [password]) 



  useEffect(() => {
    generatePassword();
   
  }, [length, numberAllowed, charAllowed, generatePassword]);



  return (
    <>
      <div className="main flex justify-center items-center w-full min-h-screen bg-zinc-900 overflow-hidden">
        <div className="container flex flex-col justify-center items-center sm:p-0 flex-wrap sm:w-1/2 h-[15rem] rounded-xl bg-gray-600 ">
          <h1 className='text-3xl py-6 font-bold text-white'>Password generator</h1>
          <div className="input  w-full text-center">
            <input value={password} className='w- border-none outline-none px-4 py-2 rounded-r-0 rounded-l-md' ref={passwordRef} />
            <button id='copy'  className='button bg-blue-700 rounded-l-0 rounded-r-md p-2 outline-none' onClick={copyPasswordToClipboard}>copy</button>
          </div>

          <div className='flex flex-row xsm:flex-col gap-3 mt-2 text-white'>
            <input type='range' min={6} max={100} name='range' onChange={(e) => { setLength(e.target.value) }}></input>
            <label name="range">length:{length}</label>
            <input type='checkbox' defaultChecked={numberAllowed} name='check' onChange={() => { setAllowed((prev) => !prev) }}></input>
            <label name="check">number</label>
            <input type='checkbox' defaultChecked={charAllowed} name='char' onChange={() => {
              setCharallowed((prev) => !prev)
            }}></input>
            <label name="char">character</label>
          </div>
        </div>
      </div>

    </>
  )
}


export default App
