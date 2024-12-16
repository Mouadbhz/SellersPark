import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import './resetpass.css';
// import NavHome from '../../components/Navbar/nav_home';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
      <div>
    
      <div className="container-reset-password">
        <div className="form-container-reset-password">
          <form onSubmit={e => onSubmit(e)}>
            <h1 className="reset-password-title">Reset Password</h1>
            <div className="password-container">
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  className={`input-reset-password`}
                />
              </div>
            </div>
            <button className='submit-button-reset-password' type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
      // ----------------------------------------------------------
        // <div className='container mt-5'>
        //     <h1>Request Password Reset:</h1>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='email'
        //                 placeholder='Email'
        //                 name='email'
        //                 value={email}
        //                 onChange={e => onChange(e)}
        //                 required
        //             />
        //         </div>
        //         <button className='btn btn-primary' type='submit'>Reset Password</button>
        //     </form>
        // </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
