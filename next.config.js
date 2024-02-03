// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
			},
		],
	},
	experimental: {
		ppr: true,
		serverMinification: true,
	},
};

module.exports = nextConfig;
