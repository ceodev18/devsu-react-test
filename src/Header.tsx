import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  onAddClick: () => void;
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '10px',
  color: 'white',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '10px',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: '16px',
  backgroundColor: '#F9DD4C',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Header: React.FC<Props> = ({ onSearch, onAddClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div style={headerStyle}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={inputStyle}
        />
      </div>
      <div>
        <button onClick={onAddClick} style={buttonStyle}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Header;
