import { getServerSession } from "next-auth";
import connectDB from "../../components/connect/connectDB";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { Order } from "../../../models/Order";

export async function GET(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Order.findById(_id));
    }


    if (admin) {
        return Response.json(await Order.find())
    }
    if (userEmail) {
        return Response.json(await Order.find({ userEmail }))
    }
}