import { LightningElement, wire } from 'lwc';
import USERSearchChannel from '@salesforce/messageChannel/userSearch__c';
import { publish, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyPublishComp extends LightningElement {

    userFilterKey;

    @wire(MessageContext)
    messageContext;

    keycheck(event) {
        if (event.keyCode === 13) {
            alert('Entered');
        }
    }

    connectedCallback() {
        let input = this.template.querySelector('lightning-input');
        input.dispatchEvent()
    }


    handleClick() {

        this.userFilterKey = this.template.querySelector("lightning-input").value;
        let message = { filterkey: this.userFilterKey };
        publish(this.messageContext, USERSearchChannel, message);

        this.dispatchEvent(new ShowToastEvent({
            title: 'Event dispatched  using lightning message service',
            message: 'Value :' + this.userFilterKey,
            variant: 'Success'
        })
        );
    }
}