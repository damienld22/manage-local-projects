import { Modal } from 'antd';

interface DeleteProjectModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteProjectModal = ({ isVisible, onOk, onCancel }: DeleteProjectModalProps) => {
  return (
    <Modal title="Suppression d'un projet" visible={isVisible} onOk={onOk} onCancel={onCancel}>
      <p>
        Êtes-vous sûr de vouloir supprimer ce projet (le projet en lui même ne sera pas supprimé) ?
      </p>
    </Modal>
  );
};

export default DeleteProjectModal;
