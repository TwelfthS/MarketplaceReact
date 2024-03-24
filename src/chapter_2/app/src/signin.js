import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate  } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { login } from "./actions/auth"

function SignIn() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const [loading, setLoading] = useState(false)

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const message = useSelector(state => state.message.message)

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    setLoading(true)
    dispatch(login(data.name, data.password))
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/vacancies" />
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
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {required: true})}
            />
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