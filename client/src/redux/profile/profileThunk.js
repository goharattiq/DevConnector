import axios from 'axios';
//import { setAlert } from '../alert/alertAction';
import {currentProfile,profileError,updateProfile,DeleteAccount,
    clearProfile,getProfiles,getRepos} from './profileActions';
import { setAlert } from '../alert/alertAction';



// Get current users profile
export const getCurrentProfile = () => dispatch => {
  
    axios.get('/api/profile/me')
    .then((res)=>{
        dispatch(currentProfile(res.data));
    })
    .catch((err)=>{
        dispatch(profileError(err.response.statusText, err.response.status));
    })
};

// Get all profiles
export const GetProfiles = () => async dispatch => {
  dispatch(clearProfile());

  try {
    const res = await axios.get('/api/profile');

    dispatch(getProfiles(res.data));
  } catch (err) {
      dispatch(profileError(err.response.statusText,err.response.status));
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch(currentProfile(res.data));
  } catch (err) {
    dispatch(profileError(err.response.statusText,err.response.status));
  }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch(getRepos(res.data));
  } catch (err) {
    dispatch(profileError(err.response.statusText,err.response.status));
  }
};

// Create or update profile
export const createProfile = (formData,history,edit = false) => dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios.post('/api/profile', formData, config)
      .then((res) => {
        dispatch(currentProfile(res.data));
        dispatch(setAlert(edit ? 'Profile Updated':'Profile Created','success'))
        if(!edit){
            history.push('/dashboard');
        }
      })
      .catch((err)=>{
        // const errors = err.response.data.errors;

        // if (errors) {
        //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }
        console.log(err.response)
        dispatch(profileError('err.response.statusText', 'err.response'));
      });
}

// Add Experience
export const addExperience = (formData, history) => dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.put('/api/profile/experience', formData, config)
    .then((res)=>{
        console.log(res)
        dispatch(updateProfile(res));
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    })
    .catch(err=>{
        // const errors = err.response.data.errors;

        // if (errors) {
        //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }
        // dispatch(profileError(err.response.statusText, err.response.status));
      })
};

// Add Education
export const addEducation = (formData, history) => dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.put('/api/profile/education', formData, config)
    .then((res)=>{
        dispatch(updateProfile(res.data));
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    })
    .catch((err)=>{
            // const errors = err.response.data.errors;

            // if (errors) {
            //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            // }
            //dispatch(profileError(err.response.statusText, err.response.status));
    })
};

// // Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

// // Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch(updateProfile(res.data));

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

// // Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch(clearProfile())
      dispatch(DeleteAccount());
      
    dispatch(setAlert('Your account has been permanantly deleted','success'));
    } catch (err) {
        dispatch(profileError(err.response.statusText, err.response.status));
    }
  }
};