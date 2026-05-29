import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
    name?: unknown;
    email?: unknown;
    subject?: unknown;
    message?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export async function POST(request: Request): Promise<NextResponse> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey || !to) {
        return NextResponse.json(
            { ok: false, error: "Contact endpoint is not configured." },
            { status: 500 }
        );
    }

    let payload: ContactPayload;
    try {
        payload = (await request.json()) as ContactPayload;
    } catch {
        return NextResponse.json(
            { ok: false, error: "Invalid JSON body." },
            { status: 400 }
        );
    }

    if (
        !isNonEmptyString(payload.name) ||
        !isNonEmptyString(payload.email) ||
        !isNonEmptyString(payload.message)
    ) {
        return NextResponse.json(
            { ok: false, error: "Name, email and message are required." },
            { status: 400 }
        );
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
        return NextResponse.json(
            { ok: false, error: "Email address is not valid." },
            { status: 400 }
        );
    }

    const subjectLine =
        isNonEmptyString(payload.subject) && payload.subject.length <= 140
            ? payload.subject
            : "New message from your portfolio";

    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safeSubject = escapeHtml(subjectLine);
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
        from,
        to,
        replyTo: payload.email,
        subject: `[Portfolio] ${subjectLine}`,
        html: `
            <h2>New portfolio message</h2>
            <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <hr />
            <p>${safeMessage}</p>
        `,
    });

    if (error) {
        return NextResponse.json(
            { ok: false, error: "Could not send message." },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
