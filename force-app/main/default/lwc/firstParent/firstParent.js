import { LightningElement, api, track } from 'lwc';

export default class FirstParent extends LightningElement {
    message = "";
    childMessage = "";

    handleInputChange(event) {
        this.message = event.target.value;
        this.childMessage = this.template.querySelector('c-first-child').handleFromParent("Jayakumar");
    }

}