// import React, { useEffect } from 'react';
// import { Link, useLocation , Navigate} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { googleAuthenticate } from '../../actions/auth';
// import queryString from 'query-string';

// const Google = ({ googleAuthenticate }) => {
//     let location = useLocation();

//     useEffect(() => {
//         const values = queryString.parse(location.search);
//         const state = values.state ? values.state : null;
//         const code = values.code ? values.code : null;

//         console.log('State: ' + state);
//         console.log('Code: ' + code);

//         if (state && code) {
//             googleAuthenticate(state, code);

//             return <Navigate to="/client-dashboard" />;
//         }
//     }, [location , googleAuthenticate]);

//     return (
//         <div className='container'>
//             <div class='jumbotron mt-5'>
//                 <h1 class='display-4'>Welcome to Sellerspark! google</h1>
//                 <p class='lead'>This is an incredible authentication system with production level features!</p>
//                 <hr class='my-4' />
//                 <br />
//                 <input type="date" name="date" id="" />
//                 <br />
//                 <p>Click the button</p>
//                 <Link class='btn btn-primary btn-lg' to='/client-dashboard' role='button'>continue</Link>
//             </div>
//         </div>
//     );
// };

// export default connect(null, { googleAuthenticate })(Google);
 // -----------------------------------------------------

 import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../../actions/auth';
import queryString from 'query-string';

const Google = ({ googleAuthenticate }) => {
    const [redirect, setRedirect] = useState(false); // State variable to control redirection
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
            setRedirect(true); // Set redirect to true when state and code are present
        }
    }, [location , googleAuthenticate]);

    if (redirect) {
        return <Navigate to="/client-dashboard" />; // Render Navigate if redirect is true
    }

    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Welcome to Sellerspark! google</h1>
                <p className='lead'>This is an incredible authentication system with production level features!</p>
                <hr className='my-4' />
                <br />
                <input type="date" name="date" id="" />
                <br />
                <p>Click the button</p>
                <Link className='btn btn-primary btn-lg' to='/client-dashboard' role='button'>continue</Link>
            </div>
        </div>
    );
};

export default connect(null, { googleAuthenticate })(Google);
