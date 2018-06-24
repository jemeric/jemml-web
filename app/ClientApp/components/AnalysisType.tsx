import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class AnalysisType extends React.Component<{}, {}> {
    public render() {
        return <form>
            <h2>What sort of processing would you like to perform?</h2>
            <div className="form-group">
                <select className="form-control">
                    <option>Preprocess Data</option>
                </select>
            </div>
        </form>;
    }
}