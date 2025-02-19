import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import React,{useState} from 'react';
import AddItem from './components/AddItem';

function App() {
  const products = [ 
    {
      name : "Samsung S60",
      price: 80000,
      quantity: 0,
      image: "",
      description: "Samsung s80 phone"
    },
    {
      name : "Iphone 15 pro Max",
      price: 160000,
      quantity: 0,
      image: "",
      description: "Iphone 15 pro Max phone"
    },
  ];

  let [productList, setProductList] = useState(products)
  let [totalAmount, setTotalAmount] = useState(0)


  const incrementQuant = (index) => {
    let newProductList = [...productList]
    newProductList[index].quantity++
    setTotalAmount(totalAmount + newProductList[index].price)
    setProductList(newProductList);

  }

  const decrementQuant = (index) => {
    let newProductList = [...productList]
    if(newProductList[index].quantity > 0) { 
      newProductList[index].quantity--
      setTotalAmount(totalAmount - newProductList[index].price)
    }
    setProductList(newProductList);
  }

  const resetQuantity = () => {
    let newProductList = [...productList];
    newProductList.forEach((product) => {
      product.quantity = 0
    })
    setProductList(newProductList)
    setTotalAmount(0)
  }

  const removeItem = (index) => {
    let newProductList = [...productList];
    newProductList.splice(index, 1);
    let newTotalAmount = newProductList.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setProductList(newProductList)
    setTotalAmount(newTotalAmount)
  }

  const addNewItem = (data) => {
    let newProductList = [...productList];
    newProductList.push({
      name: data.productName,
      price: Number(data.productPrice),
      quantity: Number(data.productQty),
      description: data.productDesc
    });
    setProductList(newProductList)
  }

  return (
   <>
  <Navbar/>
  <main className="container  mt-5">
    <AddItem addNewItem={addNewItem}/>
  <ProductList productList={productList} removeItem ={removeItem} incrementQuant={incrementQuant} decrementQuant={decrementQuant}/>
  </main>
  <Footer totalAmount={totalAmount} resetQuantity={resetQuantity} />
   </>
  );
}

export default App;
