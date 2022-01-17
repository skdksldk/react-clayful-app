import React,{useState, useEffect} from 'react';
import clayful from 'clayful/client-js';
import "./PaymentPage.css";

function PaymentPage() {

    const [cart, setCart] = useState({});
    const [paymentMethods, setPaymentMethods] = useState([]);
   
    useEffect(() => {
        getCartData();
        getPaymentData();
    }, []);

    const getPaymentData = () => {
        var PaymentMethod = clayful.PaymentMethod;
        PaymentMethod.list({}, function(err, result) {

	if (err) {
		// Error case
		console.log(err.code);
        return;
	}

	var data = result.data;
    setPaymentMethods(data);
    });
};
    const getCartData =() => {
        var Cart = clayful.Cart;

        var options = {
	    customer: localStorage.getItem("accessToken"),
        };

        Cart.getForMe({}, options, function(err, result) {
            if (err) {
		    // Error case
		    console.log(err.code);
            }
	        var data = result.data;
            setCart(data.cart);
        });
    };
    
    return (
    <div className="pageWrapper">
        <div className="payment">
      <div 
          style={{
               width: "100%", 
               display: "flex", 
               borderBottom: "1px solid #d2d2d7",
            }}
        >
            <div style={{ width:'50%', fontSize: 24, fontWeight: 500 }}> 결재 </div>
            <div style={{ width:'50%', display: 'flex', justifyContent: 'end' }}> 
            주문 총 가격: {cart.total?.amount.raw + 3000}원 (3000원 배송비)
            </div>
        </div>

         <div style={{ marginTop:16, width:'100', display: 'flex'}}>
            <div style={{ width:'49%' }}> 
            <h5>주문자 정보</h5>
            <input type="text" name="full" placeholder="주문자명"/>
            <input type="text" name="mobile" placeholder="무선 연락처"/>
            <div>
                <input type="checkbox" id="sameInfo" name="sameInfo" />
                <label htmlFor="sameInfo">수취자 정보도 위와 동일합니다.</label> 
            </div>
            </div>
            <div style={{ width:'2%' }} /> 
            <div style={{ width:'49%' }}> 
            <h5>수취자 정보</h5>
            <input type="text" name="full" placeholder="수취자명"/>
            <input type="text" name="mobile" placeholder="무선 연락처"/>

            <h5>배송 정보</h5>
            <input type="text" readOnly placeholder="주소"/>
            <input type="text" name="address2" placeholder="상세 주소"/>
            <input type="text" readOnly placeholder="우편번호"/>

            <h5>결재</h5>
            <select>
                <option>옵션</option>
            </select>
           
            <button style={{ width: "100%", marginTop: 10 }}>주문</button>
          </div>
        </div>
      </div>
    </div> 
    );
} 
export default PaymentPage;
