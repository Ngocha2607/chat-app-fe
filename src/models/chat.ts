export interface ChatItem {
  _id: string;
  participants: Participant[];
  messages: Message[];
  __v: number;
}

export interface Participant {
  _id: string;
  username: string;
}

export interface Message {
  sender: string;
  content: string;
  timestamp: string;
  _id: string;
}
