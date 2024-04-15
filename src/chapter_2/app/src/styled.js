import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProductCard = styled.div`
position: relative;
border: 1px solid black;
border-radius: 5px;
padding: 10px;
margin: 50px;
width: 18rem;
min-width: 100px;
height: 15rem;
min-height: 80px;
&:hover {
    border: 2px solid black;
}
`

export const OrderCard = styled.div`
position: relative;
border: 1px solid black;
border-radius: 5px;
padding: 10px;
margin: 50px;
width: 70%;
min-width: 200px;
height: 10rem;
min-height: 80px;
&:hover {
    border: 2px solid black;
}
`

export const LinkCard = styled(Link)`
color: black;
text-decoration: none;
font-size: 25px;
font-weight: 500;
display: block;
&:hover {
    color: black;
}
`

export const AddButton = styled.button`
&:hover {
    background-color: green;
}
`

export const CartButton = styled.button`
height: 30px;
width: 30px;
border: none;
border-radius: 15px;
margin: 5px;
background-color: green;
`

export const RemoveAllButton = styled.button`
position: absolute;
top: 0;
right: 0;
`

export const Search = styled.input`
height: 40px;
width: 80%;
max-width: 800px;
margin: 20px;
`

export const MarginedDiv = styled.div`
margin: 3rem;
`

export const CardImg = styled.img`
width: 100%;
height: 40%;
`