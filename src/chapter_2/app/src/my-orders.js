import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CardsDiv, LinkCard, MarginedDiv, OrderCard, Sorter } from "./styled"
import { setError } from "./actions/errors"


function MyOrders() {
    const [data, setData] = useState([])
    const [sortType, setSortType] = useState("date")
    const [sortReverse, setSortReverse] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        userService.getMyOrders().then((response) => {
            setData(response.data)
            if (response.data && response.data.length > 0) {
                setData(data => [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
            }
        }).catch(err => {
            dispatch(setError(err))
        })
    }, [dispatch])
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
        if (sortType === "date") {
            setData(data => [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        } else if (sortType === "cost") {
            setData(data => [...data].sort((a, b) => a.cost - b.cost))
        }
        if (sortReverse) {
            setData(data => [...data].reverse())
        }
    }, [sortType, sortReverse])
    if (data.length === 0) {
        return <MarginedDiv>
            <p>Ещё нет заказов</p>
        </MarginedDiv>
    }
    return (
        <div>
            <div style={{height: '100px'}}>
                <Sorter onChange={sortOrders} className="m-5">
                    <option value="date">По дате (Возр.)</option>
                    <option value="dateD">По дате (Уб.)</option>
                    <option value="cost">По цене (Возр.)</option>
                    <option value="costD">По цене (Уб.)</option>
                </Sorter>
            </div>
            <CardsDiv>
                {data.map((order) => {
                    return <OrderCard key={order.id}>
                        <div style={{maxWidth: '20%'}}>
                            <h3 className="card-title">Заказ #{order.id}</h3>
                            <p className="card-text" style={{position: 'absolute', bottom: '10px'}}>Дата заказа: {order.date}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-evenly position-relative" style={{maxHeight: '100%', maxWidth: '70%'}}>
                            {order.orderedItem.map((item) => {
                                return <LinkCard to={"/products/" + item.id}>
                                    <img alt={item.name} style={{width: '100%', height: '80%'}} src={item.image} />
                                    <p>Кол-во: {item.OrderItem.quantity}</p>
                                </LinkCard>
                            })}
                        </div>
                        <div style={{maxWidth: '10%', padding: '10px'}}>
                            <p>Цена: {order.cost} руб</p>
                            <p>Всего: {order.orderedItem.reduce((sum, item) => sum + item.OrderItem.quantity, 0)}</p>
                        </div>
                    </OrderCard>
                })}
            </CardsDiv>
        </div>
    )
}

export default MyOrders