import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../redux/auth/authThunk';

const Navbar = ({logoutUser,auth:{isAuthenticated,loading}}) => {
 const authLinks = (

            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link to="/profiles" className="nav-link" >
                  Developers
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/dashboard" className="nav-link" >
                 <i className="fas fa-user"></i>{' '}
                 <span className="hide-sm"> Dashboard</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logoutUser}>
                  {' '}
                 <i className="fas fa-sign-out-alt"></i>
                 <span className="hide-sm"> Log Out</span>
                </Link>
              </li>

            </ul>
 );
 const guestLinks = (
  <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/profiles" className="nav-link" >
                  Developers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
  );
 
 return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
          {!loading && (<Fragment>
            {isAuthenticated?authLinks:guestLinks}
          </Fragment>)}

            
          </div>
        </div>
      </nav>
    );
}
 
const mapDispatchToProps = dispatch => ({
  logoutUser: ()=> dispatch(logoutUser())
 });
 
 const mapStateToProps = state => ({
   auth : state.auth
  });
 

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
