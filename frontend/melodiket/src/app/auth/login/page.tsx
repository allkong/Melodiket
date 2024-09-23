import Input from '@/components/atoms/input/Input';
import TextBanner from '@/components/molecules/text/TextBanner';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { LogoText } from '@/public/icons';

const Page = () => {
  return (
    <div className="flex flex-col items-center px-6 space-y-10">
      <div className="my-7">
        <LogoText />
      </div>
      <div className="w-full">
        <TextBanner
          title={`안녕하세요.\n멜로디켓입니다.`}
          description="회원 서비스를 이용하시려면 로그인 해주세요."
          hasLogo
        />
      </div>
      <div className="space-y-3">
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" type="password" />
      </div>
      <p className="text-sm text-gray-400">ID/PW 찾기 | 회원가입</p>
      <FixedButton label="로그인" />
    </div>
  );
};

export default Page;
