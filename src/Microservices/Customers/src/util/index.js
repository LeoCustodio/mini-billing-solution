const ampqlib = require('amqplib');
const config = require('../config');
const jwt = require('jsonwebtoken');
var convert = require('xml-js');
var DOMParser = new (require('xmldom')).DOMParser;

const { APP_SECRET, HEARTLANDUSERNAME, HEARTLANDMERCHANTNAME, HEARTLANDAPIPASSWORD } = require('../config');

/* =========================== Message Broker ===========================*/

//create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await ampqlib.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();
    await channel.assertExchange(config.rabbitMQ.tranexchangename, 'direct', false);
    return channel;
  } catch (err) {
    throw err;
  }
}

//publish message
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(config.rabbitMQ.tranexchangename, binding_key, Buffer.from(message));
    console.log('Message has been sent');
  } catch (err) {
    throw err;
  }
}


//subscribe message
module.exports.SubscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(config.rabbitMQ.tranqueue);
  channel.bindQueue(appQueue.queue, config.rabbitMQ.tranexchangename, binding_key);
  channel.consume(appQueue.queue, data => {
    console.log('received data');
    console.log(data.content.toString());
    service.SubscribeEvents(data.content.toString())
    channel.ack(data);
  })
}

/* =========================== Token Receipt ===========================*/

module.exports.VerifyTokenReceipt = (token) => {
  try {
    const decoded = jwt.verify(token, APP_SECRET);

    return true;
  } catch (err) {
    return false;
  }

};

module.exports.CreateTokenReceipt = () => {
  const token = jwt.sign({}, APP_SECRET, {
    expiresIn: '2m',
  });
  return token;
}

/* =========================== build LoadSecurepayDataExtendedXML ===========================*/
module.exports.buildXml = (form) => {
  const ns = "bdms";
  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const billsXml = form.BillData
    .map(
      (b) => `
        <${ns}:SecurePayBill>
          <${ns}:Amount>${esc(b.Amount)}</${ns}:Amount>
          <${ns}:BillTypeName>${esc(b.BillTypeName)}</${ns}:BillTypeName>
          <${ns}:Identifier1>${esc(b.Identifier1)}</${ns}:Identifier1>
          <${ns}:Identifier2>${esc(b.Identifier2)}</${ns}:Identifier2>
          <${ns}:Identifier3>${esc(b.Identifier3)}</${ns}:Identifier3>
          <${ns}:Identifier4>${esc(b.Identifier4)}</${ns}:Identifier4>
        </${ns}:SecurePayBill>`
    )
    .join("");

  const XMLFormmated = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bil="https://test.heartlandpaymentservices.net/BillingDataManagement/v3/BillingDataManagementService" xmlns:bdms="http://schemas.datacontract.org/2004/07/BDMS.NewModel">
      <soapenv:Header/>
      <soapenv:Body>
        <bil:LoadSecurePayDataExtended>
          <bil:request>
            <${ns}:BollettaVersion>6000</${ns}:BollettaVersion>
            <${ns}:Credential>
              <${ns}:ApplicationID>${esc(form.credential.ApplicationID)}</${ns}:ApplicationID>
              <${ns}:Password>${esc(HEARTLANDAPIPASSWORD)}</${ns}:Password>
              <${ns}:UserName>${esc(HEARTLANDUSERNAME)}</${ns}:UserName>
              <${ns}:MerchantName>${esc(HEARTLANDMERCHANTNAME)}</${ns}:MerchantName>
            </${ns}:Credential>
            <${ns}:BillData>${billsXml}</${ns}:BillData>
            <${ns}:MaxFuturePaymentDays>${esc(form.MaxFuturePaymentDays)}</${ns}:MaxFuturePaymentDays>
            <${ns}:PaymentMethodsToDeny>${esc(form.PaymentMethodsToDeny)}</${ns}:PaymentMethodsToDeny>
            <${ns}:PayorAddress>${esc(form.PayorAddress)}</${ns}:PayorAddress>
            <${ns}:PayorAddressIsEditable>${form.PayorAddressIsEditable}</${ns}:PayorAddressIsEditable>
            <${ns}:PayorCity>${esc(form.PayorCity)}</${ns}:PayorCity>
            <${ns}:PayorCityIsEditable>${form.PayorCityIsEditable}</${ns}:PayorCityIsEditable>
            <${ns}:PayorCountry>${esc(form.PayorCountry)}</${ns}:PayorCountry>
            <${ns}:PayorCountryIsEditable>${form.PayorCountryIsEditable}</${ns}:PayorCountryIsEditable>
            <${ns}:PayorEmailAddress>${esc(form.PayorEmailAddress)}</${ns}:PayorEmailAddress>
            <${ns}:PayorEmailAddressIsEditable>${form.PayorEmailAddressIsEditable}</${ns}:PayorEmailAddressIsEditable>
            <${ns}:PayorFirstName>${esc(form.PayorFirstName)}</${ns}:PayorFirstName>
            <${ns}:PayorFirstNameIsEditable>${form.PayorFirstNameIsEditable}</${ns}:PayorFirstNameIsEditable>
            <${ns}:PayorLastName>${esc(form.PayorLastName)}</${ns}:PayorLastName>
            <${ns}:PayorLastNameIsEditable>${form.PayorLastNameIsEditable}</${ns}:PayorLastNameIsEditable>
            <${ns}:PayorMiddleName>${esc(form.PayorMiddleName)}</${ns}:PayorMiddleName>
            <${ns}:PayorMiddleNameIsEditable>${form.PayorMiddleNameIsEditable}</${ns}:PayorMiddleNameIsEditable>
            <${ns}:PayorPhoneNumber>${esc(form.PayorPhoneNumber)}</${ns}:PayorPhoneNumber>
            <${ns}:PayorPhoneNumberIsEditable>${form.PayorPhoneNumberIsEditable}</${ns}:PayorPhoneNumberIsEditable>
            <${ns}:PayorPostalCode>${esc(form.PayorPostalCode)}</${ns}:PayorPostalCode>
            <${ns}:PayorPostalCodeIsEditable>${form.PayorPostalCodeIsEditable}</${ns}:PayorPostalCodeIsEditable>
            <${ns}:PayorState>${esc(form.PayorState)}</${ns}:PayorState>
            <${ns}:PayorStateIsEditable>${form.PayorStateIsEditable}</${ns}:PayorStateIsEditable>
            <${ns}:SecurePayPaymentType_ID>${esc(form.SecurePayPaymentType_ID)}</${ns}:SecurePayPaymentType_ID>
          </bil:request>
        </bil:LoadSecurePayDataExtended>
      </soapenv:Body>
    </soapenv:Envelope>`;

  return XMLFormmated;;
};



//parse XML
module.exports.parseXML = (xml) => {
  let result = convert.xml2json(xml, { compact: true, spaces: 4 });
  return JSON.parse(result);
}
