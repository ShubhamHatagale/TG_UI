// import React from 'react'
// import { Redirect } from 'react-router-dom'
// export default function Protected({ children }) {
//     const isAuthenticated = localStorage.getItem('tr');
//     return isAuthenticated ? (
//         children) : (
//         <Redirect to={{ pathname: '/Not_support' }} />
//     );
// }

import React from 'react'
import { Redirect } from 'react-router-dom'
export default function Protected({ children }) {
    const isAuthenticated = localStorage.getItem('tr_id');
    return isAuthenticated ? (
        children) : (
        <Redirect to={{ pathname: '/Not_support' }} />
    );
}



