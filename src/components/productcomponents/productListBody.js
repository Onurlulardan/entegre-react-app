import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import swal from 'sweetalert';
// import img from "assets/images/marketplace/Trendyol.jpg"
import img from "../../assets/images/marketplace/Trendyol.jpg"


function ProductListBody(props) {
    const [show, setShow] = useState(false);
    const [deleteItemLists, setDeleteItemLists]= useState([]);
    const [deleteItems, setDeleteItems]= useState([]);
    const checkAll = document.querySelector("#responsivetableCheck");
    const checkOptions = document.querySelectorAll(".select-option");
    const selectBTN = document.getElementById("delete-btn");

      function deleteItem(id){
        let newsingleArray = [...deleteItems, id];
        setDeleteItems(newsingleArray);
        swal({
            title: "Emin Misin?",
            text: "Ürün silinecek!",
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: "Evet Sil!",
                cancel: "Vazgeç",
              },
          })
          .then(willDelete => {
            if (willDelete) {
              axios.post(`/api/Product/DeleteProducts`, newsingleArray)
                .then(response => {
                  if(response.data.Status == false) {
                    swal({
                        title: `${response.data.Message}`,
                        text: `${response.data.MessageDetail}`,
                        icon: "error",
                        timer: 2000,
                        button: false
                   })
                  }
                  else {
                    swal({
                        title: `${response.data.Message}`,
                        text: `${response.data.MessageDetail}`,
                        icon: "success",
                        timer: 2000,
                        button: false
                   })
                   setDeleteItems([]);
                   props.getData();
                  }
              });
            }
          });
        }

        function deleteItemList(val) {
          const isChecked = val.checked;
          if(isChecked){
            let newArray = [...deleteItemLists, val.value];
            setDeleteItemLists(newArray);
            setShow(true);
          }
          else {
            setDeleteItemLists([]);
            setShow(false);
          }
        }
      

      function deleteItemsListTrigger(){
        swal({
            title: "Emin Misin?",
            text: "Ürün silinecek!",
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: "Evet Sil!",
                cancel: "Vazgeç",
              },
          })
          .then(willDelete => {
            if (willDelete) {
              axios.post(`/api/Product/DeleteProducts`, deleteItemLists)
                .then(response => {
                  if(response.data.Status == false) {
                    swal({
                        title: `${response.data.Message}`,
                        text: `${response.data.MessageDetail}`,
                        icon: "error",
                        timer: 2000,
                        button: false
                   })
                  }
                  else {
                    swal({
                        title: `${response.data.Message}`,
                        text: `${response.data.MessageDetail}`,
                        icon: "success",
                        timer: 2000,
                        button: false
                   })
                   setDeleteItemLists([]);
                   props.getData();
                   console.log("=>",deleteItemLists)
                  }
              });
            }
          });
      }
      


      function selectAll(){
         setShow(!show);
         const isChecked =  checkAll.checked;
         const checkAllArr =  [];
        // selectBTN.classList.toggle("show-btn");

        if(isChecked){
          for(let i=0; i<checkOptions.length; i++){
            checkOptions[i].checked = isChecked;
            checkAllArr.push(checkOptions[i].value);
          }
          let checkAllArray = [...deleteItemLists, checkAllArr];
          checkAllArr.concat(checkAllArray);
          setDeleteItemLists(checkAllArr);
        }
        else {
          for(let i=0; i<checkOptions.length; i++){
            checkOptions[i].checked = isChecked;
          }
          setDeleteItemLists([]);
        }
      }
      
    return (
        <>
          <thead className="table-light">
              <tr>
                  <th scope="col">
                      <div className="form-check">
                          <input onChange={()=> selectAll()}  className="form-check-input" type="checkbox"  id="responsivetableCheck"/>
                          <label className="form-check-label" htmlFor="responsivetableCheck"></label>
                      </div>
                  </th>
                  <th scope="col">Sıra</th>
                  <th scope="col">#ID</th>
                  <th scope="col">Resim</th>
                  <th scope="col">Ürün Adı</th>
                  <th scope="col">Barkod</th>
                  <th scope="col">Fiyat</th>
                  <th scope="col">Satış Durumu</th>
                  <th scope="col">Stok</th>
                  <th scope="col">Platformlar</th>
                  <th scope="col">
                      {show === true ? (<button id="delete-btn" onClick={()=> deleteItemsListTrigger()} 
                      className="btn btn-danger btn-label waves-effect waves-light mx-1">
                         Seçilenleri Sil
                      </button>):null}
                  </th>
              </tr>
          </thead>
          <tbody>
              {props.product.map((Products, index)=>{
                return <tr key={Products.product_id}>
                  <th scope="row">
                      <div className="form-check">
                          <input onClick={(e)=> {
                              deleteItemList(e.target);
                              }}  className="form-check-input select-option" type="checkbox"  value={Products.product_id} id="responsivetableCheck01"  />
                          <label className="form-check-label" htmlFor="responsivetableCheck01"></label>
                      </div>
                  </th>
                  <td> {index+1} </td>
                  <td><a href={void(0)} className="fw-semibold">#{Products.product_id} </a></td>
                  <td> 
                      <div className="flex-shrink-0">
                              <img src={Products.img_path} alt={Products.img_path} className="avatar-xs" />
                      </div>
                  </td>
                  <td> {Products.product_name}  </td>
                  {/* <td className="text-success"><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Gönderildi</td>  */}
                  <td> {Products.barcode} </td>
                  <td>  <div>
                      {Products.sell_price < Products.market_price ? (<span className="market-price"> {Products.market_price} ₺  </span> ) : "" }
                      {Products.sell_price}₺ 
                      </div>  </td>
                  <td> {Products.on_sale_text} </td>
                  <td> {Products.stock_amount} </td>
                   <td>
                     {Products.platforms.map((productsImage,index)=>{
                         return <div key={index} className="d-flex gap-2 align-items-center" v-for="item2 in item.platforms" >
                         <div  className="flex-shrink-0">
                              <img src={require(`../../assets/images/marketplace/${productsImage.platform_name}.jpg`)} alt={productsImage.platform_name}  className="avatar-xs rounded-circle"/>
                          </div> 
                    </div>
                     })}
                  </td>
                  <td className="sp-td">
                      <Link  className="btn btn-warning btn-label waves-effect waves-light" to={`/ProductListDetail/${Products.product_id}`}>Detay</Link>
                      <button onClick={()=> {deleteItem(Products.product_id)}} 
                      className="btn btn-danger btn-label waves-effect waves-light mx-1">
                          Sil
                      </button>
                  </td>
                  
              </tr>
              })}
          </tbody>
        </>
      )
}

export default React.memo(ProductListBody)