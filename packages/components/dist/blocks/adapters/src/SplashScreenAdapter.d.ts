import { Message } from '../../../framework/src/Message';
export default class SplashScreenAdapter {
    send: (message: Message) => void;
    constructor();
    convert: (from: Message) => Promise<Message>;
    receive(from: string, message: Message): Promise<void>;
}
