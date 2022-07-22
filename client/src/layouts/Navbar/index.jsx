import logo from '../../assets/img/logo.png'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthData} from "../../features/authentication";
import swal from 'sweetalert';

export default () => {

    const history = useHistory()

    const { isauth, role } = useSelector(state => state.authentication)

    const dispatch = useDispatch()

    const disconnect = () => {

        swal({
            title: "voulez vous vraiment ",
            text: "se déconnecter ?",
            icon: "info",
            buttons: true,
            dangerMode: true,
            okText : "oui"
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(setAuthData({id : '' ,  isauth: false, role: '', username: ''}))
                    window.location.reload()

                } else {
                    swal("  ");
                }
            });

    }

    return (
    <>
        { /* ***** Header Area Start ***** */ } <header className = "header-area header-sticky" >
        <div className = "container">
        <div className = "row">
        <div className = "col-12" >
        <nav className = "main-nav" > { /* ***** Logo Start ***** */ } <
        a href = "index.html"
        className = "logo" >
        <
        img style = {
            { height: "80px" }
        }
        alt = "SHAREVIOO"  />
        </a>  <
        ul className = "nav" >
            {isauth &&<
                li className="scroll-to-section">< a onClick={
                () => window.location.href = '/home'
            }
                                                     className="active"> Espace partagé < /a></li>}
            {isauth && <
        li className = "scroll-to-section" > < a onClick = {
            () => window.location.href = '/MySpace'
        } > Mon espace < /a></li>}
            {isauth &&<li className="scroll-to-section">< a onClick={
                () => window.location.href = '/TopThree'
            }> Top trois < /a></li>}

            {isauth && role === "ROLE_ADMIN"  && <li className = "has-sub" >
            <
                a> Espace admin </a>
            <ul className="sub-menu">
                <li>< a href="/dashboard"> Dashbord < /a></li>
                <
                    li>< a onClick={
                    () => window.location.href = '/users'
                }> les utilisateurs < /a></li>
                <
                    li>< a onClick={
                    () => window.location.href = '/posts'
                }> les publications < /a></li>
            <
        /ul>
        < /
            li>
            }

        <
        li className = "scroll-to-section" > < a onClick = {
            () => window.location.href = '/contact'
        } > Contactez nous < /a></li >

            {isauth && <li className="scroll-to-section">< a onClick={() => disconnect() }> <i className="las la-sign-out-alt">se déconnecter</i> < /a></li>}
                </ul>
            <
        a className = "menu-trigger" >
        <
        span > Menu < /span> < /
        a > { /* ***** Menu End ***** */ } <
        /nav> < /
        div > <
        /div> < /
        div > <
        /header>

        <
        />
    )
}

