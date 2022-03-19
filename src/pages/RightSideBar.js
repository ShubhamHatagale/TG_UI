import React from 'react';
import { useHistory, Link } from 'react-router-dom'

export const RightSidebar = () => {
    return (
        <div >
          
            <ul class="navbar-nav">
                <li><Link to="/" class="mega-menu" title="Sign Out"><i class="zmdi zmdi-power"></i></Link></li>
            </ul>
        </div>
    )
}
export default RightSidebar;
