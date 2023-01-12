import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'data:image/base64,some-screenshot',
      }),
    ).resolves.not.toThrow();

    expect(sendMailSpy).toBeCalled();
    expect(createFeedbackSpy).toBeCalledWith(expect.objectContaining({
      type: 'BUG',
      comment: 'This is a bug'
    }))
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/base64,some-screenshot',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/base64,some-screenshot',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'test.png',
      }),
    ).rejects.toThrow();
  });
});
