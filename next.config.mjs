/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "uwuteca-production.up.railway.app",
			},
			{
				protocol: "https",
				hostname: "chizu.games",
			},
			{
				protocol: "https",
				hostname: "chizu-project-production.up.railway.app",
			},
		],
	},
};

export default nextConfig;
