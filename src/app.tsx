import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Main from './components/Main';

function render() {
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(<Main />);
}

render();