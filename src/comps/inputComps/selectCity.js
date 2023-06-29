import React from 'react'


const SelectCity = (props) => {

    const cities = props.cities
    const ref = props.cityRef
    const setSelectedCity = props.setSelectedCity

    return (
        <div>
            <select ref={ref}  className='form-select m-2' onChange={() => { setSelectedCity(ref.current.value) }}>
                <option value="">Select a city from the list...</option>
                {cities?.map((city, i) => (
                        <option value={city} key={i + 1} className="capitalize">
                            {city}
                        </option>
                    ))}
               
            </select>
        </div >

    )
}

export default SelectCity;