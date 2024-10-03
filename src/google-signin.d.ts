// src/types/google-signin.d.ts
interface GoogleSignInProfile {
  email: string;
  name: string;
}

interface Google {
  accounts: {
    id: {
      initialize(config: {
        client_id: string;
        callback: (response: { credential: string }) => void;
      }): void;
      renderButton(
        container: HTMLElement,
        options: { theme: string; size: string }
      ): void;
    };
  };
}

interface Window {
  google?: Google;
}
