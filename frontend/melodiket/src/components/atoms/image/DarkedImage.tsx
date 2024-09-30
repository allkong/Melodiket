import Image from 'next/image';

const DarkedImage = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={
          'https://sirup.online/wp/wp-content/uploads/2024/09/%E2%98%85%E2%98%85-360x480px%EC%82%AC%EC%9D%B4%EC%A6%88-RGB.jpg'
        }
        alt="콘서트 상세 페이지 배경 이미지"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
    </div>
  );
};

export default DarkedImage;
