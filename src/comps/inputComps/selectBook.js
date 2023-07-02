import React from 'react'


const SelectBook = (props) => {

    const setSelectedBook = props.setSelectedBook
    const books = props.books
    const Ref = props.bookRef

    return (
        <div>
            <select ref={Ref} className='form-select m-2' onChange={() => {
                setSelectedBook(Ref.current.value);
            }}>
                <option value="">Select a book from the list...</option>
                {
                    books.map(book =>
                    //   <option value={book._id} key={book._id}>{book.name}</option>
                    {
                        if (book.subjectId != null) { <option value={book._id} key={book._id}>{book.name}</option> }
                    })
                };
            </select>
            {/* {errors && <div className='text-danger'>*Field required!</div>} */}
        </div >

    )
}

export default SelectBook;