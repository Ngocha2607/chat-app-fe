export interface ChatItem {
  _id: string;
  participants: Participant[];
  messages: Message[];
  __v: number;
  lastMessage: Message | null;
}

export interface Participant {
  _id: string;
  username: string;
}

export interface Message {
  sender: Participant;
  content: string;
  timestamp: string;
  _id: string;
}
