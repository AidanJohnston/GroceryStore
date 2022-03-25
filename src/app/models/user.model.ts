export interface User {
    address : Address,
    email : string,
    fName : string,
    lName : string,
}

export interface Address {
    address_1: string,
    city : string,
    province : string,
    postalCode : string,
}