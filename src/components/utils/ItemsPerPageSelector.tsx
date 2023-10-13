import React from 'react';

interface Props {
  itemsPerPage: number;
  onChange: (value: number) => void;
  resultCount: number;
}

const ItemsPerPageSelector: React.FC<Props> = ({
  itemsPerPage,
  onChange,
  resultCount,
}) => {
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div style={{ float: 'right', padding: '8px' }}>
        <select
          id="itemsPerPage"
          name="itemsPerPage"
          value={itemsPerPage.toString()}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div style={{ fontSize: '14px', float: 'left', padding: '8px' }}>{`${resultCount} resultados`}</div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default ItemsPerPageSelector;
