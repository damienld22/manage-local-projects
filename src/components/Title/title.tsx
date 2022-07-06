import { ReloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useState } from 'react';
import useProjects from '../../hooks/useProjects';
import styles from './Title.module.css';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  const { refreshProjectsState } = useProjects();
  const [refreshIsLoading, setRefreshIsLoading] = useState(false);

  const handleClickRefresh = async () => {
    setRefreshIsLoading(true);
    await refreshProjectsState();
    setRefreshIsLoading(false);
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
