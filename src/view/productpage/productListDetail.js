import axios from "axios";
import { useEffect, useState } from "react";
import {MainContext, useContext} from "../../context.js";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

function ProductListDetail() {
    const {loading, setLoading} = useContext(MainContext);
    const [singleProduct, setSingleProduct] = useState([]);
    const [singleProductColors, setSingleProductColors] = useState([]);
    const [singleProductVariant, setSingleProductVariant] = useState([]);
    const [singleProductImages, setSingleProductImages] = useState([]);
    const params = useParams();
    const currentID = params.id;

    const [singleProductPlatform, setSingleProductPlatform] = useState("");
    const [singleProductProductName, setSingleProductProductName] = useState("");
    const [singleProductBarcode, setSingleProductBarcode] = useState("");
    const [singleProductProductCode, setSingleProductProductCode] = useState("");
    const [singleProductMarketPrice, setSingleProductMarketPrice] = useState("");
    const [singleProductSellPrice, setSingleProductSellPrice] = useState("");
    const [singleProductStockAmount, setSingleProductStockAmount] = useState("");

    const [singleProductColorsSize, setSingleProductColorsSize] = useState([]);
    const [singleProductColorsSizeBarcode, setSingleProductColorsSizeBarcode] = useState("");
    const [singleProductColorsSizeStock, setSingleProductColorsSizeStock] = useState("");
    const [singleProductColorsSizeSellPrice, setSingleProductColorsSizeSellPrice] = useState("");

   
    
    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/Product/getSingleProduct?product_id=${currentID}`).then(response =>{
            if(response.data.Status == false){
                setLoading(false);
                swal("Hata!", "Bir hata oluştu!", "error");
            }
            else {
                setSingleProduct(response.data.Data);
                setSingleProductPlatform(response.data.Data.platforms);
                setSingleProductProductName(response.data.Data.product_name);
                setSingleProductBarcode(response.data.Data.barcode);
                setSingleProductProductCode(response.data.Data.product_code);
                setSingleProductMarketPrice(response.data.Data.market_price);
                setSingleProductSellPrice(response.data.Data.sell_price);
                setSingleProductStockAmount(response.data.Data.stock_amount);
                
                // setSingleProductColorsSize(response.data.Data.colors.sizes);
                setSingleProductColors(response.data.Data.colors);
                // setSingleProductColorsSizeBarcode(response.data.Data.colors);
                // setSingleProductColorsSizeStock(response.data.Data.colors.stock_amount);
                // setSingleProductColorsSizeSellPrice(response.data.Data.colors.sell_price);

                setSingleProductImages(response.data.Data.images);
                setLoading(false);
            }
        });
    },[]);

    return (
        <section className="section-view">
          {loading ? <div id="loading"></div> : ""}
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between order-count">
            
            <h4 className="mb-sm-0">{ singleProduct.product_name }</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">{ singleProductPlatform.platform_name }</li>
               {/* {singleProductPlatform.map((plat, index)=>{
                 return  <li key={index} className="breadcrumb-item">{ plat.platform_name }</li>
               })}  */}
              </ol>
            </div>
          </div>
        </div>
        <div className="item-block">
          <form>
            <div className="row">
              {/* <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="firstNameinput" className="form-label">Platform</label>
                  <input value={singleProductPlatform} onChange={(e)=> setSingleProductPlatform(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={singleProduct.platform} id="firstNameinput"  />
                </div>
              </div> */}
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="lastNameinput" className="form-label">Ürün Adı </label>
                  <input value={singleProductProductName} onChange={(e)=> setSingleProductProductName(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={singleProduct.product_name} id="lastNameinput"/>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="compnayNameinput" className="form-label">Barcode </label>
                  <input value={singleProductBarcode} onChange={(e)=> setSingleProductBarcode(e.target.value)} type="text"  className="form-control sp-form-control" placeholder={singleProduct.barcode}  id="compnayNameinput"  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="lastNameinput" className="form-label">Ürün Kodu </label>
                  <input value={singleProductProductCode} onChange={(e)=> setSingleProductProductCode(e.target.value)} type="text" className="form-control sp-form-control" placeholder={singleProduct.product_code} id="lastNameinput" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="lastNameinput" className="form-label"
                    >Market Fiyatı
                  </label>
                  <input value={singleProductMarketPrice} onChange={(e)=> setSingleProductMarketPrice(e.target.value)} type="text" className="form-control sp-form-control" placeholder={singleProduct.market_price}  id="lastNameinput"  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="lastNameinput" className="form-label"
                    >Satış Fiyatı
                  </label>
                  <input value={singleProductSellPrice} onChange={(e)=> setSingleProductSellPrice(e.target.value)} type="text" className="form-control sp-form-control"  placeholder={singleProduct.sell_price} id="lastNameinput" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="satıs" className="form-check-label">
                    <input id="satıs" className="form-check-input" type="checkbox"  />
                    Satışta Mı?
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="kampanya" className="form-check-label">
                    <input id="kampanya" className="form-check-input" type="checkbox" />
                    Kampanyada Mı?
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="lastNameinput" className="form-label">
                    Toplam Stok
                  </label>
                  <input value={singleProductStockAmount} onChange={(e)=> setSingleProductStockAmount(e.target.value)} type="text"   className="form-control sp-form-control" placeholder={singleProduct.stock_amount} disabled />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <h3 htmlFor="" className="form-label">Varyantlar</h3>
                  {singleProductColors.map((colorName, index)=>{
                      if(index === 0) {
                            return <h5 className="colorname" key={index} value={colorName.color_id} selected={index === 0}>
                            { colorName.color_name }
                        </h5>
                      }
                      
                  })}
                  <div className="">
                    <div className="input-group col-12">
                      <div className="col-12">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th scope="col">Beden</th>
                              <th scope="col">Barkod</th>
                              <th scope="col">Stok</th>
                              <th scope="col">Fiyat</th>
                            </tr>
                          </thead>
                          {singleProductColors.map((item2, index)=>{
                              return  <tbody  key={index}>
                                  {item2.sizes.map((colorItem, index)=>{
                                      return <tr key={index}>
                                      <td>
                                        <span> { colorItem.size_name } </span>
                                      </td>
                                      <td>
                                        <input value={singleProductColorsSizeBarcode} onChange={(e)=> setSingleProductColorsSizeBarcode(e.target.value)} type="text"  className="form-control sp-form-control"  placeholder={colorItem.barcode} id="lastNameinput" />
                                      </td>
                                      <td>
                                        <input value={singleProductColorsSizeStock} onChange={(e)=> setSingleProductColorsSizeStock(e.target.value)} type="text" className="form-control sp-form-control"   placeholder={colorItem.stock_amount} id="lastNameinput"/>
                                      </td>
                                      <td>
                                        <input value={singleProductColorsSizeSellPrice} onChange={(e)=> setSingleProductColorsSizeSellPrice(e.target.value)} type="text"  className="form-control sp-form-control"  placeholder={colorItem.sell_price} id="lastNameinput" />
                                      </td>
                                    </tr>
                                  })}
                            </tbody>
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Resimler</label>
                  <ul className="ul-list-group2">
                      {singleProductImages.map((singleImages, index)=>{
                          return <li key={index} className="ul-list-group-item2">
                          <div className="img-group">
                            <img src={singleImages.img_path} alt={singleImages.image_id} />
                            <button type="button"  className="btn btn-danger waves-effect waves-light">
                              Sil
                            </button>
                          </div>
                        </li>
                      })}
                  </ul>
                </div>
              </div>
              <div className="div col-12">
                <br />
                {/* <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                ></vue-dropzone> */}
              </div>
              <div className="col-lg-12 mt-3">
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">Kaydet</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        </section>
    )
}

export default ProductListDetail