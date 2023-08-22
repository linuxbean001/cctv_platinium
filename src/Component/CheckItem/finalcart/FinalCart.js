import React from 'react'
import Container from 'react-bootstrap/Container';
import './index.css'
import Papa from "papaparse";

function FinalCart() {
    const [data, setData] = React.useState([]);
    const imgUrl_1 = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
    const imgUrl_2 = 'https://plus.unsplash.com/premium_photo-1675016457613-2291390d1bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
    const imgUrl_3 = 'https://images.unsplash.com/photo-1600069620961-8bee77c2e28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80';

    React.useEffect(() => {
        const fetchData = async () => {
        //   const file = "csv/products.csv";
        //   const response = await fetch(file);
        //   const csvText = await response.text();
        //   const parsedData = Papa.parse(csvText, { header: true }).data;
          
        //   setData(parsedData);
        };
        fetchData();
      }, []);

  return (
        <>
        <Container fluid className='final_container py-5'>
        <div className="card p-4">
            <div className="row">
                <div className="col-md-7 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col d-flex justify-content-end text-muted">3 items</div>
                        </div>
                    </div>    
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center py-4">
                            <div className="col-2"><img className="img-fluid" src={imgUrl_1}/></div>
                            <div className="col">
                                <div className="row text-muted fs-6 fw-bold">Security Camera</div>
                                <div className="row item_desc">Best range of security</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row main align-items-center py-4">
                            <div className="col-2"><img className="img-fluid" src={imgUrl_2}/></div>
                            <div className="col">
                                <div className="row text-muted fs-6 fw-bold">Home CCTV </div>
                                <div className="row item_desc">Best range of cctv</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center py-4">
                            <div className="col-2"><img className="img-fluid" src={imgUrl_3}/></div>
                            <div className="col">
                                <div className="row text-muted fs-6 fw-bold">NVR Recorders</div>
                                <div className="row item_desc">Best range of NVR</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div className="back-to-shop"><a href="#">  </a><span className="text-muted">Back to shop</span></div>
                </div>
                <div className="col-md-3 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{paddingLeft:'0'}}>ITEMS 3</div>
                        <div className="col text-right">&euro; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                       
                        <select>
                        
                        {data.map((options)=>{
                            return(
                                <option className="text-muted">{options.name}</option>
                            )
                           
                        })}
                        
                        
                        <option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code"/>
                    </form>
                    <div className="row" style={{border:'1px solid rgba(0,0,,0.1)',padding:'2vh 0'}}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&euro; 137.00</div>
                    </div>
                    <button className="btn">CHECKOUT</button>
                </div>
            </div>
            
        </div>
        </Container>
          
        </>
  )
}

export default FinalCart