import Layout from "@/components/Layout"
import { useEffect, useState } from 'react';
import axios from "axios";
import DeletePopup from "@/components/DeletePopup";
import { FaQuestionCircle } from "react-icons/fa";

export default function Properties(){
    const [editingMode, setEditingMode] = useState(false);
    const [discounts,setDiscounts]=useState([])
    const [titre, setTitre] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [discount_id,setDiscount_id] = useState('')
    const [cancelCode, setCancelCode] = useState(true);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);


  
    useEffect(()=>{
        fetchDiscounts()
    },[update])
    async function fetchDiscounts() {
        
            axios.get('/api/discount',{ headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
              }}).then(result => {
                setDiscounts(result.data);
            });

    }    
    
    function editDiscount(discount){
        setTitre(discount.titre)
        setQuantity(discount.quantity)
        setPrice(discount.price)
        setEditingMode(true)
        setDiscount_id(discount._id)
        setUpdate(!update)

    }

    function deleteDiscount(discount) {
        setDiscount_id(discount._id);
        setCancelCode(false);
    }

    function HandlCancel() {
        setCancelCode(true);
        setUpdate(!update)
    };

    async function addDiscount() {
        setUpdate(!update)
        const data = {
            titre:titre,
            quantity:quantity,
            price:price
        };
        const title = data.titre
        const quantity_ = data.quantity
        const price_ = data.price
        const namesList = discounts.map(ele => (ele.titre));
        
        if((title.trim()!='' && price_.toString().trim()!='' && quantity_.toString().trim()!='' )){
            if (editingMode) {
                await axios.put('/api/discount', { ...data, _id:discount_id},{ headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                  }});
                setTitre('')
                setQuantity('')
                setPrice('')
                setUpdate(!update)
                setEditingMode(false)
                setError(false)
            } else if(!editingMode && !namesList.includes(title)) {
                await axios.post('/api/discount', data,{ headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                  }});
                setTitre('')
                setQuantity('')
                setPrice('')
                setUpdate(!update)
                setEditingMode(false)
                setError(false)
            }else{
                setError(true)
            }

        }else{
            setError(true)
        }
    };
    return(
        <Layout>
            <div className="min-h-screen bg-white  ">
                <h1 className="this">Add discount</h1>
                <div className="flex gap-5">
                    <div className="mb-4 w-full">
                    <label className="this">Title</label>
                    <input
                        type="text"
                        value={titre}
                        required
                        onChange={(e) => setTitre(e.target.value)}
                        className={!error? "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500" : "w-full px-4 py-2 border rounded-lg border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"}
                        placeholder="halloween discount"
                    />
                    </div>
                    <div className="mb-4 w-full">
                    <div className=" relative w-fit">
                        <label title="Minimum order quantity that triggers a discount" className="this">Quantity</label>
                        <FaQuestionCircle title="Minimum order quantity that triggers a discount" size={12} className=" absolute top-0 right-[-15px]"/>
                    </div>
                    <input
                        type="tel"
                        value={quantity}
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                        className={!error? "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500" : "w-full px-4 py-2 border rounded-lg border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"}
                        placeholder="15"
                    />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="this">Percentage discount({price||0}%)</label>
                    <div className="flex justify-center items-center gap-2">
                        <input
                            type="range"
                            value={price||0}
                            onChange={(e) => setPrice(e.target.value)}
                            className={!error? " px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" : "w-full px-4 py-2 border rounded-lg border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"}
                            placeholder="12%"
                        />
                        <div className="w-fit rounded-lg border-2 px-4 py-2 ">
                            {price||0}%
                        </div>
                    </div>
                    </div>
                </div>
                <button
                onClick={addDiscount}
                className=" btn btn-primary py-1"
                >
                Save
                </button>
                {!editingMode && (
                <table className="basic">
                    <thead>
                        <tr>
                            <td className=""><b> Title</b></td>
                            <td className="text-center"d><b> Quantity</b></td>
                            <td className="text-center"><b> Percentage discount %</b></td>
                            <td className="text-center"><b> Edit </b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.length > 0 && discounts.map(discount => (
                            <tr key={discount.titre}>
                                <td className="">{discount.titre}</td>
                                <td className="text-center">{discount.quantity}</td>
                                <td className="text-center">{discount.price}%</td>
                                <td className="flex justify-center gap-2">
                                    <button className="edit-btn" onClick={() => editDiscount(discount)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>

                                    <button className="delete-btn" onClick={() => deleteDiscount(discount)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
            {!cancelCode && <DeletePopup link="/api/discount" _id={discount_id} cancelCode={HandlCancel} fetchCategories={fetchDiscounts} />}
        </Layout>
    )
}