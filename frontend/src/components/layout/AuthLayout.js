import React from "react";

const AuthLayout = ({ location, children, ...rest }) => {
    return (
        <div >
            {children}
        </div>
    );
};

export default AuthLayout;
