import React,{useState, useEffect} from 'react';
import clayful from 'clayful/client-js';

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
}
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
	        console.log(data);
        });
    };
    return (
        <div>
            PaymentPage
        </div>
    )
}

export default PaymentPage;
