import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "01234567890123456789";
    if (characterAllowed) str += "!@#$%^&*+=?~!@#$%^&*+=?~";
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]); //memoize

  useEffect(() => {
    passwordGenerator()
   },
  [length, numberAllowed, characterAllowed,setPassword])//dependencies

  //  useRef hook :

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  };
  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-2 my-10 text-orange-500 bg-gray-700 whitespace-nowrap">
        <h1 className="text-center text-white my-3 text-2xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-2 px-4 text-lg cursor-not-allowed' placeholder='Password' readOnly ref={passwordRef}/>
          <button className='bg-blue-700 py-3 px-4 text-white' onClick={
            copyPasswordToClipboard
        }>Copy</button>
        </div>
        <div className="flex justify-around text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input id='range' type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => {
              setLength(e.target.value)
            }}/>
            <label htmlFor="range">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id='numberAllowed' defaultChecked={numberAllowed} onChange={() => {
              setNumberAllowed(prev => !prev);
            }}/>
            <label htmlFor="numberAllowed">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id='characterAllowed' defaultChecked={characterAllowed} onChange={() => {
              setCharacterAllowed(prev => !prev);
            }}/>
            <label htmlFor="characterAllowed">Include Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
