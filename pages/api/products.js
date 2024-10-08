
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongooseConnect from "@/lib/mongoose"
export default async function handle(req, res){
    const {method} = req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
    await mongooseConnect();
    if (method === 'GET'){ 
        if(req.query?.id){
            if(req.query?.rating==='rating'){
                res.json(await Product.findOne({_id:req.query.id}).select('IdOfRatingUsers'));
            }else{
                res.json(await Product.findOne({_id:req.query.id}));
            }      
        }else{
            const product=await Product.find().populate({
                path: 'category',
                model: 'Category'
            })
            res.json(product);
        }
    }
    if (method === 'POST'){
        const {title,description,price,promotionsOrDiscounts,discountPrice,images,comments,category,properties,purchasePrice,supplier,stockQuantity,dimensions,countryOfProduction,deliveryTime,SKU,barcode,careInstructions,expirationDate,recyclingInformation,returnAndWarrantyConditions} = req.body;
        const productDoc = await Product.create({
            title,description,price,discountPrice,images,promotionsOrDiscounts,comments,category:category||null,properties:properties||null,purchasePrice,supplier,stockQuantity,stockQuantity,dimensions,countryOfProduction,deliveryTime,SKU,barcode,careInstructions,expirationDate,recyclingInformation,returnAndWarrantyConditions
        })
        res.json(productDoc);
    }

    if (method === 'PUT'){
        const {title,description,price,promotionsOrDiscounts,discountPrice,images,comments,category,properties,purchasePrice,supplier,stockQuantity,dimensions,countryOfProduction,deliveryTime,SKU,barcode,careInstructions,expirationDate,recyclingInformation,returnAndWarrantyConditions,_id} = req.body;
        await Product.updateOne({_id},{title,description,promotionsOrDiscounts,comments,price,discountPrice,images,category:category||null,properties:properties||null,purchasePrice,supplier,stockQuantity,stockQuantity,dimensions,countryOfProduction,deliveryTime,SKU,barcode,careInstructions,expirationDate,recyclingInformation,returnAndWarrantyConditions});
        res.json(true);
    }
 
    if (method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }}
}