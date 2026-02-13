import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, Button, Typography } from "@pankod/refine-mui";

import { yariga } from '../assets';

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse & { demo?: boolean }>();

  const handleDemoLogin = () => {
    login({ demo: true } as CredentialResponse & { demo?: boolean });
  };

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{ backgroundColor: '#FCFCFC' }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={yariga} alt="Yariga Logo" />
          </div>
          <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%' }}>
            <GoogleButton />
            <Typography variant="body2" color="text.secondary">
              — or —
            </Typography>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              sx={{ minWidth: 200 }}
            >
              Continue as Nikhil
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Use this if Google Sign-In fails (e.g. on localhost)
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
