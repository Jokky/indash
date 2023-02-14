import { FC, HTMLAttributes } from 'react';

import styles from './ButtonCircle.module.scss';

type ButtonCircleProps = HTMLAttributes<HTMLButtonElement>;

export const ButtonCircle: FC<ButtonCircleProps> = ({ children, ...props }) => (
    <button type="button" {...props} className={styles.root}>
        {children}
    </button>
);
