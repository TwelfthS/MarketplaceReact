import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


function Cart() {
    const [data, setData] = useState([])
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

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

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    console.log(data)

    return (
        <div className="d-flex justify-content-start flex-wrap">
            {data.map((item) => {
                return <div key={item.id} className="card border border-dark m-5" style={{width: "18rem", minWidth: "100px"}}>
                    <div className="card-body">
                        <Link to={"/products/" + item.id}>{item.name}</Link>
                        <p className="card-text">{item.description}</p>
                        <p>Quantity: {item.Cart.quantity}</p>
                        <button onClick={() => add(item.id, 1)}>+</button>
                        <button onClick={() => remove(item.id, -1, item.Cart.quantity)}>-</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Cart