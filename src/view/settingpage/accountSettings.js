import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../context.js";
import swal from 'sweetalert';


function AccountSettings() {
    const {loading, setLoading} = useContext(MainContext);
    const [store, setStore] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");


    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Company/getCompanySettings`).then(response => {
            if(response.data.Status == false){
                setLoading(false);
                swal("Hata!", "Bir hata oluştu!", "error");
            }
            else {
                setStore(response.data.Data);
                setLoading(false);
            }
        });
    },[]);
    
    function sendData(e){
        e.preventDefault();
        setLoading(true);
        axios.post(`/api/Company/updateCompanySetting?company_name=${name}&phone=${phoneNumber}&mail=${email}&adres=${adress}`).then(response => {
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
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="compnayNameinput" className="form-label">Firma Adınız</label>
                            <input  onChange={(e) => setName(e.target.value)} type="text" className="form-control" value={store.company_name} placeholder={store.company_name} id="compnayNameinput"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="phonenumberInput" className="form-label">Telefon Numarası </label>
                            <input  onChange={(e) => setPhoneNumber(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.company_phone} id="APIInput"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="phonenumberInput" className="form-label">Email Adresi </label>
                            <input  onChange={(e) => setEmail(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.company_mail} id="APIInput"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="address1ControlTextarea" className="form-label">Adres </label>
                            <input  onChange={(e) => setAdress(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={store.company_adres} id="address1ControlTextarea"/>
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

export default AccountSettings