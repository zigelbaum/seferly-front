// import React from 'react';
// import { Link } from 'react-router-dom'

// const Home = () => {
//     return (
//         <div className='container my-5 '>
//             <h1>Welcome to Seferly</h1>
//             <div className="mt-8 flex gap-x-4 sm:justify-center">
//                 <p className="">
//                     The Place Where Purchasing Used Books is Easy and Fun!
//                 </p>
//                 <Link
//                     to={'/uploadsList'}
//                     className="inline-block rounded-lg "
//                 >
//                     Get started
//                     <span className="text-indigo-200" aria-hidden="true">
//                         &rarr;
//                     </span>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-gradient-to-r from-slate-50 to-blue-500">
      <div className="container text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to Seferly</h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl text-gray-800">
            The Place Where Purchasing Used Books is Easy and Fun!
          </p>
          <Link
            to="/uploadsList"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-2 px-4 transition-all duration-200"
          >
            Get started
          </Link>
        </div>
      </div>
    
    </div>
  );
};

export default Home;
