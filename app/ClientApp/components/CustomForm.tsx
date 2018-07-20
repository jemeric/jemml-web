import * as React from 'react';
import Form from 'react-jsonschema-form';
//import validateFormData from 'react-jsonschema-form';
import { ISubmitEvent, FormProps, FormValidation, AjvError } from 'react-jsonschema-form';

interface ValidationResult {
    errors: AjvError[];
    errorSchema: FormValidation;
}

export default class CustomForm<T> extends Form<T> {
    private baseSubmit: (e: React.FormEvent<T>) => {};
    private validate: (formData: T, schema: {}) => ValidationResult;
    constructor(props: FormProps<T>) {
        super(props);
        console.log("SUPER PROPS: ", props);
        console.log("this: ", this);
        const self: any = this;
        console.log("submit old: ", self.onSubmit);
        this.baseSubmit = self.onSubmit;
        self.onSubmit = this.submit.bind(this);
        const base: any = Form.prototype;
        this.validate = base.validate;
    }

    private submit(e: React.FormEvent<T>) {
        e.preventDefault();
        const state: any = this.state;
        const { errors } = this.validate(state.formData, this.props.schema);
        // TODO - search validation result for additional properties then remove
        const additionalProperties: AjvError[] = errors.filter(e => e.name == "additionalProperties");
        console.log("FORM VALIDATION RESULT!!! ", additionalProperties);
        //console.log("submit ", validateFormData);
        //this.g
        // TODO use custom validator to remove additional properties
        //const state: any = this.state;
        //state.formData = {};
        //super.setState(state);
        //super.forceUpdate(); // force update - re-render with new state
        //this.baseSubmit(e);
    }

}