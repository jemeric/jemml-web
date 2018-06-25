﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisInitialFormData } from '../types/index';

export default class AnalysisType extends React.Component<AnalysisInitialFormData, {}> {
    constructor(props: AnalysisInitialFormData) {
        super(props);

        // bind to make 'this' work in callback
        this.next = this.next.bind(this);
    }

    private changeAnalysisType(event: React.FormEvent<HTMLSelectElement>) {
        console.log("CHAGE EVENT: ", event.currentTarget.value);
    }

    private next(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Store and pass along state");
        this.props.nextStep();
    }

    public render() {
        return <form>
            <h2>What sort of processing would you like to perform?</h2>
            <div className="form-group">
                <select className="form-control" onChange={this.changeAnalysisType}>
                    <option value="PREPROCESS_DATA">Preprocess Data</option>
                    <option value="CLASSIFY_DATA">Classify Data</option>
                    <option value="TRAIN_PREPROCESSOR">Train Preprocessor</option>
                    <option value="TRAIN_CLASSIFIER">Train Classifier</option>
                    <option value="GENERATE_EER">Generate EER</option>
                </select>
            </div>
            <div className="analysis-help">
                <strong>Processing Configuration</strong>
                <p>
                    You will provide an input dateaset and select preprocessing to perform.
                </p>
                <strong>Output</strong>
                <p>
                    The preprocessing will be applied to your dataset and returned in a format of your choosing.
                </p>
            </div>
            <button className="btn btn-default pull-right" onClick={this.next}>Next</button>
        </form>;
    }
}