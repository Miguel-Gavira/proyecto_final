import React from 'react';
import Navbar from './navbar';
import Aside from './aside';

interface IProps {}

const CompanyProfile: React.FC<IProps> = props => {
    return (
        <div>
            <Navbar/>
            <div className="row">
                <div className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light sidenav-active-square col s2"><Aside/> </div>  
                <div className="col s6">adios</div>
            </div>
        </div>
    )
}

export default CompanyProfile;