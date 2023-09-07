import { useContext } from 'react';
import { AppStateContext, User } from '../../AppStateContext';

interface UseLikeProps {
  postId: string;
  postUserId: string;
  data?: { name: string };
}

export function useLike({ postId, postUserId, data }: UseLikeProps) {
  const [{ posts }, , { setLike, createData }]: any = useContext(AppStateContext);

  const post = posts[postId];
  const userId = localStorage.getItem('UserID') || '';

  const isLiked = (post.likes || []).includes(userId);

  const handleLike = async () => {
    if (!userId) {
      // Handle the case where user is not authenticated
      return;
    }

    if (!isLiked) {
      const likePayload = {
        postId,
        like: !isLiked,
        postUserId,
      };

      // If user is not liked the post before, create the user first
      if (!userId) {
        const generatedUserId =
          data?.name.slice(0, 3) + Math.random().toString(36).substr(2, 3);
        const name = data?.name || "";
        const newUser: User = {
          id: generatedUserId,
          name: name,
          email: '',
        };
        localStorage.setItem('UserID', generatedUserId);
        localStorage.setItem('UserName', name);
        await createData('users', generatedUserId, '', newUser);
      }

      // Now like the post
      setLike(likePayload);
    } else {
      // If user has already liked the post, simply toggle the like
      const likePayload = {
        postId,
        like: !isLiked,
        postUserId,
      };

      setLike(likePayload);
    }
  };

  return {
    isLiked,
    handleLike,
  };
}
