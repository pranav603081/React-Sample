import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { loadData } from "../services/Api.service";
import { Data } from "../interfaces/Form.interface";

import './form.css'

const FormComponent: React.FC = () => {
    const [isNNIAddress, setNNIAddress] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const [selectedAddressID, setSelectedAddress] = useState('default');
    const [address, setAddress] = useState<Data[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNNIAddress(event.target.checked);
    }

    const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPostalCode(event.target.value);
    }

    const handleDropDownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAddress(event.target.value);
    }

    const submit = (event: FormEvent<HTMLButtonElement>) => {
        const selectedAddress = address.find(item => item.id === selectedAddressID);
        alert(JSON.stringify(selectedAddress, null, 2));
    }

    const isValid = () => (postalCode === '' || selectedAddressID === 'default')

    useEffect(() => {
        const loadDropDownData = async () => {
            setAddress([]);
            setSelectedAddress('default');
            const data = (await loadData(!isNNIAddress)) as Data[];
            setAddress(data);
        };
        loadDropDownData();
    }, [isNNIAddress]);

    const defaultOption = <option value='default' key={'default'}>Please Select a Address</option>
    return (
        <div className="form-container">
            <div className="form-group">
                <input type="text" name="postCode" onChange={handlePostCodeChange} value={postalCode} className="form-control" placeholder="Enter Postal Code" />
            </div>
            <div className="form-group">
                <div className="form-control">
                    <input type="checkbox" name="isNNI" onChange={handleChange} checked={isNNIAddress} style={{ height: '25px', width: '25px' }} />
                    <label style={{ position: 'absolute', marginTop: '8px', marginLeft: '7px' }}>
                        Is NNI address?
                    </label>
                </div>
            </div>
            <div className="form-group">
                <select value={selectedAddressID} onChange={handleDropDownChange} className="form-control">
                    {!address.length && defaultOption}
                    {address.length && [defaultOption, ...address.map((item, index) => {
                        return <option value={item.id} key={index}>{item.value}</option>
                    })]}
                </select>
            </div>
            <div className="form-group">
                <button type="submit" onClick={submit} disabled={isValid()} className="form-control">Submit</button>
            </div>
        </div >)
}

export default FormComponent;