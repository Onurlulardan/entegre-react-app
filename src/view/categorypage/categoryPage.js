import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {MainContext, useContext} from "../../context.js";


function CategoryPage() {
    const {loading, setLoading} = useContext(MainContext);
    const [categorys, setCategorys] = useState([]);

    useEffect(()=>{
        axios.get(`api/Category/getCategoryList`).then(response => {
            setCategorys(response.data.Data);
        })
    },[]);

    return (
        <section className="section-view">
        {loading ? <div id="loading"></div> : ""}
        <div className="item-block">
            <table className="table table-nowrap">
                <thead>
                    <tr>
                        <th scope="col">Kategori ID</th>
                        <th scope="col">Kategori Adı</th>
                        <th scope="col">Detay</th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category, index)=>{
                        return <tr key={index} >
                        <th scope="row"><a href="#" className="fw-semibold">#{category.id}</a></th>
                        <td>{category.category_name}</td>
                         <td>
                            <Link  className="btn btn-warning btn-label waves-effect waves-light" to={`/CategoryDetail/${category.id}`}>Detay</Link>
                        </td>
                    </tr>
                    })}
                    
                </tbody>
            </table>
        </div>

    </section>
    )
}

export default CategoryPage