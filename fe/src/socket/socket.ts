import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_MAIN_URL + '/block');
