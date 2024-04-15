import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { setError } from "./actions/errors"
import { AddButton, CardImg, LinkCard, ProductCard, Search } from "./styled"


function Products() {
    const [data, setData] = useState([])
    const [cart, setCart] = useState([])
    const [search, setSearch] = useState("")
    const [sortType, setSortType] = useState("aphabet")
    const [sortReverse, setSortReverse] = useState(false)
    const [addedTimeout, setAddedTimeout] = useState([])
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const message = useSelector((state) => state.message.message)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        userService.GetProducts().then((response) => {
            if (response.data && response.data.length > 0) {
                setData(response.data.sort((a, b) => a.name.localeCompare(b.name, 'en')))
            }
        }).catch(err => {
            dispatch(setError(err))
        })
        // userService.getCart().then((response) => {
        //     setCart(response.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }, [dispatch])
    const addCart = (itemId) => {
        if (isLoggedIn) {
            userService.addCart(itemId).then(() => {

                // setAddedTimeout(prev => {
                //     const upd = [...prev]
                //     upd[itemId] = true
                //     return upd
                // })
                // setTimeout(() => {
                //     setAddedTimeout(prev => {
                //         const upd = [...prev]
                //         upd[itemId] = false
                //         return upd
                //     })
                // }, 1500)
            }).catch((err) => {
                dispatch(setError(err))
            })
        } else {
            navigate('/signin', {state: itemId})
        }
    }
    const changeSeacrh = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const sortProducts = (e) => {
        let str = e.target.value
        if (str.includes('D')) {
            setSortReverse(true)
            str = str.slice(0, -1)
        } else {
            setSortReverse(false)
        }
        console.log(str)
        setSortType(str)
    }

    useEffect(() => {
        if (data.length > 0) {
            if (sortType === "alphabet") {
                setData([...data].sort((a, b) => a.name.localeCompare(b.name, 'en')))
            } else if (sortType === "date") {
                setData([...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
            } else if (sortType === "price") {
                setData([...data].sort((a, b) => a.price - b.price))
            }
            if (sortReverse) {
                setData([...data].reverse())
            }
        }

    }, [sortType, sortReverse])

    return (
        <div>
            <Search id="search" onChange={changeSeacrh}></Search>
            <label htmlFor="search">Search</label>
            <select onChange={sortProducts}>
                <option value="alphabet">По алфавиту (Возр.)</option>
                <option value="alphabetD">По алфавиту (Уб.)</option>
                <option value="date">По дате (Возр.)</option>
                <option value="dateD">По дате (Уб.)</option>
                <option value="price">По цене (Возр.)</option>
                <option value="priceD">По цене (Уб.)</option>
            </select>
            <div className="d-flex justify-content-start flex-wrap">

                {data.map((item) => {
                    if (item.name.toLowerCase().includes(search)) {
                        return <ProductCard key={item.id}>
                            <CardImg src={item.image}></CardImg>
                            
                            <div className="card-body">
                                <LinkCard to={"/products/" + item.id}>{item.name}</LinkCard>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.price} rub</p>
                                <AddButton onClick={() => addCart(item.id)}>Add to cart</AddButton>
                                {addedTimeout[item.id] && <p>Added!</p>}
                            </div>
                        </ProductCard>
                    }
                    return ''
                })}
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                        {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products