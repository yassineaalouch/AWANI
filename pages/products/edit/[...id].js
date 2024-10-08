import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || session.user.role !== 'admin') {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { 
        Session: JSON.parse(JSON.stringify(session)),
      },
    };
  }
export default function EditProductPage(){
    const [productInfo,setProductInfo]= useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id,{headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
        }})
        .then(response=>{
            setProductInfo(response.data)
        });
    },[id])
    return(
        <Layout>
            <h1 className="this">edit product</h1>
            {productInfo && (<ProductForm {...productInfo}/>)}
        </Layout>
    );
}