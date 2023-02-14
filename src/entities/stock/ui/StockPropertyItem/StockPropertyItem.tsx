import { FC, ReactNode } from 'react';

import styles from './StockPropertyItem.module.scss';

export interface StockPropertyItemProps {
    name: string;
    value: ReactNode;
    description?: ReactNode;
}

export const StockPropertyItem: FC<StockPropertyItemProps> = ({
    name,
    value,
}) => (
    <div className={styles.root}>
        <span className={styles.name}>{name}</span>
        <div className={styles.value}>{value}</div>
    </div>
);
