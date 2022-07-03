export type ProjectStatus = 'started' | 'stopped';

export interface Project {
  name: string;
  status: ProjectStatus;
  description?: string;
  location: string;
  startScriptLocation?: string;
  stopScriptLocation?: string;
}
