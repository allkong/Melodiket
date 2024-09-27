import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import fetchFavoriteMusiciansList from '@/services/favorite/fetchFavoriteMusiciansList';

const FavoriteMusicianSection = async () => {
  const datas = await fetchFavoriteMusiciansList();

  return (
    <>
      {datas &&
        datas.map((data) => <MusicianProfileCard key={data.id} {...data} />)}
    </>
  );
};

export default FavoriteMusicianSection;
