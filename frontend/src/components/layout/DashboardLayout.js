import React, { useEffect, useState } from "react";
import Header from '../Header.js'
import Footer from '../Footer'

const DashboardLayout = ({ location, children, ...rest }) => {
    return (
        <div >
            <Header />
            <main className='py-3'>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;
