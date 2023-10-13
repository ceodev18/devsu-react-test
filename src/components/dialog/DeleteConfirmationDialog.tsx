import React from 'react';
import './DeleteConfirmationDialog.css';
import { Product } from '../../models/Product';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Product;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}) => {
  const handleDeleteClick = () => {
    onConfirm();
    onClose();
  };
  if (!isOpen) {
    return null; // Don't render the modal if isOpen is false
  }
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-dialog">
        <p><b>¿Estas seguro de eliminar el producto ? {product.name}</b></p>
        <button onClick={onClose} className='modal-dialog-button cancel-button'>Cancelar</button>
        <button onClick={handleDeleteClick} className='modal-dialog-button delete-button'>Confirmar</button>
        
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;