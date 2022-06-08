import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubtmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubtmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

	if (!type) {
		throw new Error('type is required.')
	}

	if (!comment) {
		throw new Error('comment is required.')
	}

	if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
		throw new Error('invalid screenshot format.')
	}

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px: color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
		screenshot ? `<img src="${screenshot}" alt="screenshot"/>` : null,
        `<div>`,
      ].join("\n"),
    });
  }
}
