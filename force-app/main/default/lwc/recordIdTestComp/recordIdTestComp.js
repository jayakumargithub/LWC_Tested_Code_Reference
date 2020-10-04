import { LightningElement, api, track, wire } from 'lwc';
import getrelatedContacts from '@salesforce/apex/UserService.getRelatedContacts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { 'label': 'Name', fieldName: 'Name', type: "Name" },
    { 'label': 'Phone', fieldName: 'Phone', type: 'phone' },
    { 'label': 'Email', fieldName: 'Email', type: 'email' },
];
export default class RecordIdTestComp extends NavigationMixin(LightningElement) {
    @api recordId;
    columns = columns;
    @track data = [];
    @track isError = false;
    @track errorMessage;

    connectedCallback() {
        this.loadRelatedContacts();
    }
    loadRelatedContacts() {
        getrelatedContacts({ accountId: this.recordId })
            .then(results => {
                this.data = results;
                this.error = false;
            })
            .catch(error => {
                this.isError = true;
                this.errorMessage = error.body.message;
            });
    }

    handleNew() {

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new',
            },
        });
    }
} 