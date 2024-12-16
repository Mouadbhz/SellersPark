import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import axios from 'axios';
import './signup.css';
// import NavHome from '../../components/Navbar/nav_home';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name , last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
          console.log('Form Data:', formData); // Add this line to log the form data
          console.log(typeof formData);
          const body = JSON.stringify({ email , first_name , last_name , password, re_password });
          console.log(typeof body);
          signup(first_name , last_name , email, password, re_password);
          setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);
          // const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`);
          // console.log('res' + res);
  
          window.location.replace(res.data.authorization_url);
      } catch (err) {
  
      }
  };

//   const continueWithFacebook = async () => {
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`);

//         window.location.replace(res.data.authorization_url);
//     } catch (err) {

//     }
// };

    if (isAuthenticated) {
        // return <Navigate to='/' />
        return <Navigate to='/client-dashboard' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (

      <div>
       
      <div className="container-signup active">
        <div className="form-container-signup">
          <div>
            <form onSubmit={e => onSubmit(e)}>
              <h1 className="signup-title">Create Account</h1>
              <button type="button" className="google-signup-button" onClick={continueWithGoogle}>
              <i class="bi bi-google"></i>
                Sign Up with Google
              </button>
              <div className="name-container">
                <div>
                  <input
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    name='first_name'
                    value={first_name}
                    onChange={e => onChange(e)}
                    // className={`input ${firstNameError ? 'error' : (firstName ? 'valid' : '')}`}
                  />
                  {/* {firstNameError && <p className="error-message">{firstNameError}</p>} */}
                </div>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={e => onChange(e)}
                    // className={`input ${lastNameError ? 'error' : (lastName ? 'valid' : '')}`}
                  />
                  {/* {lastNameError && <p className="error-message">{lastNameError}</p>} */}
                </div>
              </div>
              <div className="email-container">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => onChange(e)}
                    // className={`input ${emailError ? 'error' : (email ? 'valid' : '')}`}
                  />
                  {/* {emailError && <p className="error-message">{emailError}</p>} */}
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => onChange(e)}
                    // className={`input ${passwordError ? 'error' : (password ? 'valid' : '')}`}
                  />
                  {/* {passwordError && <p className="error-message">{passwordError}</p>} */}
                </div>
                <div>
                  <input
                    type="password"
                    id="re_Password"
                    name="re_password"
                    placeholder="Confirm Password"
                    value={re_password}
                    onChange={e => onChange(e)}
                    // className={`input ${confirmPasswordError ? 'error' : (confirmPassword ? 'valid' : '')}`}
                  />
                  {/* {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>} */}
                </div>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="join-us-container">
  <h1 className="join-us-title">Begin Your Journey</h1>
  <p className="join-us-text">Join our community today and make every purchase a breeze! Your shopping experience awaits.</p>
  <p className="join-us-login-text">Already have an account ? <Link to="/login" className="nav-home-button">Log In</Link>.</p>
</div>

        </div>
      </div>
    </div>

      // ---------------------------------------------------------------------------------
        // <div className='container mt-5'>
        //     <h1>Sign Up</h1>
        //     <p>Create your Account</p>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='text'
        //                 placeholder='Firs Name*'
        //                 name='first_name'
        //                 value={first_name}
        //                 onChange={e => onChange(e)}
        //                 required
        //             />
        //         </div>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='text'
        //                 placeholder='Last Name*'
        //                 name='last_name'
        //                 value={last_name}
        //                 onChange={e => onChange(e)}
        //                 required
        //             />
        //         </div>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='email'
        //                 placeholder='Email*'
        //                 name='email'
        //                 value={email}
        //                 onChange={e => onChange(e)}
        //                 required
        //             />
        //         </div>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='password'
        //                 placeholder='Password*'
        //                 name='password'
        //                 value={password}
        //                 onChange={e => onChange(e)}
        //                 minLength='6'
        //                 required
        //             />
        //         </div>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='password'
        //                 placeholder='Confirm Password*'
        //                 name='re_password'
        //                 value={re_password}
        //                 onChange={e => onChange(e)}
        //                 minLength='6'
        //                 required
        //             />
        //         </div>
        //         <button className='btn btn-primary' type='submit'>Register</button>
        //     </form>
        //     <br />
        //      <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
        //         Continue With Google
        //     </button>
        //     <br />
        //    <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
        //         Continue With Facebook
        //     </button>
        //     <p className='mt-3'>
        //         Already have an account? <Link to='/login'>Sign In</Link>
        //     </p>
        // </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);




    // const continueWithGoogle = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

    //         window.location.replace(res.data.authorization_url);
    //     } catch (err) {

    //     }
    // };

    // const continueWithFacebook = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

    //         window.location.replace(res.data.authorization_url);
    //     } catch (err) {

    //     }
    // };