

const Output = ({ value }) => {


    return (
        <>
            <textarea
                readOnly
                value={value}
                className="bg-black w-full text-white p-2.5"
                name="output" id="output" cols="100" rows="10"></textarea>
        </>
    )
}

export default Output