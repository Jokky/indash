import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/shared/lib';

import styles from './StockPrice.module.scss';

const ANIMATE_TIMEOUT = 400;

type CompareNumberStatus = 'equals' | 'decrease' | 'increase';

const compareNumber = (
    newValue: number,
    oldValue?: number,
): CompareNumberStatus => {
    if (!oldValue || oldValue === newValue) {
        return 'equals';
    }

    if (oldValue > newValue) {
        return 'decrease';
    }

    return 'increase';
};

interface State {
    animate: boolean;
    status: CompareNumberStatus;
}

interface StockPriceProps {
    amount: number;
    previousAmount?: number;
    currency: string;
}

export const StockPrice: FC<StockPriceProps> = ({
    previousAmount,
    amount,
    currency,
}) => {
    const timeoutRef = useRef<number>();

    const [state, setState] = useState<State>({
        animate: false,
        status: 'equals',
    });

    useEffect(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        const status = compareNumber(amount, previousAmount);

        setState({
            animate: true,
            status,
        });

        timeoutRef.current = window.setTimeout(() => {
            setState({
                animate: false,
                status,
            });
        }, ANIMATE_TIMEOUT);
    }, [previousAmount, amount]);

    return (
        <div className={cn(styles.root, state.animate && styles[state.status])}>
            {formatPrice(amount)}
            {currency}
        </div>
    );
};
