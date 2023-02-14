import { FC, ReactNode } from 'react';

import styles from './Tabs.module.scss';

interface Tabs {
    children: ReactNode;
}

export const Tabs: FC<Tabs> = ({ children }) => (
    <div className={styles.root}>{children}</div>
);
