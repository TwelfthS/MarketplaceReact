import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { CartButton, LinkCard, ProductCard, RemoveAllButton } from "./styled"
import CartAdder from "./cart-adder"


function Cart() { // total price!
    const [data, setData] = useState([])
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const navigate = useNavigate()

    const updateCart = () => {
        userService.getCart().then((response) => {
            setData(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    
    useEffect(() => {
        updateCart()
    }, [])

    const add = (itemId, change) => {
        userService.addItem(itemId, change).then((response) => {
            updateCart()
        }).catch((err) => {
            console.log(err)
        })
    }

    const remove = (itemId, change, currentQuantity) => {
        if (currentQuantity > 1) {
            userService.addItem(itemId, change).then((response) => {
                updateCart()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const removeAll = (itemId) => {
        userService.addItem(itemId, 'removeAll').then((response) => {
            updateCart()
        }).catch((err) => {
            console.log(err)
        })
    }

    const createOrder = () => {
        updateCart()
        userService.createOrder(data).then((response) => {
            navigate('/my-orders')
        }).catch((err) => {
            console.log(err)
        })
    }

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    if (data.length === 0) {
        return <div className="m-5">
            <p>Cart is empty</p>
            <button onClick={() => navigate('/')}>Go shopping</button>
        </div>
    }

    return (
        <div className="d-flex justify-content-start flex-wrap m-5">
            {data.map((item) => {
                return <ProductCard key={item.id}>
                    <div className="card-body">
                        <LinkCard to={"/products/" + item.id}>{item.name}</LinkCard>
                        <p className="card-text">{item.description}</p>
                        {/* <p>Quantity: {item.Cart.quantity}</p>
                        <CartButton onClick={() => remove(item.id, -1, item.Cart.quantity)}>-</CartButton>
                        <CartButton onClick={() => add(item.id, 1)}>+</CartButton> */}
                        <CartAdder item={item}/>
                        <RemoveAllButton onClick={() => removeAll(item.id)}>X</RemoveAllButton>
                    </div>
                </ProductCard>
            })}
            <p>Product count: {data.reduce((sum, item) => sum + item.Cart.quantity, 0)}</p>
            <p>Total price: {data.reduce((sum, item) => sum + item.price * item.Cart.quantity, 0)}</p>
            {data.length > 0 && <button onClick={createOrder}>Buy</button>}
        </div>
    )
}

export default Cart