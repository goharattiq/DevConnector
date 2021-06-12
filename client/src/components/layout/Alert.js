import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../redux/alert/alertAction';

const Alert = ({ alerts, removeAlert }) => {

    if (alerts === null && alerts.length === 0) {
        return <p > </p>
    }
    return ( 
        <div> {
            alerts.map(alert => ( 
                <div key = { alert.id }
                    className = { `alert alert-${alert.alertType}` }
                    onClick = {
                        () => {
                            removeAlert(alert.id);
                        }
                    } > { alert.msg } 
                    </div>)
                )
            } 
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeAlert: (id) => dispatch(removeAlert(id))
});

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);