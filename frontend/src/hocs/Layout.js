// import React , {useEffect} from "react";
// import Navbar from "../components/Navbar";
// import { connect } from 'react-redux';
// import { checkAuthenticated , load_user } from "../actions/auth";

//  const Layout = ( props ) => {
//   useEffect(() => {
//             checkAuthenticated();
//             load_user();
//         }, []);
//   return (
//     <>

// <Navbar isAuthenticated={props.isAuthenticated} />

//      {props.children}
  
//     </>
//   );
// };

// const Layout = ({ checkAuthenticated, load_user, children }) => {
//   useEffect(() => {
//       checkAuthenticated();
//       load_user();
//   }, []);

//   return (
//       <div>
//           <Navbar />
//           {children}
//       </div>
//   );
// };

// export default connect(null, {checkAuthenticated , load_user})(Layout);


















// -----------------------------------------------------------------------
// -----V1
// import React , {useEffect} from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { connect } from 'react-redux';
// import { checkAuthenticated , load_user , googleAuthenticate} from "../actions/auth";
// import queryString from 'query-string';

//  const Layout = ( props ) => {

//   let location = useLocation();

//   useEffect(() => {
//     const values = queryString.parse(location.search);
//     const state = values.state ? values.state : null;
//     const code = values.code ? values.code : null;

//     console.log('State: '+state);
//     console.log('Code: '+code);

//     if(state && code) {
//       props.googleAuthenticate(state,code);
//     }else {
//       props.checkAuthenticated();
//       props.load_user();
//     }

//         }, [location]);
//   return (
//     <>

// <Navbar isAuthenticated={props.isAuthenticated} />

//      {props.children}
  
//     </>
//   );
// };

// export default connect(null, {checkAuthenticated , load_user , googleAuthenticate})(Layout);


// ----------------------------------------------------------------------------------------------------------
// -------V2 

import React, { useEffect , useState} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, googleAuthenticate } from "../actions/auth";
import queryString from 'query-string';

const Layout = ({ checkAuthenticated, load_user, googleAuthenticate, isAuthenticated, children }) => {
  let location = useLocation();
  const [navbarAlt, setNavbarAlt] = useState(false);

  // Destructure specific props needed inside useEffect
  const { isAuthenticated: isAuthenticatedProp } = { isAuthenticated };

  useEffect(() => {
    const { search } = location;
    const values = queryString.parse(search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    const stateParam = state ? state : null;

    // console.log('State: ' + state);
    // console.log('Code: ' + code);

    if (state && code) {
      googleAuthenticate(state, code);
    } else {
      checkAuthenticated();
      load_user();
    }

    if (stateParam && stateParam.navbarAlt) {
      setNavbarAlt(stateParam.navbarAlt);
    } else if (values.navbarAlt) {
      setNavbarAlt(values.navbarAlt === 'true');
    } else {
      setNavbarAlt(false);
    }

  }, [location, checkAuthenticated, load_user, googleAuthenticate, isAuthenticatedProp]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} navbarAlt={navbarAlt}/>
      {children}
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, load_user, googleAuthenticate })(Layout);



// -------------------------------------------------------------------------------------------------------

// const Layout = ({ checkAuthenticated, load_user, children }) => {
//     useEffect(() => {
//         checkAuthenticated();
//         load_user();
//     }, []);

//     return (
//         <div>
//             <Navbar />
//             {children}
//         </div>
//     );
// };

// export default connect(null, { checkAuthenticated, load_user })(Layout);
