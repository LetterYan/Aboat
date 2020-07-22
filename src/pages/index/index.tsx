import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from 'components';
import Home from '../home';

const WorksList = require
	.context('../../Works', true, /.\/(.*)\/$/)
	.keys()
	.map((str) => str.replace(/(\/)|(\.)/g, ''))
	.map((item) => ({
		key: item,
		path: '/Works/' + item,
		component: require(`../../Works/${item}`).default,
	}));

export default function Index() {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/Works'>
				<Header />
				{WorksList.map((item) => (
					<Route path={item.path} key={item.key} component={item.component} />
				))}
			</Route>
		</Switch>
	);
}
