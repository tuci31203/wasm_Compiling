

const Message = ({ message, type }) => {


    return (
        <>
            <div
                className={type === 1 ? "bg-red-100 rounded-lg p-2.5 text-red-900 w-fit font-semibold shadow-md shadow-rose-300" : type === 0 ?
                    "bg-white rounded-lg p-2.5 text-blue-900 w-fit font-semibold shadow-md shadow-yellow-300"
                    :
                    "bg-blue-100 rounded-lg p-2.5 text-blue-900 w-fit font-semibold shadow-md shadow-purple-300"}
            >{message}</div>
        </>
    )
}

export default Message