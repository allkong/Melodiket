'use client';

import Link from 'next/link';

import Header from '@/components/organisms/navigation/Header';
import Profile from '@/components/atoms/profile/Profile';
import MyPageItem from '@/components/molecules/item/MyPageItem';
import LineDivider from '@/components/atoms/divider/LineDivider';

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="">
        <Profile
          src="https://i.namu.wiki/i/PcRFH2yIjsqHjXPF3_MUtPT_KotbREADRzGZh9_XXktYOjHQxUm4fRR1xMz-_HsztNH78nTSUJ2ROzFNgYUkXUWXV-mJf-G1Ew4pGyu5ZXw_Of_wxUtEJwtbygJ5F_0pDSBTldSu6Zwd1D_-5SJLPQ.webp"
          size="md"
        />
        <LineDivider />
        <MyPageItem label="계좌 등록" />
        <MyPageItem label="계좌 수정" />
        <MyPageItem label="계좌 충전" />
        <LineDivider />
        <MyPageItem label="공연장 등록하기" />
        <MyPageItem label="공연장 수정하기" />
        <LineDivider />
        <MyPageItem label="정보 수정하기" />
        <MyPageItem label="탈퇴하기" />
        <LineDivider />
        <MyPageItem label="찜한 공연" />
        <MyPageItem label="찜한 뮤지션" />
        <MyPageItem label="예매 내역" />
      </div>
    </div>
  );
};

export default Page;
