import React from 'react'

const SelectSubject = (props) => {

    const subjects = props.subjects
    const ref = props.subjectRef
    const register = props.register
    const setSelectedSub = props.setSelectedSub

    return (
        <div>
            <select ref={ref} className='form-select m-2' onChange={() => {
                 setSelectedSub(ref.current.value) }}>
                <option className='text-end' value="">Subject</option>
                {subjects.map((subject) => (
                    <option value={subject._id} key={subject._id} className="capitalize text-end">
                        {subject.name}
                    </option>
                ))}
            </select>
        </div >

    )
}

export default SelectSubject;