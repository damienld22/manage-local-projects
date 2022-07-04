import Title from './Title/title';
import useProjects from '../hooks/useProjects';
import { useEffect, useState } from 'react';
import ProjectsTable from './ProjectsTable/ProjectsTable';
import 'antd/dist/antd.css';
import AddProjectButton from './AddProjectButton/AddProjectButton';
import AddProjectModal from './AddProjectModal/AddProjectModal';
import { Project } from '../models/project';

const Main = () => {
  const { init, projects, addNewProject } = useProjects();
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const handleCreateProject = (project: Project) => {
    addNewProject(project);
    setCreateProjectOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title title='Mes projets' />
      <ProjectsTable projects={projects} />
      <AddProjectButton onClick={() => setCreateProjectOpen(true)} />

      <AddProjectModal
        isVisible={createProjectOpen}
        onCancel={() => setCreateProjectOpen(false)}
        onOk={handleCreateProject}
      />
    </div>
  );
};

export default Main;
