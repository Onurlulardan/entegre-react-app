import OrderListBody from "../../components/orderpagecomponents/orderlistbody"
import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
import {MainContext, useContext} from "../../context.js";

function AllOrders () {
  const {loading, setLoading} = useContext(MainContext);
  let orderType = 1;
  let currentPage = 1;
  const [orders, setOrders] = useState([]);
  const [ordersHead, setordersHead] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const element1 = document.getElementById('typeFilter1');
  const element2 = document.getElementById('typeFilter2');
  const element3 = document.getElementById('typeFilter3');
  

  function getData() {
    setLoading(true);
    return axios.get(`api/Order/getOrderList?pageNumber=${currentPage}&order_type=${orderType}`).then(response => {
      if(response.data.Status == false){
        setLoading(false);
        swal("Hata!", "Bir hata oluştu!", "error");
      }
      else {
        setOrders(response.data.Data)
        setordersHead(response.data)
        setLoading(false);
      }
    });
  }

  useEffect(()=>{
     getData();
  },[]);

  function getSearch(searchValue){
    setLoading(true);
    if(searchInput == ""){
      getData();
      setLoading(false);
    }
    else{
      axios.get(`api/Order/getOrderListSearch?search_key=${searchValue}`).then(response => {
        setOrders(response.data.Data);
        setLoading(false);
      })
    }
  }

  const handlePageClick = (data) => {
      currentPage = data.selected +1;
      getData(currentPage);
  }

  function orderType1(){
    orderType = 1;
    getData();
    element1.classList.add('currentType');
    element2.classList.remove('currentType');
    element3.classList.remove('currentType');
  }
  function orderType2(){
    orderType = 2;
    getData();
    element1.classList.remove('currentType');
    element2.classList.add('currentType');
    element3.classList.remove('currentType');
  }
  function orderType3(){
    orderType = 3;
    getData();
    element1.classList.remove('currentType');
    element2.classList.remove('currentType');
    element3.classList.add('currentType');
  }



    return (
      <section className="section-view">
        {loading ? <div id="loading"></div> : ""}
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between order-count">
          <div className="d-flex flex-row justify-content-start navigation-a">
            <h4 className="mb-sm-0">
              <a id="typeFilter1" className="currentType hashNavLink" href={void(0)} onClick={orderType1}
                >Onaylanan Siparişler</a>
            </h4>
            <h4 className="mb-sm-0">
              <a className="hashNavLink" id="typeFilter2" href={void(0)} onClick={orderType2}
                >Onay Bekleyen Siparişler</a>
            </h4>
            <h4 className="mb-sm-0">
              <a className="hashNavLink" id="typeFilter3" href={void(0)} onClick={orderType3} >İptal Edilen Siparişler</a>
            </h4>
          </div>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                Toplam Sipariş Sayısı: {ordersHead.Count}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header border-0 rounded">
        <div className="row g-2">
          <div className="col-xl-3 d-flex">
            <div className="search-box">
              <input onChange={(e)=> setSearchInput(e.target.value)} type="text" className="form-control search" placeholder="Ara..."/>
              <i className="ri-search-line search-icon"></i>
            </div>
            <button onClick={(e)=> getSearch(searchInput)} className="btn btn-danger searchbtn"
              type="button">
              Ara
            </button>
          </div>
          
          <div className="col-xl-2 ms-auto">
            <div>
              <select className="form-control" data-choices data-choices-search-false>
                <option value="">Kategori Seç</option>
                <option value="All">All</option>
                <option value="Retailer">Retailer</option>
                <option value="Health & Medicine">Health & Medicine</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Food Service">Food Service</option>
                <option value="Computers & Electronics">Computers & Electronics </option>
              </select>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="hstack gap-2">
              <button type="button" className="btn btn-danger">
                <i className="ri-equalizer-fill me-1 align-bottom"></i> Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="table-responsive product-list">
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
                <th scope="col">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="responsivetableCheck"/>
                        <label className="form-check-label" htmlFor="responsivetableCheck"></label>
                    </div>
                </th>
                <th scope="col">Sıra</th>
                <th scope="col">#ID</th>
                <th scope="col">Müşteri Adı</th>
                <th scope="col">Tarih</th>
                <th scope="col">Durumu</th>
                <th scope="col">Tutar</th>
                <th scope="col">Platformlar</th>
                <th scope="col">Detay</th>
          </tr>
        </thead>
        <OrderListBody orders={orders}></OrderListBody>
        <tfoot className="table-light">
          <tr className="">
            <td colSpan="9">
              <ReactPaginate
              previousLabel="<<<"
              nextLabel=">>>"
              breakLabel="***"
              pageCount={ordersHead.Page}
              marginPagesDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-link'}
              nextClassName={'page-link'}
              breakClassName={'page-link'}
              activeClassName={'active'}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="9">
              <p  className="peg-desc">
                {ordersHead.MessageDetail}
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
      </section>
    )
}

export default AllOrders