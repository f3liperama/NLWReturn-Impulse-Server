import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);


describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'example comment!',
			screenshot: 'data:image/png;base64,udashduashdusahda'
		})).resolves.not.toThrow()

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	})

	it('should throw an error if the type field is empty', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'example comment!',
			screenshot: 'data:image/png;base64,udashduashdusahda'
		})).rejects.toThrow()
	});

	it('should throw an error if the comment field is empty', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			screenshot: 'data:image/png;base64,udashduashdusahda'
		})).rejects.toThrow()
	});

	it('should throw an error if the screenshot is an invalid format', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'example comment',
			screenshot: 'data:image/jpg;base64,udashduashdusahda'
		})).rejects.toThrow()
	});
})