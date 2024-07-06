import { getServerSession } from "next-auth";
import connectDB from "../../components/connect/connectDB"
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { User } from "../../../models/User";
export const PUT = async (req) => {
    connectDB();
    const data = await req.json();
    const {_id}=data;
    let filter={}
    if(_id){
        filter={_id};
    }else{
        const session = await getServerSession(authOptions);
    const email = session.user.email
        filter={email}
    }
    const userData=await User.updateOne(filter, data)
    return Response.json(true)
}


export const GET = async () => {
    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email
    if (!email) {
        return Response.json({})
    }
    return Response.json(await User.findOne({ email }))

}
