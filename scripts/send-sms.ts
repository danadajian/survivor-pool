import twilio from "twilio";

export async function sendSMS(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const client = twilio(accountSid, authToken);
  return client.messages.create({
    to,
    body,
    messagingServiceSid,
  });
}
