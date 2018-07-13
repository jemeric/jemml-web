import * as React from 'react';
import Form from 'react-jsonschema-form';
import { ISubmitEvent, FormProps } from 'react-jsonschema-form';

export default class CustomForm<T> extends Form<T> {

    constructor(props: FormProps<T>) {
        super(props);
        console.log("SUPER PROPS: ", props);
        console.log("this: ", this);
    }

    onSubmit = (e: React.FormEvent<T>) => {
        e.preventDefault();
        //super.onSubmit();
        console.log("ON SUBMIT CALLED?", e);
        // TODO validate with removeAdditional - pass along data having removed additional properties
        //this.props.onSubmit();

    }

    public render() {
        console.log("RENDER!!");
        return super.render();
    }
}