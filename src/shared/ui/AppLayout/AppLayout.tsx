import { FC, ReactNode } from 'react';

import styles from './AppLayout.module.scss';

interface AppLayoutProps {
    header?: ReactNode;
    aside?: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({
    header,
    aside,
    body,
    footer,
}) => (
    <div className={styles.root}>
        {aside}
        <div className={styles.container}>
            {header}
            {body}
            {footer}
        </div>
    </div>
);
