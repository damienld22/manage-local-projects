import {
  DeleteOutlined,
  PlayCircleOutlined,
  StopOutlined,
  CopyOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import useProjects from '../../hooks/useProjects';
import { Project } from '../../models/project';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';
import copy from 'copy-to-clipboard';
import styles from './ProjectsTable.module.css';
import useSnackbar from '../../hooks/useSnackbar';

const ProjectsTable = ({
  projects,
  onEditProject,
}: {
  projects: Array<Project>;
  onEditProject: (name: string) => void;
}) => {
  const { deleteProject, startProject, stopProject } = useProjects();
  const [toDeleteProjectName, setToDeleteProjectName] = useState<string | null>(null);
  const [loadingStart, setLoadingStart] = useState<string | null>(null);
  const [loadingStop, setLoadingStop] = useState<string | null>(null);
  const { displaySuccessMessage } = useSnackbar();

  const handleStart = async (name: string) => {
    setLoadingStart(name);
    await startProject(name);
    setLoadingStart(null);
    displaySuccessMessage(`${name} est démarré !`);
  };

  const handleStop = async (name: string) => {
    setLoadingStop(name);
    await stopProject(name);
    setLoadingStop(null);
    displaySuccessMessage(`${name} est arrêté !`);
  };

  const columns: ColumnsType<Project> = [
    {
      title: 'État',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'started' ? 'green' : 'red'}>
          {status === 'started' ? 'OK' : 'KO'}
        </Tag>
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description || '/',
    },
    {
      title: 'Localisation',
      dataIndex: 'location',
      key: 'location',
      render: (elt) => (
        <div className={styles.location}>
          <p>{elt}</p>
          <Tooltip overlay='Copier le chemin'>
            <Button
              icon={<CopyOutlined />}
              onClick={() =>
                copy(elt, {
                  onCopy: () => displaySuccessMessage('Chemin copié dans le presse-papier !', 3),
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (elt) => (
        <div>
          <Tooltip overlay='Démarrer le projet'>
            <Button
              onClick={() => handleStart(elt.name)}
              shape='circle'
              type='ghost'
              loading={Boolean(loadingStart === elt.name)}
              className={styles.action}
              icon={<PlayCircleOutlined />}
            />
          </Tooltip>
          <Tooltip overlay='Arrêter le projet'>
            <Button
              onClick={() => handleStop(elt.name)}
              shape='circle'
              type='ghost'
              loading={Boolean(loadingStop === elt.name)}
              className={styles.action}
              icon={<StopOutlined />}
            />
          </Tooltip>
          <Tooltip overlay='Éditer'>
            <Button
              onClick={() => onEditProject(elt.name)}
              shape='circle'
              type='ghost'
              className={styles.action}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip overlay='Supprimer'>
            <Button
              onClick={() => setToDeleteProjectName(elt.name)}
              shape='circle'
              type='ghost'
              className={styles.action}
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleDeleteConfirmation = (projectName: string | null): void => {
    if (projectName) {
      deleteProject(projectName);
      setToDeleteProjectName(null);
      displaySuccessMessage(`Projet ${projectName} supprimé`);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={projects}
        rowKey={(elt) => elt.location}
        pagination={false}
      />

      <DeleteProjectModal
        isVisible={Boolean(toDeleteProjectName)}
        onCancel={() => setToDeleteProjectName(null)}
        onOk={() => handleDeleteConfirmation(toDeleteProjectName)}
      />
    </>
  );
};

export default ProjectsTable;
