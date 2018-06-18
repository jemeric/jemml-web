import * as React from 'react';
import { TopNav } from './TopNav';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className="container-fluid">
            <TopNav />
            <div className="container">
                {this.props.children}
            </div>
        </div>;
    }
}
