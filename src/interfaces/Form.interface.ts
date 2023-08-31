export interface Data {
    id: string;
    value: string;
}

export interface AddressDetails {
    isNNIAddress: boolean;
    selectedAddressID: string;
    address: Data[];
}