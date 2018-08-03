import * as React from 'react';
import Form from 'react-jsonschema-form';
//import validateFormData from 'react-jsonschema-form';
import { ISubmitEvent, FormProps, FormValidation, AjvError } from 'react-jsonschema-form';
//import $RefParser from 'json-schema-ref-parser';
//const $RefParser = require('json-schema-ref-parser');


interface ValidationResult {
    errors: AjvError[];
    errorSchema: FormValidation;
}

//const refParser = new $RefParser();

export default class CustomForm<T> extends Form<T> {
    private baseSubmit: (e: React.FormEvent<T>) => {};
    private validate: (formData: T, schema: {}) => ValidationResult;
    constructor(props: FormProps<T>) {
        super(props);
        const self: any = this;
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
        console.log("data: ", data);
        console.log("prop: ", prop);
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
    
    private hasSchemaProperty(schema: any, path: string[]): boolean {
        if (path.length < 1) {
            return typeof schema != "undefined";
        }
        const prop = path.shift();
        if (!prop) {
            return false;
        }
        if (schema["type"] == "array") {
            return this.hasSchemaProperty(schema["items"]["properties"][prop], path);
        }
        return this.hasSchemaProperty(schema["properties"][prop], path);
    }

    private allowsAdditionalProperties(schema: any, path: string[]): boolean {
        if (path.length < 1) {
            if (typeof schema["additionalProperties"] == "boolean") {
                return schema["additionalProperties"] as boolean;
            }
            return false;
        }
        const prop = path.shift();
        if (!prop) {
            return false;
        }
        if (schema["type"] == "array") {
            return this.allowsAdditionalProperties(schema["items"]["properties"][prop], path);
        }
        return this.allowsAdditionalProperties(schema["properties"][prop], path);
    }

    private findAdditionalProperties(data: any, dereferencedSchema: {}, path : string[] = []): string[] {
        let additionalProperties: string[] = [];
        const checkAdditional = !this.allowsAdditionalProperties(dereferencedSchema, path);
        for (let prop in data) {
            if (!data.hasOwnProperty(prop)) {
                continue;
            }
            if (Array.isArray(data[prop])) {
                // traverse array
                const propArray = data[prop] as any[];
                for (let i = 0; i < propArray.length; i++) {
                    additionalProperties.concat(this.findAdditionalProperties(data[prop][i], dereferencedSchema, path.concat(prop).concat(i.toString())));
                }
            } else {
                // check if property is an additional property
                const propPath = path.concat(prop);
                if (checkAdditional && !this.hasSchemaProperty(dereferencedSchema, propPath)) {
                    additionalProperties.push(propPath.join("."));
                }
                additionalProperties.concat(this.findAdditionalProperties(data[prop], dereferencedSchema, path.concat(prop)));
            }
        }
        return additionalProperties;
    }

    /*private async replaceReferences(schema: any): Promise<{}> {
        let references = await refParser.dereference(schema);
        return references;
    } */

    private replaceDependencies(schema: any, data: any): {} {

        return {};
    }

    /*private dereference(schema: {}, data: any): {} {
        return this.replaceDependencies(this.replaceReferences(schema), data);
    }*/

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