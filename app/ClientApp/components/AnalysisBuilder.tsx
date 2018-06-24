import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { AnalysisFormState } from '../types/index';

export default class AnalysisBuilder extends React.Component<RouteComponentProps<{}>, AnalysisFormState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            step: 1
        }
    }

    public render() {
        switch (this.state.step) {
            case 1:
                return <div>Step 1</div>
            case 2:
                return <div>Step 2</div>
            case 3:
                return <div>Step 3</div>
        }
        return <div>Default Step</div>
/*        return <div>
            <h1>Analysis Builder - Coming Soon!</h1>
        </div>; */
    }
}