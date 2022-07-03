import { useContext } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Project } from '../models/project';

export default function useProjects() {
  const projectsContext = useContext(ProjectsContext);

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
    return [
      {
        name: 'MyPatientCare',
        status: 'started',
        location: '~/workspace/MyPatientCare',
        description: 'MyPatientCare for developpment, using PMS en MSCORE',
        startScriptLocation: '~/workspace/MyPatientCare/dev/start.sh',
        stopScriptLocation: '~/workspace/MyPatientCare/dev/stop.sh',
      },
      {
        name: 'PMS',
        status: 'stopped',
        location: '~/workspace/PMS',
        description: 'PMS for development',
        startScriptLocation: '~/workspace/PMS/dev/start.sh',
        stopScriptLocation: '~/workspace/PMS/dev/stop.sh',
      },
    ];
  }

  return {
    init,
    projects: projectsContext.projects,
  };
}
