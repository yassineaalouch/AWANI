import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import ProductCart from "@/interfaceComponents/ProductCart";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/cartContext";
import { FaCartShopping } from "react-icons/fa6";
import ProductFilterBar from "@/components/Filter";
import { useEffect,useState } from "react";
import { Category } from "@/models/Category";
import axios from "axios";
import { converterCurrency } from "@/components/currencyConverter";

export async function getServerSideProps() {
    await mongooseConnect()
    const productList = await Product.find({}).populate('category').lean();

    return {
        props: {
            productList: JSON.parse(JSON.stringify(productList.reverse())),
        },
    };
}

export default function Shop({ productList }) {
    const {cartProducts,setCartProducts} = useContext(CartContext)
    const [categories,setCategories] = useState([])
    const [productListFilter,setProductListFilter] = useState (productList)
    const {conversionRate,currencyWanted,} = useContext(converterCurrency)
    const [rateOfChange,setRateOfChange] = useState(null)
    useEffect(()=>{
        setRateOfChange(conversionRate[currencyWanted])
    },[currencyWanted])
    useEffect(()=>{
        fitchData()
        // getGeolocation()
    },[])
    
    function ImportFilterValues(number){
        const list = productList.filter(product => {
            return (
              (number.category=='All'||number.category===''||product?.category?.name === number.category)&&
              (!number.priceRange||(rateOfChange? product.price*rateOfChange:product.price) <= number.priceRange)&&
              (!number.rating||product?.rating >= number.rating)

            )
        })
        if(number.sortOrder=='price-desc'){
            const sortedProducts = list.sort((a, b) => b.price - a.price);
            setProductListFilter(sortedProducts)
        }else if(number.sortOrder=='price-asc'){
            const sortedProducts = list.sort((a, b) => a.price - b.price);
            setProductListFilter(sortedProducts)
        }else if(number.sortOrder=='rating-desc'){
            const sortedProducts = list.sort((a, b) => b.rating - a.rating);
            setProductListFilter(sortedProducts)
        }else{
            setProductListFilter(list)
        }
        

    }
    
    async function fitchData(){
        const response = await axios.get('/api/categories',{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }}).then((response)=>{setCategories(response.data.map((ele)=>(ele.name)))})
    }
    
    return (
        <>
            <NavBarInterface />
            <div className="mt-12"> 
                <ProductFilterBar ImportFilterValues={ImportFilterValues} categories={categories}/>
            </div>
            <div className="min-h-screen pb-8 flex justify-center ">
                <div className="flex h-fit justify-center gap-2 flex-wrap md:grid sm:grid-cols-3 lg:grid-cols-4">
                    {productListFilter.map((element) => (
                        <ProductCart key={element._id} currencyWanted={currencyWanted} exchangeRate={rateOfChange} product={element} />
                    ))}
                </div>
            </div>
            <Link href='/cart' className="bg-yellow-500 border-red-600 border-2 hover:bg-yellow-600 flex p-2 rounded-full text-white fixed right-5 bottom-5 ">
                <FaCartShopping size={30} className=" relative z-40"/>
                <div className="bg-red-600 text-sm px-2 py-1 rounded-full absolute bottom-7 left-7">
                    {cartProducts.length}
                </div>
            </Link>
            <Footer />
        </>
    );
}

