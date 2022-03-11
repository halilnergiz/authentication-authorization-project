import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/style.css';
import Card from './Card'
import Logout from '../actions/Logout'

const Admin = () => {

  const navigate = useNavigate();
  localStorage.setItem('login', true)

  const [productTitle, setTitle] = useState('');
  const [productDescription, setDescription] = useState('');
  const [filterText, setFilterText] = useState('')
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const checkNewName = (e) => {
    setEditName(e.target.value)
  }

  const checkNewDescription = (e) => {
    setEditDescription(e.target.value)
  }

  const checktTitle = (e) => {
    setTitle(e.target.value);
  }

  const checkDescription = (e) => {
    setDescription(e.target.value);

  }

  // const checkPrice = (e) => {
  //   setPrice(e.target.value);
  // }

  const logout = () => {
    axios.get('http://localhost:5555/api/auth/logout')
      .then(() => {
        localStorage.setItem('login', false)
        localStorage.setItem('clientToken', null)
        localStorage.setItem('productId',null)
        navigate('/')
      })
      .catch(err => {
        console.log(err);
      })

  }

  const filterList = (e) => {
    setFilterText(e.target.value)
    console.log(e.target.value);
  }

  const filteredProducts = products.filter((product) => {
    return (product.name.toLowerCase().indexOf(filterText) !== -1)
  });

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

  const addNewProductDatasObject = {
    name: productTitle,
    price: 0,
    description: productDescription
  }

  const clientToken = {
    headers: { 'x-authorization': localStorage.getItem('clientToken') }
  }

  const addProduct = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5555/api/products',
      { ...addNewProductDatasObject },
      { ...clientToken }
    )

      .then(() => {
        getProducts()
        alert('added product')
      })
      .catch(err => {
        console.log(err);
      })
  }

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

  useEffect(() => {
    const getData = () => {
      getAllProducts()
      getProducts()
    }
    getData()
  }, []);

  // const a = (e) => {
  //   console.log(e.target.value);
  // }

  return (
    <div className="admin-area">

      <nav className="main-menu">
        <ul>
          <li>
            <a >
              <i className="fa fa-solid fa-border-all"></i>
              <span className="nav-text">
                Show All Products
              </span>
            </a>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <a onClick={logout}>
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text" >
                Logout
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div id='search-bar'>
        <input type="text" placeholder='Search product name' className='search-inpt'
          onChange={filterList} value={filterText}
        />
        <i className="fa-solid fa-magnifying-glass" />
      </div>

      <input type="checkbox" className='add-btn-check' id='add-btn' />
      <div id='add-container'>
        <label className='add-btn' htmlFor='add-btn' > Add Product </label>

        <form className='add-product-pop-up'>
          <input type="text" className='product-title' placeholder='Product Title'
            onChange={checktTitle} value={productTitle} />

          <input type="text" className='product-description' placeholder='Product Description'
            onChange={checkDescription} value={productDescription} />

          {/* <input type="text" className='product-description' placeholder='Price'
            onChange={checkPrice} value={productPrice} /> */}

          <input type="submit" value='Add' className='add-btn-popup' onClick={addProduct} />
        </form>
      </div>

      <div id='list'>
        <ul className='product-list'>
          {
            filteredProducts.map(product => {
              return (
                <li key={product.id} className='product' >
                  <Card
                    name={product.name}
                    description={product.description}
                    delete={
                      async () => {
                        await axios.delete(`http://localhost:5555/api/products/${product.id}`, {
                          ...clientToken,
                        })
                          .then(() => {
                            getProducts()
                            alert('deleted item')
                          })
                          .catch(err => {
                            console.log(err);
                          })
                      }}
                    getProductId={
                      async () => {
                        await axios.get(`http://localhost:5555/api/products/${product.id}`, {
                          ...clientToken
                        })
                          .then(response => {
                            const productId = response.data.data.id;
                            localStorage.setItem('productId', productId);
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      }
                    }
                  />
                </li>
              )
            })
          }
        </ul>
      </div>

      {/* POP-UP */}
      <div id="edit-popup" >
        <form className='edit'>
          <input
            className='edit-name'
            type="text"
            placeholder='Name'
            onChange={checkNewName}
            value={editName}
          />
          <input
            className='edit-description'
            type="text"
            placeholder='Description'
            onChange={checkNewDescription}
            value={editDescription}
          />
          <input
            className='edit-save-btn'
            type="submit"
            value='Confirm'
            onClick={async () => {
              await axios.put(`http://localhost:5555/api/products/${localStorage.getItem('productId')}`,
                {
                  name: editName,
                  price: 0,
                  description: editDescription
                },
                {
                  ...clientToken
                })
                .then(response => {
                  console.log(response);
                  getProducts()
                  alert('product saved')
                })
                .catch(err => {
                  console.log(err);
                })
            }}
          />
          <a href='#' className='close-pop-up2'>
            <i className="fa-solid fa-x"></i>
          </a>
        </form>

      </div>
      {/* POP-UP FİNİSH */}



      <div className='admin-page-control-buttons'>
        <button
          className='admin-previous-btn'
          onClick={previousPage}
        >
          Previous Page
        </button>
        <button
          className='admin-next-btn'
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>
    </div >
  )
}
export default Admin;
