import NavBar from './components/NavBar.js';
import {BrowserRouter, Routes, Route, useParams, HashRouter} from 'react-router-dom';
import Dashboard from './components/dashboard.js';
import AllOrders from './view/orderpage/allOrders.js';
import {Link} from "react-router-dom";
import OrderDetail from './view/orderpage/orderDetail.js';
import { MainContext, useContext } from './context.js';
import {useEffect, useState} from "react";
import ErrorPage from './view/ErrorPage.js';
import ProductList from './view/productpage/productList.js';
import CategoryPage from './view/categorypage/categoryPage.js';
import CategoryDetail from './view/categorypage/CategoryDetail.js';
import BrandList from './view/brandpage/brandList.js';
import BrandListDetail from './view/brandpage/brandListDetail.js';
import MemberList from './view/members/membersList.js';
import ProductListDetail from './view/productpage/productListDetail.js';
import 'bootstrap';
import StoreSettings from './view/settingpage/storeSettings.js';
import TrendyolSettings from './view/settingpage/storepage/trendyolSettings.js';
import N11Settings from './view/settingpage/storepage/n11Settings.js';
import AccountSettings from './view/settingpage/accountSettings.js';

function App() {
  const [loading, setLoading]= useState(false);


  const data = {
    loading,
    setLoading,
  }

  return (
    <MainContext.Provider value={data} className="App">
      <div className='app-cover'>
        <HashRouter>
        <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Dashboard></Dashboard>}></Route>
            <Route path='/AllOrders' element={<AllOrders></AllOrders>}></Route>
            <Route path='/OrderDetail/:id' element={<OrderDetail></OrderDetail>}></Route>
            <Route path='/ProductList' element={<ProductList></ProductList>}></Route>
            <Route path='/ProductListDetail/:id' element={<ProductListDetail></ProductListDetail>}></Route>
            <Route path='/CategoryPage' element={<CategoryPage></CategoryPage>}></Route>
            <Route path='/CategoryDetail/:id' element={<CategoryDetail></CategoryDetail>}></Route>
            <Route path='/BrandList' element={<BrandList></BrandList>}></Route>
            <Route path='/BrandListDetail/:id' element={<BrandListDetail></BrandListDetail>}></Route>
            <Route path='/MemberList' element={<MemberList></MemberList>}></Route>
            <Route path='/StoreSettings' element={<StoreSettings></StoreSettings>}></Route>
            <Route path='/TrendyolSettings' element={<TrendyolSettings></TrendyolSettings>}></Route>
            <Route path='/N11Settings' element={<N11Settings></N11Settings>}></Route>
            <Route path='/AccountSettings' element={<AccountSettings></AccountSettings>}></Route>
            <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
        </HashRouter>
      </div>
    </MainContext.Provider>
  );
}

export default App;
