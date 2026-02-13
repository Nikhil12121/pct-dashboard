import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import {
  Folder,
  Schedule,
  Assessment,
  Flag,
  AttachMoney,
  Warning,
  Block,
} from '@mui/icons-material';

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { PCTLayout } from "components/layout/PCTLayout";
import { Header } from "components/layout/header";
import { ColorModeContextProvider } from "contexts";
import { PaneContextProvider } from "contexts/PaneContext";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
  Login,
  Home,
  Project,
  Timeline,
  KIPs,
  Milestones,
  CostFTE,
  Risks,
  Terminated,
} from "pages";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async (params: CredentialResponse & { demo?: boolean }) => {
      const { credential, demo } = params;

      if (demo) {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Nikhil',
            email: 'nikhil@example.com',
            avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
          })
        });
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: 'Nikhil',
              email: 'nikhil@example.com',
              picture: 'https://avatars.githubusercontent.com/u/1?v=4',
              avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
              userid: data._id
            })
          );
          localStorage.setItem("token", "demo-token");
          return Promise.resolve();
        }
        return Promise.reject();
      }

      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })

        const data = await response.json();

        if(response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        } else {
          return Promise.reject()
        }
      }
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        if (token !== "demo-token") {
          window.google?.accounts.id.revoke(token, () => {
            return Promise.resolve();
          });
        }
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <PaneContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "project",
              list: Project,
              options: { label: "Project" },
              icon: <Folder />,
            },
            {
              name: "timeline",
              list: Timeline,
              options: { label: "Timeline" },
              icon: <Schedule />,
            },
            {
              name: "kips",
              list: KIPs,
              options: { label: "KIPs" },
              icon: <Assessment />,
            },
            {
              name: "milestones",
              list: Milestones,
              options: { label: "Milestones" },
              icon: <Flag />,
            },
            {
              name: "cost-fte",
              list: CostFTE,
              options: { label: "Cost/FTE" },
              icon: <AttachMoney />,
            },
            {
              name: "risks",
              list: Risks,
              options: { label: "Risks" },
              icon: <Warning />,
            },
            {
              name: "terminated",
              list: Terminated,
              options: { label: "Terminated" },
              icon: <Block />,
            },
          ]}
          Layout={PCTLayout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
      </PaneContextProvider>
    </ColorModeContextProvider>
  );
}

export default App;
