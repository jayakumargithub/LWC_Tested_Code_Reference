import { LightningElement, wire, track, api } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService'
import USERFILTERMC from '@salesforce/messageChannel/userSearch__c';
import getContacts from '@salesforce/apex/UserService.getContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.firstname';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LASTname';

// const columns = [
//     FIRSTNAME_FIELD,
//     LASTNAME_FIELD,
//     PHONE_FIELD,
//     EMAIL_FIELD
// ];
const COLUMNS = [
    { label: 'First Name', fieldName: 'firstName' },
    { label: 'Last Name', fieldName: 'lastName' },
    { label: 'Phone', fieldName: 'phone' },
    { label: 'Email', fieldName: 'email' }
];

export default class UserSearchResult extends LightningElement {
    userList;
    filterkey;
    subscription = null;
    @track columns = COLUMNS;


    @wire(MessageContext)
    messageContext;

    @api filterkey;
    @track data;

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, USERFILTERMC, (message) => this.handleFilterUser(message));
        }
        this.loadContacts("");
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    loadContacts(filterkey) {
        getContacts({ filterkey: this.filterkey, key: filterkey })
            .then(results => { this.data = results; })
            .catch(error => {
                console.error(error.body.message);
                // this.dispatchEvent(
                //     this.ShowToastEvent({
                //         title: 'Error',
                //         message: error.body.message,
                //         variant: error
                //     })
                // )
            })
    }

    handleFilterUser(message) {
        const filterkey = message.filterKey;
        this.loadContacts(filterkey);
    }
}