import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';

import { sendAuthToken, setAuthToken } from '@/features/auth/by-token';
import useAuthStore from '@/features/auth/by-token/model/auth/use-auth-store';

import styles from './AuthByToken.module.scss';

export const AuthByToken = () => {
    const router = useRouter();
    const { token } = useAuthStore();

    const onChangeToken = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAuthToken(event.target.value.trim());
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!token) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        await sendAuthToken(token);

        router.push('/');
    };

    return (
        <div className={styles.root}>
            <h2 className="text-4xl font-bold mb-4 text-center">Авторизация</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label className="block mb-4">
                    <textarea
                        className={styles.textarea}
                        placeholder="Вставьте токен"
                        rows={5}
                        value={token ?? undefined}
                        onChange={onChangeToken}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};
