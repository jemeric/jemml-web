import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisFormData } from '../types/index';

export default class AnalysisClassifier extends React.Component<AnalysisFormData, {}> {
    constructor(props: AnalysisFormData) {
        super(props);

        // bind to make 'this' work in callback
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
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
        return <form className="form-step">
            <h2>Choose your classifier</h2>
            <button className="btn btn-default pull-right" onClick={this.next}>Next</button>
            <button className="btn btn-default pull-right" onClick={this.previous}>Previous</button>
        </form>
    }
}