import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './AddProjectButton.module.css';

interface AddProjectButtonProps {
  onClick: () => void;
}

const AddProjectButton = ({ onClick }: AddProjectButtonProps) => {
  return (
    <Button
      type='primary'
      className={styles.addButton}
      size='large'
      shape='circle'
      icon={<PlusOutlined />}
      onClick={onClick}
    />
  );
};

export default AddProjectButton;
