import { useContext } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Project } from '../models/project';
import useJSONConfigurationFile from './useJSONConfigurationFile';

export default function useProjects() {
  const projectsContext = useContext(ProjectsContext);
  const { getJSON, setJSON } = useJSONConfigurationFile();

  if (!projectsContext) {
    throw new Error('The hook useProjects must be inside a ProjectsContextProvider');
  }

  function init() {
    try {
      projectsContext?.setProjects(getProjectsFromConfigFile());
    } catch (err) {
      console.error('[useProjects] Failed to get list of projects', err);
    }
  }

  function getProjectsFromConfigFile(): Array<Project> {
    const contentConfigFile = getJSON();
    return contentConfigFile as Array<Project>;
  }

  function addNewProject(project: Project) {
    try {
      const updatedProjects = [];
      if (projectsContext?.projects) {
        updatedProjects.push(...projectsContext.projects);
      }
      updatedProjects.push(project);
      projectsContext?.setProjects(updatedProjects);
      setJSON(updatedProjects);
    } catch (err) {
      console.error('[useProject] Failed to add new project', err);
    }
  }

  function deleteProject(projectName: string): void {
    try {
      const updatedProjects = projectsContext?.projects.filter((elt) => elt.name !== projectName);
      if (updatedProjects) {
        projectsContext?.setProjects(updatedProjects);
        setJSON(updatedProjects);
      }
    } catch (err) {
      console.error('[useProject] Failed to delete project', err);
    }
  }

  return {
    init,
    projects: projectsContext.projects,
    addNewProject,
    deleteProject,
  };
}
