import { Message } from '../../../framework/src/Message';
export default class OtpToNewPasswordAdapter {
    send: (message: Message) => void;
    constructor();
    convert(from: Message): Message;
    receive(from: string, message: Message): void;
}
