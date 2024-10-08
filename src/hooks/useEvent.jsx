import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useEvent = () => {
   const axiosPublic = useAxiosPublic();

   const {data: events=[], refetch} = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
        const res = await axiosPublic.get('/events')
        return res.data;
    }
   })

   return [events, refetch];
};

export default useEvent;