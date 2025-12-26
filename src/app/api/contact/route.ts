import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is likely missing");
            return NextResponse.json(
                { error: "Server configuration error: Database connection string missing." },
                { status: 500 }
            );
        }

        await dbConnect();

        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const newContact = await Contact.create({
            name,
            email,
            subject: subject || "General Inquiry",
            message,
        });

        return NextResponse.json(
            { message: "Message sent successfully!", success: true, data: newContact },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Contact API Error Details:", error);

        const errorMessage = error instanceof Error ? error.message : "Failed to send message";

        return NextResponse.json(
            { error: errorMessage, success: false },
            { status: 500 }
        );
    }
}
