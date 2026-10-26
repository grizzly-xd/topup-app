/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_MIDTRANS_CLIENT_KEY: string;
  readonly VITE_MIDTRANS_SNAP_URL: string;
  readonly VITE_MIDTRANS_IS_PRODUCTION: string;
  readonly VITE_SITE_NAME?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv; }

interface Window {
  snap?: {
    pay: (
      token: string,
      opts?: {
        onSuccess?: (r: unknown) => void;
        onPending?: (r: unknown) => void;
        onError?: (r: unknown) => void;
        onClose?: () => void;
      }
    ) => void;
  };
}
