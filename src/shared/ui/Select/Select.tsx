import cn from 'classnames';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { useClickAway } from 'react-use';

import styles from './Select.module.scss';

interface SelectItem {
    id: string;
    label: ReactNode;
}

interface SelectProps {
    id?: string | null;
    items: SelectItem[];
    placeholder?: ReactNode;
    onChange?: (id: string) => void;
}

export const Select: FC<SelectProps> = ({
    id,
    items,
    placeholder,
    onChange,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [currentId, setCurrentId] = useState(id);
    const [isOpen, setIsOpen] = useState(false);

    const currentValue = items.find(({ id }) => id === currentId);

    useClickAway(ref, () => setIsOpen(false));

    useEffect(() => {
        setCurrentId(id);
    }, [id]);

    const handleChangeValue = (id: string) => () => {
        setCurrentId(id);
        setIsOpen(false);
        onChange?.(id);
    };

    return (
        <div className={styles.root} ref={ref}>
            <div className={styles.current} onClick={() => setIsOpen(!isOpen)}>
                {currentValue?.label ?? placeholder}
            </div>
            <div className={cn(styles.items, isOpen && styles.open)}>
                {items.map(({ id, label }) => (
                    <div
                        className={cn(
                            styles.item,
                            currentId === id && styles.selected,
                        )}
                        onClick={handleChangeValue(id)}
                        key={id}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};
