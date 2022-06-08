import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a6f7bfbd616fb7",
    pass: "cbefd218e3e8ae",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <suporte@feedget.com>",
      to: "Felipe Matheus <f3liperama@gmail.com",
      subject,
      html: body,
    });
  }
}
