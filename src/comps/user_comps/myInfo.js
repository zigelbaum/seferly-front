import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Tooltip, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
// import { userInfoContext } from "../../App";
import { doApiGet, API_URL, TOKEN_NAME } from '../../services/service';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { setOpenEditWeight } from '../../features/dialogSlice';
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { getUserInfo } from '../../features/userSlice';
import NavBarMyProfile from './navBarMyProfile';



export default function MyInfo() {

    const [isLoading, setIsLoading] = useState(true);
    const [showInfo, setShowInfo] = useState("block");
    const [showPosts, setShowPosts] = useState("none");
    const [values, setValues] = useState({ button1: '#CCCCCC', button2: '#A435F0' });
    // const { isLogedIn } = useContext(UserContext);
    const { loged } = useSelector((state) => state.userSlice)
    const [userInfo, setUser] = useState();
    const { user } = useSelector((state) => state.userSlice)
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        // if(isLogedIn)
        // {
        //   disconnected()
        // }

        //   else{ nav("/*/you are not logged in!")
        //      }
        if (localStorage[TOKEN_NAME] != null) {
            dispatch(getUserInfo())
            console.log(user);
            fetchData();
        }
        else {
            nav("/*/you are not logged in!")
        }
    }, []
    )
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
    // useEffect(() => {
    //     if (!isLogedIn) {
    //         nav("/*/you must be logged in!");
    //     } else {

    //         const fetchData = async () => {
    //             try {
    //                 const url = API_URL + '/users/myInfo';
    //                 const { data } = await doApiGet(url);
    //                 setUser(data);
    //                 setIsLoading(false);
    //                 console.log(data);
    //             } catch (err) {
    //                 // alert(err.response.data.msg || err.response.data[0].message)
    //                 // setIsSubmitted(false);
    //             }
    //         };

    //         fetchData();
    //         console.log(user)
    //     }
    // }, []);

    const clickOnPosts = () => {
        setValues({
            button1: "#A435F0",
            button2: "#CCCCCC",
        });
        setShowPosts("block")
        setShowInfo("none")
    }


    const onChangeLocation = () => {
        console.log("in change location");
        // dispatch(setOpenEditWeight({ val: true }))
    }


    const onChangePhone = () => {
        console.log("in change phone")
    }


    return (
        <div>
            {isLoading ? (
                <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
                    <div style={{ margin: "0 auto" }}>
                        <CircularProgress size={"50px"} />
                    </div>
                </div>
            ) : (
                <div>
                    <div className='container d-flex justify-content-center mt-5'>

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
                                <h1 className='mb-3 s24 fw-bold'>{userInfo?.fullName?.firstName} {userInfo?.fullName?.lastName}</h1>
                                <div className='pb-2' style={{ display: "flex" }}>
                                    <div className="h6 mt-2 ms-1 "> Location: {userInfo?.city}</div>
                                    <div onClick={onChangeLocation} style={{ margin: "0 16px", cursor: "pointer" }}>
                                        <EditIcon />
                                    </div>
                                </div>
                                <div className='pb-2' style={{ display: "flex" }}>
                                    <div className="h6 mt-2 ms-1 "> Phone number: {userInfo?.phone}</div>
                                    <div onClick={onChangePhone} style={{ margin: "0 16px", cursor: "pointer" }}>
                                        <EditIcon />
                                    </div>
                                </div>
                                <div className='pb-2' style={{ display: "flex" }}>
                                    <div className="h6 mt-2 ms-1 "> Email: {userInfo?.email}</div>
                                    <div onClick={onChangePhone} style={{ margin: "0 16px", cursor: "pointer" }}>
                                        <EditIcon />
                                    </div>
                                </div>
                                <div className='d-flex mb-2 text-center'>
                                    <div>
                                        {userInfo?.uploads?.length || 0}{' '}
                                        <span className='fw-bold'>Posts </span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col text-end'>
                                <Tooltip title={"Edit"} >
                                    <IconButton onClick={() => { nav("/editMyDetails") }} sx={{ border: "gray 0.5px solid" }}>
                                        <SettingsIcon />
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                        </div>
                    </div >

                    <NavBarMyProfile setShowInfo={setShowInfo} showInfo={showInfo} clickOnPosts={clickOnPosts} setShowPosts={setShowPosts} showPosts={showPosts} setValues={setValues} values={values} />


                </div>
            )}
        </div >
    );
}
