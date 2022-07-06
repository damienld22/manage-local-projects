import { useContext } from 'react';
import { homedir } from 'os';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Container } from '../models/container';
import { Project, ProjectStatus } from '../models/project';
import { execCommand, isChildOf } from '../utils';
import useDocker from './useDocker';
import useJSONConfigurationFile from './useJSONConfigurationFile';

export default function useProjects() {
  const projectsContext = useContext(ProjectsContext);
  const { getJSON, setJSON } = useJSONConfigurationFile();
  const { getLaunchedContainers } = useDocker();

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
      console.error('[useProjects] Failed to add new project', err);
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
      console.error('[useProjects] Failed to delete project', err);
    }
  }

  async function startProject(projectName: string): Promise<void> {
    console.log(`[useProjects] start project ${projectName}`);
    if (projectsContext) {
      const associatedProject = projectsContext.projects.find(
        (project) => project.name === projectName,
      );

      if (associatedProject) {
        const scriptPath = associatedProject.startScriptLocation;
        console.log(`[useProjects] execute : ${scriptPath}`);
        try {
          if (scriptPath) {
            await execCommand(scriptPath);
          }
        } catch (err) {
          console.error(err);
        }
        console.log('[useProjects] Script done');
        updateStatusProject(projectName, 'started');
      }
    }

    return Promise.resolve();
  }

  async function stopProject(projectName: string): Promise<void> {
    console.log(`[useProjects] stop project ${projectName}`);

    if (projectsContext) {
      const associatedProject = projectsContext.projects.find(
        (project) => project.name === projectName,
      );

      if (associatedProject) {
        const scriptPath = associatedProject.stopScriptLocation;
        console.log(`[useProjects] execute : ${scriptPath}`);
        try {
          if (scriptPath) {
            await execCommand(scriptPath);
          }
        } catch (err) {
          console.error(err);
        }
        console.log('[useProjects] Script done');
        updateStatusProject(projectName, 'stopped');
      }
    }

    return Promise.resolve();
  }

  function updateStatusProject(projectName: string, status: ProjectStatus): void {
    if (projectsContext) {
      const updatedProjects = projectsContext.projects.map((project) =>
        project.name === projectName ? { ...project, status } : project,
      );
      projectsContext?.setProjects(updatedProjects);
      setJSON(updatedProjects);
    }
  }

  async function refreshProjectsState(): Promise<void> {
    console.log('[useProjects] refresh projects state');

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      if (projectsContext) {
        const listOfRunningContainers = await getLaunchedContainers();
        const updatedProjects: Array<Project> = projectsContext.projects.map((project) => {
          const launchedContainersUnderProject: Array<Container> = listOfRunningContainers.filter(
            (container) =>
              isChildOf(container.dockerComposeLocation, project.location.replace('~', homedir())),
          );

          return {
            ...project,
            status: launchedContainersUnderProject.length > 0 ? 'started' : 'stopped',
          };
        });

        projectsContext.setProjects(updatedProjects);
        setJSON(updatedProjects);
        resolve();
      }
      resolve();
    });
  }

  return {
    init,
    projects: projectsContext.projects,
    addNewProject,
    deleteProject,
    refreshProjectsState,
    startProject,
    stopProject,
  };
}
