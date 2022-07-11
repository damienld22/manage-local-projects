import { ReloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useState } from 'react';
import useProjects from '../../hooks/useProjects';
import useSnackbar from '../../hooks/useSnackbar';
import styles from './Title.module.css';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  const { refreshProjectsState } = useProjects();
  const [refreshIsLoading, setRefreshIsLoading] = useState(false);
  const { displaySuccessMessage } = useSnackbar();

  const handleClickRefresh = async () => {
    setRefreshIsLoading(true);
    await refreshProjectsState();
    setRefreshIsLoading(false);
    displaySuccessMessage('Status des projets mis à jour', 3);
  };

  return (
    <div className={styles.container}>
      <Typography>
        <h1>{title}</h1>
      </Typography>

      <Button onClick={handleClickRefresh} loading={refreshIsLoading} icon={<ReloadOutlined />} />
    </div>
  );
};

export default Title;
