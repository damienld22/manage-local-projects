import { relative, isAbsolute } from 'path';
import { exec } from 'child_process';

/**
 * Determine if child path is a subpath of parent path
 * @param child Path of the child file
 * @param parent Path of the parent directory
 * @returns If the child is under parent
 */
export function isChildOf(child: string, parent: string): boolean {
  const relativePath = relative(parent, child);
  return Boolean(relativePath && !relativePath.startsWith('..') && !isAbsolute(relativePath));
}

export function execCommand(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);
      resolve(stdout);
    });
  });
}
