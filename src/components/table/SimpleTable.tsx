import React, { useState, useEffect } from 'react';
import './SimpleTable.css';
import Header from '../../Header';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from '../dialog/DeleteConfirmationDialog';
import { Product } from '../../models/Product';
import * as ProductService from '../../api/productService'; // Import the product service
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SimpleTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Estado para controlar la apertura del diálogo de confirmación
  const [selectedDeleteRow, setSelectedDeleteRow] = useState<any>(null); // Estado para almacenar la fila que se va a eliminar
  const [loading, setLoading] = useState(true);
  
  const columns = [
    { header: 'Logo', field: 'id' },
    { header: 'Nombre del Producto', field: 'name' },
    { header: 'Descripcion', field: 'description' },
    { header: 'Fecha de Liberacion', field: 'date_release' },
    { header: 'Fecha de reestructuracion', field: 'date_revision' },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await ProductService.getProducts();
        setData(products);
        setOriginalData(products);
        setRowCount(products.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemsPerPageChange = (e: any) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  const toggleDropdown = (rowIndex: any) => {
    if (openDropdownIndex === rowIndex) {
      setOpenDropdownIndex(-1);
    } else {
      setOpenDropdownIndex(rowIndex);
    }
  };

  const closeDropdown = () => {
    setOpenDropdownIndex(-1);
  };

  const paginatedData = data.slice(0, itemsPerPage);

  // Function to handle search and filter data
  const handleSearch = (query: any) => {
    if (query === '') {
      setData(originalData);
      setRowCount(originalData.length);
    } else {
      let sample = data;
      const filteredData = sample.filter((item) =>
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setData(filteredData);
      setRowCount(filteredData.length); // Actualiza la cantidad total de filas después de la búsqueda
    }

  };

  // Function to handle adding a new item
  const handleAddClick = () => {
    navigate('/form/create');
  };

  const handleEdit = (row: Product) => {
    row.date_release = cleanDateinForm(formatDate(row.date_release));
    row.date_revision = cleanDateinForm(formatDate(row.date_revision));
    
    navigate(`/form/edit/${row.id}`, { state: { formData: row } });
  };

  const handleDelete = (row: any) => {
    // Implement the logic for deletion here
    setSelectedDeleteRow(row);
    setDeleteConfirmationOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      if (selectedDeleteRow) {
        // Call the deleteProduct function with the selected product's ID
        await ProductService.deleteProduct(selectedDeleteRow.id);
        console.log(`Product with ID ${selectedDeleteRow.id} has been deleted.`);
        
        // Close the delete confirmation dialog
        setDeleteConfirmationOpen(false);
        
        // Optionally, you can update the data to reflect the deletion
        const updatedData = data.filter((product) => product.id !== selectedDeleteRow.id);
        setData(updatedData);
        setRowCount(updatedData.length);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleCancelDelete = () => {
    // Cancela la eliminación y cierra el diálogo de confirmación
    setDeleteConfirmationOpen(false);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const cleanDateinForm = (dateString: string): string => {
    const content = dateString.split('/');
    return `${content[2]}-${content[1]}-${content[0]}`; // Formato "dd/MM/yyyy"
  }
  return (
    <div>
      <Header onSearch={handleSearch} onAddClick={handleAddClick} />
      {loading ? (
        <table className="simple-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="th-style">
                  {column.header}
                </th>
              ))}
              <th className="th-style" />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="td-style">
                    <Skeleton duration={4} width={column.field === 'id' ? 40 : '100%'} height={40} />
                  </td>
                ))}
                <td className="td-style">
                  <div className="dropdown">
                    <Skeleton width={60} height={40} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="simple-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="th-style">
                {column.header}
              </th>
            ))}
            {/*head for menu options*/}
            <th className="th-style" />
          </tr>

        </thead>
        <tbody>
          {paginatedData.map((row: any, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="td-style">
                  {column.field === 'id' ? (
                    <div className="circle-style">{row[column.field]}</div>
                  ) : column.field === 'date_release' || column.field === 'date_revision' ? (
                    formatDate(row[column.field])
                  ) : (
                    row[column.field]
                  )}
                </td>
              ))}
              <td className="td-style">
                <div className="dropdown">
                  <button
                    className="dropdown-button"
                    onClick={() => toggleDropdown(rowIndex)}
                  >
                    <i className="material-symbols-outlined dots">more_vert</i>
                  </button>
                  {openDropdownIndex === rowIndex && (
                    <div className={`dropdown ${openDropdownIndex === rowIndex ? 'open' : ''}`}>
                      <ul>
                        <li onClick={() => handleEdit(row)}>Edit</li>
                        <li onClick={() => handleDelete(row)}>Delete</li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <div className="select-container">
        <select
          id="itemsPerPage"
          name="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="label-style">{`${paginatedData.length} resultado`}</div>
      <div style={{ clear: 'both' }}></div>
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmationOpen}
        product={selectedDeleteRow}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </div>
  );
};

export default SimpleTable;
