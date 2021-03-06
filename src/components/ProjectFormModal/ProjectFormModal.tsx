import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Project } from '../../models/project';
import styles from './ProjectFormModal.module.css';
import { dialog } from '@electron/remote';

interface ProjectFormModalProps {
  isVisible: boolean;
  onOk: (project: Project) => void;
  onCancel: () => void;
  existingProject?: Project;
}

const emptyProject: Project = {
  location: '',
  name: '',
  status: 'stopped',
  startScriptLocation: '',
  stopScriptLocation: '',
};

const ProjectFormModal = ({
  isVisible,
  onOk,
  onCancel,
  existingProject,
}: ProjectFormModalProps) => {
  const [newProject, setNewProject] = useState<Project>(emptyProject);

  useEffect(() => {
    if (existingProject) {
      setNewProject(existingProject);
    }
  }, [existingProject]);

  const handleCancel = () => {
    setNewProject(emptyProject);
    onCancel();
  };

  const handleOk = () => {
    onOk(newProject);
    setNewProject(emptyProject);
  };

  const selectElementAndReturnPath = async (
    type: 'directory' | 'file',
    defaultPath?: string,
  ): Promise<string> => {
    try {
      const { filePaths } = await dialog.showOpenDialog({
        properties: [type === 'directory' ? 'openDirectory' : 'openFile'],
        defaultPath,
      });
      return filePaths[0];
    } catch (err) {
      console.log('[ProjectFormModal] Failed to select folder location', err);
      throw new Error('[ProjectFormModal] Failed to select folder location');
    }
  };

  const isValidateButtonDisabled = () =>
    !newProject.name ||
    !newProject.location ||
    !newProject.startScriptLocation ||
    !newProject.stopScriptLocation;

  return (
    <Modal
      title="Ajout d'un projet"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isValidateButtonDisabled() }}
    >
      <Input
        className={styles.input}
        placeholder='Nom du projet'
        value={newProject.name || ''}
        onChange={(evt) => setNewProject((prev) => ({ ...prev, name: evt.target.value }))}
      />
      <Input
        className={styles.input}
        placeholder='Description du projet'
        value={newProject.description || ''}
        onChange={(evt) => setNewProject((prev) => ({ ...prev, description: evt.target.value }))}
      />

      <div className={styles.input}>
        <Button
          onClick={() => {
            selectElementAndReturnPath('directory').then((path) =>
              setNewProject((prev) => ({ ...prev, location: path })),
            );
          }}
          icon={<UploadOutlined />}
        >
          Localisation du projet
        </Button>
        <p className={styles.selectPathResult}>{newProject?.location || 'Aucun chemin sp??cifi??'}</p>
      </div>

      <div className={styles.input}>
        <Button
          onClick={() => {
            selectElementAndReturnPath('file', newProject.location).then((path) =>
              setNewProject((prev) => ({ ...prev, startScriptLocation: path })),
            );
          }}
          icon={<UploadOutlined />}
        >
          Script de lancement (script bash)
        </Button>
        <p className={styles.selectPathResult}>
          {newProject?.startScriptLocation || 'Aucun chemin sp??cifi??'}
        </p>
      </div>

      <div className={styles.input}>
        <Button
          onClick={() => {
            selectElementAndReturnPath('file', newProject.location).then((path) =>
              setNewProject((prev) => ({ ...prev, stopScriptLocation: path })),
            );
          }}
          icon={<UploadOutlined />}
        >
          Script d&apos;arr??t (script bash)
        </Button>
        <p className={styles.selectPathResult}>
          {newProject?.stopScriptLocation || 'Aucun chemin sp??cifi??'}
        </p>
      </div>
    </Modal>
  );
};

export default ProjectFormModal;
