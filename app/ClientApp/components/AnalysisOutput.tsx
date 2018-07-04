import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisFinalFormData } from '../types/index';

export default class AnalysisOutput extends React.Component<AnalysisFinalFormData, {}> {
    constructor(props: AnalysisFinalFormData) {
        super(props);

        // bind to make 'this' work in callback
        this.previous = this.previous.bind(this);
    }

    private previous(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.previousStep();
    }

    public render() {
        return <form className="form-step">
            <h2>Choose your output format</h2>
            <button className="btn btn-primary pull-right">Download</button>
            <button className="btn btn-default pull-right" onClick={this.previous}>Previous</button>
            <button className="btn btn-default">Restart</button>
        </form>
    }
}