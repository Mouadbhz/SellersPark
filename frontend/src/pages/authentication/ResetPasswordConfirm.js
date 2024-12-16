import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom"; // Import useParams hook
import { connect } from "react-redux";
import { reset_password_confirm } from "../../actions/auth";
import "./resetpass.css";
// import NavHome from "../../components/Navbar/nav_home";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { uid, token } = useParams(); // Use useParams hook to get URL params

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      
      <div className="container-reset-password">
        <div className="form-container-reset-password">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1 className="reset-password-title">Reset Password</h1>
            <div className="password-container">
              <div>
                <input
                  type="password"
                  id="new-password"
                  placeholder="New Password"
                  name="new_password"
                  value={new_password}
                  onChange={(e) => onChange(e)}
                  className={`input-reset-password`}
                  minLength="8"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={(e) => onChange(e)}
                  className={`input-reset-password`}
                  minLength="8"
                  required
                />
                {/* {passwordError && <p className="error-message-reset-password">{passwordError}</p>} */}
              </div>
            </div>
            <button className="submit-button-reset-password" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
    // --------------------------------------------------------
    // <div className='container mt-5'>
    //     <form onSubmit={e => onSubmit(e)}>
    //         <div className='form-group'>
    //             <input
    //                 className='form-control'
    //                 type='password'
    //                 placeholder='New Password'
    //                 name='new_password'
    //                 value={new_password}
    //                 onChange={e => onChange(e)}
    //                 minLength='6'
    //                 required
    //             />
    //         </div>
    //         <div className='form-group'>
    //             <input
    //                 className='form-control'
    //                 type='password'
    //                 placeholder='Confirm New Password'
    //                 name='re_new_password'
    //                 value={re_new_password}
    //                 onChange={e => onChange(e)}
    //                 minLength='6'
    //                 required
    //             />
    //         </div>
    //         <button className='btn btn-primary' type='submit'>Reset Password</button>
    //     </form>
    // </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
