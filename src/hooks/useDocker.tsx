import { Container } from '../models/container';
import { execCommand } from '../utils';

export default function useDocker() {
  async function getLaunchedContainers(): Promise<Array<Container>> {
    const listOfContainers = await execCommand('docker ps -q');
    const listOfContainersId = listOfContainers.split('\n').filter((elt) => elt.length > 0);

    const listOfContainersWithDockerComposeLocation = await Promise.all(
      listOfContainersId.map(async (containerId) => {
        const dockerComposeLocation = await execCommand(
          `docker inspect ${containerId} | jq -r '.[0]["Config"]["Labels"]["com.docker.compose.project.working_dir"]'`,
        );
        const nameRaw = await execCommand(`docker inspect ${containerId} | jq -r '.[0]["Name"]'`);
        const name = nameRaw.slice(1, -1); // Remove bad characters
        return {
          dockerComposeLocation,
          name,
        };
      }),
    );

    return listOfContainersWithDockerComposeLocation;
  }

  return {
    getLaunchedContainers,
  };
}
