"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/layout/icons/common/ArrowUpRightIcon";
import { useTranslations } from "@/providers/LanguageProvider";
import { asTranslations } from "@/lib/asTranslations";
import type { Translations } from "@/types/Translations";
import styles from "@/assets/styles/components/pages/contact/ContactForm.module.css";

interface TerminalLine {
    kind: "prompt" | "output";
    text: string;
}

interface TerminalTranslations {
    windowTitle: string;
    ready: string;
    sending: string;
    sent: string;
    lines: TerminalLine[];
    awaiting: string;
    queued: string;
    failed: string;
}

interface FormTranslations {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
}

type FormStatus = "idle" | "sending" | "sent" | "error";

const initialForm = { name: "", email: "", subject: "", message: "" };

export const ContactForm = (): React.JSX.Element => {
    const { translations } = useTranslations();
    const contact = asTranslations<Translations>(translations.common?.contact);
    const email = typeof contact?.email === "string" ? contact.email : "";
    const terminal = asTranslations<TerminalTranslations>(contact?.terminal);
    const form = asTranslations<FormTranslations>(contact?.form);

    const [values, setValues] = useState(initialForm);
    const [status, setStatus] = useState<FormStatus>("idle");

    const update =
        (key: keyof typeof values) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValues((prev) => ({ ...prev, [key]: event.target.value }));

    const valid =
        values.name.trim().length > 0 &&
        values.email.trim().length > 0 &&
        values.message.trim().length > 0;

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!valid || status === "sending") return;
        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!response.ok) throw new Error("send failed");
            setStatus("sent");
            setValues(initialForm);
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const statusBadge =
        status === "sending"
            ? terminal?.sending
            : status === "sent"
              ? terminal?.sent
              : terminal?.ready;

    const lastLine =
        status === "sent"
            ? terminal?.queued
            : status === "error"
              ? terminal?.failed
              : terminal?.awaiting;

    const sendLabel =
        status === "sending"
            ? form?.sending
            : status === "sent"
              ? form?.sent
              : form?.send;

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.dots}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <span>{terminal?.windowTitle}</span>
                </div>
                <span className={styles.badge}>{statusBadge}</span>
            </header>

            <div className={styles.body}>
                {terminal?.lines?.map((line, index) => (
                    <div key={index} className={styles.line}>
                        {line.kind === "prompt" ? (
                            <>
                                <span className={styles.prompt}>$</span>
                                <span className={styles.command}>
                                    {line.text.replace("$EMAIL", email)}
                                </span>
                            </>
                        ) : (
                            <span className={styles.output}>→ {line.text}</span>
                        )}
                    </div>
                ))}
                <div className={`${styles.line} ${styles.statusLine}`}>
                    {lastLine}
                </div>
            </div>

            <form className={styles.form} onSubmit={submit} noValidate>
                <div className={styles.row}>
                    <label className={styles.field}>
                        <span className={styles.label}>{form?.name}</span>
                        <input
                            value={values.name}
                            onChange={update("name")}
                            placeholder={form?.namePlaceholder}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.label}>{form?.email}</span>
                        <input
                            type="email"
                            value={values.email}
                            onChange={update("email")}
                            placeholder={form?.emailPlaceholder}
                            required
                        />
                    </label>
                </div>
                <label className={styles.field}>
                    <span className={styles.label}>{form?.subject}</span>
                    <input
                        value={values.subject}
                        onChange={update("subject")}
                        placeholder={form?.subjectPlaceholder}
                    />
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>{form?.message}</span>
                    <textarea
                        value={values.message}
                        onChange={update("message")}
                        placeholder={form?.messagePlaceholder}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className={styles.send}
                    disabled={!valid || status === "sending" || status === "sent"}
                >
                    {sendLabel}
                    {status === "idle" && (
                        <ArrowUpRightIcon width={14} height={14} />
                    )}
                </button>
            </form>
        </section>
    );
};
