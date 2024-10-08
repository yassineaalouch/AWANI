// import ProductCard from "@/interfaceComponents/ProductCart"
// import Link from "next/link"

// import { FaArrowLeft } from "react-icons/fa6"

// function ProductsHomePageSection({productList}) {
//   let list = [1,2,3,4,5,6,7,8,9]
//   return (
//     <div className="w-[88%] mb-5 m-auto">
//       {/* had lblassa fiha ghir l3onwan */}
//       <div className="w-full py-5 mb-2 mt-6 flex justify-end">
//           <div className="text-right">
//             <div className="border-r-[15px] text-sm pr-2 mb-2 border-black">
//              هذا الشهر 
//             </div>
//             <div className="text-2xl">
//               المنتجات الأكثر مبيعاً 
//             </div>
//           </div>
//       </div>

//     {/* had lblassa fihha les carts dyal les produits */}
//     <div className="flex justify-between items-center">
//       {/* had div fiha dak sahm li fjanblisr */}
//         <div>
//           <button className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center">
//             <FaArrowLeft size={20} className={`text-slate-700 transition-all hover:scale-110 duration-300`} />
//           </button>
//         </div>
//     {/* hna kayn les produits  */}
//         <div className="w-ful mx-1 overflow-auto gap-10 scrollBarNon flex items-center justify-between">
//           {productList.map((ele,index)=>(
//             <div key={index} className=" flex flex-col justify-center items-center gap-3 ">
//                 <ProductCard product={ele}/>
//             </div>
//           ))
//           }
//         </div>
//       {/* had div fiha dak sahm li fjanblisr */}
//         <div>
//           <button className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center">
//             <FaArrowLeft size={20} className={`text-slate-700 rotate-180 transition-all hover:scale-110 duration-300`} />
//           </button>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default ProductsHomePageSection
import React, { useRef } from "react";
import ProductCard from "@/interfaceComponents/ProductCart";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function ProductsHomePageSection({ productList, petitTitre, grandTitre }) {
  // Référence pour accéder à l'élément contenant les produits
  const productsRef = useRef(null);

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    productsRef.current.scrollBy({
      left: -300, // Défile de 300px vers la gauche
      behavior: "smooth", // Défilement fluide
    });
  };

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    productsRef.current.scrollBy({
      left: 300, // Défile de 300px vers la droite
      behavior: "smooth", // Défilement fluide
    });
  };

  return (
    <div className="w-[88%] mb-5 m-auto">
      {/* Section du titre */}
      <div className="w-full py-5 mb-2 mt-6 flex justify-end">
        <div className="text-right">
          <div className="border-r-[15px] text-sm pr-2 mb-2 border-black">
              {petitTitre} 
          </div>
          <div className="text-2xl"> 
              {grandTitre}
          </div>
        </div>
      </div>

      {/* Section des produits avec les flèches */}
      <div className="flex justify-between items-center">
        {/* Flèche vers la gauche */}
        <div>
          <button
            onClick={scrollLeft}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
          >
            <FaArrowLeft
              size={20}
              className="text-slate-700 transition-all hover:scale-110 duration-300"
            />
          </button>
        </div>

        {/* Liste des produits */}
        <div
          ref={productsRef}
          className="w-full mx-1 overflow-auto gap-10 scrollBarNon flex items-center justify-between"
        >
          {productList.map((ele, index) => (
            <div key={index} className="flex flex-col justify-center items-center gap-3">
              <ProductCard product={ele} />
            </div>
          ))}
        </div>

        {/* Flèche vers la droite */}
        <div>
          <button
            onClick={scrollRight}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
          >
            <FaArrowRight
              size={20}
              className="text-slate-700 transition-all hover:scale-110 duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsHomePageSection;
