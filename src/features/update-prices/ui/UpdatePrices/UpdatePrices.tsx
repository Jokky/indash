import { ArrowPathIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useState } from 'react';
import { useIntervalStore } from '@/entities/interval/model/useIntervalStore';
import { fetchPrices } from '@/entities/stock';
import { ButtonCircle } from '@/shared/ui/Button/ButtonCircle';

export const UpdatePrices = () => {
    const [loading, setLoading] = useState(false);
    const { interval } = useIntervalStore();

    const onClick = async () => {
        if (!interval) {
            return;
        }

        setLoading(true);
        await fetchPrices({ interval });
        setLoading(false);
    };

    return (
        <ButtonCircle onClick={onClick}>
            <ArrowPathIcon className={cn('w-5', loading && 'animate-spin')} />
        </ButtonCircle>
    );
};
