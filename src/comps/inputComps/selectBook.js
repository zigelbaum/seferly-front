import React from 'react'


const SelectBook = (props) => {

    const books = props.books
    const errors=props.errors
    const bookRef = props.bookRef
    const register=props.register
    const setSelectedBook = props.setSelectedBook;

    return (
        <div>
            <select ref={bookRef} {...register('book',{required:true})} className='form-select m-2' onChange={() => {
                setSelectedBook(bookRef);
            }}>
                <option value="">Select a book from the list...</option>
                {
                    books.map(book =>
                        <option value={book._id} key={book._id}>{book.name}</option>
                    )
                };
            </select>
            {errors.book && <div className='text-danger'>*Field required!</div>}
        </div >

    )
}

export default SelectBook;