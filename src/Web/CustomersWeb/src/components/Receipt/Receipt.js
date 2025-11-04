import React from 'react';
import { useLocation } from "react-router-dom";
import './Receipt.css';

function ReceiptPage() {
    let location = useLocation();
    console.log('location storage', JSON.stringify(location.state.content));
    let locationParse = '';
    if(location.state.receiptValid){
        locationParse = JSON.stringify(location.state.content, null, 2);
    }
    else{
        locationParse = "Receipt has expired";
    }
    return (
        <div className="receipt-page">
            <pre className="receipt-page__content">{locationParse}</pre>
        </div>
    );
}

export default ReceiptPage;