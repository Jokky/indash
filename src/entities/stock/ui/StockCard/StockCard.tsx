import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { usePrevious } from 'react-use';
import { Price } from '@/types';

import { ImageFallback } from '@/shared/ui/ImageFallback';

import { StockPrice } from '../StockPrice/StockPrice';

import styles from './StockCard.module.scss';

const ICON_SIZE = 32;

type StockColor = 'green' | 'red' | 'default';

const MapColor: Record<StockColor, string> = {
    green: styles.rootGreen,
    red: styles.rootRed,
    default: styles.root,
};

export interface StockCardProps {
    /* Наименование акции */
    name: string;
    /* Короткое наименование акции */
    ticker: string;
    /* Иконка акции */
    icon: string;
    /* Текущая цена акции */
    price: Price;
    /* Цвет акции. Используется для отображения роста или падения */
    color?: StockColor;
    after?: ReactNode;
}

export const StockCard: FC<StockCardProps> = ({
    name,
    ticker,
    icon,
    price,
    color = 'default',
    after,
}) => {
    const rootColor = MapColor[color];
    const previousAmount = usePrevious(price.amount);

    return (
        <div className={cn(styles.root, rootColor)}>
            <div className={styles.header}>
                <div className={styles.wrapper}>
                    <ImageFallback
                        fallbackSrc="/stock.svg"
                        className={styles.icon}
                        src={icon}
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                        alt={name}
                    />
                    <p className={styles.name}>
                        {name} <sup className={styles.ticker}>{ticker}</sup>
                    </p>
                </div>
                <StockPrice {...price} previousAmount={previousAmount} />
            </div>
            {after && <div className={styles.body}>{after}</div>}
        </div>
    );
};
