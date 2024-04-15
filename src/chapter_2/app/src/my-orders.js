import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { LinkCard, OrderCard } from "./styled"


function MyOrders() {
    const [data, setData] = useState([])
    const [sortType, setSortType] = useState("date")
    const [sortReverse, setSortReverse] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    useEffect(() => {
        userService.getMyOrders().then((response) => {
            setData(response.data)
            if (response.data && response.data.length > 0) {
                setData(data => [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    if (!isLoggedIn) {
        <Navigate to='/' />
    }
    const sortOrders = (e) => {
        let str = e.target.value
        if (str.includes('D')) {
            setSortReverse(true)
            str = str.slice(0, -1)
        } else {
            setSortReverse(false)
        }
        setSortType(str)
    }
    useEffect(() => {
        if (data.length > 0) {
            if (sortType === "date") {
                setData([...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
            } else if (sortType === "cost") {
                setData([...data].sort((a, b) => a.cost - b.cost))
            }
            if (sortReverse) {
                setData([...data].reverse())
            }
        }
    }, [sortType, sortReverse])
    if (data.length === 0) {
        return <p>No orders yet</p>
    }
    return (
        <div>
            <select onChange={sortOrders} className="m-5">
                <option value="date">По дате (Возр.)</option>
                <option value="dateD">По дате (Уб.)</option>
                <option value="cost">По цене (Возр.)</option>
                <option value="costD">По цене (Уб.)</option>
            </select>
            <div className="d-flex flex-row justify-content-start flex-wrap">
                {data.map((order) => {
                    return <OrderCard key={order.id}>
                        <div>
                            <h3 className="card-title">Order #{order.id}</h3>
                            <p className="card-text" style={{position: 'absolute', bottom: '10px'}}>Order date: {order.date}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-evenly">
                            {order.orderedItem.map((item) => {
                                return <p><LinkCard to={"/products/" + item.id}>{item.name}</LinkCard> </p>
                            })}
                        </div>
                        <div>
                            <p>{order.cost}</p>
                        </div>
                    </OrderCard>
                })}
            </div>
        </div>
    )
}

export default MyOrders