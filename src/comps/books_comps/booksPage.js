import React, { useState } from 'react'
import BookInput from './bookInput';

export default function BooksPage() {

    const [searchQueries, setSearchQueries] = useState({
        page: 1,
        searchTerm: null,
        subjectTerm: null,
        classTerm: null,
        sort: null
    });

    const fetchFoodData = async (data) => {

        // const { page, searchTerm, categoryTerm } = searchQueries; // TODO: to use it after
        // let url = API_URL + `/foods`;
        // const params = {
        //     page: data.page,
        //     searchTerm: data.searchTerm,
        //     categoryTerm: data.categoryTerm,
        //     sort: data.sort,
        // };
        // console.log({ params });
        // // setDisplayProgress("flex")
        // try {
        //     let resp = await doApiGet(url, params);
        //     const respData =
        //         data.page === 1
        //             ? { val: [...resp.data.data] }
        //             : { val: [...arSearch, ...resp.data.data] };
        //     // console.log({ respData, page });
        //     dispatch(setArSearch({ ...respData }));
        //     setSearchQueries((prevState) => ({ ...prevState, page: prevState.page + 1 }));
        //     setTotalPages(resp.data.totalPages);
        //     setDisplayProgress("none")

        // } catch (err) {
        //     console.log(err);
        //     toast.error("there problem ,try again later");
        //     setDisplayProgress("none")

        // }
    };


    const handleSetSubject = (event) => {
        const tempSearchQueries = {
            page: 1,
            searchTerm: null,
            subjectTerm: event.value,
            classTerm: null,
            sort: null
        };
        setSearchQueries({
            ...searchQueries,
            ...tempSearchQueries,
        });
        fetchBookData(tempSearchQueries);
    };




    return (
        <div className="container">
            {/* <ThemeProvider theme={theme}/> */}
            {/* <SearchInput handleSearchInput={handleSearchInput} /> */}
            <div className='mt-5'>
                <BookInput handleSetSubject={handleSetSubject} />
            </div>
        </div>
    )
}
