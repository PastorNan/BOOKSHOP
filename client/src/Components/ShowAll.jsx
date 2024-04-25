import { useEffect, useState } from "react"
import ShowBook from "./ShowBook"

const ShowAll = () => {
    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/shop', {
            headers: {
                "content-type": "application/json"
            }
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                //console.table(data)
                setAllBooks(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <p className="text-3xl text-slate-600">Books found: {allBooks.length}</p>
            {allBooks.map(book => {
                return(
                    <ShowBook key={book._id} book={book} />
                )
            })}
        </>
    )
}

export default ShowAll