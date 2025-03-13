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
            source: "/register",
            destination: "/register"
        },
      ]
  }
};

export default nextConfig;