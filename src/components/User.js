import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import UserCard from './UserCard';

const User = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const navigate = useNavigate();
  localStorage.setItem('login', true)

  const logout = () => {
    axios.get('http://localhost:5555/api/auth/logout')
      .then(() => {
        localStorage.setItem('login', false)
        localStorage.setItem('clientToken', undefined)
        navigate('/')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const clientToken = {
    headers: { 'x-authorization': localStorage.getItem('clientToken') }
  }

  const getProducts = async () => {
    await axios.get('http://localhost:5555/api/products?limit=8&page=1',
      { ...clientToken })
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(err => console.log(err))
  }


  const getAllProducts = async () => {
    await axios.get('http://localhost:5555/api/products?limit=10000000',
      { ...clientToken })
      .then(response => {
        const allProducts = Math.ceil(response.data.data.length / 8);
        setPageCount(allProducts);
      })
  }


  useEffect(() => {
    const getData = () => {
      getProducts();
      getAllProducts();
    }
    getData()
  }, []);

  const nextPage = async () => {
    if (pageCount > page) {
      await axios.get(`http://localhost:5555/api/products?limit=8&page=${page + 1}`)
        .then((response) => {
          setPage(page + 1)
          setProducts(response.data.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const previousPage = async () => {
    if (page > 1) {
      await axios.get(`http://localhost:5555/api/products?limit=8&page=${page - 1}`)
        .then((response) => {
          setPage(page - 1)
          setProducts(response.data.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div className='user-page'>

      <div className='top-bar'>
        <span className='welcome' >Welcome</span>
        <button className='logout-btn' onClick={logout}>Logout</button>
      </div>

      <div className='list-for-user'>
        <ul className='product-list-for-user'>
          {
            products.map(product => {
              return (
                <li className='product' key={product.id}>
                  <UserCard
                    name={product.name}
                    description={product.description}
                    price={product.price}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>

      <div className='user-page-control-buttons'>
        <button
          className='user-previous-btn'
          onClick={previousPage}
        >
          Previous Page
        </button>
        <button
          className='user-next-btn'
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>

    </div>
  )
}

export default User