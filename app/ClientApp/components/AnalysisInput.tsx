import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisFormData } from '../types/index';

export default class AnalysisType extends React.Component<AnalysisFormData, {}> {
    constructor(props: AnalysisFormData) {
        super(props);

        // bind to make 'this' work in callback
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    private next(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Store and pass along state");
        this.props.nextStep();
    }

    private previous(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.previousStep();
    }

    public render() {
        return <form>
            <h2>Choose the input you would like to preprocess</h2>
            <button className="btn btn-default pull-right" onClick={this.next}>Next</button>
            <button className="btn btn-default pull-right" onClick={this.previous}>Previous</button>
        </form>
    }
}