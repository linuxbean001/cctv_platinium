import React from 'react'
import Container from 'react-bootstrap/Container';
import './index.css'

function FinalCart() {
    const imgUrl_1 = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
    const imgUrl_2 = 'https://plus.unsplash.com/premium_photo-1675016457613-2291390d1bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
    const imgUrl_3 = 'https://images.unsplash.com/photo-1600069620961-8bee77c2e28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80';

  return (
        <>
        <Container fluid className='final_container py-5'>
        <div class="card">
            <div class="row">
                <div class="col-md-8 cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Shopping Cart</b></h4></div>
                            <div class="col d-flex justify-content-end text-muted">3 items</div>
                        </div>
                    </div>    
                    <div class="row border-top border-bottom">
                        <div class="row main align-items-center py-4">
                            <div class="col-2"><img class="img-fluid" src={imgUrl_1}/></div>
                            <div class="col">
                                <div class="row text-muted fs-6 fw-bold">Security Camera</div>
                                <div class="row item_desc">Best range of security</div>
                            </div>
                            <div class="col">
                                <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                            </div>
                            <div class="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row main align-items-center py-4">
                            <div class="col-2"><img class="img-fluid" src={imgUrl_2}/></div>
                            <div class="col">
                                <div class="row text-muted fs-6 fw-bold">Home CCTV </div>
                                <div class="row item_desc">Best range of cctv</div>
                            </div>
                            <div class="col">
                                <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                            </div>
                            <div class="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div class="row border-top border-bottom">
                        <div class="row main align-items-center py-4">
                            <div class="col-2"><img class="img-fluid" src={imgUrl_3}/></div>
                            <div class="col">
                                <div class="row text-muted fs-6 fw-bold">NVR Recorders</div>
                                <div class="row item_desc">Best range of NVR</div>
                            </div>
                            <div class="col">
                                <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                            </div>
                            <div class="col">&euro; 44.00 </div>
                        </div>
                    </div>
                    <div class="back-to-shop"><a href="#">  </a><span class="text-muted">Back to shop</span></div>
                </div>
                <div class="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div class="row">
                        <div class="col" style={{paddingLeft:'0'}}>ITEMS 3</div>
                        <div class="col text-right">&euro; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select><option class="text-muted">Standard-Delivery- &euro;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code"/>
                    </form>
                    <div class="row" style={{border:'1px solid rgba(0,0,,0.1)',padding:'2vh 0'}}>
                        <div class="col">TOTAL PRICE</div>
                        <div class="col text-right">&euro; 137.00</div>
                    </div>
                    <button class="btn">CHECKOUT</button>
                </div>
            </div>
            
        </div>
        </Container>
          
        </>
  )
}

export default FinalCart