import Redis from 'ioredis';
export const connection = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times: number) {
        // logger.warn(`Retrying redis connection: attempt ${times}`);
        return Math.min(times * 100, 3000);
    },
});