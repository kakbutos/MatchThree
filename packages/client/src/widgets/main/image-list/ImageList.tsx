import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const GamesImageList = () => {
  return (
    <ImageList variant="quilted" cols={4} rowHeight={141}>
      {itemData.map(item => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

//TODO: вставить изображения готовой игры

const itemData = [
  {
    img: 'https://cdn1.sbnation.com/assets/4027071/BEJ3_Screenshot_IceStorm_17.jpg',
    title: '',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81E0UiiVV5L.png',
    title: '',
  },
  {
    img: 'https://felgo.com/doc/images/juicysquash_gameover.png',
    title: '',
  },
  {
    img: 'https://www.improvememory.org/wp-content/uploads/2020/06/crazy-match-3-game.png',
    title: '',
    cols: 2,
  },
];
