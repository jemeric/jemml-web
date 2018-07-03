import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisFormData, AnalysisSchemaFormState } from '../types/index';
import Form from 'react-jsonschema-form';
import { fetch } from 'domain-task';

export default class AnalysisType extends React.Component<AnalysisFormData, AnalysisSchemaFormState> {
    constructor(props: AnalysisFormData) {
        super(props);

        this.state = {
            isLoading: false
        }

        // bind to make 'this' work in callback
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch("schema")
            .then(response => response.json())
            .then(schema => this.setState({ schema, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    private next(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.nextStep();
    }

    private previous(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.previousStep();
    }

    public render() {
        const { schema, isLoading, error } = this.state;

        let form: JSX.Element = <div>Loading...</div>;

        if (error) {
            form = <div>{error}</div>;
        }

        if (schema) {
            // TODO - setup schema form
            console.log("SCHEMA: ", schema);
        }

        return <form>
            <h2>Choose the input you would like to preprocess</h2>
            {form}
            <button className="btn btn-default pull-right" onClick={this.next}>Next</button>
            <button className="btn btn-default pull-right" onClick={this.previous}>Previous</button>
        </form>
    }
}