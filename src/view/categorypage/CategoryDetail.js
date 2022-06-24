import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {MainContext, useContext} from "../../context.js";
import swal from 'sweetalert';


function CategoryDetail() {
    const {loading, setLoading} = useContext(MainContext);
    const [categorydata, setCategorydata] = useState([]);
    const [categoryHead, setCategoryHead] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);
    
    const params = useParams();
    const currentID = params.id;
    let currentPage = 1;

    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Category/getSingleCategory?id=${currentID}`).then(response => {
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setCategorydata(response.data.Data);
                setCategoryHead(response.data)
                setLoading(false);
            }
        })
    }, []);

    

    function getData() {
        setLoading(true);
        axios.get(`/api/Product/getProductListCategoryID?category_id=${currentID}&pageNumber=${currentPage}`).then(response => {
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setCategoryItems(response.data.Data);
                setLoading(false);
            }
        })
    }

    useEffect(()=>{
        getData();
    }, []);

    const handlePageClick = (data) => {
        currentPage = data.selected +1;
        getData(currentPage);
    }


    return (
        <section className="section-view">
        {loading ? <div id="loading"></div> : ""}
        <div className="item-block">
            <table className="table table-nowrap">
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Kategori Adı</th>
            <th scope="col">Ürün Adeti</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row"><a href={void(0)} className="fw-semibold">#{categorydata.id}  </a></th>
            <td> {categorydata.category_name} </td>
            <td> {categorydata.product_count} </td>
        </tr>
    </tbody>
</table>
        </div>
         <div className="item-block mt-3">
            <label htmlFor="compnayNameinput" className="form-label">Kategoriye Ait Ürünler</label>
                    <div className="row">
                        {categoryItems.map((categoryItem, index)=>{
                            return  <div key={index} className="col-xl-3 col-md-6">
                            <div className="card  card-height-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sp flex-shrink-0">
                                            <span className="avatar-title bg-soft-light  rounded-2 fs-2">
                                                <img className="brandDetailimg" src={categoryItem.img_path} alt={categoryItem.img_path}/>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium  mb-3"> {categoryItem.product_name} </p>
                                            <h4 className="fs-4 mb-3 "><span className="counter-value" data-target="2045"> {categoryItem.sell_price} </span></h4>
                                            <p className=" mb-0">{categoryItem.on_sale_text}</p>
                                        </div>
                                        <div className="flex-shrink-0 align-self-center">
                                            <span className="badge badge-soft-light fs-12"><i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i> Stok {categoryItem.stock_amount} <span>
                                                </span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        })}
                       
                    </div>
                     <div className="col-12">
                        <ReactPaginate
                        previousLabel="<<<"
                        nextLabel=">>>"
                        breakLabel="***"
                        pageCount={categoryHead.Page}
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
    </section>
    )
}

export default CategoryDetail