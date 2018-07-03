import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnalysisFormState, AnalysisConfig, AnalysisFormData, AnalysisData, AnalysisDataType } from '../types/index';
import AnalysisType from './AnalysisType';
import AnalysisInput from './AnalysisInput';
import AnalysisPreprocessors from './AnalysisPreprocessors';
import AnalysisClassifier from './AnalysisClassifier';
import AnalysisOutput from './AnalysisOutput';

const DEFAULT_TYPE: AnalysisDataType = AnalysisDataType.PreprocessData;

export default class AnalysisBuilder extends React.Component<RouteComponentProps<{}>, AnalysisFormState> {
    private config: AnalysisConfig;

    constructor(props: RouteComponentProps<{}>) {
        super(props);

        this.state = {
            step: 1,
            type: DEFAULT_TYPE
        }

        // bind to make 'this' work in callback
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.saveData = this.saveData.bind(this);
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

    private saveData(d: AnalysisData) {
        console.log("SAVE DATA: ", d);
        console.log("Typeof d: ", typeof d);
        if (typeof d === "string") {
            const analysisType: AnalysisDataType = d as AnalysisDataType;
            this.setState({
                type: analysisType
            });
        }
        //if (typeof keyof d === AnalysisDataType) {
        //    this.config.type = d;
        //}
    }

    public render() {
        let step: JSX.Element = <AnalysisType nextStep={this.nextStep} saveData={this.saveData} />;
        const { type } = this.state;
        switch (this.state.step) {
            case 2:
                step = <AnalysisInput nextStep={this.nextStep} previousStep={this.previousStep} saveData={this.saveData} />;
                break;
            case 3:
                step = <AnalysisPreprocessors nextStep={this.nextStep} previousStep={this.previousStep} saveData={this.saveData} />;
                break;
            case 4:
                if ([AnalysisDataType.ClassifyData, AnalysisDataType.TrainClassifier].indexOf(type) > 0) {
                    step = <AnalysisClassifier nextStep={this.nextStep} previousStep={this.previousStep} saveData={this.saveData} />;
                } else {
                    step = <AnalysisOutput previousStep={this.previousStep} saveData={this.saveData} />;
                }
                break;
            case 5:
                step = <AnalysisOutput previousStep={this.previousStep} saveData={this.saveData} />;
        }
        return <div>
            <h1>Analysis Builder</h1>
            {step}
        </div>;
    }
}