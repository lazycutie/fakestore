import './style.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Stack  from 'react-bootstrap/Stack';
import { addtoCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react'
import Loader from './output-onlinegiftools.gif'
import { getItems } from './Items';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const home = (props) => {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false)
  let [total, setTotal] = useState()
  const { carts } = useSelector((state) => state.allCart)
  const skips = useRef(0);
  const dispatch = useDispatch();
  const idk = async () => {
    try {
      console.log(idk)
      setLoading(true)
      const itemsResponse = await getItems(props.cat, skips.current, 9);
      setTotal(itemsResponse.total);
      setData(itemsResponse.products);
      setLoading(false)
      console.log(itemsResponse.products)
      console.log(itemsResponse.total);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("total : " + total)
  console.log("items per page : " + skips.current / 8)
  console.log("number of pages : " + Math.ceil(total / 8))
  useEffect(() => {
    idk();
  }, []);

  function nexxt() {
    skips.current += 9;
    idk();
  }

  function prevv() {
    skips.current -= 9;
    if (skips.current < 0) skips.current = 0;
    idk();
  }
  const send = (e) => {
    dispatch(addtoCart(e));
    toast.success("Item added in your cart");
  };

  return (
    <div>
      <section className='item_section mt-4 container d-flex justify-content-center'>
        <div className="p-2"><h2 className='px-4' style={{ fontWeight: "400px" }}>Welcome to MY FAKE STORE</h2>
        </div>
      </section>{carts.length>0?<span id='ex4'style={{display:"flex",justifyContent:"center",alignItems:"end"}}>
        <Button variant="light" size='sm' style={{position:"fixed",bottom:"0",zIndex:"3",opacity:"0.7"}}><NavLink to="/cart" className="text decoration-none text-light mx-2"> 
            <span style={{ color: "#475F7B", fontSize: "30px", marginRight:"20px"}}>To Cart</span>
            <span className='p1 fa-stack fa-2x has-badge' style={{ color: "black"}} data-count={carts.length}>
              <i style={{ color: "#475F7B", fontSize:"20px"}} className="fa-solid fa-cart-shopping"></i>
            </span>
        </NavLink></Button>
      </span>:""}
      
      <div className='row mt-2 d-flex justify-content-around align-items-center'>
        {loading && <img src={Loader} className=' d-flex justify-content-center align-items-center' style={{ width: "300px" }} />}
        {!loading &&
          data.map((element, index) => {
            return (

              <Card style={{ width: "22rem", border: "none", color: "#475F7B" }} className='hove mb-4' key={index}>
                <Card.Img variant="top" className="cd" src={element.thumbnail} />
                <div className="card_body">
                  <div className="upper_data d-flex justify-content-between align-items-center">
                    <h4 className='mt-2'>{element.title}</h4>
                    <span> {Math.round(element.rating * 10) / 10}&nbsp; ★</span>
                  </div>
                  <div className="lower_data justify-content-between">
                    <h5>{element.category}</h5>
                    <span>Price:${element.price}</span>
                  </div>
                  <div className="extra"></div>
                  <div className="last_data d-flex justify-content-center align-items-center">
                    <Button style={{ width: "150px", background: '#ff3054db', border: 'none' }} variant='outline-light' className='mt-2 mb-2' onClick={() => send(element)}>Add to Cart</Button>
                    <h5>{element.app_category}</h5>
                  </div>
                </div>
              </Card>
            )
          })} 
      <Stack direction="horizontal" gap={3}>
      <div className="p-2">  <Button disabled={skips.current == 0} onClick={prevv}>previous</Button></div>
      <div className="p-2 ms-auto"><Button disabled={Math.ceil((skips.current + 1) / 9) >= Math.ceil(total / 9)} onClick={nexxt}>next</Button></div>
     
    </Stack>
      </div>
    </div>
  )
}

export default home


