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

    private next(event: {}) {
        //event.preventDefault();
        console.log("event: ", event);
        this.props.nextStep();
    }

    private previous(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.previousStep();
    }

    public render() {
        const { schema, isLoading, error } = this.state;
        const log = (type: {}) => console.log.bind(console, type);

        let buttons: JSX.Element = <div>
            <button className="btn btn-default pull-right" type="submit">Next</button>
            <button className="btn btn-default pull-right" type="button" onClick={this.previous}>Previous</button>
        </div>

        let form: JSX.Element = <div>
            Loading...
            {buttons}
        </div>;
        
        if (error) {
            form = <div>
                {error}
                {buttons}
            </div>;
        }

        if (schema) {
            // TODO - setup schema form
            console.log("SCHEMA: ", schema);
            form = <Form schema={schema}
                onChange={log("changed")}
                onSubmit={this.next}
                onError={log("errors")}>
                {buttons}
            </Form>
        }

        return <div className="form-step">
            <h2>Choose the input you would like to preprocess</h2>
            {form}
        </div>
    }
}