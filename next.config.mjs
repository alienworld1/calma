/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseHost = supabaseUrl.slice(8);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHost,
        port: '',
      },
    ],
  },
};

export default nextConfig;
