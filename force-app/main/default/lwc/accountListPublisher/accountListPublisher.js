import { LightningElement, track, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
import ACCOUNTRECORDID from '@salesforce/messageChannel/accountRecordId__c';
import { publish, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Account Name', fieldName: 'Name', type: 'Name' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },

];

export default class AccountListPublisher extends LightningElement {

    @wire(MessageContext)
    messageContext;

    @track selectedAccountId;
    @track data;
    @track isError = false;
    @track errorMessage;
    columns = columns;

    connectedCallback() {
        this.loadAccounts();
    }

    getSelectedItem(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length <= 0)
            return;
        var message;
        //allow only select one row at a time
        if (selectedRows.length > 1) {
            let firstId = event.detail.selectedRows.slice(1);
            message = { accountId: firstId };
            const showEvnt = new ShowToastEvent({
                title: 'Error',
                message: 'Only one row can be selected',
                variant: 'warning',
                mode: 'pester'
            });
            this.dispatchEvent(showEvnt);
            showEvnt.preventDefault();
            return;
        } else {
            message = { accountName: selectedRows[0].Name };

        }
        publish(this.messageContext, ACCOUNTRECORDID, message);
        //sample text
    }
    loadAccounts() {
        getAccounts({ accoundId: this.selectedAccountId })
            .then(results => {
                this.data = results;
                this.isError = false;
            })
            .catch(error => {
                this.error = true;
                tis.errorMessage = error.body.message;
            });

    }
}