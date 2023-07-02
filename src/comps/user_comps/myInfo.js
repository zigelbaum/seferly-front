import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Tooltip, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserContext } from "../../App";
import { doApiGet, API_URL } from '../../services/service';
import { useNavigate } from 'react-router-dom';


export default function MyInfo() {

    const [isLoading, setIsLoading] = useState(true);
    const [showInfo, setShowInfo] = useState("block")
    const [values, setValues] = useState({ button1: '#CCCCCC', button2: '#A435F0' });
    const { isLogedIn } = useContext(UserContext);
    const [user, setUser] = useState();
    const nav = useNavigate();


    useEffect(() => {
        if (!isLogedIn) {
            nav("/*/you must be logged in!");
        } else {

            const fetchData = async () => {
                try {
                    const url = API_URL + '/users/myInfo';
                    const { data } = await doApiGet(url);
                    setUser(data);
                    setIsLoading(false);
                    console.log(data);
                } catch (err) {
                    // alert(err.response.data.msg || err.response.data[0].message)
                    // setIsSubmitted(false);
                }
            };

            fetchData();
            console.log(user)
        }
    }, []); // Empty dependency array, so the effect runs only once

    const clickOnPosts = () => {
        setValues({
          button1: "#A435F0",
          button2: "#CCCCCC",
        });
        setShowPosts("block")
        setShowInfo("none")
      }


    return (
        <div>
            {isLoading ? (
                <div className='container mt-5'>
                    <div className='display-1'>Loading...</div> // Display a loading indicator
                </div>
            ) : (
                <div>
                    <div className='container mt-5'>

                        <div className='d-flex'>
                            <div className='d-none d-sm-block'>
                                <Avatar
                                    alt='myAvatar'
                                    // src={srcImg}
                                    sx={{ width: 160, height: 160 }}
                                />
                            </div>
                            <div className='d-block d-sm-none'>
                                <Avatar
                                    alt='myAvatar'
                                    // src={srcImg}
                                    sx={{ width: 70, height: 70 }}
                                />
                            </div>
                            <div className='ms-md-5 ms-2 mt-0 mt-sm-1'>
                                <h2 className='mb-3 s24'>{user?.fullName?.firstName} {user?.fullName?.lastName}</h2>
                                <div className='pb-2'><span className='fw-bold'>Location: </span>{user?.city}</div>
                                <div className='pb-2'><span className='fw-bold'>Phone number: </span>{user?.phone}</div>
                                <div className='d-flex mb-2 text-center'>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        // onClick={clickOnPosts}
                                        className='underLine me-3'
                                    >
                                        {user?.posts?.length || 0}{' '}
                                        <span className='weight500'>Posts</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col text-end'>
                                <Tooltip title={"Edit"} >
                                    <IconButton onClick={() => { nav("/editMyDetails") }} sx={{ border: "gray 0.5px solid" }}>
                                        <SettingsIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div >

                    <NavBarMyProfile setShowInfo={setShowInfo} showInfo={showInfo} clickOnPosts={clickOnPosts} setShowPosts={setShowPosts} showPosts={showPosts} setValues={setValues} values={values} />

                </div>
            )}
        </div >
    );
}
