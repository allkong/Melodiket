'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import Input from '@/components/atoms/input/Input';
import Textarea from '@/components/atoms/textarea/Textarea';

import { useGetMe, useUpdateMe } from '@/services/user/fetchUser';

const Page = () => {
  const { mutate: getMe, data } = useGetMe();
  const { mutate: updateMe } = useUpdateMe();

  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  const handleUpdate = () => {
    const updateData = {
      nickname,
      description,
      imageUrl,
    };

    updateMe(updateData);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        <div className="h-full flex flex-col">
          <div className="flex-grow h-0 overflow-y-auto">
            <div className="flex flex-col p-6">
              <div className="mt-[8vh]">
                <div className="w-full">
                  <TextBanner
                    title={`수정할 정보를 입력해주세요`}
                    description="멜로디켓 서비스는 블록체인을 사용한 서비스에요"
                    hasLogo
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-4 mt-10">
                <Input
                  placeholder="닉네임"
                  value={nickname}
                  onChange={setNickname}
                />
                <Textarea
                  placeholder="소개"
                  value={description}
                  onChange={setDescription}
                />
              </div>
            </div>
          </div>
          <div className="my-4 h-fit p-4">
            <LargeButton label="수정하기" onClick={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
