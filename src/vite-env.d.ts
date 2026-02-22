/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// Declare dotlottie-wc web component for TypeScript
declare namespace JSX {
    interface IntrinsicElements {
        'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src: string;
            autoplay?: boolean;
            loop?: boolean;
        };
    }
}
