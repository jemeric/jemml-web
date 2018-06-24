import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class AnalysisType extends React.Component<{}, {}> {
    private handleSelectChange(event: React.FormEvent<HTMLSelectElement>) {
        console.log("CHAGE EVENT: ", event.currentTarget.value);
    }

    public render() {
        return <form>
            <h2>What sort of processing would you like to perform?</h2>
            <div className="form-group">
                <select className="form-control" onChange={this.handleSelectChange}>
                    <option value="PREPROCESS_DATA">Preprocess Data</option>
                    <option value="CLASSIFY_DATA">Classify Data</option>
                    <option value="TRAIN_PREPROCESSOR">Train Preprocessor</option>
                    <option value="TRAIN_CLASSIFIER">Train Classifier</option>
                    <option value="GENERATE_EER">Generate EER</option>
                </select>
            </div>
        </form>;
    }
}