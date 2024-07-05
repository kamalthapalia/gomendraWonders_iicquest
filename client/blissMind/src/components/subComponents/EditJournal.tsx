import { FormEvent, useEffect, useState } from "react"

export default function EditJournal() {
    // const [date, setData] = useState();

    const [description, setDescription] = useState("");

    useEffect(()=> {
        // fetching userDescription
    }, [])

    const handleUpdate = (e: FormEvent) => {
        // handle submission
        e.preventDefault();

    }

    return (
        <div onSubmit={handleUpdate} className={`max-w-[900px] w-full mx-auto px-4 `}>
            <form className={`flex flex-col gap-5 w-full`}>
                <div className={`flex flex-col justify-start`}>
                    <label className={`block text-xl font-medium text-gray-700`}>Description: </label>
                    <div className="  h-[50vh] flex flex-col gap-2 border border-blue-400/50  text-sm rounded px-4 pt-2">
                        <span className=" description-date | font-semibold text-md">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={3000}
                            className={` description | w-full flex-1 bg-transparent resize-none outline-none mb-4`}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-start">
                    <button type="submit" className={` border-2 border-blue-600 ease-in-out duration-200 text-gray-700 hover:text-white font-semibold p-2 rounded hover:bg-blue-600 transition`}
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}