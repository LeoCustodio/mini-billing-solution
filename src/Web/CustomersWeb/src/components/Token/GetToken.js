import React, { useState } from "react";
import "./GetToken.css";

export default function GetTokenPage() {
  const [form, setForm] = useState({
    credential: {
      ApplicationID: "3",
      Password: "$Test1234",
      UserName: "SmokeTestApiUser",
      MerchantName: "QA_Merchant_2",
    },
    BINRangesToDeny: "1234, 2345",
    BillData: [
      { Amount: "10.00", BillTypeName: "Tax Payments", Identifier1: "9879871", Identifier2: "1", Identifier3: "1", Identifier4: "1" },
      { Amount: "11.00", BillTypeName: "Tax Payments", Identifier1: "9879872", Identifier2: "2", Identifier3: "2", Identifier4: "2" },
      { Amount: "12.00", BillTypeName: "Tax Payments", Identifier1: "9879873", Identifier2: "3", Identifier3: "3", Identifier4: "3" },
    ],
    MaxFuturePaymentDays: "0",
    PaymentMethodsToDeny: "AmExCredit,DiscoverCredit,MastercardCredit,VisaCredit",
    PayorAddress: "12222 West Avenue",
    PayorAddressIsEditable: true,
    PayorCity: "El Paso",
    PayorCityIsEditable: true,
    PayorCountry: "United States",
    PayorCountryIsEditable: true,
    PayorEmailAddress: "leonardo.custodio@e-hps.com",
    PayorEmailAddressIsEditable: true,
    PayorFirstName: "Leo",
    PayorFirstNameIsEditable: true,
    PayorLastName: "Hill",
    PayorLastNameIsEditable: true,
    PayorMiddleName: "K",
    PayorMiddleNameIsEditable: true,
    PayorPhoneNumber: "1234564578",
    PayorPhoneNumberIsEditable: true,
    PayorPostalCode: "12345",
    PayorPostalCodeIsEditable: true,
    PayorState: "TX",
    PayorStateIsEditable: true,
    SecurePayPaymentType_ID: "1",
  });

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState(null);

  const onField = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const onCred = (key) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, credential: { ...f.credential, [key]: val } }));
  };

  const onBill = (i, key) => (e) => {
    const val = e.target.value;
    setForm((f) => {
      const next = [...f.BillData];
      next[i] = { ...next[i], [key]: val };
      return { ...f, BillData: next };
    });
  };

  const addBill = () => {
    setForm((f) => ({
      ...f,
      BillData: [
        ...f.BillData,
        { Amount: "", BillTypeName: "", Identifier1: "", Identifier2: "", Identifier3: "", Identifier4: "" },
      ],
    }));
  };

  const removeBill = (i) => {
    setForm((f) => ({ ...f, BillData: f.BillData.filter((_, idx) => idx !== i) }));
  };


  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResp(null);
    setError(null);
    try {
      await fetch('http://localhost:8081/customer/createtokenrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token'
        },
        body: JSON.stringify(form),
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            window.location.href = `https://staging.heartlandpaymentservices.net/webpayments/QA_Merchant_2/GUID/${json}`;
            return alert("Token Created Successfully")
          })
        }
      });
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="card">
        <header className="card__header">
          <h1>Get Token</h1>
          <p className="muted">
            Fill the required fields and post a <code>text/xml</code> SOAP envelope to LoadSecurePayDataExtended endpoint.
          </p>
        </header>

        <form onSubmit={submit} className="form">
          <fieldset>
            <legend>Credential</legend>
            <div className="grid grid-2">
              <label>ApplicationID <input value={form.credential.ApplicationID} onChange={onCred("ApplicationID")} /></label>
              <label>UserName <input value={form.credential.UserName} onChange={onCred("UserName")} /></label>
              <label>MerchantName <input value={form.credential.MerchantName} onChange={onCred("MerchantName")} /></label>
              <label>Password <input type="password" value={form.credential.Password} onChange={onCred("Password")} /></label>
            </div>
          </fieldset>

          <label>BINRangesToDeny <input value={form.BINRangesToDeny} onChange={onField("BINRangesToDeny")} /></label>

          <fieldset>
            <legend>BillData</legend>
            {form.BillData.map((b, i) => (
              <div key={i} className="bill">
                <div className="grid grid-3">
                  <label>Amount <input value={b.Amount} onChange={onBill(i, "Amount")} /></label>
                  <label>BillTypeName <input value={b.BillTypeName} onChange={onBill(i, "BillTypeName")} /></label>
                  <label>Identifier1 <input value={b.Identifier1} onChange={onBill(i, "Identifier1")} /></label>
                  <label>Identifier2 <input value={b.Identifier2} onChange={onBill(i, "Identifier2")} /></label>
                  <label>Identifier3 <input value={b.Identifier3} onChange={onBill(i, "Identifier3")} /></label>
                  <label>Identifier4 <input value={b.Identifier4} onChange={onBill(i, "Identifier4")} /></label>
                </div>
                <button type="button" className="btn btn-light" onClick={() => removeBill(i)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn" onClick={addBill}>+ Add Bill</button>
          </fieldset>

          <label>MaxFuturePaymentDays <input value={form.MaxFuturePaymentDays} onChange={onField("MaxFuturePaymentDays")} /></label>
          <label>PaymentMethodsToDeny <input value={form.PaymentMethodsToDeny} onChange={onField("PaymentMethodsToDeny")} /></label>

          <fieldset>
            <legend>Payor</legend>
            <div className="grid grid-2">
              <label>Address <input value={form.PayorAddress} onChange={onField("PayorAddress")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorAddressIsEditable} onChange={onField("PayorAddressIsEditable")} /> Address Is Editable</label>

              <label>City <input value={form.PayorCity} onChange={onField("PayorCity")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorCityIsEditable} onChange={onField("PayorCityIsEditable")} /> City Is Editable</label>

              <label>Country <input value={form.PayorCountry} onChange={onField("PayorCountry")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorCountryIsEditable} onChange={onField("PayorCountryIsEditable")} /> Country Is Editable</label>

              <label>Email <input type="email" value={form.PayorEmailAddress} onChange={onField("PayorEmailAddress")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorEmailAddressIsEditable} onChange={onField("PayorEmailAddressIsEditable")} /> Email Is Editable</label>

              <label>First Name <input value={form.PayorFirstName} onChange={onField("PayorFirstName")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorFirstNameIsEditable} onChange={onField("PayorFirstNameIsEditable")} /> First Name Is Editable</label>

              <label>Last Name <input value={form.PayorLastName} onChange={onField("PayorLastName")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorLastNameIsEditable} onChange={onField("PayorLastNameIsEditable")} /> Last Name Is Editable</label>

              <label>Middle Name <input value={form.PayorMiddleName} onChange={onField("PayorMiddleName")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorMiddleNameIsEditable} onChange={onField("PayorMiddleNameIsEditable")} /> Middle Name Is Editable</label>

              <label>Phone <input value={form.PayorPhoneNumber} onChange={onField("PayorPhoneNumber")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorPhoneNumberIsEditable} onChange={onField("PayorPhoneNumberIsEditable")} /> Phone Is Editable</label>

              <label>Postal Code <input value={form.PayorPostalCode} onChange={onField("PayorPostalCode")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorPostalCodeIsEditable} onChange={onField("PayorPostalCodeIsEditable")} /> Postal Code Is Editable</label>

              <label>State <input value={form.PayorState} onChange={onField("PayorState")} /></label>
              <label className="check"><input type="checkbox" checked={form.PayorStateIsEditable} onChange={onField("PayorStateIsEditable")} /> State Is Editable</label>
            </div>
          </fieldset>

          <label>SecurePayPaymentType_ID <input value={form.SecurePayPaymentType_ID} onChange={onField("SecurePayPaymentType_ID")} /></label>

          <div className="actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Sending..." : "Request Token"}
            </button>
          </div>
        </form>

        {error && <pre className="error">Error: {error}</pre>}
        {resp && <pre className="response">{resp}</pre>}
      </div>
    </div>
  );
}
