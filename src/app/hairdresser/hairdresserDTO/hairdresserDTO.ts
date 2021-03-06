export class HairdresserDTO {
    id: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;

    constructor(id: number, 
        firstname: string,
        lastname: string,
        phoneNumber: string,
        email: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}