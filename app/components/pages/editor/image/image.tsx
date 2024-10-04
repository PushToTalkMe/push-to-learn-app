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

// import { ImageProps } from './image.props';
// import styles from './image.module.css';
// import { MouseEventHandler, SyntheticEvent, useState } from 'react';

// export const Image = ({ block, contentState }: ImageProps) => {
//   const [resizing, setResizing] = useState(false);
//   const [dimensions, setDimensions] = useState({
//     width: 300,
//     height: 300,
//   });

//   const entity = contentState.getEntity(block.getEntityAt(0));
//   const { src } = entity.getData();

//   const handleMouseDown = (e: SyntheticEvent) => {
//     e.preventDefault();
//     console.log('handleMouseDown');
//     setResizing(true);
//   };

//   const handleMouseMove = (e) => {
//     console.log('handleMouseMove');

//     // if (resizing) {
//     //   const container = e.target.closest(`.${styles.imgContainer}`);
//     //   const width = e.clientX - container.getBoundingClientRect().left;
//     //   const height = e.clientY - container.getBoundingClientRect().top;
//     //   setDimensions({
//     //     width: Math.max(width, 100),
//     //     height: Math.max(height, 100),
//     //   });
//     // }
//   };

//   const handleMouseUp = () => {
//     console.log('handleMouseUp');
//     setResizing(false);
//   };

//   return (
//     <div
//       className={styles.imgContainer}
//       style={{ width: dimensions.width, height: dimensions.height }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={(e) => (resizing ? handleMouseMove(e) : null)}
//       onMouseUp={handleMouseUp}
//     >
//       <img
//         src={src}
//         alt={'Твоя картинка'}
//         className={styles.img}
//         style={{ width: dimensions.width, height: dimensions.height }}
//       />
//       <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />
//     </div>
//   );
// };
