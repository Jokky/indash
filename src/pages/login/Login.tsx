import AuthByToken from '@/features/auth/by-token/ui/AuthByToken';

import styles from './Login.module.scss';

export const Login = () => {
    return (
        <div className={styles.root}>
            <AuthByToken />
        </div>
    );
};
