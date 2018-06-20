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
                            <li>
                                <NavLink exact to={'/'} activeClassName='active'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={'/analysis'} activeClassName='active'>Analysis Builder</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={'/docs'} activeClassName='active'>Documentation</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={'/blog'} activeClassName='active'>Blog</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>;
    }
}