import React, { useState } from 'react';
import './Token.css';

const TOKEN_ENDPOINT = 'http://localhost:8081/token';

const createInitialFormState = () => ({
  credential: {
    ApplicationID: '3',
    Password: '$Test1234',
    UserName: 'SmokeTestApiUser',
    MerchantName: 'QA_Merchant_2',
  },
  BINRangesToDeny: '1234, 2345',
  BillData: [
    {
      Amount: '10.00',
      BillTypeName: 'Tax Payments',
      Identifier1: '9879871',
      Identifier2: '1',
      Identifier3: '1',
      Identifier4: '1',
    },
    {
      Amount: '11.00',
      BillTypeName: 'Tax Payments',
      Identifier1: '9879872',
      Identifier2: '2',
      Identifier3: '2',
      Identifier4: '2',
    },
    {
      Amount: '12.00',
      BillTypeName: 'Tax Payments',
      Identifier1: '9879873',
      Identifier2: '3',
      Identifier3: '3',
      Identifier4: '3',
    },
  ],
  MaxFuturePaymentDays: '0',
  PaymentMethodsToDeny:
    'AmExCredit,DiscoverCredit,MastercardCredit,VisaCredit',
  PayorAddress: '12222 West Avenue',
  PayorAddressIsEditable: true,
  PayorCity: 'El Paso',
  PayorCityIsEditable: true,
  PayorCountry: 'United States',
  PayorCountryIsEditable: true,
  PayorEmailAddress: 'leonardo.custodio@e-hps.com',
  PayorEmailAddressIsEditable: true,
  PayorFirstName: 'Leo',
  PayorFirstNameIsEditable: true,
  PayorLastName: 'Hill',
  PayorLastNameIsEditable: true,
  PayorMiddleName: 'K',
  PayorMiddleNameIsEditable: true,
  PayorPhoneNumber: '1234564578',
  PayorPhoneNumberIsEditable: true,
  PayorPostalCode: '12345',
  PayorPostalCodeIsEditable: true,
  PayorState: 'TX',
  PayorStateIsEditable: true,
  SecurePayPaymentType_ID: '1',
});

const Token = () => {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleCredentialChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      credential: {
        ...prev.credential,
        [field]: value,
      },
    }));
  };

  const handleFieldChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleChange = (field) => (event) => {
    const { checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleBillDataChange = (index, field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => {
      const updatedBillData = prev.BillData.map((bill, billIndex) =>
        billIndex === index
          ? {
              ...bill,
              [field]: value,
            }
          : bill
      );

      return {
        ...prev,
        BillData: updatedBillData,
      };
    });
  };

  const handleReset = () => {
    setFormData(createInitialFormState());
    setError(null);
    setResponseData(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const query = new URLSearchParams({
        payload: JSON.stringify(formData),
      });

      const response = await fetch(`${TOKEN_ENDPOINT}?${query.toString()}`);

      if (!response.ok) {
        throw new Error('Unable to retrieve token at this time.');
      }

      const contentType = response.headers.get('content-type') ?? '';
      let data;

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        data = rawText ? { raw: rawText } : { status: response.status };
      }

      setResponseData(data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'Unexpected error retrieving token.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="token-page" aria-labelledby="token-request-title">
      <header className="token-page__header">
        <h1 id="token-request-title">Request Secure Payment Token</h1>
        <p>
          Configure the token payload and submit the request to retrieve the
          secure payment token from the gateway.
        </p>
      </header>

      <form className="token-form" onSubmit={handleSubmit}>
        <div className="token-card">
          <section className="token-section" aria-labelledby="token-credential-title">
            <div className="token-section__header">
              <h2 id="token-credential-title">Credential</h2>
              <p>Provide the credentials supplied by the payment provider.</p>
            </div>
            <div className="token-grid token-grid--two">
              <label className="token-field">
                <span>Application ID</span>
                <input
                  type="text"
                  value={formData.credential.ApplicationID}
                  onChange={handleCredentialChange('ApplicationID')}
                  required
                />
              </label>
              <label className="token-field">
                <span>Password</span>
                <input
                  type="text"
                  value={formData.credential.Password}
                  onChange={handleCredentialChange('Password')}
                  required
                />
              </label>
              <label className="token-field">
                <span>User Name</span>
                <input
                  type="text"
                  value={formData.credential.UserName}
                  onChange={handleCredentialChange('UserName')}
                  required
                />
              </label>
              <label className="token-field">
                <span>Merchant Name</span>
                <input
                  type="text"
                  value={formData.credential.MerchantName}
                  onChange={handleCredentialChange('MerchantName')}
                  required
                />
              </label>
            </div>
          </section>

          <section className="token-section" aria-labelledby="token-filters-title">
            <div className="token-section__header">
              <h2 id="token-filters-title">Payment Filters</h2>
              <p>Define payment restrictions for the tokenized checkout.</p>
            </div>
            <div className="token-grid token-grid--two">
              <label className="token-field token-field--full">
                <span>BIN Ranges To Deny</span>
                <input
                  type="text"
                  value={formData.BINRangesToDeny}
                  onChange={handleFieldChange('BINRangesToDeny')}
                />
              </label>
              <label className="token-field token-field--full">
                <span>Payment Methods To Deny</span>
                <input
                  type="text"
                  value={formData.PaymentMethodsToDeny}
                  onChange={handleFieldChange('PaymentMethodsToDeny')}
                />
              </label>
              <label className="token-field">
                <span>Max Future Payment Days</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={formData.MaxFuturePaymentDays}
                  onChange={handleFieldChange('MaxFuturePaymentDays')}
                  min="0"
                />
              </label>
              <label className="token-field">
                <span>SecurePay Payment Type ID</span>
                <input
                  type="text"
                  value={formData.SecurePayPaymentType_ID}
                  onChange={handleFieldChange('SecurePayPaymentType_ID')}
                  required
                />
              </label>
            </div>
          </section>

          <section className="token-section" aria-labelledby="token-billdata-title">
            <div className="token-section__header">
              <h2 id="token-billdata-title">Bill Data</h2>
              <p>Confirm the bill details that will be used to generate the token.</p>
            </div>
            <div className="token-bill-list">
              {formData.BillData.map((bill, index) => (
                <fieldset key={`bill-data-${index}`} className="token-bill-item">
                  <legend>Bill #{index + 1}</legend>
                  <div className="token-grid token-grid--two">
                    <label className="token-field">
                      <span>Amount</span>
                      <input
                        type="text"
                        value={bill.Amount}
                        onChange={handleBillDataChange(index, 'Amount')}
                        required
                      />
                    </label>
                    <label className="token-field">
                      <span>Bill Type Name</span>
                      <input
                        type="text"
                        value={bill.BillTypeName}
                        onChange={handleBillDataChange(index, 'BillTypeName')}
                        required
                      />
                    </label>
                    <label className="token-field">
                      <span>Identifier 1</span>
                      <input
                        type="text"
                        value={bill.Identifier1}
                        onChange={handleBillDataChange(index, 'Identifier1')}
                        required
                      />
                    </label>
                    <label className="token-field">
                      <span>Identifier 2</span>
                      <input
                        type="text"
                        value={bill.Identifier2}
                        onChange={handleBillDataChange(index, 'Identifier2')}
                        required
                      />
                    </label>
                    <label className="token-field">
                      <span>Identifier 3</span>
                      <input
                        type="text"
                        value={bill.Identifier3}
                        onChange={handleBillDataChange(index, 'Identifier3')}
                        required
                      />
                    </label>
                    <label className="token-field">
                      <span>Identifier 4</span>
                      <input
                        type="text"
                        value={bill.Identifier4}
                        onChange={handleBillDataChange(index, 'Identifier4')}
                        required
                      />
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
          </section>

          <section className="token-section" aria-labelledby="token-payor-title">
            <div className="token-section__header">
              <h2 id="token-payor-title">Payor Information</h2>
              <p>Set the payer details and adjust editability for each field.</p>
            </div>
            <div className="token-grid token-grid--three">
              <div className="token-field">
                <label htmlFor="payor-first-name">First Name</label>
                <input
                  id="payor-first-name"
                  type="text"
                  value={formData.PayorFirstName}
                  onChange={handleFieldChange('PayorFirstName')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-first-name-editable"
                    type="checkbox"
                    checked={formData.PayorFirstNameIsEditable}
                    onChange={handleToggleChange('PayorFirstNameIsEditable')}
                  />
                  <label htmlFor="payor-first-name-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-middle-name">Middle Name</label>
                <input
                  id="payor-middle-name"
                  type="text"
                  value={formData.PayorMiddleName}
                  onChange={handleFieldChange('PayorMiddleName')}
                />
                <div className="token-toggle">
                  <input
                    id="payor-middle-name-editable"
                    type="checkbox"
                    checked={formData.PayorMiddleNameIsEditable}
                    onChange={handleToggleChange('PayorMiddleNameIsEditable')}
                  />
                  <label htmlFor="payor-middle-name-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-last-name">Last Name</label>
                <input
                  id="payor-last-name"
                  type="text"
                  value={formData.PayorLastName}
                  onChange={handleFieldChange('PayorLastName')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-last-name-editable"
                    type="checkbox"
                    checked={formData.PayorLastNameIsEditable}
                    onChange={handleToggleChange('PayorLastNameIsEditable')}
                  />
                  <label htmlFor="payor-last-name-editable">Editable</label>
                </div>
              </div>
              <div className="token-field token-field--full">
                <label htmlFor="payor-email">Email Address</label>
                <input
                  id="payor-email"
                  type="email"
                  value={formData.PayorEmailAddress}
                  onChange={handleFieldChange('PayorEmailAddress')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-email-editable"
                    type="checkbox"
                    checked={formData.PayorEmailAddressIsEditable}
                    onChange={handleToggleChange('PayorEmailAddressIsEditable')}
                  />
                  <label htmlFor="payor-email-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-phone">Phone Number</label>
                <input
                  id="payor-phone"
                  type="tel"
                  value={formData.PayorPhoneNumber}
                  onChange={handleFieldChange('PayorPhoneNumber')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-phone-editable"
                    type="checkbox"
                    checked={formData.PayorPhoneNumberIsEditable}
                    onChange={handleToggleChange('PayorPhoneNumberIsEditable')}
                  />
                  <label htmlFor="payor-phone-editable">Editable</label>
                </div>
              </div>
              <div className="token-field token-field--full">
                <label htmlFor="payor-address">Address</label>
                <input
                  id="payor-address"
                  type="text"
                  value={formData.PayorAddress}
                  onChange={handleFieldChange('PayorAddress')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-address-editable"
                    type="checkbox"
                    checked={formData.PayorAddressIsEditable}
                    onChange={handleToggleChange('PayorAddressIsEditable')}
                  />
                  <label htmlFor="payor-address-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-city">City</label>
                <input
                  id="payor-city"
                  type="text"
                  value={formData.PayorCity}
                  onChange={handleFieldChange('PayorCity')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-city-editable"
                    type="checkbox"
                    checked={formData.PayorCityIsEditable}
                    onChange={handleToggleChange('PayorCityIsEditable')}
                  />
                  <label htmlFor="payor-city-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-state">State</label>
                <input
                  id="payor-state"
                  type="text"
                  value={formData.PayorState}
                  onChange={handleFieldChange('PayorState')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-state-editable"
                    type="checkbox"
                    checked={formData.PayorStateIsEditable}
                    onChange={handleToggleChange('PayorStateIsEditable')}
                  />
                  <label htmlFor="payor-state-editable">Editable</label>
                </div>
              </div>
              <div className="token-field">
                <label htmlFor="payor-postal-code">Postal Code</label>
                <input
                  id="payor-postal-code"
                  type="text"
                  value={formData.PayorPostalCode}
                  onChange={handleFieldChange('PayorPostalCode')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-postal-code-editable"
                    type="checkbox"
                    checked={formData.PayorPostalCodeIsEditable}
                    onChange={handleToggleChange('PayorPostalCodeIsEditable')}
                  />
                  <label htmlFor="payor-postal-code-editable">Editable</label>
                </div>
              </div>
              <div className="token-field token-field--full">
                <label htmlFor="payor-country">Country</label>
                <input
                  id="payor-country"
                  type="text"
                  value={formData.PayorCountry}
                  onChange={handleFieldChange('PayorCountry')}
                  required
                />
                <div className="token-toggle">
                  <input
                    id="payor-country-editable"
                    type="checkbox"
                    checked={formData.PayorCountryIsEditable}
                    onChange={handleToggleChange('PayorCountryIsEditable')}
                  />
                  <label htmlFor="payor-country-editable">Editable</label>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="token-actions">
          <button type="button" className="token-button token-button--ghost" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="token-button" disabled={isLoading}>
            {isLoading ? 'Requesting Token…' : 'Request Token'}
          </button>
        </footer>
      </form>

      <div className="token-feedback" aria-live="polite">
        {error && <div className="token-alert token-alert--error">{error}</div>}
        {responseData && (
          <div className="token-alert token-alert--success">
            <h2>Token Response</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default Token;
