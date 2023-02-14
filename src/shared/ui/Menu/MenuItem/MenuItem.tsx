import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import styles from './MenuItem.module.scss';

interface ItemProps {
    href: string;
    iconLeft?: ReactNode;
    children: ReactNode;
}

export const MenuItem: FC<ItemProps> = ({ iconLeft, href, children }) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={cn(styles.root, href === pathname && styles.active)}
        >
            {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
            {children}
        </Link>
    );
};
