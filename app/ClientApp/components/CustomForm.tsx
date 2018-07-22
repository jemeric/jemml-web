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
    
    private deleteProperty(data: any, path: string[]): {} {
        const prop = path.pop();
        if (!prop) {
            return data;
        }
        if (path.length < 1) {
            delete data[prop];
        } else {
            data[prop] = this.deleteProperty(data[prop], path);
        }
        return data;
    }

    private jsonPathFromString(path: string) : string[] {
        return path.split(".")
            .map(p => {
                const matches = p.match(/\[['"]*(.*?)['"]*\]/);
                if (matches) {
                    matches.splice(0, 1);
                    const start = p.slice(0, p.indexOf("["));
                    matches.unshift(start);
                    return matches;
                }
                return [p];
            })
            .reduce((a, b) => a.concat(b))
            .filter(p => p.length > 0)
            .reverse();
    }

    private removeAdditional(formData: any, paths: string[]) {
        for (let path of paths) {
            this.deleteProperty(formData, this.jsonPathFromString(path));
        }
    }

    private submit(e: React.FormEvent<T>) {
        e.preventDefault();
        const state: any = this.state;
        console.log("STATE: ", state);
        console.log("Old form data: ", state.formData);
        const { errors } = this.validate(state.formData, this.props.schema);
        const formData = state.formData;
        // TODO - search validation result for additional properties then remove
        const additionalProperties: string[] = errors.filter(e => e.name == "additionalProperties").map(p => p.property);
        console.log("FORM VALIDATION RESULT!!! ", additionalProperties);
        this.removeAdditional(formData, additionalProperties);
        console.log("FORM DATA: ", formData);

        const path: string = ".inputSet.subset['trainingSize']";
        const paths = this.jsonPathFromString(path);

        //super.setState(state);
        //super.forceUpdate(); // force update - re-render with new state
        //this.baseSubmit(e);
    }

}