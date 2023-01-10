declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
      PWD: string;
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      SESSION_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
