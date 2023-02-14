import ChangeInterval from '@/features/change-interval/ui/ChangeInterval';
import SettingsButton from '@/features/settings/ui/SettingsButton';
import UpdatePrices from '@/features/update-prices/ui/UpdatePrices';
import { AppHeader, AppLogo } from '@/shared/ui';

export const Header = () => {
    return (
        <AppHeader
            logo={<AppLogo />}
            actions={
                <div className="flex items-center gap-2">
                    <ChangeInterval />
                    {/*<ChangeIntervalUpdate />*/}
                    <UpdatePrices />
                    <SettingsButton />
                </div>
            }
        ></AppHeader>
    );
};
