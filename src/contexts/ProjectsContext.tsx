import { createContext, ReactNode, useState } from 'react';
import { Project } from '../models/project';

const ProjectsContext = createContext<{
  projects: Array<Project>;
  setProjects: (projects: Array<Project>) => void;
} | null>(null);

const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Array<Project>>([]);

  function updateProjects(projects: Array<Project>): void {
    console.debug('[ProjectsContext] Update', projects);
    setProjects(projects);
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects: updateProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsProvider };
