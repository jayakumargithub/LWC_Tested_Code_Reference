import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Contact.Name.fieldApiName',
    'Contact.Title.fieldApiName',
    'Contact.Phone.fieldApiName',
    'Contact.Email.fieldApiName',
];

export default class WireGetRecordDynamicContact extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: ['Contact.Name', 'Contact.Title', 'Contact.Phone', 'Contact.Email'] })
    contact;

    get name() {
        return this.contact.data.fields.Name.value;
    }

    get title() {
        return this.contact.data.fields.Title.value;
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }

    get email() {
        return this.contact.data.fields.Email.value;
    }
}