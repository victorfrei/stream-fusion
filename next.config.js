/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: '*.tmdb.org',
      port: '',
      pathname: '**',
    },
    {
      protocol: 'https',
      hostname: '*.themoviedb.org',
      port: '',
      pathname: '**',
    },
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      port: '',
      pathname: '**',
    },
    ]
  }
};

module.exports = nextConfig;
