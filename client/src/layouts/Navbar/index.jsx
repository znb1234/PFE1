import logo from '../../assets/img/logo.png'
export default () => {
    return (
        <>
            {/* ***** Header Area Start ***** */}
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* ***** Logo Start ***** */}
                                <a href="index.html" className="logo">
                                    <img style={{height : "80px"}} src={logo} alt="SHAREVIOO" />
                                </a>
                                {/* ***** Logo End ***** */}
                                {/* ***** Menu Start ***** */}
                                <ul className="nav">
                                    <li className="scroll-to-section"><a href="#top" className="active">Espace partagé</a></li>
                                    <li className="scroll-to-section"><a href="#services">Mon espace </a></li>
                                    <li className="scroll-to-section"><a href="#courses">Top trois </a></li>
                                    <li className="has-sub">
                                        <a href="javascript:void(0)">Espace admin</a>
                                        <ul className="sub-menu">
                                            <li><a href="about-us.html">Dashbord</a></li>
                                            <li><a href="our-services.html">les utilisateurs </a></li>
                                            <li><a href="contact-us.html">les publications </a></li>
                                        </ul>
                                    </li>

                                    <li className="scroll-to-section"><a href="#contact-section">Contact Us</a></li>
                                </ul>
                                <a className="menu-trigger">
                                    <span>Menu</span>
                                </a>
                                {/* ***** Menu End ***** */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* ***** Header Area End ***** */}

        </>
    )
}