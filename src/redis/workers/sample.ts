import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
import { Job } from "bullmq";
import { connection } from '../connection';

export const sampleQueue = new Queue('sampleQueue', {
    connection: connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: 20 * 1000,
        removeOnComplete: true,
        removeOnFail: true,
    },
});

// export const sampleWorker =
//     async (job: Job) => {
//         const data = job?.data;
//         console.log(data);
//         console.log('Task executed successfully');
//     }
// export default sampleWorker;
export const worker = new Worker(
    'sampleQueue', // this is the queue name, the first string parameter we provided for Queue()
    async (job: Job) => {
        const data = job?.data;
        console.log('Task executed successfully', data);
    },
    {
        connection,
        concurrency: 5,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
    }
);

worker.on("completed", async (job) => {
    console.log(`Job completed for ${job.id}`);
});
worker.on("failed", async (job, err) => {
    console.error(`${job?.id} has failed with ${err.message}`);
});
worker.on("stalled", (str) => {
    console.log(`Job stalled: ${str}`);
});
