import { User } from "../../../models/User"
import connectDB from "../../components/connect/connectDB";
import { isAdmin } from "../auth/[...nextauth]/route"


export async function GET() {
    connectDB()
    if (await isAdmin()) {
        const users = await User.find();
        return Response.json(users);
    }
    else {
        return Response.json[[]]
    }


}