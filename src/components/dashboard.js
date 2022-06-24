import { useEffect, useState } from "react"
import axios from 'axios';
import swal from "sweetalert";
import {MainContext, useContext} from "../context";

function Dashboard () {
    const {loading, setLoading} = useContext(MainContext);
    const [dashboard, setDashboard] = useState([]);
    const [dashboardName, setdashboardName]= useState([]);

    useEffect(()=>{
        setLoading(true);
        axios.get("/api/Default/getDasboard").then(response => {
            if(response.data.Status ==false){
                swal("Hata!", "Bir hata oluştu!", "error");
                setLoading(false);
            }
            else {
                setDashboard(response.data.Data);
                setLoading(false);
            }
        }); 
    }, []);
    useEffect(()=>{
        axios.get("/api/Stores/getTrendyolStoreSetting").then(response =>
            setdashboardName(response.data.Data)
            )
    }, []);
    


    return (
        <section className="section-view">
            {loading ? <div id="loading"></div> : ""}
            <div className="row">
            <div className="col"  >
        <div className="h-100">
            <div className="row mb-3 pb-1">
                <div className="col-12">
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h4 className="fs-16 mb-1" >Merhaba {dashboardName.seller_name} </h4>
                            <p className="text-muted mb-0">İşte Mağazanızın günlük istatistikleri.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Günlük Sipariş Sayısı</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="36894">{dashboard.BugunSiparisAdeti}</span></h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-info rounded fs-3">
                                        <i className="bx bx-shopping-bag text-info"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Haftalık Sipariş Sayısı</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="36894">{dashboard.BuHaftaSiparisAdeti}</span></h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-info rounded fs-3">
                                        <i className="bx bx-shopping-bag text-info"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Aylık Sipariş Sayısı</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="36894">{dashboard.BuAySiparisAdeti}</span></h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-info rounded fs-3">
                                        <i className="bx bx-shopping-bag text-info"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Toplam Sipariş Sayısı</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="36894">{dashboard.BuYilSiparisAdeti}</span></h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-info rounded fs-3">
                                        <i className="bx bx-shopping-bag text-info"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Günlük Ciro </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary ">{dashboard.BugunCiro} <span
                                            className="counter-value" data-target="559.25">₺</span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-success rounded fs-3">
                                        <i className="bx bx-dollar-circle text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Haftalık Ciro </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary ">{dashboard.BuHaftaCiro}<span
                                            className="counter-value" data-target="559.25">₺</span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-success rounded fs-3">
                                        <i className="bx bx-dollar-circle text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Aylık Ciro  </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary ">{dashboard.BuAyCiro} <span
                                            className="counter-value" data-target="559.25">₺</span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-success rounded fs-3">
                                        <i className="bx bx-dollar-circle text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                            <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Toplam Ciro </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "> {dashboard.BuYilCiro} <span
                                            className="counter-value" data-target="559.25">₺</span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-success rounded fs-3">
                                        <i className="bx bx-dollar-circle text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Toplam Müşteri Sayısı</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="183.35"> {dashboard.ToplamMusteriAdeti} </span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-warning rounded fs-3">
                                        <i className="bx bx-user-circle text-warning"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p
                                        className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                        Toplam Ürün Adeti</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary "><span
                                            className="counter-value" data-target="183.35"> {dashboard.UrunAdeti} </span>
                                    </h4>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-soft-warning rounded fs-3">
                                        <i className="bx  ri-stack-line text-warning"></i>
                                    </span>
                                </div>
                            </div>
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

export default Dashboard