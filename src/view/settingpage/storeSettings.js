import { Link } from "react-router-dom"
import trendyolimg from "../../assets/images/trendeyol.png";
import n11image from "../../assets/images/n11.jpg";

function StoreSettings() {


    return (
        <section className="section-view">
        <div className="col-12 d-flex flex-wrap">
            <div className="card col-4 mx-1">
               <img className="card-img-top img-fluid shopimg" src={trendyolimg}  alt="Card image cap"/>
               <div className="card-body">
               <h4 className="card-title mb-2">Trednyol</h4>
               <p className="card-text">Mağazanız aktif durumdadır.</p>
               <div className="text-center">
                   <Link to="/TrendyolSettings" className="btn btn-primary">Mağaza Ayarları</Link>
               </div>
           </div>
       </div>
       <div className="card col-4 mx-1">
               <img className="card-img-top img-fluid shopimg" src={n11image}  alt="Card image cap"/>
               <div className="card-body">
               <h4 className="card-title mb-2">N11</h4>
               <p className="card-text">Mağazanız aktif durumdadır.</p>
               <div className="text-center">
                   <Link to="/n11settings" className="btn btn-primary">Mağaza Ayarları</Link>
               </div>
           </div>
       </div>
       </div>
    </section>
    )
}

export default StoreSettings