import * as ReactDOM from 'react-dom/client';
import Main from './components/Main';
import { ProjectsProvider } from './contexts/ProjectsContext';

function render() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <ProjectsProvider>
      <Main />
    </ProjectsProvider>,
  );
}

render();
