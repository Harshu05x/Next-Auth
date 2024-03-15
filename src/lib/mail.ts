import nodemailer from "nodemailer";
import { activationTemplate } from "./emailTemplates/activation";
import Handlebars from "handlebars";
import { resetPasswordTemplate } from "./emailTemplates/resetPassword";

export async function sendMail({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) {
    const { MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env;

    var transport = nodemailer.createTransport({
        host: MAIL_HOST,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
    });

    try {
        const testResult = await transport.verify();
        console.log("Test Result Of Transport", testResult);
    } catch (e) {
        console.log(e);
    }
    try {
        const sendResult = await transport.sendMail({
            from: MAIL_USER,
            to,
            subject,
            html: body,
        });
        console.log({ sendResult });
        return sendResult;
    } catch (e) {
        console.log(e);
    }
}

export function compileActivationTemplate(name: string, url: string) {
    const template = Handlebars.compile(activationTemplate);
    const htmlBody = template({
        name,
        url,
    });
    return htmlBody;
}

export function compileResetPassTemplate(name: string, url: string) {
    const template = Handlebars.compile(resetPasswordTemplate);
    const htmlBody = template({
        name,
        url,
    });
    return htmlBody;
}