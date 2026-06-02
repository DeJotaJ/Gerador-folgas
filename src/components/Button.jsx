export default function Button({text}){
    return(
        <div className="w-fit px-4 py-1 rounded-lg 
                    border-zinc-800 bg-sky-400 text-zinc-900
                    hover:font-semibold hover:border-2 hover:bg-sky-500 hover:text-zinc-100
        ">
            {text}
        </div>
    )
}