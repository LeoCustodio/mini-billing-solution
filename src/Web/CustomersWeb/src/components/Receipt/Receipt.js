import React, { useState } from 'react';
import { useLocation } from "react-router-dom";


function ReceiptPage() {
    let location = useLocation();
    console.log('location storage', JSON.stringify(location.state.content));
    let locationParse = '';
    if(location.state.receiptValid){
        locationParse = JSON.stringify(location.state.content);
    }
    else{
        locationParse = "Receipt has expired"
    }
    return (
        <div className="login-container">
                {locationParse}
        </div>
    );
}

export default ReceiptPage;