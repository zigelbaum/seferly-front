import React from 'react'

const InputImage = (props) => {
    const setImageSelected = props.setImageSelected

    return (
        <>
            <div className="col-span-6 sm:col-span-4 border-gray-300 border form-control" >
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 rounded-md border-2 border-dashed border-gray-300">
                    <div className="space-y-1 text-center">
                        <svg className="text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" style={{height:100}}>
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                        </svg>
                        <div className=" text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md
                             bg-white font-medium text-indigo-600 focus-within:outline-none
                              focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImageSelected(e.target.files[0]);
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputImage