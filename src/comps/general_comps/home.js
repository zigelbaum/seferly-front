import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='container my-5 '>
            <h1>Welcome to Seferly</h1>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
                <p className="">
                    The Place Where Purchasing Used Books is Easy and Fun!
                </p>
                <Link
                    to={'/uploadsList'}
                    className="inline-block rounded-lg "
                >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                        &rarr;
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Home;
