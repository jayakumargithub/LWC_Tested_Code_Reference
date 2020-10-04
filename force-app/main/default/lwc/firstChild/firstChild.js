import { LightningElement, api } from 'lwc';

export default class FirstChild extends LightningElement {

    @api messageFromParent;
    className = 'black'

    // renderedCallback() {
    //     console.log("renderedCallback");
    //     let divElement = this.template.querySelector('div.p');
    //     console.log("divElement" + divElement);
    // }

    renderedCallback() {
        this.template.querySelector('div'); // <div>First</div>
        this.template.querySelector('span'); // null
        this.template.querySelectorAll('div'); // [<div>First</div>, <div>Second</div>]

    }
    clickHandle(event) {
        this.className = 'slds-var-p-horizontal_small';
        this.template.querySelector('div');

        switch (this.messageFromParent.charAt(0)) {
            case 'r':
                this.className = 'slds-var-p-horizontal_small red';
                break;
            case 'b':
                this.className = 'slds-var-p-horizontal_small blue';
                break;
            case 'g':
                this.className = 'slds-var-p-horizontal_small green';
                break;
            default:
                this.className = 'slds-var-p-horizontal_small';
        }


    }
    @api
    handleFromParent(name) {
        return "Message from Child for " + name;
    }

}