// import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "./actions/auth"

function Header() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.user)
    const logOut = () => {
        dispatch(logout())
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {currentUser && <h3 style={{color: 'white'}} className="me-3"> {currentUser.username} </h3>}
                    <Link to="/" className="nav-link">Главная</Link>
                    {!currentUser && <Link to="/signin" className="nav-link">Войти</Link>}
                    {!currentUser && <Link to="/signup" className="nav-link">Зарегистрироваться</Link>}
                    {currentUser && <Link to="/cart" className="nav-link">Корзина</Link>}
                    {currentUser && <Link to="/signin" className="nav-link" onClick={logOut}>Выйти</Link>}
                </div>
            </div>
          </div>
        </nav>
    )
}

export default Header