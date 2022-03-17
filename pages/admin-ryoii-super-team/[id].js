import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
const fetchRestaurant = () => {

    const router = useRouter()
    const { id } = router.query
    const [isLoading, setLoading] = useState(false)

    const [data, setData] = useState({
        coupons:null,
        brands:null,
        masterCouponList:''
    });

    const fetchMasterCoupon = async () => {
        console.log(id);
        const url = 'https://app-api.ryoii.io/api/coupon';
        const res = await axios.get(url);
        const masterCoupon = res.data?res.data:'';
        console.log(masterCoupon);
        setData({...data, coupons:masterCoupon.data?masterCoupon.data.item:'',masterCouponList:masterCoupon.data?masterCoupon.data.item:''});  
    }

    useEffect(() => {
        setLoading(true)
        fetchMasterCoupon()
        setLoading(false)
       
    }, []);
    
    const listCoupon = data.masterCouponList?data.masterCouponList.map((coupon,k) =>
    <li key={coupon.master_coupon_id} className="list-group-item d-flex justify-content-between align-items-center">
        [Brand :{coupon.brand_restaurant.brand_name}], Coupon :{coupon.name}
        
        <span className="badge bg-info rounded-pill text-white">Sold : {coupon.sold_cnt}</span>
        <span className="badge bg-success rounded-pill text-white">Use : {coupon.use_cnt}</span>
        <span className="badge bg-info rounded-pill text-white">Status : {coupon.status}</span>
        <span className="badge bg-primary rounded-pill text-white">Total : {coupon.total_cnt}</span>
        <span className="badge bg-info rounded-pill text-white">coupons : {coupon.coupon_list.length}</span>
        <span className="badge bg-primary rounded-pill text-white">Restauran : {coupon.restaurant_coupon.length}</span>
        
    </li>
  ):'';

    const handleChange = ({ target: { name, value } }) => {
       
        const newCoupon  = data.coupons.filter((val, index, array)=>{           
            return val.brand_restaurant.brand_name.toLowerCase().includes(value.toLowerCase());           
        });
        setData({...data,masterCouponList:newCoupon});       
    };
  
    
    const handleSubmit = async e => {
      e.preventDefault();
      fetchMasterCoupon()
      try {
      
      } catch (error) {
        setErrorRestaurants(error);
      }
    };

    if (isLoading) return <p className='text-center mt-5'>Loading...</p>
    if (!data.coupons) return <p className='text-center mt-5'>No data.</p>

    return (
        <div className='container pt-5 pb-5'>
            <div className='row mb-2'>
                <div className="col-md-12">
                    <label for="inputSearch" className="form-label">Search</label>
                    <input type="input" className="form-control" placeholder="Brand Name..." id="inputSearch" onChange={handleChange} />
                </div>
            </div>
           <ul className="list-group">
                {listCoupon}
            </ul>
        </div>
    )
}


export default fetchRestaurant