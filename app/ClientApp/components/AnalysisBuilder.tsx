﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { AnalysisFormState, AnalysisFormData } from '../types/index';
import AnalysisType from './AnalysisType';
import AnalysisInput from './AnalysisInput';
import AnalysisPreprocessors from './AnalysisPreprocessors';
import AnalysisClassifier from './AnalysisClassifier';
import AnalysisOutput from './AnalysisOutput';

export default class AnalysisBuilder extends React.Component<RouteComponentProps<{}>, AnalysisFormState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            step: 1
        }

        // bind to make 'this' work in callback
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }

    private nextStep() {
        this.setState({
            step: this.state.step + 1
        });
    }

    private previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    public render() {
        var step: JSX.Element = <AnalysisType nextStep={this.nextStep} />;
        switch (this.state.step) {
            case 2:
                step = <AnalysisInput nextStep={this.nextStep} previousStep={this.previousStep} />;
                break;
            case 3:
                step = <AnalysisPreprocessors nextStep={this.nextStep} previousStep={this.previousStep} />;
                break;
            case 4:
                step = <AnalysisClassifier nextStep={this.nextStep} previousStep={this.previousStep} />;
                break;
            case 5:
                step = <AnalysisOutput previousStep={this.previousStep} />;
        }
        return <div>
            <h1>Analysis Builder</h1>
            {step}
        </div>;
    }
}