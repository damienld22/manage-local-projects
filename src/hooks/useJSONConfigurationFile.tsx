import fs from 'fs';
import { useEffect } from 'react';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const CONFIG_DIRECTORY = join(homedir(), '.local-projects');
const CONFIG_PROJECTS = join(CONFIG_DIRECTORY, 'projects.json');

export default function useJSONConfigurationFile() {
  useEffect(() => {
    // Create directory config file if not exists
    if (!existsSync(CONFIG_DIRECTORY)) {
      mkdirSync(CONFIG_DIRECTORY);
    }
  }, []);

  const getConfigurationFileContent = (): unknown => {
    try {
      if (fs.existsSync(CONFIG_PROJECTS)) {
        const rowContent = fs.readFileSync(CONFIG_PROJECTS, 'utf-8');
        return JSON.parse(rowContent);
      } else {
        return [];
      }
    } catch (err) {
      console.error('[useJSONConfigurationFile] Failed to get content of configuration file', err);
      return [];
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setConfigurationFileContent = (content: any): void => {
    try {
      fs.writeFileSync(CONFIG_PROJECTS, JSON.stringify(content), { encoding: 'utf-8' });
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to write in file configuration ${CONFIG_PROJECTS}`);
    }
  };

  return {
    getJSON: getConfigurationFileContent,
    setJSON: setConfigurationFileContent,
  };
}
