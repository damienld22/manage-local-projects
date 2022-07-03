import { Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { Project } from '../../models/project';

const columns: ColumnsType<Project> = [
  {
    title: 'État',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'started' ? 'green' : 'red'}>{status === 'started' ? 'OK' : 'KO'}</Tag>
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
];

const ProjectsTable = ({ projects }: { projects: Array<Project> }) => {
  return (
    <Table
      columns={columns}
      dataSource={projects}
      rowKey={(elt) => elt.location}
      pagination={false}
    />
  );
};

export default ProjectsTable;
