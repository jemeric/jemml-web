import * as React from 'react';
import Form from 'react-jsonschema-form';
import { ISubmitEvent, FormProps } from 'react-jsonschema-form';

export default class CustomForm<T> extends Form<T> {

    private baseSubmit: (e: React.FormEvent<T>) => {};
    constructor(props: FormProps<T>) {
        super(props);
        console.log("SUPER PROPS: ", props);
        console.log("this: ", this);
        const that: any = this;
        console.log("submit old: ", that.onSubmit);
        this.baseSubmit = that.onSubmit;
        that.onSubmit = this.submit.bind(this);

    }

    /* onSubmit = (e: React.FormEvent<T>) => {
        e.preventDefault();
        //super.onSubmit();
        console.log("ON SUBMIT CALLED?", e);
        const state: any = this.state;
        //state.formData = {};
        //super.setState(state);
        //super.forceUpdate(); // force update - re-render with new state
        //_super1.
        //that.setState(state);
        //super.render();
        //that.onChange(state.formData);
        console.log("THIS: ", this);
        //console.log("SUPER: ", super. .onSubmit(e));
        console.log("FORM PROTOTYPE", Form.prototype);
        console.log("STATE: ", this.state);
        // TODO validate with removeAdditional - pass along data having removed additional properties
        //this.props.onSubmit(this.state);
        //const s: any = super.;


    } */

    private submit(e: React.FormEvent<T>) {
        e.preventDefault();
        console.log("submit");
        // TODO use custom validator to remove additional properties
        //const state: any = this.state;
        //state.formData = {};
        //super.setState(state);
        //super.forceUpdate(); // force update - re-render with new state
        this.baseSubmit(e);
    }

    public render() {
        console.log("RENDER!!");
        return super.render();
    }
}