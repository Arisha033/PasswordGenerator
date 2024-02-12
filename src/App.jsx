import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);

  // useRef hook to pass a ref of input to button
    const passwordRef = useRef(null)

    // useCallback hook to cache the values of the state every time they changes
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let char = "~!@#$%^&*(){}[]:<>?/`";

    if (isNumber) str += number;
    if (isChar) str  += char;
    for (let i = 1; i <= length; i++) {
      let indexOfChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(indexOfChar);
    }

    setPassword(pass);
  }, [length, isNumber, isChar, setPassword]);

  // useEffect hook to call the main function on page load
  useEffect(()=> {
    passwordGenerator()
  },[length, isNumber, isChar, passwordGenerator])

// copy password to clipboard function using callback for optimization
  const copyToClipBoard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 py-2 my-12 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white
             px-3 py-0.5 shrink-0 hover:bg-blue-500"
             onClick={copyToClipBoard}
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberInput"
              onChange={() => {
                setIsNumber((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInput"
              onChange={() => {
                setIsChar((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;