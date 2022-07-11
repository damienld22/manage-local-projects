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
  const { displaySuccessMessage, displayErrorMessage } = useSnackbar();

  const handleClickRefresh = async () => {
    setRefreshIsLoading(true);
    try {
      await refreshProjectsState();
      displaySuccessMessage('Status des projets mis à jour', 3);
    } catch {
      displayErrorMessage('Une erreur est survenue lors de la mise à jour des status');
    } finally {
      setRefreshIsLoading(false);
    }
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
