import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './pages/index';
import { FirstPage } from 'components';
import 'theme/index.less';

function App() {
	return (
		<Router>
			<FirstPage />
			<Index />
		</Router>
	);
}

export default App;
