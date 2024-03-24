

const Input = ({ value, setInput }) => {

    return (
        <>
            <textarea
                value={value}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
                className=" rounded-lg ring ring-blue-200 p-2.5 m-2 h-full w-ful"
                name="input" id="input" cols="50" rows="15"></textarea>
        </>
    )
}

export default Input