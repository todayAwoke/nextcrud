import Topic from '@/models/topic';
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lips/mogodb';
export async function POST(req) {
    const { title, description } = await req.json();
    await connectMongoDB();
    await Topic.create({ title, description })
    return NextResponse.json({ message: "topic created" }
        , { status: 201 })
}
export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics })
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ messages: "deleted successfully" }, { status: 200 })
}