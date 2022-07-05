import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import useProjects from '../../hooks/useProjects';
import { Project } from '../../models/project';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';

const ProjectsTable = ({ projects }: { projects: Array<Project> }) => {
  const { deleteProject } = useProjects();
  const [toDeleteProjectName, setToDeleteProjectName] = useState<string | null>(null);
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (elt) => (
        <div>
          <Button
            onClick={() => setToDeleteProjectName(elt.name)}
            shape='circle'
            type='ghost'
            danger
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  const handleDeleteConfirmation = (projectName: string | null): void => {
    if (projectName) {
      deleteProject(projectName);
      setToDeleteProjectName(null);
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
