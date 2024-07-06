import { MenuItem } from "../../../models/MenuItem";
import connectDB from "../../components/connect/connectDB";
import { isAdmin } from "../auth/[...nextauth]/route";


export async function POST(req) {
    connectDB();
    const data = await req.json();
    if (await isAdmin()) {
        const menuItemDoc = await MenuItem.create(data);
        return Response.json(menuItemDoc)
    }
    else {
        return Response.json({})
    }
}
export async function PUT(req) {
    connectDB();
    if (await isAdmin()) {

        const { _id, ...data } = await req.json();
        await MenuItem.findByIdAndUpdate(_id, data);
    }
    return Response.json(true)
}

export async function GET() {
    connectDB()


    return Response.json(await MenuItem.find())

    return Response.json({})
}



export async function DELETE(req) {
    connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin())
        await MenuItem.deleteOne({ _id });
    return Response.json(true);
}

