import {LightningElement, api, wire} from 'lwc';
import CONTACT from '@salesforce/schema/Contact'
import { NavigationMixin } from 'lightning/navigation';
import getJobPicklistOptions from '@salesforce/apex/PiContactController.getJobPicklistOptions'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreatePiContact extends NavigationMixin(LightningElement) {
    @api recordId;
    @api recordTypeId;
    spinner = true;
    objectApiName = CONTACT.objectApiName;
    jobPicklistOptions = [];
    jobValue;
    jobLabel = '';

    get jobOptions(){
        return this.jobPicklistOptions.map(el => ({label: el, value: el}));
    }

    @wire(getObjectInfo, {objectApiName: CONTACT})
    getJobLabel({error, data}){
        if(data) {
            this.jobLabel = data.fields.Job__c.label
        } else {
            console.log(error);
        }
    }

    connectedCallback() {
        getJobPicklistOptions()
            .then(result => {
                this.jobPicklistOptions = result;
            })
    }

    handleSubmit(event){
        this.spinner = true;

        event.preventDefault();

        let fields = event.detail.fields;
        fields.Job__c = this.jobValue;

        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }

    handleSuccess(event){
        this.spinner = false;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                actionName: 'view',
            },
        });
    }

    handleCancel(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiName,
                actionName: 'home',
            },
        });
    }

    handleLoad(){
        this.spinner = false;
    }

    handleBirthDateChange(event){
        if(Date.parse( event.target.value ) > new Date().getTime()){
            this.dispatchEvent(new ShowToastEvent({
                title: 'Wrong date',
                message: 'Date must be from the past.',
            }));
        }
    }

    handlePicklistChange(event){
        this.jobValue = event.target.value;
    }

}