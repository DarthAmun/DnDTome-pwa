import React from 'react';
import ReactDOM from 'react-dom';
import App_old from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App_old />, div);
  ReactDOM.unmountComponentAtNode(div);
});
