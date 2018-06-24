import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { AnalysisFormState } from '../types/index';
import AnalysisType from './AnalysisType';

export default class AnalysisBuilder extends React.Component<RouteComponentProps<{}>, AnalysisFormState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            step: 1
        }
    }

    public render() {
        var step: JSX.Element = <AnalysisType />;
        switch (this.state.step) {
            case 2:
                step = <div>Step 2</div>;
                break;
            case 3:
                step = <div>Step 3</div>;
                break;
        }
        return <div>
            <h1>Analysis Builder</h1>
            {step}
        </div>;
    }
}