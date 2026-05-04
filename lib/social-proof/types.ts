export type XPostData = {
  id: string;
  authorName: string;
  authorHandle: string;
  initials: string;
  avatarColor: string;
  verified: boolean;
  date: string;
  text: string;
  replies: string;
  reposts: string;
  likes: string;
  views: string;
  url: string;
};

export type RedditPostData = {
  id: string;
  subreddit: string;
  title: string;
  body?: string;
  upvotes: string;
  comments: string;
  url: string;
  timeAgo: string;
};
