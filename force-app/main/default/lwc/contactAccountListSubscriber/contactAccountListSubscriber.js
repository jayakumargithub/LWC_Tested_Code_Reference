import { LightningElement, wire, track, api } from 'lwc';
import ACCOUNTRECORDID from '@salesforce/messageChannel/accountRecordId__c';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
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

export default class ContactAccountListSubscriber extends LightningElement {

    subscription = null;
    columns = columns;
    @track data = [];

    @wire(MessageContext)
    messageContext;


    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    handleMessage(message) {

        let accountNameValue = message.accountName;
        getContacts({ accountName: accountNameValue })
            .then(result => {
                this.data = result;
            })
            .catch(error => {
                this.error = true;
            });
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, ACCOUNTRECORDID, (message) => this.handleMessage(message))
        } else {
            console.log("using known subscription")
        }
    }
}