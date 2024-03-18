import {useEffect, useState} from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const {messages, setMessages, selectedconversation} = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedconversation._id}`);
        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if(selectedconversation?._id) getMessages();
  }, [selectedconversation?._id, setMessages]);
  return {loading, messages};
}

export default useGetMessages;