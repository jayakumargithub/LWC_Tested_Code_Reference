import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import USERFILTERMC from '@salesforce/messageChannel/userSearch__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class UserSearchForm extends LightningElement {

    @wire(MessageContext)
    messageContext;
    submittedValue;

    handleClick(event) {

        let inputValue = this.template.querySelector("lightning-input").value;
        this.submittedValue = inputValue;
        // this.dispatchEvent(new showToastEvent({
        //     title: 'Event dispatched  using lightning message service',
        //     message: 'Value :' + this.submittedValue,
        //     variant: 'Success'
        // })
        // );
        const payload = { filterKey: this.submittedValue };
        publish(this.messageContext, USERFILTERMC, payload);

    }

    // dispatchToast(error) {
    //     this.dispatchEvent(
    //         new ShowToastEvent({
    //             title: 'Error loading contact',
    //             message: reduceErrors(error).join(', '),
    //             variant: 'error'
    //         })
    //     );
    // }
}