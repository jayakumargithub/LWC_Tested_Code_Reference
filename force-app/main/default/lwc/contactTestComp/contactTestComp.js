import { LightningElement, track, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/UserService.getContacts';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const columns = [
    { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName },
    { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'phone' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'email' },

];

export default class ContactTestComp extends LightningElement {
    columns = columns;
    @track data = [];
    // connectedCallback() {
    //     this.data = this.loadData();
    // }
    @api name = "Burlington Textiles Corp of America";

    @wire(getContacts, { accountName: name })
    wiredContacts({ error, data }) {
        if (data) {
            this.data = data;
        }
    }

    // loadData() {
    //     getContacts({ accountName: 'Burlington Textiles Corp of America' })
    //         .then(result => {
    //             return result;
    //         })
    // }
}