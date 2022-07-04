import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { Project } from '../../models/project';
import styles from './AddProjectModal.module.css';
import { dialog } from '@electron/remote';

interface AddProjectModalProps {
  isVisible: boolean;
  onOk: (project: Project) => void;
  onCancel: () => void;
}

const emptyProject: Project = {
  location: '',
  name: '',
  status: 'stopped',
  startScriptLocation: '',
  stopScriptLocation: '',
};

const AddProjectModal = ({ isVisible, onOk, onCancel }: AddProjectModalProps) => {
  const [newProject, setNewProject] = useState<Project>(emptyProject);

  const handleCancel = () => {
    setNewProject(emptyProject);
    onCancel();
  };

  const selectElementAndReturnPath = async (type: 'directory' | 'file'): Promise<string> => {
    try {
      const { filePaths } = await dialog.showOpenDialog({
        properties: [type === 'directory' ? 'openDirectory' : 'openFile'],
      });
      return filePaths[0];
    } catch (err) {
      console.log('[AddProjectModal] Failed to select folder location', err);
      throw new Error('[AddProjectModal] Failed to select folder location');
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
      onOk={() => onOk(newProject)}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isValidateButtonDisabled() }}
    >
      <Input
        className={styles.input}
        placeholder='Nom du projet'
        onChange={(evt) => setNewProject((prev) => ({ ...prev, name: evt.target.value }))}
      />
      <Input
        className={styles.input}
        placeholder='Description du projet'
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
        <p className={styles.selectPathResult}>{newProject?.location || 'Aucun chemin spécifié'}</p>
      </div>

      <div className={styles.input}>
        <Button
          onClick={() => {
            selectElementAndReturnPath('file').then((path) =>
              setNewProject((prev) => ({ ...prev, startScriptLocation: path })),
            );
          }}
          icon={<UploadOutlined />}
        >
          Script de lancement (script bash)
        </Button>
        <p className={styles.selectPathResult}>
          {newProject?.startScriptLocation || 'Aucun chemin spécifié'}
        </p>
      </div>

      <div className={styles.input}>
        <Button
          onClick={() => {
            selectElementAndReturnPath('file').then((path) =>
              setNewProject((prev) => ({ ...prev, stopScriptLocation: path })),
            );
          }}
          icon={<UploadOutlined />}
        >
          Script d&apos;arrêt (script bash)
        </Button>
        <p className={styles.selectPathResult}>
          {newProject?.stopScriptLocation || 'Aucun chemin spécifié'}
        </p>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
