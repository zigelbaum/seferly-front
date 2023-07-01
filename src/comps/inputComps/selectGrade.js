import React from 'react'


const SelectGrade = (props) => {

    const setSelectedGrade = props.setSelectedGrade
    const Ref = props.gradeRef

    const hebrewCharacters = [
        'א',
        'ב',
        'ג',
        'ד',
        'ה',
        'ו',
        'ז',
        'ח',
        'ט',
        'י',
        'יא',
        'יב'
    ];
    return (
        <div>
            <select ref={Ref} className='form-select m-2' onChange={() => {
                setSelectedGrade(Ref.current.value);
            }}>
                <option  value="">Select Grade From List</option>
                {hebrewCharacters.map((character, index) => (
                    <option key={index} value={character}>
                        {character}
                    </option>
                ))}
            </select>
            {/* {errors && <div className='text-danger'>*Field required!</div>} */}
        </div >

    )
}

export default SelectGrade;