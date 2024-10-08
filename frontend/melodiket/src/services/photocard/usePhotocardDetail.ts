import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import customFetch from '../customFetch';
import { PhotocardDetail } from '@/types/photocard';
import photocardKey from './photocardKey';

const getPhotocardDetail = async (uuid: string) => {
  return await customFetch<PhotocardDetail>(`/photo-cards/${uuid}`);
};

export const usePhotocardDetail = () => {
  const params = useParams();
  const uuid = params?.uuid;

  return useQuery<PhotocardDetail>({
    queryKey: photocardKey.detail(uuid as string),
    queryFn: () => getPhotocardDetail(uuid as string),
    enabled: !!uuid,
  });
};
