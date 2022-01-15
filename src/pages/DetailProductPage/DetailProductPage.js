import React, { useState , useEffect } from 'react';
import { useParams } from "react-router-dom";
import clayful from "clayful/client-js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DetailProductPage() {
    const params = useParams();
    const productId = params.productId;
    const [item, setItem] = useState({});

    useEffect(() => {
        let Product = clayful.Product;
        let options = {};
        Product.get(productId, options, function (err, result){
            if (err) {
            //Error case
                console.log(err.code);
                return;
            }
            let data = result.data;
            setItem(data);
        });
    }, []);

    return (
    <div className="pageWrapper">
        <Row>
            <Col md>
                <div>
                    <img src={item.thumbnail?.url} alt={item.name} />
                </div>
            </Col>
            <Col md></Col>
        </Row>

        <div dangerouslySetInnerHTML={{__html: item.description}} />
    </div>
    );
}

export default DetailProductPage;
