import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class TopNav extends React.Component<{}, {}> {
    public render() {
        return <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavLink exact to={'/'} activeClassName="active" className="navbar-brand">
                        <span className="glyphicon glyphicon-cog"></span>
                        &nbsp; JEMML <span className="extended-title">Machine Learning</span>
                    </NavLink>
              </div>
                    <div id="navbar3" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Analysis Builder</a></li>
                            <li><a href="#">Documentation</a></li>
                        </ul>
                    </div>
                </div>
            </nav>;
    }
}