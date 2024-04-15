import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom'

import { signup } from "./actions/auth"

function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  
    const message = useSelector(state => state.message.message)
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        if (data.password === data.repeatPassword) {
            dispatch(signup(data.name, data.password))
                .then(() => {
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            dispatch({type: 'SET_MESSAGE', payload: "Пароли не совпадают!"})
        }
    }

    if (isLoggedIn) {
      return <Navigate to="/" />
    }
  
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
        <form style={{width: '47vh'}} className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="name">Логин</label>
              <input
                type="text"
                className="form-control"
                {...register("name", {required: "Is required"})}
              />
              {errors.name && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                className="form-control"
                {...register("password", {required: "Is required"})}
              />
              {errors.password && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="repeat-password">Повторите пароль</label>
              <input
                type="password"
                className="form-control"
                {...register("repeatPassword", {required: "Is required"})}
              />
              {errors.repeatPassword && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <button className="btn btn-primary btn-block">Зарегистрироваться</button>
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
  
  export default SignUp