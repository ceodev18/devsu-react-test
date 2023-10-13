import React, { useState } from 'react';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <div className="dropdown-button" onClick={handleDropdownClick}>
        <div className="dots">...</div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={onEdit}>Edit</li>
          <li onClick={onDelete}>Delete</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
