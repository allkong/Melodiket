import Header from '@/components/organisms/navigation/Header';
import Carousel from '@/components/molecules/carousel/Carousel';
import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import {
  CAROUSEL_DATAS,
  CONCERT_LIST,
  FAVORITE_MUSICIAN_LIST,
} from '@/constants/concertMocks';
import ConcertRankingCard from '@/components/molecules/card/ConcertRankingCard';
import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-purple-100 overflow-y-auto">
      <Header isFixed />
      <div className="px-7 mt-16">
        <details>
          <summary>메뉴 이동하기</summary>
          <div>
            <Link href="/auth/sign-up">회원가입</Link>
            &nbsp;
            <Link href="/auth/login">로그인</Link>
            &nbsp;
            <Link href="/musicians">뮤지션정보</Link>
            &nbsp;
            <Link href="/concert/list">공연정보</Link>
            &nbsp;
            <Link href="/concert/register">공연생성</Link>
            &nbsp;
            <Link href="/favorites">좋아요</Link>
          </div>
        </details>
        <Carousel datas={CAROUSEL_DATAS} gap={4} size="lg" rounded />
        <div className="flex flex-col gap-6 my-3">
          <TicketInfoCarousel
            datas={['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~']}
          />
          <div>
            <p className="text-xl font-medium">공연 랭킹</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                {CONCERT_LIST.map((data, idx) => (
                  <ConcertRankingCard
                    key={data.concertId}
                    {...data}
                    ranking={idx + 1}
                  />
                ))}
              </div>
            </section>
          </div>
          <div>
            <p className="text-xl font-medium">나의 뮤지션</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                {FAVORITE_MUSICIAN_LIST.map((data) => (
                  <MusicianProfileCard key={data.index} {...data} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
