import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
    const [length, setLength] = useState(8);
    const [numbersAllow, setNumbersAlow] = useState(false);
    const [charactersAllow, setCharactersAllow] = useState(false);
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let paswd = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numbersAllow) str += "0123456789";
        if (charactersAllow) str += "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
        for (let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * str.length);
            paswd += str.charAt(index);
        }
        setPassword(paswd);
    }, [length, numbersAllow, charactersAllow, setPassword]);

    const copyToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password])

    useEffect(() => { generatePassword() }, [length, numbersAllow, charactersAllow, generatePassword]);

    return (
        <>
            <div className='width-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-500 bg-gray-700'>
                <h1 className='text-white text-center my-3'>Password Generator</h1>
                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                    <input
                        type='text'
                        value={password}
                        className='outline-none text-black w-full py-1 px-3'
                        placeholder='password'
                        ref={passwordRef}
                        readOnly
                    />
                    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>Copy</button>
                </div>
                <div className='flex text-sm text-white gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="range"
                            id="rangeInput"
                            min={6}
                            max={50}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e) => setLength(Number(e.target.value))}
                        />
                        <label htmlFor='rangeInput'>Length={length}</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="checkbox"
                            id="numbersInput"
                            checked={numbersAllow}
                            onChange={() => { setNumbersAlow((prev) => !prev) }}
                        />
                        <label htmlFor="numbersInput">Numbers</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="checkbox"
                            checked={charactersAllow}
                            id="charactersInput"
                            onChange={() => setCharactersAllow((prev) => !prev)} />
                        <label htmlFor="charactersInput">Characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
