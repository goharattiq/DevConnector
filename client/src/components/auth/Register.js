import React,{useState} from 'react';
import {connect} from 'react-redux';
import { Link,Redirect } from 'react-router-dom';

import {setAlert} from '../../redux/alert/alertAction';
import {registerUser} from '../../redux/auth/authThunk';

const Register = ({setAlert,registerUser,isAuthenticated}) => {
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  const {
    name,
    email,
    password,
    password2
  } = formData;

  const handleChange = event => {
    const { value, name } = event.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(password !== password2){
      setAlert("Password do not match","danger");
      setFormData({name:'',
      email:'',
      password:'',
      password2:''
    });          
  } else {
      registerUser({name,
        email,
        password}); 
    }
  };

  if(isAuthenticated){
    return(
      <Redirect to='/dashboard'/>
    );
  }
  return (
    <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">
            Create your DevConnector account
          </p>
          <form noValidate  onSubmit={handleSubmit}>
            <div className="form-group"> <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} required/></div>
            <div className="form-group"> <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required/></div>
            <div className="form-group"> <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required/></div>
            <div className="form-group"> <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={handleChange} required/></div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
          <p className='my-1'>Already have an account? <Link to='/login'>Sign In</Link></p>
        </div>
      </div>
    </div>
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setAlert: (msg,alertType) => dispatch(setAlert(msg,alertType)),
  registerUser: (formData)=> dispatch(registerUser(formData))
});

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
 });

export default connect(mapStateToProps,mapDispatchToProps)(Register);