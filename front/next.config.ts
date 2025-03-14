/** @type {import('next').NextConfig} */
const nextConfig = {

  images:
  {
      remotePatterns: [
          {protocol: "https", 
          hostname: "pokeapi.co"}]
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
      
      ]
  }
};

export default nextConfig;