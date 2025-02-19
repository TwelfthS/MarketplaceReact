import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import userService from "./services/user.service"

import { MarginedDiv, StyledButton } from "./styled"
import { useDispatch, useSelector } from "react-redux"
import { setError } from "./actions/errors"
import { updateCart } from "./actions/user"

function Product() {
    const params = useParams()
    const itemId = params.itemId
    const [data, setData] = useState({})
    const [date, setDate] = useState('')
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const message = useSelector((state) => state.message.message)
    const cart = useSelector((state) => state.user.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        userService.GetProduct(itemId)
            .then((response) => {
                if (response.data) {
                    setData(response.data)
                    if (response.data.createdAt) {
                        setDate(new Date(response.data.createdAt).toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' }))
                    }
                }
            })
            .catch((err) => {
                dispatch(setError(err))
            })
    }, [itemId, dispatch])
    const addCart = (itemId) => {
        if (isLoggedIn) {
            userService.addCart(itemId).then(() => {
                dispatch(updateCart())
                navigate('/cart')
            }).catch((err) => {
                dispatch(setError(err))
            })
        } else {
            navigate('/signin', {state: itemId})
        }
    }
    if (!data) {
        return <p>Item not found</p>
    }
    return (
        <MarginedDiv>
            <div style={{width: '200px', height: 'auto', border: '1px solid black', textAlign: 'center', margin: '50px'}}>
            <h1>{data.name}</h1>
            </div>
            <img alt={data.name} style={{maxWidth: '400px', maxHeight: '300px', margin: '50px'}} src={data.image}/>
            <div style={{width: '90%', height: '300px', border: '1px solid black', margin: '50px', padding: '10px'}}>
                <p>{data.description}</p>
            </div>
            <div style={{width: '200px', border: '1px solid black', margin: '50px', padding: '5px'}}>
               <p>Цена: {data.price}</p>
                <p>Опубликовано: {date}</p>
                {!cart.map(item => item.id).includes(parseInt(itemId)) && <StyledButton onClick={() => addCart(itemId)} style={{translate: '200%'}}>В корзину</StyledButton>}
            </div>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
            )}
            
        </MarginedDiv>
    )
}


export default Product