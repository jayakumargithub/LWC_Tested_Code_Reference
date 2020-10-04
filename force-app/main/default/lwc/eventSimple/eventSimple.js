import { LightningElement, track } from 'lwc';

export default class EventSimple extends LightningElement {
    page = 1;
    selectedFruit;

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    nextHandler() {
        this.page = this.page + 1;
    }

    onfruitHandler(event) {
        this.selectedFruit = event.detail;
    }
}