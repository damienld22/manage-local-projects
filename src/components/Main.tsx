import Title from './Title/title';
import useProjects from '../hooks/useProjects';
import { useEffect } from 'react';
import ProjectsTable from './ProjectsTable/ProjectsTable';
import 'antd/dist/antd.css';

const Main = () => {
  const { init, projects } = useProjects();

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Title title='Mes projets' />
      <ProjectsTable projects={projects} />
    </div>
  );
};

export default Main;
