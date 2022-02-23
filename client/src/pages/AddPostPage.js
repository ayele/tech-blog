import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPostPage = () => {
  const [inputs, setInputs] = useState({
    title: '',
    category: '',
    body: '',
    mainimage: undefined,
    author: 'Amanuel Ayele',
  });
  const [categoriesList, setCategoriesList] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect: inputs: ', inputs);
  }, [inputs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resoponse = await fetch('/api/posts/add');
        console.log('response:', resoponse);
        const categories = await resoponse.json();
        console.log('categories: ', categories);
        setCategoriesList(categories);
        //set the first item as initial category selected
        const initialCategory = categories[0];
        console.log(
          '🚀 ~ file: AddPostPage.js ~ line 31 ~ fetchData ~ initialCategory',
          initialCategory
        );

        setInputs(prevInputs => ({
          ...prevInputs,
          ['category']: initialCategory.name,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async event => {
    //api call
    console.log('handling submit with imputs: ', inputs);
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('category', inputs.category);
    formData.append('body', inputs.body);
    formData.append('mainimage', inputs.mainimage);
    formData.append('author', inputs.author);
    const response = await fetch(`/api/posts/add`, {
      method: 'post',
      body: formData,
    });
    console.log(
      '🚀 ~ file: AddPostPage.js ~ line 34 ~ AddPostPage ~ response',
      response
    );

    const body = await response.json();

    if (response.status === 400) {
      setErrors(body);
      return;
    }

    //redirect to home page
    navigate('/');
  };

  const handleChange = event => {
    // console.log("handing change...", event);

    const name = event.target.name;
    let value;
    if (name === 'mainimage') {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }

    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  return (
    <>
      <h1 className='form-header'>Add Post</h1>
      <ul className='errors'>
        {errors.map((error, key) => (
          <li className='alert alert-danger' key={key}>
            {error.msg}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={inputs.title}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Category:</label>
          <select
            name='category'
            value={inputs.category}
            onChange={handleChange}>
            {categoriesList.map(category => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Body:</label>
          <textarea
            name='body'
            value={inputs.body}
            onChange={handleChange}></textarea>
        </div>

        <div className='form-group'>
          <label>Main Image:</label>
          <input type='file' name='mainimage' onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label>Author:</label>
          <select name='author' value={inputs.author} onChange={handleChange}>
            <option value='Amanuel Ayele'>Amanuel Ayele</option>
            <option value='Meron Ayele'>Meron Ayele</option>
          </select>
        </div>

        <input name='submit' type='submit' value='Save' />
      </form>
    </>
  );
};

export default AddPostPage;
