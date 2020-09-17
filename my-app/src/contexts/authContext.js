import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    loginClicked: () => {}
});

export default authContext;
