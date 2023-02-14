import { useRouter } from 'next/navigation';

import styles from './Error.module.scss';

export const Error = () => {
    const { refresh } = useRouter();

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Что-то пошло не так!</h1>
            <button type="button" className={styles.reload} onClick={refresh}>
                Перезагрузить страницу
            </button>
        </div>
    );
};
