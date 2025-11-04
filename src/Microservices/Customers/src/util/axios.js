const axios = require('axios');

module.exports.MakeAxiosRequest = async (url, data) => {
    const options = {
        method: 'GET',
        url: url,
        params: { 'api-version': '3.0' },
        headers: {
            'content-type': 'application/json'
        }
    };

    const res = await axios.request(options).then(function(response){
        return response.data;
    }).catch(function (err){
        // console.log(err);
    })

    return res;
}


module.exports.MakeAxiosTokenRequest = async (url) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bil="https://test.heartlandpaymentservices.net/BillingDataManagement/v3/BillingDataManagementService" xmlns:bdms="http://schemas.datacontract.org/2004/07/BDMS.NewModel">
   <soapenv:Header/>
   <soapenv:Body>
      <bil:LoadSecurePayDataExtended>
         <bil:request>
            <bdms:BollettaVersion>6000</bdms:BollettaVersion>
            <bdms:Credential>
               <bdms:ApplicationID>3</bdms:ApplicationID>
               <bdms:Password>{{Password}}</bdms:Password>
               <bdms:UserName>SmokeTestApiUser</bdms:UserName>
               <bdms:MerchantName>{{MerchantName}}</bdms:MerchantName>
            </bdms:Credential>
            <!--bdms:BINRangesToDeny>?</bdms:BINRangesToDeny-->
            <bdms:BillData>
               <bdms:SecurePayBill>
                  <!--bdms:Amount>?</bdms:Amount>
                  <bdms:BillTypeName>?</bdms:BillTypeName>
                  <bdms:Identifier1>?</bdms:Identifier1>
                  <bdms:Identifier2>?</bdms:Identifier2>
                  <bdms:Identifier3>?</bdms:Identifier3>
                  <bdms:Identifier4>?</bdms:Identifier4-->
                  <bdms:Amount>10</bdms:Amount>
                  <bdms:BillTypeName>Tax Payments</bdms:BillTypeName>
                 <bdms:Identifier1>9879871</bdms:Identifier1>
               </bdms:SecurePayBill>
            </bdms:BillData>
            <bdms:PayorAddressIsEditable>true</bdms:PayorAddressIsEditable>
            <bdms:PayorBusinessNameIsEditable>true</bdms:PayorBusinessNameIsEditable>
            <bdms:PayorCityIsEditable>true</bdms:PayorCityIsEditable>
            <bdms:PayorCountryIsEditable>true</bdms:PayorCountryIsEditable>
            <bdms:PayorEmailAddressIsEditable>true</bdms:PayorEmailAddressIsEditable>
            <bdms:PayorFirstNameIsEditable>true</bdms:PayorFirstNameIsEditable>
            <bdms:PayorLastNameIsEditable>true</bdms:PayorLastNameIsEditable>
            <bdms:PayorMiddleNameIsEditable>true</bdms:PayorMiddleNameIsEditable>
            <bdms:PayorPhoneNumberIsEditable>true</bdms:PayorPhoneNumberIsEditable>
            <bdms:PayorPostalCodeIsEditable>true</bdms:PayorPostalCodeIsEditable>
            <bdms:PayorStateIsEditable>true</bdms:PayorStateIsEditable>
		  <bdms:SecurePayPaymentType_ID>1</bdms:SecurePayPaymentType_ID>
         </bil:request>
      </bil:LoadSecurePayDataExtended>
   </soapenv:Body>
</soapenv:Envelope>`;

    const options = {
        method: 'POST',
        url: url,
        params: { 'api-version': '3.0' },
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            "SOAPAction":'https://test.heartlandpaymentservices.net/BillingDataManagement/v3/BillingDataManagementService/IBillingDataManagementService/LoadSecurePayDataExtended',
        },
        body: xml,
    };
    console.log('options', options);
    const res = await axios.request(options).then(function(response){
        console.log('response', response);
        return response.data;
    }).catch(function (err){
        // console.log(err);
    })
    console.log(res);
    return res;
}