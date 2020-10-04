import { LightningElement, track } from 'lwc';

export default class Paginator extends LightningElement {

    @track options = [{ label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" }];

    value = "";
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    handleFruitChange(event) {
        event.preventDefault();
        this.value = event.target.value;
        const fruitChangeEvent = new CustomEvent('fruitchange', { detail: this.value })
        this.dispatchEvent(fruitChangeEvent)
    }

}