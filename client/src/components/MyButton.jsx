

const MyButton = ({ name, type }) => {

    return (
        <>
            <div
                className={type == 1 ? "w-fit h-10 px-2 rounded-lg bg-blue-600 flex items-center text-white font-bold border-2 border-blue-300 hover:cursor-pointer hover:h-12 hover:px-4 hover:text-xl transition-all hover:bg-orange-100 hover:border-orange-300 hover:text-orange-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300" :
                    "w-fit h-10 px-2 rounded-lg bg-green-600 flex items-center text-white font-bold border-2 border-green-300 hover:cursor-pointer hover:h-12 hover:px-4 hover:text-xl transition-all hover:bg-pink-100 hover:border-pink-300 hover:text-pink-600 active:bg-purple-200 active:text-purple-700 active:border-purple-300"
                }
            >{name}</div>
        </>
    )
}

export default MyButton