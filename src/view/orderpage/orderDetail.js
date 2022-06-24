import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Moment from "react-moment";
import { jsPDF } from "jspdf";
import {MainContext, useContext} from "../../context.js";
import swal from 'sweetalert';
import cargoTruck from "../../assets/images/van.gif";

function OrderDetail() {
    const {loading, setLoading} = useContext(MainContext);
    const [orderdetail, setOrderDetail] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const params = useParams();
    const currentID = params.id;
    

    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Order/getSingle?OrderID=${currentID}`).then(response => {
            if(response.data.Status == false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setOrderDetail(response.data.Data);
                setOrderProducts(response.data.Data.order_products);
                setOrderHistory(response.data.Data.order_history);
                setLoading(false);
            }
        })
    }, []);
    
    function generatePDF() {
        let doc = new jsPDF("p","pt","a4");
        doc.html(document.querySelector("#document"),{
            callback: function(pdf){
                pdf.save("detay.pdf");
            }
        })
    }

    return (
        <section className="section-view" >
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4  className="mb-sm-0"> {orderdetail.marketplace} </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                 {/* <li className="breadcrumb-item"><a href="javascript: void(0);">Ecommerce</a></li>
                                <li className="breadcrumb-item active">Customers</li>  */}
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row"  >
                <div className="col-xl-9">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">Sipariş ID #{params.id}  </h5>
                                <div className="flex-shrink-0">
                                    <button onClick={generatePDF}  className="btn btn-success btn-sm"><i className="ri-download-2-fill align-middle me-1"></i> PDF indir</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive table-card">
                                <table className="table table-nowrap align-middle table-borderless mb-0">
                                    <thead className="table-light text-muted">
                                        <tr>
                                            <th scope="col">Sipariş Detayı</th>
                                            <th scope="col">Alışveriş Tutarı</th>
                                            <th scope="col">Adet</th>
                                            <th scope="col" className="text-end">Toplam Tutar</th>
                                        </tr>
                                        </thead>
                                    <tbody>
                                        {orderProducts.map((orderproduct, index)=>{
                                            return <tr >
                                            <td>
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 avatar-md bg-light rounded p-1">  
                                                        <img src="assets/images/products/img-8.png" alt="" className="img-fluid d-block"/>  
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="fs-15"><a href={void(0)} className="link-primary"> {orderproduct.product_name} </a></h5>
                                                        <p className="text-muted mb-0">Renk: <span className="fw-medium"> {orderproduct.product_color} </span></p>
                                                        <p className="text-muted mb-0">Beden: <span className="fw-medium"> {orderproduct.product_size} </span></p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td> {orderproduct.sell_price} ₺</td>
                                            <td> {orderproduct.quantity} </td>
                                            <td className="fw-medium text-end">
                                                {orderproduct.total_sell_price}  ₺
                                            </td>
                                        </tr>
                                        })}
                                        <tr className="border-top border-top-dashed">
                                            <td colSpan="3"></td>
                                            <td colSpan="2" className="fw-medium p-0">
                                                <table className="table table-borderless mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <td>Ara Toplam  :</td>
                                                            <td className="text-end"> {orderdetail.order_total}₺</td>
                                                        </tr>
                                                        <tr>
                                                            <td>İndirim </td>
                                                            <td className="text-end">-{orderdetail.discount_total}₺</td>
                                                        </tr>
                                                        <tr className="border-top border-top-dashed">
                                                            <th scope="row">Toplam (TRY) :</th>
                                                            <th className="text-end">{orderdetail.order_total}₺</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="d-sm-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">Sipariş Durumu</h5>
                                <div className="flex-shrink-0 mt-2 mt-sm-0">
                                    <a href="javasccript:void(0;)" className="btn btn-soft-info btn-sm mt-2 mt-sm-0"><i className="ri-map-pin-line align-middle me-1"></i> Adresi Değiştir</a>
                                    <a href="javasccript:void(0;)" className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"><i className="mdi mdi-archive-remove-outline align-middle me-1"></i> Siparişi İptal Et</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" >
                            <div className="profile-timeline">
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    {orderHistory.map((orderHistorys, index)=>{
                                        return <div key={index} className="accordion-item border-0">
                                        <div  className="accordion-header" id="headingOne">
                                            <a  className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <div className="d-flex align-items-center" >
                                                    <div className="flex-shrink-0 avatar-xs">
                                                        <div className="avatar-title bg-success rounded-circle">
                                                            <i className="ri-shopping-bag-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6 className="fs-15 mb-0 fw-semibold"> {orderHistorys.status} - <span className="fw-normal">  <Moment format="DD.MM.YYYY HH:mm">{orderHistorys.created_time} </Moment> </span></h6>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="d-sm-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">Sipariş Notu</h5>
                            </div>
                        </div>
                        <div className="card-body" >
                            <div className="profile-timeline">
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div>
                                        <div  className="accordion-header" id="headingOne">
                                            <div>
                                                <label htmlFor="exampleFormControlTextarea5" className="form-label">Sipariş Notunuz Giriniz.</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                                                <button type="button" className="btn btn-primary waves-effect waves-light mt-3">Gönder</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <h5 className="card-title flex-grow-1 mb-0"><i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i> Kargo Bilgisi </h5>
                                <div className="flex-shrink-0">
                                    {orderdetail.cargoTrackingLink != null ? (<a href={orderdetail.cargoTrackingLink} class="badge badge-soft-primary fs-11" target="_blank">Siparişi Takip et</a>) : (<a class="badge badge-soft-primary fs-11" target="_blank"></a>)}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                {/* araç iconu <lord-icon src="https://cdn.lordicon.com/uetqnvvg.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style="width:80px;height:80px"></lord-icon> */}
                                <img className="cargoTruck" src={cargoTruck}></img>
                                <h5 className="fs-16 mt-2"> {orderdetail.cargoProviderName} </h5>
                                {orderdetail.cargoTrackingLink != null ? (<a href={orderdetail.cargoTrackingLink} class="text-muted mb-0" target="_blank">{orderdetail.cargoTrackingLink}</a>) : (<a class="text-muted mb-0" target="_blank">Henüz kargo gönderisi oluşturulmamıştır.</a>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <h5 className="card-title flex-grow-1 mb-0">Müşteri Detayı</h5>
                                <div className="flex-shrink-0">
                                    <a href={void(0)} className="link-secondary">Profili incele</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled mb-0 vstack gap-3">
                                <li>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <img src="http://placehold.jp/100x100.png" alt="" className="avatar-sm rounded"/>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="fs-14 mb-1"> {orderdetail.customer_fullname} </h6>
                                            <p className="text-muted mb-0">Müşteri</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0"><i className="ri-map-pin-line align-middle me-1 text-muted"></i> Kargo Adresi</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                                <li className="fw-medium fs-14"> {orderdetail.customer_fullname} </li>
                                <li> {orderdetail.shipment_city} </li>
                                <li> {orderdetail.shipment_town} </li>
                                <li> {orderdetail.shipment_district} </li>
                                <li> {orderdetail.shipment_adres} </li>
                                <li> {orderdetail.shipment_full_adres} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0"><i className="ri-map-pin-line align-middle me-1 text-muted"></i> Fatura Adersi</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                            <li class="fw-medium fs-14">{ orderdetail.customer_fullname }</li>
                                <li>{orderdetail.invoice_city}</li>
                                <li>{orderdetail.invoice_town}</li>
                                <li>{orderdetail.invoice_district}</li>
                                <li>{orderdetail.invoice_adres}</li>
                                <li>{orderdetail.invoice_full_adres}</li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>


         <div className="row pdf-container">
                <div id="document">
                    <div className="col-12" >
                    <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Sipariş Numarası</th>
                            <th scope="col">Müşteri Adı</th>
                            <th scope="col">Kargo Tipi</th>
                            <th scope="col">Sipariş Tutarı</th>
                            <th scope="col">Sipariş Kargo Adersi</th>
                            <th scope="col">Kargo Firması Adı</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><a href="#" className="fw-semibold">#</a> {orderdetail.order_number} </th>
                            <td> {orderdetail.customer_fullname} </td>
                            <td> {orderdetail.deliveryType} </td>
                            <td> {orderdetail.order_total} </td>
                            <td> {orderdetail.shipment_full_adres} </td>
                            <td> {orderdetail.cargoProviderName} </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="col-12">
                    <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Ürün ID</th>
                            <th scope="col">Ürün Adı</th>
                            <th scope="col">Mağaza Stok Kodu</th>
                            <th scope="col">Stok Kodu</th>
                            <th scope="col">Barkod</th>
                            <th scope="col">Beden</th>
                            <th scope="col">Renk</th>
                            <th scope="col">Vergi</th>
                            <th scope="col">Adet</th>
                            <th scope="col">Toplam Fiyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts.map((orderpro, index)=>{
                            return <tr key={index} >
                           <th scope="row"><a href="#" className="fw-semibold">#</a> {orderpro.order_product_id} </th>
                            <td> {orderpro.product_name} </td>
                            <td> {orderpro.merchant_sku} </td>
                            <td> {orderpro.sku} </td>
                            <td> {orderpro.barcode} </td>
                            <td> {orderpro.product_size} </td>
                            <td> {orderpro.product_color} </td>
                            <td> {orderpro.vatBase} </td>
                            <td> {orderpro.quantity} </td>
                            <td> {orderpro.total_sell_price} </td>
                        </tr>
                        })}
                        
                    </tbody>
                </table>
                </div>
                <div className="col-12">
                    <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Sipariş Durumu</th>
                            <th scope="col">Tarih</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map((orderHis, index)=>{
                            return <tr key={index}>
                            <td>{orderHis.status}</td>
                            <td> {orderHis.created_time} </td>
                        </tr>
                        })}
                        
                    </tbody>
                </table>
                </div>
                </div>
            </div>
        </section>
    )
}

export default OrderDetail