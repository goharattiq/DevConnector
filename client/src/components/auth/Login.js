import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';

import {loginUser} from '../../redux/auth/authThunk';

const Login = ({loginUser,isAuthenticated}) => {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const {
    email,
    password
  } = formData;

  const handleChange = event => {
    const { value, name } = event.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
   
      loginUser( {
        email,
        password
      }); 
  };
if(isAuthenticated){
  return (
    <Redirect to='/dashboard'/>
  )
}
  return (
    <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign in</h1>
          <p className="lead text-center">
            Sign In your DevConnector account
          </p>
          <form noValidate  onSubmit={handleSubmit}>
            <div className="form-group">
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required/></div>
            <div className="form-group"> <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required/></div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
          <p className='my-1'>I Donot have an account? <Link to='/register'>Sign Up</Link></p>
        </div>
      </div>
    </div> 
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
 loginUser: (formData)=> dispatch(loginUser(formData))
});

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
 });

export default connect( mapStateToProps,mapDispatchToProps)(Login);