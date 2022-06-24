import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../context.js";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";


function BrandListDetail(){
    const {loading, setLoading} = useContext(MainContext);
    const [singleBrands, setSingleBrands] = useState([]);
    const [singleBrandsHeads, setSingleBrandsHeads] = useState([]);
    const [brandProducts, setBrandProducts] = useState([]);
    const params = useParams();
    const currentID = params.id;
    let currentPage = 1;

    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Brand/getSingleBrand?id=${currentID}`).then(response=>{
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setSingleBrands(response.data.Data);
                setLoading(false);
            }
        })
    },[]);

    function getData() {
        setLoading(true);
        axios.get(`/api/Product/getProductListBrandID?brand_id=${currentID}&pageNumber=${currentPage}`).then(response => {
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setBrandProducts(response.data.Data);
                setSingleBrandsHeads(response.data)
                setLoading(false);
            }
        })
    }
    useEffect(()=>{
        getData();
    },[]);

    const handlePageClick = (data) => {
        currentPage = data.selected +1;
        getData(currentPage);
    }

    return (
        <section className="section-view">
        {loading ? <div id="loading"></div> : ""}
        <div  className="item-block firt-item-block1">
            <form >
    <div className="row">
        <div className="col-12">
            <div className="col-12">
            <div className="mb-3">
                <label htmlFor="lastNameinput" className="form-label">Marka Adı</label>
                <input type="text" className="form-control" placeholder={singleBrands.brand_name}   id="lastNameinput"/>
            </div>
        </div>
        <div className="col-12">
            <div className="mb-3">
                <label htmlFor="compnayNameinput" className="form-label">Ürün Adeti</label>
                <input type="text" className="form-control" readOnly placeholder={singleBrands.product_count}  id="compnayNameinput"/>
            </div>
        </div>
        <div className="col-lg-12">
            <div className="text-end">
                <button type="submit" className="btn btn-primary">Kaydet</button>
            </div>
        </div>
        </div>
    </div>
</form>
        </div>
        <div className="item-block mt-3">
            <label htmlFor="compnayNameinput" className="form-label">Markanın Ürünleri</label>
            <div  className="row">
            {brandProducts.map((brandProduct, index)=>{
                return <div className="col-xl-3 col-md-6" key={index}>
                            <div className="card  card-height-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sp flex-shrink-0">
                                            <span className="avatar-title bg-soft-light  rounded-2 fs-2">
                                                <img className="brandDetailimg" src={brandProduct.img_path} alt={brandProduct.img_path}/>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium  mb-3"> {brandProduct.product_name} </p>
                                            <h4 className="fs-4 mb-3 "><span className="counter-value" data-target="2045"> {brandProduct.sell_price} </span></h4>
                                            <p className=" mb-0">{brandProduct.on_sale_text}</p>
                                        </div>
                                        <div className="flex-shrink-0 align-self-center">
                                            <span className="badge badge-soft-light fs-12"><i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i> Stok {brandProduct.stock_amount} <span>
                                                </span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            })}
            </div>
                     <div className="col-12">
                        <div className="col-12">
                        <ReactPaginate
                        previousLabel="<<<"
                        nextLabel=">>>"
                        breakLabel="***"
                        pageCount={singleBrandsHeads.Page}
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
                    </div>
        </div>
        </div>
    </section>

    )
}

export default BrandListDetail