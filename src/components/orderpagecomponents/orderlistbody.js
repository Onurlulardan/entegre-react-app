import {Link, useParams, useNavigate} from "react-router-dom";
import Moment from "react-moment";

function OrderListBody (props){
    let { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <tbody>  
           {props.orders.map((order,index)=>{
               return <tr key={order.order_id}>
               <th scope="row">
               <div className="form-check">
                   <input className="form-check-input" type="checkbox" value="" id="responsivetableCheck01"/>
                   <label className="form-check-label" htmlFor="responsivetableCheck01"></label>
               </div>
               </th>
               <td> {index+1} </td>
               <td>
               <router-link className="fw-semibold" >#{order.order_id}</router-link>
               </td>
               <td> {order.customer_fullname} </td>
               <td> <Moment format="DD.MM.YYYY HH:mm">{order.order_time}</Moment> </td>
               <td className="text-success"><i className="ri-checkbox-circle-line fs-17 align-middle"></i> {order.status} </td>
               <td>{order.order_total}₺</td>
               <td>
               <div className="d-flex gap-2 align-items-center">
                   {/* <div className="flex-shrink-0">
                       {{order.marketplace}}
                   </div>  */}
                   <div className="flex-grow-1 d-flex">
                       <img src={require(`../../assets/images/marketplace/${order.marketplace}.jpg`)} className="avatar-xs rounded-circle" />
                   </div>
               </div>
               </td>
               <td className="sp-td">
               <Link to={`/OrderDetail/${order.order_id}`} className="btn btn-warning btn-label waves-effect waves-light">Detay</Link>
               </td>
           </tr>
           })}
        </tbody>
    )
}

export default OrderListBody