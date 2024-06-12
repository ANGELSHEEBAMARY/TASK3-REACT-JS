import React, { useState } from 'react';
import './frockmanager.css';

const FrockManager = () => {
  const [items, setItems] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [newFrock, setNewFrock] = useState({ frockCode: '', frockName: '', frockPrice: '' });
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateFrock, setUpdateFrock] = useState({ frockCode: '', frockName: '', frockPrice: '' });

  const handleInputChange = (e, setFrock) => {
    const { name, value } = e.target;
    setFrock(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateFormChange = (e) => handleInputChange(e, setNewFrock);
  const handleUpdateFormChange = (e) => handleInputChange(e, setUpdateFrock);

  const isValidFrock = (frock) => {
    return frock.frockCode && frock.frockName && frock.frockPrice;
  };

  const addFrock = () => {
    if (isValidFrock(newFrock)) {
      setItems(prevItems => [...prevItems, newFrock]);
      setNewFrock({ frockCode: '', frockName: '', frockPrice: '' });
      setCreateFormVisible(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const updateFrockDetails = () => {
    if (isValidFrock(updateFrock)) {
      const updatedItems = items.map((item, index) =>
        index === updateIndex ? updateFrock : item
      );
      setItems(updatedItems);
      setUpdateFrock({ frockCode: '', frockName: '', frockPrice: '' });
      setUpdateFormVisible(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderTable = () => {
    return items.map((item, index) => (
      <tr key={index}>
        <td>{item.frockCode}</td>
        <td>{item.frockName}</td>
        <td>{item.frockPrice}</td>
        <td className="actions">
          <button onClick={() => editFrock(index)}>Edit</button>
          <button onClick={() => removeFrock(index)}>Delete</button>
        </td>
      </tr>
    ));
  };

  const editFrock = (index) => {
    setUpdateIndex(index);
    setUpdateFrock(items[index]);
    setUpdateFormVisible(true);
    setCreateFormVisible(false);
  };

  const removeFrock = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="frock-manager">
      <button className="addbtn" onClick={() => setCreateFormVisible(true)}>Add New Frock</button>
      
      {createFormVisible && (
        <div className="create_form">
          <input 
            name="frockCode" 
            value={newFrock.frockCode} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Code"
          />
          <input 
            name="frockName" 
            value={newFrock.frockName} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Name"
          />
          <input 
            name="frockPrice" 
            value={newFrock.frockPrice} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Price"
          />
          <button onClick={addFrock}>Add</button>
          <button onClick={() => setCreateFormVisible(false)}>Cancel</button>
        </div>
      )}

      {updateFormVisible && (
        <div className="update_form">
          <input 
            name="frockCode" 
            value={updateFrock.frockCode} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Code"
          />
          <input 
            name="frockName" 
            value={updateFrock.frockName} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Name"
          />
          <input 
            name="frockPrice" 
            value={updateFrock.frockPrice} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Price"
          />
          <button onClick={updateFrockDetails}>Update</button>
          <button onClick={() => setUpdateFormVisible(false)}>Cancel</button>
        </div>
      )}

      <table className="table_data">
        <thead>
          <tr>
            <th>Frock Code</th>
            <th>Frock Name</th>
            <th>Frock Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
      </table>
    </div>
  );
};

export default FrockManager;
