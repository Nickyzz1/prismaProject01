/** @type {import('next').NextConfig} */
const nextConfig = {

  images:
  {
    remotePatterns: [{protocol: "http", hostname: "localhost", port: "8080"}],
    domains: ["raw.githubusercontent.com"],

  },

  rewrites: () => 
  { 
      return [
          {
            source: "/",
            destination: "/home",
          },
          {
            source: "/login",
            destination: "/login"
          },
          {
            source: "/selectMap",
            destination: "/selectMap"
          },
          {
            source: "/register",
            destination: "/register"
          },
          {
            source: "/start",
            destination: "/messageStart"
          },
          {
            source: "/game",
            destination: "/gameMitico"
          },
          {
            source: "/gameCuritiba",
            destination: "/gameCuritiba"
          },
          {
            source : "/pageMItico",
            destination : "/pageMItico"
          },
      
      ]
  }
};

export default nextConfig;