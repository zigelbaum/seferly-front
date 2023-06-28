import React from 'react'

const SelectSubject = (props) => {

    const subjects = props.subjects
    const ref = props.subjectRef
    const register = props.register
    const setSelectedSubject = props.setSelectedSubject

    return (
        <div>
            <select ref={ref}  {...register('subject', { required: true })} className='form-select m-2' onChange={() => { setSelectedSubject(ref) }}>
                <option className='text-end' value="">מקצוע</option>
                {subjects.map((subject) => (
                    <option value={subject.name} key={subject.name} className="capitalize text-end">
                        {subject.name}
                    </option>
                ))}
            </select>
        </div >

    )
}

export default SelectSubject;