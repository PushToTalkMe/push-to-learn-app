import { ImageProps } from './image.props';
import styles from './image.module.css';

export const Image = ({ block, contentState }: ImageProps) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  return (
    <div className={styles.imgContainer}>
      <img src={src} alt={'Твоя картинка'} className={styles.img} />
    </div>
  );
};
