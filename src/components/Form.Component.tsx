import React, { ChangeEvent, useEffect, useState } from "react"
import { loadData } from "../services/Api.service";
import { AddressDetails, Data } from "../interfaces/Form.interface";

import './form.css'
import { useTranslation } from "react-i18next";

const FormComponent: React.FC = () => {
    const { t } = useTranslation();

    const [postalCode, setPostalCode] = useState('');
    const [{ address, isNNIAddress, selectedAddressID }, setAddressDetails] = useState<AddressDetails>({ isNNIAddress: false, selectedAddressID: 'default', address: [] });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isCheckbox = event.target.type === 'checkbox';
        const value = event.target instanceof HTMLInputElement && isCheckbox ? event.target.checked : event.target.value;
        setAddressDetails(lastState => ({ ...lastState, [event.target.name]: value }));
    }

    const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPostalCode(event.target.value);
    }

    const submit = () => {
        const selectedAddress = address.find(item => item.id === selectedAddressID);
        alert(JSON.stringify(selectedAddress, null, 2));
    }

    const isValid = () => (postalCode === '' || selectedAddressID === 'default');

    useEffect(() => {
        const loadDropDownData = async () => {
            const data = (await loadData(!isNNIAddress)) as Data[];
            setAddressDetails(lastState => ({ ...lastState, selectedAddressID: 'default', address: data }));
        };
        loadDropDownData();
    }, [isNNIAddress]);

    return (
        <div className="form-container">
            <div className="form-group">
                <input type="text" name="postCode" onChange={handlePostCodeChange} value={postalCode} className="form-control" placeholder="Enter Postal Code" />
            </div>
            <div className="form-group">
                <div className="form-control">
                    <input type="checkbox" name="isNNIAddress" onChange={handleChange} checked={isNNIAddress} style={{ height: '25px', width: '25px' }} />
                    <label style={{ position: 'absolute', marginTop: '8px', marginLeft: '7px' }}>
                        Is NNI address?
                    </label>
                </div>
            </div>
            <div className="form-group">
                <select value={selectedAddressID} onChange={handleChange} name="selectedAddressID" className="form-control">
                    {<option value='default' key={'default'}>{t('form.checkboxDefault')}</option>}
                    {address.length && address.map((item, index) => {
                        return <option value={item.id} key={index}>{item.value}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <button type="submit" onClick={submit} disabled={isValid()} className="form-control">{t('form.submit')}</button>
            </div>
        </div >);
}

export default FormComponent;