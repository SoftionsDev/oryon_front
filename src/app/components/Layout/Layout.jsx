import { OryonSuspense } from '@/app/components';
import useSettings from '@/app/hooks/useSettings';
import { Layouts } from './index';

const Layout = (props) => {
  const { settings } = useSettings();
  const Layout = Layouts[settings.activeLayout];

  return (
    <OryonSuspense>
      <Layout {...props} />
    </OryonSuspense>
  );
};

export default Layout;
