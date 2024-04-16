export type User = {
  image: { png: string; webp: string };
  username: string;
};

export type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[] | [];
};

export type Reply = CommentData & {
  replyingTo: string;
};

export type HandleNewReply = (
  id: number,
  replyingTo: string,
  text: string
) => void;
