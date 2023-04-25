import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:5000/api/data', formData);
    setTableData([...tableData, response.data]);
    setFormData({});
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/data');
      setTableData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type           name="input"
          value={formData.input || ''}
          onChange={handleInputChange}
        /> </label>
        <button className='button' type="submit">Save</button>
      </form>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Input</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.input}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

