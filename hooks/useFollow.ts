import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
import useCurrentUser from './useCurrentUser';
import useUser from './useUser';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import {toast } from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
  const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId)
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async() => {
    if (!currentUser){
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing){
        request = () => axios.delete('/api/follow', {data: {userId}});
      }else {
        request = () => axios.post('/api/follow', {userId});
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      if (isFollowing){
        toast.success('Unfollowed')
      }
      if(!isFollowing){

        toast.success('Now following')
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }, [currentUser,isFollowing, loginModal,mutateCurrentUser,mutateFetchedUser, userId ])

  return {
    isFollowing,
    toggleFollow
  }

  
}

export default useFollow;