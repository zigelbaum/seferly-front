import React from 'react'
import { useRef } from 'react'


const SelectBook = (props) => {

    const books = props.books
    const ref = props.bookRef
    const setSelectedBook = props.setSelectedBook

    return (
        <div>
            <select ref={ref} className='form-select m-2' onChange={() => { setSelectedBook(ref.current.value) }}>
                <option value="">Select a book from the list...</option>
                {
                    books.map(book => 
                        <option value={book._id} key={book._id}>{book.name}</option>
                    )
                };
               
            </select>
        </div >

    )
}

export default SelectBook;