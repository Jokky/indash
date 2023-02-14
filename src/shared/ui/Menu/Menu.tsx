import cn from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './Menu.module.scss';

interface MenuProps {
    sticky?: boolean;
    children: ReactNode;
}

export const Menu: FC<MenuProps> = ({ sticky, children }) => (
    <div className={cn(styles.root, sticky && styles.sticky)}>{children}</div>
);
