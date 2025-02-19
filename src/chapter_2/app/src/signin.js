import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate  } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { login } from "./actions/auth"
import userService from "./services/user.service"
import { setError } from "./actions/errors"
import { updateCart } from "./actions/user"

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const [loading, setLoading] = useState(false)

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const message = useSelector(state => state.message.message)

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    setLoading(true)
    dispatch(login(data.name, data.password))
      .then(() => {
        if (location.state) {
          userService.addCart(location.state).then(() => {
            dispatch(updateCart())
            navigate('/cart')
          }).catch((err) => {
              dispatch(setError(err))
              navigate('/')
          })
        } else {
          navigate("/")
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
      <form style={{minWidth: '35vh'}} className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-group mb-3">
            <label htmlFor="name">Логин</label>
            <input
              type="text"
              className="form-control"
              {...register("name", {required: true})}
            />
            {errors.name && <p>Error!</p>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {required: true})}
            />
            {errors.password && <p>Error!</p>}
          </div>

          <div className="form-group mb-3">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Войти</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SignIn