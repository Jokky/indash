import cn from 'classnames';
import { FC, HTMLAttributes, ReactNode } from 'react';

import styles from './TabItem.module.scss';

interface TabItemProps extends HTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
    children: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ isActive, children, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={cn(styles.root, isActive && styles.active)}
        >
            {children}
        </button>
    );
};
