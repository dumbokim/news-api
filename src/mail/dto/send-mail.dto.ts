export class Recipients {
  address: string;
  name: string;
  type: string;
}

export class SendEmailRequestDto {
  sendName: string;
  title: string;
  body: string;
}
