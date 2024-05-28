import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
import { Job } from "bullmq";
export const connection = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times: number) {
        // logger.warn(`Retrying redis connection: attempt ${times}`);
        return Math.min(times * 100, 3000);
    },
});

export const sampleQueue = new Queue('sampleQueue', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: 20 * 1000,
        removeOnComplete: true,
        removeOnFail: true,
    },
});

export const sampleWorker =
    async (job: Job) => {
        const data = job?.data;
        console.log(data);
        console.log('Task executed successfully');
    }
// export const sampleWorker = new Worker(
//     'sampleQueue', // this is the queue name, the first string parameter we provided for Queue()
//     async (job: Job) => {
//         const data = job?.data;
//         console.log(data);
//         console.log('Task executed successfully');
//     },
//     {
//         connection,
//         concurrency: 5,
//         removeOnComplete: { count: 1000 },
//         removeOnFail: { count: 5000 },
//     }
// );

export default sampleWorker;