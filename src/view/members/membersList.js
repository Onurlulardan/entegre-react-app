import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../context.js";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";

function MemberList(){
    const {loading, setLoading} = useContext(MainContext);
    const [members, setMembers] = useState([]);
    const [membersHead, setMembersHead] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let currentPage = 1;



    function getData() {
        setLoading(true);
        axios.get(`/api/Member/getMembers?pageNumber=${currentPage}`).then(response =>{
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setMembers(response.data.Data);
                setMembersHead(response.data);
                setLoading(false);
            }
        });
    }
    useEffect(()=>{
        getData();
    },[]);

    const handlePageClick = (data) => {
        currentPage = data.selected +1;
        getData(currentPage);
    }

    function getSearch(searchValue) {
        setLoading(true);
        if(searchInput == ""){
            getData();
            setLoading(false);
          }
          else{
            axios.get(`/api/Member/getMemberSearch?search_key=${searchValue}`).then(response => {
              setMembers(response.data.Data);
              setLoading(false);
            })
          }
    }


    return (
        <section className="section-view">
        {loading ? <div id="loading"></div> : ""}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 className="mb-sm-0">Müşteriler</h4>
    
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                     {/* <li className="breadcrumb-item"><a href="javascript: void(0);">Ecommerce</a></li>
                                    <li className="breadcrumb-item active">Customers</li>  */}
                    <li>Toplam Müşteri Sayısı : { membersHead.Count }</li>
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
                    <input type="text" onChange={(e)=> setSearchInput(e.target.value)}  className="form-control search" placeholder="Ara..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                  <button onClick={(e)=> getSearch(searchInput)} className="btn btn-danger searchbtn" type="button" >
                    Ara
                  </button>
                </div>
                <div className="col-xl-2 ms-auto">
                  <div>
                    <select className="form-control" data-choices data-choices-search-false >
                      <option value="">Kategori Seç</option>
                      <option value="All">All</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-auto">
                  <div className="hstack gap-2">
                    <button type="button" className="btn btn-danger">
                      <i className="ri-equalizer-fill me-1 align-bottom"></i> Filtreyi
                      Temizle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="customerList">
                <div className="card-header border-bottom-dashed">
                  <div className="row g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Müşteri Listesi</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          data-bs-toggle="modal"
                          id="create-btn"
                          data-bs-target="#showModal"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Müşteri Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="table-responsive table-card mb-1">
                      <table className="table align-middle" id="customerTable">
                        <thead className="table-light text-muted">
                          <tr>
                            <th scope="col" style={{width: "50px"}}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
    
                            <th className="sort" data-sort="customer_name">
                              Müşteri Adı
                            </th>
                            <th className="sort" data-sort="email">Email</th>
                            <th className="sort" data-sort="date">Müşteri ID</th>
                            <th className="sort" data-sort="status">Platform</th>
                            <th className="sort" data-sort="ordercount">
                              Toplam Sipariş Adeti
                            </th>
                          </tr>
                        </thead>
                        {members.map((member, index)=>{
                            return  <tbody key={index} className="list form-check-all">
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input  className="form-check-input"  type="checkbox" name="chk_child" value="option1"/>
                                </div>
                              </th>
                              <td className="id tddisplay">
                                <a  href={void(0)}  className="fw-medium link-primary" >#{member.customer_id} </a>
                              </td>
                              <td className="customer_name">
                                { member.customer_fullname }
                              </td>
                              <td className="email">{ member.customer_email }</td>
                              <td className="date">{ member.customer_id }</td>
                              <td className="date">{ member.platform }</td>
                              <td className="date">{ member.order_count }</td>
                            </tr>
                          </tbody>
                        })}
                       
                        <tfoot className="table-light">
                          <tr>
                            <td colSpan="10">
                               <ReactPaginate
                                previousLabel="<<<"
                                nextLabel=">>>"
                                breakLabel="***"
                                pageCount={membersHead.Page}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default MemberList