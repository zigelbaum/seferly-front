import React from 'react'
import { useRef } from 'react'


const SelectCity = (props) => {

    const cities = props.cities
    const ref = props.cityRef
    const setSelectedCity = props.setSelectedCity
    const errors=props.errors
    const register=props.register

    return (
        <div>
            <select ref={ref}  {...register('city',{required:true})} className='form-select m-2' onChange={() => { setSelectedCity(ref) }}>
                <option value="">Select a city from the list...</option>
                {cities?.map((city, i) => (
                        <option value={city} key={i + 1} className="capitalize">
                            {city}
                        </option>
                    ))}
               
            </select>
            {errors.city && <div className='text-danger'>*Field required, You must select a city!</div>}
        </div >

    )
}

export default SelectCity;