import type { Meta, StoryObj } from '@storybook/react';
import useMenuStore from '@/store/menuStore';
import Menu from './Menu';
import React from 'react';
import {
  Music,
  Guitar,
  Favorite,
  Basket,
  Card,
  Microphone,
  MyPage,
  BackLine,
  ForwardLine,
} from '@/public/icons';

const meta: Meta<typeof Menu> = {
  component: Menu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const { isOpen, setIsOpen } = useMenuStore();

    return (
      <div id="menu-portal">
        <Menu>
          <Menu.Header />
          <Menu.Profile />
          <Menu.Divider />
          <Menu.Item href="/concert/list" icon={<Music />} label="공연" />
          <Menu.Item href="/concert" icon={<Music />} label="공연 생성" />
          <Menu.Item href="/musicians" icon={<Guitar />} label="뮤지션" />
          <Menu.Divider />
          <Menu.Item
            href="/favorites"
            icon={<Favorite />}
            label="찜한 공연/뮤지션"
          />
          <Menu.Item href="/" icon={<Basket />} label="예매내역" />
          <Menu.Item href="/" icon={<Card />} label="포토카드" />
          <Menu.Item href="/" icon={<Microphone />} label="내 공연" />
          <Menu.Divider />
          <Menu.Item href="/" icon={<MyPage />} label="마이페이지" />
          <Menu.Item href="/" icon={<BackLine />} label="로그아웃" />
          <Menu.Item href="/auth/login" icon={<ForwardLine />} label="로그인" />
        </Menu>
        <button onClick={() => setIsOpen(!isOpen)}>+</button>
      </div>
    );
  },
};
