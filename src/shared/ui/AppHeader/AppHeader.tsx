import { FC, ReactNode } from 'react';

import styles from './AppHeader.module.scss';

interface AppHeaderProps {
    logo: ReactNode;
    actions: ReactNode;
}

export const AppHeader: FC<AppHeaderProps> = ({ logo, actions }) => (
    <header className={styles.root}>
        <div className={styles.logo}>{logo}</div>
        <div className={styles.actions}>{actions}</div>
    </header>
);
