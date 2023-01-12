import nodemailer, { Transporter } from "nodemailer";

import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodeMailerMailAdapter implements MailAdapter {
  private transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4785556ca7d50f",
        pass: "3760ed24bdf4bd",
      },
    });
  }

  async sendMail({ subject, body }: SendMailData) {
    await this.transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Rafael Câmara <rafaelcamara.377@gmail.com>",
      subject,
      html: body,
    });
  }
}
