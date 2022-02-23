import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategoryPage = () => {
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('category at this time: ', category);
  }, [category]);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('handling submit category...', category);

    const response = await fetch('/api/categories/add', {
      method: 'POST',
      body: JSON.stringify({ name: category }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('add category response:', response);
    const body = await response.json();

    console.log('add category body:', body);

    if (response.status === 200) {
      setAdded(true);
      setCategory('');
      setErrors([]);
    }

    if (response.status === 400) {
      setErrors(body);
      setAdded(false);
      return;
    }

    console.log('body', body);
  };

  return (
    <>
      <h1 className='form-header'>Add Category</h1>
      <ul className='errors'>
        {errors.map((error, key) => (
          <li className='alert alert-danger' key={key}>
            {error.msg}
          </li>
        ))}
      </ul>
      {added && (
        <ul className='success'>
          <li>Category added successfuly</li>
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <input type='submit' name='submit' value='Add' />
      </form>
    </>
  );
};

export default AddCategoryPage;
