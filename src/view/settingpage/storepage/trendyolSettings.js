import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../../context.js";
import swal from 'sweetalert';


function TrendyolSettings() {
    const {loading, setLoading} = useContext(MainContext);
    const [store, setStore] = useState([]);

    const [sellerName, setSellerName] = useState("");
    const [sellerID, setSellerID] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [secretKey, setSecretKey] = useState("");


    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Stores/getTrendyolStoreSetting`).then(response => {
            if(response.data.Status == false){
                setLoading(false);
                swal("Hata!", "Bir hata oluştu!", "error");
            }
            else {
                setStore(response.data.Data);
                setSellerName(response.data.Data.seller_name);
                setSellerID(response.data.Data.seller_id);
                setApiKey(response.data.Data.api_key);
                setSecretKey(response.data.Data.secret_key);
                setLoading(false);
            }
        });
    },[]);

    
    function sendData(e){
        e.preventDefault();
        setLoading(true);
        axios.post(`/api/Stores/updateTrendyolStoreSetting?seller_name=${sellerName}&seller_id=${sellerID}&api_key=${apiKey}&secret_key=${secretKey}`).then(response => {
            if(response.data.Status == false){
                setLoading(false);
                swal("Hata!", "Bir hata oluştu!", "error");
            }
            else {
                setLoading(false);
                swal("Gönderildi", "İşlem Başarılı", "success");
            }
        })
    }


    return (
        <section className="section-view">
          {loading ? <div id="loading"></div> : ""}
        <div className="item-block">
        <form>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="compnayNameinput" className="form-label">Satıcı Adı
                            </label>
                            <input value={sellerName}  onChange={(e) =>  setSellerName(e.target.value)} type="text" className="form-control sp-form-control" placeholder={store.seller_name} id="compnayNameinput"/>
                        </div>
                    </div>
                         <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="compnayNameinput" className="form-label">Satıcı ID
                            </label>
                            <input value={sellerID} onChange={(e) => setSellerID(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.seller_id} id="compnayNidinput"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="phonenumberInput" className="form-label">API </label>
                            <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.api_key} id="APIInput"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="address1ControlTextarea" className="form-label">API Secret Key </label>
                            <input value={secretKey} onChange={(e) => setSecretKey(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.secret_key} id="address1ControlTextarea"/>
                        </div>
                    </div>
                    
                    <div className="col-lg-12">
                        <div className="text-end">
                            <button type="button" onClick={sendData} className="btn btn-primary">Kaydet</button>
                        </div>
                    </div>
                </div>
        </form>
        </div>
    </section>
    )
}

export default TrendyolSettings