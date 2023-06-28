import React from 'react'
import Select from "react-select";
// import { ThemeProvider } from '@mui/material';



export default function BookInput() {


    return (
        <div className="container">
            {/* <ThemeProvider theme={theme}/> */}
            {/* <SearchInput handleSearchInput={handleSearchInput} /> */}
            <div className="row justify-content-center justify-content-md-between mx-sm-3 mx-xs-5 px-md-3 mx-lg-5 px-lg-5 mb-5">
                <div className="col-7 col-md-6 col-lg-5 col-xl-4">
                    <Select
                        // theme={(theme) => ({
                        //     ...theme,
                        //     borderRadius: "5px",
                        //     colors: {
                        //         ...theme.colors,
                        //         // primary25: 'grey',
                        //         primary: "#A435F0",
                        //     },
                        // })}
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={options[6]}
                        placeholder="Subject"
                        options={options}
                        onChange={handleSetCategory}
                    />
                </div>
            </div>
        </div>
    )
}
