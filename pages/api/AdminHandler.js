import mongooseConnect from "@/lib/mongoose";
import { AdminUsers } from "@/models/Admine_Users";

export default async function handle(req, res) {
  const { method } = req;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

  if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
  await mongooseConnect();

  if (method === 'GET') {
    const admins = await AdminUsers.find();
    res.json(admins);
  }

  if (method === 'POST') {
    const { email } = req.body;
    try {
      const admin = await AdminUsers.create({ email });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (method === 'PUT') {
    const { email, newEmail,getOrderEmail,_id } = req.body;
    if(_id){
      const admin = await AdminUsers.findOneAndUpdate({ _id },{$set: {getOrderEmail}});
      res.json(admin);

    }else{
          try {
      const admin = await AdminUsers.findOneAndUpdate({ email }, { $set:{email: newEmail} });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    }

  }

  if (method === 'DELETE') {
    const { email } = req.body;
    try {
      const admin = await AdminUsers.findOneAndDelete({ email });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }}
}
