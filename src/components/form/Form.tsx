import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Form.css';
import { Product } from '../../models/Product';
import * as productService from '../../api/productService';



interface FormProps {
  mode: 'create' | 'edit';
}

const Form: React.FC<FormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const today = new Date().toISOString().split('T')[0];
  

  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: today,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'create') {
      try {
        const createdProduct: Product = await productService.createProduct(formData);
        console.log('Elemento creado:', createdProduct);
        navigate('/');
      } catch (error) {
        console.error('Error al crear el elemento:', error);
      }
      
    } else if (mode === 'edit') {
      try {
        const updatedProduct: Product = await productService.updateProduct(formData.id, formData);
        console.log(`Elemento actualizado con ID ${id}:`, updatedProduct);
        navigate('/');
      } catch (error) {
        console.error('Error al actualizar el elemento:', error);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: today,
    });
  };

  useEffect(() => {
    if (mode === 'edit' && id) {
      const { formData: editData } = location.state;
      setFormData(editData);
    }
  }, [mode, id]);

  return (
    <div className="form-container">
      <h2>{mode === 'create' ? 'Crear Nuevo Elemento' : 'Editar Elemento Existente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label className="form-label" htmlFor="ID">
              ID:
            </label>
            <input
              className="form-input"
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-column">
            <label className="form-label" htmlFor="name">
              Nombres:
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* Agregar otros campos del formulario aquí */}
        <div className="form-row">
          <div className="form-column">
            <label className="form-label" htmlFor="description">
              Descripcion:
            </label>
            <input
              className="form-input"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-column">
            <label className="form-label" htmlFor="logo">
              Logo:
            </label>
            <input
              className="form-input"
              type="text"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label className="form-label" htmlFor="date_release">
              Fecha de Liberacion:
            </label>
            <input
              className="form-input"
              type="date"
              id="date_release"
              name="date_release"
              value={formData.date_release}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-column">
            <label className="form-label" htmlFor="date_revision">
              Fecha de Revision:
            </label>
            {formData && <input
              className="form-input"
              type="date"
              id="date_revision"
              name="date_revision"
              value={formData.date_revision}
              onChange={handleInputChange}
              required
              readOnly
            />}
          </div>
        </div>
        <div>
          <button className="form-button form-reset-button" type="reset" onClick={handleReset}>
            Reiniciar
          </button>
          <button className="form-button form-submit-button" type="submit">
            {mode === 'create' ? 'Crear' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
