import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../context.js";
import { Link } from "react-router-dom";



function BrandList(){
    const {loading, setLoading} = useContext(MainContext);
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        axios.get(`api/Brand/getBrandList`).then(response =>{
            setBrands(response.data.Data);
        })
    }, [])

    return (
        <section class="section-view ">
        {loading ? <div id="loading"></div> : ""}
        <table class="table table-nowrap table-bg">
<thead>
    <tr>
        <th scope="col">Sıra</th>
        <th scope="col">ID</th>
        <th scope="col">Marka Adı</th>
        <th scope="col">İşlemler</th>
    </tr>
</thead>
<tbody>
    {brands.map((brand, index)=>{
        return  <tr key={index} >
        <th scope="row">{index + 1}</th>
        <th scope="row"><a href="#" class="fw-semibold">#{brand.id} </a></th>
        <td> {brand.brand_name} </td>
        <td><Link to={`/BrandListDetail/${brand.id}`} class="btn btn-warning btn-label waves-effect waves-light">Detay </Link></td>
    </tr>
    })}
   
</tbody>
        </table>
    </section>
    )
}

export default BrandList