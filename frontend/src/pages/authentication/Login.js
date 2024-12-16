import React, { useState , useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login , setPersonType , fetchClientID , fetchVendorID} from "../../actions/auth";
import axios from "axios";
import './login.css';
// import NavHome from "../../components/Navbar/nav_home";

const Login = ({ login, isAuthenticated , setPersonType , fetchClientID , fetchVendorID }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  const continueWithGoogle = async () => {
    try {

     const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);
      

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

   // Effect to set person type when isAuthenticated becomes true
   useEffect(() => {
    if (isAuthenticated) {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };

      axios
        .get("/auth/users/me/", config)
        .then((response) => {
          setUser(response.data);
          console.log("User ID:", response.data.id); // Verify user.id
          fetchClientID(response.data.id); 
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }

      setPersonType('client');
    }
  }, [isAuthenticated, setPersonType]);


  // is the user authenticated?
  //Navigate them to the home page
  if (isAuthenticated) {
    // return <Navigate to='/' />
    return <Navigate to="/client-dashboard" />;
  }

  return (
    <div>      
      <div className="container-login">
        <div className="join-us-container1">
          <h1 className="join-us-title1">WELCOME BACK</h1>
          <p className="join-us-text1">Your return is like a ray of sunshine. Log in now to pick up where you left off and enjoy seamless shopping.</p>
          <p className="join-us-login-text1">You don't have an account ? <Link to="/signup" className="signup-btn">Sign Up</Link>.</p>
        </div>
        <div className="form-container-login">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1 className="login-title">Log In</h1>
            <button type="button" className="google-signup-button" onClick={continueWithGoogle}>
              <i className="bi bi-google"></i>
              Log in with Google
            </button>
            <div className="email-container">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  // onChange={handleEmailChange}
                  onChange={(e) => onChange(e)}
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
                  // onChange={handlePasswordChange}
                  onChange={(e) => onChange(e)}
                  // className={`input ${passwordError ? 'error' : (password ? 'valid' : '')}`}
                />
                {/* {passwordError && <p className="error-message">{passwordError}</p>} */}
              </div>
            </div>
            <button className='' type="submit">Login</button>
            <div className="form-links">
              <Link to="/reset_password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login , setPersonType , fetchClientID , fetchVendorID })(Login);

