import styles from './table.module.css';
import { TableProps } from './table.props';
import cn from 'classnames';

export const Table = <T,>({
  caption,
  headers,
  items,
  renderItem,
  className,
  ...props
}: TableProps<T>): JSX.Element => {
  return (
    <table className={cn(styles.table)} {...props}>
      <caption>{caption}</caption>
      <thead>
        <tr className={styles.tableRowHeader}>
          {headers.map((header) => (
            <th className={styles.tableCellHeader} key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{items.map((item) => renderItem(item))}</tbody>
    </table>
  );
};
