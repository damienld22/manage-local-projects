import Title from './Title/title';
import useProjects from '../hooks/useProjects';
import { useEffect, useState } from 'react';
import ProjectsTable from './ProjectsTable/ProjectsTable';
import 'antd/dist/antd.css';
import AddProjectButton from './AddProjectButton/AddProjectButton';
import ProjectFormModal from './ProjectFormModal/ProjectFormModal';
import { Project } from '../models/project';
import useSnackbar from '../hooks/useSnackbar';

const Main = () => {
  const { init, projects, addNewProject, editProject } = useProjects();
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [toEditProject, setToEditProject] = useState<Project | undefined>();
  const { displaySuccessMessage } = useSnackbar();

  useEffect(() => {
    init();
  }, []);
  const handleClose = () => {
    setCreateProjectOpen(false);
    setToEditProject(undefined);
  };

  const handleCreateProject = (project: Project) => {
    if (toEditProject) {
      editProject(toEditProject.name, project);
      displaySuccessMessage(`Projet ${toEditProject.name} édité`);
    } else {
      addNewProject(project);
      displaySuccessMessage(`Projet ${project.name} ajouté`);
    }
    handleClose();
  };

  return (
    <div style={{ padding: 20 }}>
      <Title title='Mes projets' />
      <ProjectsTable
        projects={projects}
        onEditProject={(name) => setToEditProject(projects.find((elt) => elt.name === name))}
      />
      <AddProjectButton onClick={() => setCreateProjectOpen(true)} />

      <ProjectFormModal
        isVisible={createProjectOpen || Boolean(toEditProject)}
        existingProject={toEditProject}
        onCancel={handleClose}
        onOk={handleCreateProject}
      />
    </div>
  );
};

export default Main;
