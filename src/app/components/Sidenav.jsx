import { styled } from '@mui/system';
import { VerticalNav } from '@/app/components';
import useAuth from '@/app/hooks/useAuth';
import useSettings from '@/app/hooks/useSettings';
import { navigations, navigationsCollaborator, navigationsManager } from '@/app/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { ROLES } from '../../constants';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgb(73,73,73);',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {
          //! Role Dependent gave you a different navigation
        }
        {user.groups?.includes(ROLES.Admin) && <VerticalNav items={navigations} />}
        {user.groups?.includes(ROLES.Manager) && <VerticalNav items={navigationsManager} />}
        {user.groups?.includes(ROLES.Colaborador) && <VerticalNav items={navigationsCollaborator} />}


      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
