import { LightningElement, wire } from 'lwc';
import USERSearchChannel from '@salesforce/messageChannel/userSearch__c';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MySubscribeComp extends LightningElement {

    subscription = null;
    publishedMessage;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        //this.handleSubscribe();
        console.log('connectedCallback')
        this.subscribeToMessageChannel();
    }

    handleMessage(message) {

        this.publishedMessage = message.filterkey;
        console.log(message.filterkey);
        this.dispatchEvent(new ShowToastEvent({
            title: 'Event change received',
            message: 'Value :' + this.publishedMessage,
            variant: 'Success'
        })
        );
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, USERSearchChannel, (message) => this.handleMessage(message))
            console.log("Subscribed");
        } else {
            console.log("using known subscription")
        }
    }
    disconnectedCallback() {

        unsubscribe(this.subscription);
        this.subscription = null;
    }
}