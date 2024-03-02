import React, { FC } from 'react';
import s from './game-window.module.scss';
import { MessageTypes } from './types/message-types.enum';

export interface ConsoleMessageProps {
  message: string;
  messageType: MessageTypes;
}

const ConsoleMessage: FC<ConsoleMessageProps> = ({ message, messageType }) => {
  return (
    <li className={s.consoleText} style={{ color: messageType }}>
      {message}
    </li>
  );
};

export default ConsoleMessage;
