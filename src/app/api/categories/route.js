import { Category } from "../../../models/Category"
import connectDB from "../../components/connect/connectDB";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    connectDB()
    const { name } = await req.json()
    if (await isAdmin()) {

        const categoryDoc = await Category.create({ name })
        return Response.json(categoryDoc);
    }
    return Response.json({})
}

export async function GET() {
    return Response.json(await Category.find())
}

export async function PUT(req) {
    const { _id, name } = await req.json()
    if (await isAdmin()) {

        await Category.updateOne({ _id }, { name })
    }
    return Response.json(true);
}

export async function DELETE(req) {
    connectDB();
    const url = new URL(req.url)
    if (await isAdmin()) {
        const _id = url.searchParams.get('_id')
        await Category.deleteOne({ _id })
    }

    return Response.json(true);
}
