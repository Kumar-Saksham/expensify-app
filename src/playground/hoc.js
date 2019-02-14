import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return props => (
        <div>
            { props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return props => (
        <div>
            { props.isAuth ? <WrappedComponent {...props} /> : <p>You have to login to view this info</p> }
        </div>
    )
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuth={true} info="there are the details" />, document.getElementById('app'));