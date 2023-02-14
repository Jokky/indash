import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { ButtonCircle } from '@/shared/ui/Button/ButtonCircle';

export const SettingsButton: FC = () => {
    return (
        <ButtonCircle>
            <Cog6ToothIcon className="w-5" />
        </ButtonCircle>
    );
};
