import styled from "styled-components";
import Announcement from "../componets/Announcement";
import Footer from "../componets/Footer";
import Navbar from "../componets/Navbar";
import Newsletter from "../componets/Newsletter";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { mobil } from "../responsibe";
import { publicRequest } from "../requestMethods.js"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'




const Container = styled.div`

`;

const Wrapper = styled.div`
padding: 50px;
display: flex;

${mobil({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobil({ height: "50vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

  ${mobil({ padding: "10px" })}
`;

const Title = styled.h1`
 font-weight: 200;
`;

const Desc = styled.p`
margin: 20px 0px;
`;

const Price = styled.span`
font-weight: 200;
font-size: 40px;
`;

const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display:flex;
justify-content: space-between;

${mobil({ width: "100%" })}
`;


const Filter = styled.div`
display: flex;
align-items: center;
`;


const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;


const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
margin: 0px 5px;
cursor: pointer;
`;


const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
`;


const FilterSizeOption = styled.option``;


const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;

${mobil({ width: "100%" })}
`;


const AmountContainer = styled.div`
display:flex;
align-items: center;
font-weight: 700;
`;


const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border : 1px solid darkviolet;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;


const Button = styled.button`
    padding: 15px;
    border: 2px solid darkviolet;
    background-color: white;
    cursor: pointer;
    font-weight: 900;

    &:hover  {
        background-color: #c9a1d8 ;
    }
`;





const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
              /*   console.log("Esto es res", res.data) */
            } catch (error) {
                console.log(error)
            }
        }
        getProduct();
    }, [id])


    const handleQuantity = (type) => {
        if (type === "desc") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    };

    const handleClick = () => {
        // subir las cosas al carrito
        dispatch(
            addProduct({...product, quantity, color, size })
        )
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {
                                product.color?.map((c) => (
                                    <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                                ))
                            }
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {
                                    product.size?.map((s) => (
                                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                    ))
                                }
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <DeleteIcon onClick={() => handleQuantity('desc')} />
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity('asc')} />
                        </AmountContainer>
                        <Button onClick={handleClick}>AÑADIR AL CARRO</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
