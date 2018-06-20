import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Documentation from './components/Documentation';
import AnalysisBuilder from './components/AnalysisBuilder';
import Blog from './components/Blog';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/docs' component={ Documentation } />
    <Route path='/analysis' component={ AnalysisBuilder } />
    <Route path='/blog' component={ Blog } />
</Layout>;
