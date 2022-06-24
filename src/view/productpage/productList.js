import axios from "axios";
import ProductListBody from "../../components/productcomponents/productListBody";
import {useEffect, useState, useMemo} from "react";
import {MainContext, useContext} from "../../context.js";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";



function ProductList() {
    const {loading, setLoading} = useContext(MainContext);
    let currentPage = 1;
    const [product, setProduct] = useState([]);
    const [productHead, setProductHead] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const element1 = document.getElementById('typeFilter1');
    const element2 = document.getElementById('typeFilter2');
    const element3 = document.getElementById('typeFilter3');
    const [brands, setBrands] = useState([]);
    const [categorys, setCategory] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [productType, setProductType] = useState(1)
    const [page, setPage] = useState(1);
    const [brandid, setbrandid]= useState(null);
    const [categoryid, setcategoryid]= useState(null);
    const [platformid, setplatformid]= useState(null);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [isFilterActive, setIsFilterActive]= useState(false);
    const [isBrandFilter, setIsBrandFilter]= useState(false);
    const [isCategoryFilter, setIsCategoryFilter]= useState(false);
    const [isPlatformFilter, setIsPlatformFilter]= useState(false);
    const categoryTargetValue = null;


    
    function getData(){
      setLoading(true);
      axios.get(`/api/Product/getProductListFilter?pageNumber=${currentPage}&product_type=${productType}&category_id=${categoryid}&brand_id=${brandid}&market_id=${platformid}`).then(response =>{
        if(response.data.Status == false){
          setLoading(false);
          swal("Hata!", "Bir hata oluştu!", "error");
        }
        else {
          setProduct(response.data.Data);
          setProductHead(response.data);
          setPage(response.data.Page);
          // setIsFilterActive(true);
          setLoading(false);
        }
      })
    }
    useEffect(()=>{
      getData();
    },[categoryid,brandid,platformid]);

    function getSearch(searchValue) {
        setLoading(true);
        if(searchInput == ""){
            getData();
            console.log("getData çalıştı");
            setLoading(false);
        }
        else {
            axios.get(`api/Product/getProductListSearch?search_key=${searchValue}`).then(response=> {
                setProduct(response.data.Data);
                setLoading(false);
            })
        }

    }

    const handlePageClick = (data) => {
        currentPage = data.selected + 1;
          getData();
    }

      function productType1(){
        setProductType(1);
        getData();
        console.log("getData çalıştı");

        element1.classList.add('currentType');
        element2.classList.remove('currentType');
        element3.classList.remove('currentType');
      }
      function productType2(){
        setProductType(2);
        getData();
        console.log("getData çalıştı");

        element1.classList.remove('currentType');
        element2.classList.add('currentType');
        element3.classList.remove('currentType');
      }
      function productType3(){
        setProductType(3);
        getData();
        console.log("getData çalıştı");

        element1.classList.remove('currentType');
        element2.classList.remove('currentType');
        element3.classList.add('currentType');
      }


      useEffect(()=>{
        setLoading(true);
        axios.get(`api/Category/getCategoryList`).then(response => {
          setCategory(response.data.Data);
          setLoading(false);
        })
      },[]);

      
      
      useEffect(()=>{
          axios.get(`api/Brand/getBrandList`).then(response => {
            setBrands(response.data.Data);
          })
      },[]);
      
      

      useEffect(()=>{
        setLoading(true);
        axios.get(`api/Market/getMarketList`).then(response => {
          setPlatforms(response.data.Data);
          setLoading(false)
        })
      },[]);

      
    return (
        <section className="section-view">
            {loading ? <div id="loading"></div> : ""}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between order-count">
              <div className="d-flex flex-row justify-content-start navigation-a">
                <h4 className="mb-sm-0">
                  <a className="currentType hashNavLink" id="typeFilter1" href={void(0)} onClick={productType1}>Satıştaki ürünler</a>
                </h4>
                <h4 className="mb-sm-0">
                  <a className="hashNavLink" id="typeFilter2" href={void(0)} onClick={productType2}>Satışta Olmayan ürünler</a>
                </h4>
                <h4 className="mb-sm-0">
                  <a className="hashNavLink" id="typeFilter3" href={void(0)} onClick={productType3}>Kilitli ürünler</a>
                </h4>
              </div>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    Toplam Ürün Sayısı: {productHead.Count}
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
                <button onClick={(e)=> getSearch(searchInput)} className="btn btn-danger searchbtn" type="button" >
                  Ara
                </button>
              </div>
              <div className="col-xl-2 ms-auto">
                <div>
                  <div className="input-group">
                    <select className="form-control" onChange={(e)=> {
                      // getCategoryFilter(e.target.value)
                      setcategoryid(e.target.value)
                    } }>
                      <option>Kategori Seç</option>
                      {categorys.map((category, index)=>{
                        return <option key={category.id} value={category.id}>
                            {category.category_name}
                        </option>
                      })}
                      
                    </select>
                    <button onClick={()=> getData(setcategoryid(null))} className="btn btn-danger" type="button" id="button-addon2" >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-2">
                <div>
                  <div className="input-group">
                    <select className="form-control" onChange={(e)=> {
                      // getPlatformFilter(e.target.value)
                      setplatformid(e.target.value)
                    }}>
                      <option>Platform Seç</option>
                      {platforms.map((platform, index)=>{
                        return <option key={platform.id} value={platform.id}>
                          {platform.market_name}
                        </option>
                      })}
                    </select>
                    <button onClick={()=> getData(setplatformid(null))} className="btn btn-danger" type="button" id="button-addon2" >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-2">
                <div>
                  <div className="input-group">
                  <select className="form-control" onChange={(e)=> {
                    // getBrandFilter(e.target.value)
                    setbrandid(e.target.value)
                  } }>
                      <option>Marka Seç</option>
                      {brands.map((brand, index)=>{
                        return <option key={brand.id} value={brand.id}>
                          {brand.brand_name}
                        </option>
                      })}
                    </select>
                    <button onClick={()=> getData(setbrandid(null))} className="btn btn-danger" type="button"  id="button-addon2" >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive product-list">
          <table className="table align-middle mb-0">
            
            <ProductListBody getData={getData} isFilterActive={isFilterActive} filteredProduct={filteredProduct} product={product}></ProductListBody>
        
            <tfoot className="table-light">
              <tr>
                <td colSpan="11">
                  <ReactPaginate
                    previousLabel="<<<"
                    nextLabel=">>>"
                    breakLabel="***"
                    pageCount={page}
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
            </tfoot>
          </table>
        </div>
            </section>
    )
}

export default ProductList