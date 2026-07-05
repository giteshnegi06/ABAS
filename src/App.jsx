import React, { createContext, useContext, useState } from 'react';
import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import Landing from "./Pages/index";
import AboutPage from "./Components/about";
import ContactPage from "./Components/contact";
import DepartmentsPage from "./Components/departments";
import EventsPage from "./Components/events";
import ProjectsPage from "./Components/projects";
import TeamsPage from "./Components/teams";

// New page imports
import MemberPortal from "./Pages/portal";
import InteractiveFlows from "./Pages/InteractiveFlows";
import AdminPanel from "./Pages/admin";
import AuthPage from "./Components/auth";
import JoinPage from "./Components/join";

// Initial data import
import { 
  initialMembers, 
  initialMeetings, 
  initialPayments, 
  initialDonations, 
  initialDepartments, 
  initialActivityLogs 
} from "./Data/initialData";

// Global App State Context
const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [members, setMembers] = useState(initialMembers);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [payments, setPayments] = useState(initialPayments);
  const [donations, setDonations] = useState(initialDonations);
  const [departments, setDepartments] = useState(initialDepartments);
  const [activityLogs, setActivityLogs] = useState(initialActivityLogs);
  
  const [loggedInMember, setLoggedInMember] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const onAddMember = (m) => {
    setMembers(prev => {
      const idx = prev.findIndex(item => item.id === m.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = m;
        return next;
      }
      return [...prev, m];
    });
  };

  const onUpdateMember = (updated) => {
    setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
    setLoggedInMember(curr => (curr && curr.id === updated.id) ? updated : curr);
  };

  const onAddMeeting = (meet) => {
    setMeetings(prev => {
      const idx = prev.findIndex(m => m.id === meet.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = meet;
        return next;
      }
      return [...prev, meet];
    });
  };

  const onUpdateMeeting = (updated) => {
    setMeetings(prev => prev.map(m => m.id === updated.id ? updated : m));
  };

  const onAddPayment = (pay) => {
    setPayments(prev => [...prev, pay]);
  };

  const onAddDonation = (don) => {
    setDonations(prev => [...prev, don]);
  };

  const onAddDepartment = (dep) => {
    setDepartments(prev => [...prev, dep]);
  };

  const onAddLog = (log) => {
    setActivityLogs(prev => [log, ...prev]);
  };

  const onLogin = (member) => {
    setLoggedInMember(member);
  };

  const onLogout = () => {
    setLoggedInMember(null);
  };

  const onRegister = (newMember) => {
    setMembers(prev => [...prev, newMember]);
    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: newMember.name,
      action: 'Submitted Membership',
      details: `Created pending registry file under ID ${newMember.id} with document verification pending`,
      type: 'info'
    });
    setLoggedInMember(newMember);
  };

  const onAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const onAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <AppStateContext.Provider value={{
      members,
      onAddMember,
      onUpdateMember,
      meetings,
      onAddMeeting,
      onUpdateMeeting,
      payments,
      onAddPayment,
      donations,
      onAddDonation,
      departments,
      onAddDepartment,
      activityLogs,
      onAddLog,
      loggedInMember,
      onLogin,
      onLogout,
      onRegister,
      isAdminLoggedIn,
      onAdminLogin,
      onAdminLogout
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

// Wrapper components for passing state to routes
function MemberPortalWrapper() {
  const state = useAppState();
  return <MemberPortal {...state} />;
}

function InteractiveFlowsWrapper() {
  const state = useAppState();
  const navigate = useNavigate();
  return (
    <InteractiveFlows 
      {...state} 
      onNavigateToPortal={() => navigate({ to: '/portal' })} 
    />
  );
}

function AdminPanelWrapper() {
  const state = useAppState();
  return <AdminPanel {...state} />;
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const departmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/departments',
  component: DepartmentsPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: EventsPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: TeamsPage,
});

// New page routes
const memberPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portal',
  component: MemberPortalWrapper,
});

const interactiveFlowsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/interactive-flows',
  component: InteractiveFlowsWrapper,
});

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanelWrapper,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
});

const joinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/join',
  component: JoinPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  departmentsRoute,
  eventsRoute,
  projectsRoute,
  teamsRoute,
  memberPortalRoute,
  interactiveFlowsRoute,
  adminPanelRoute,
  authRoute,
  joinRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  );
}

export default App;