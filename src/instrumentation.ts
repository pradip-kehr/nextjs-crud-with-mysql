export const register = async () => {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Worker } = await import("bullmq");
        const { connection, sampleWorker } = await import("./redis/workers/sample");

        // Create a new worker to process jobs from the queue
        const worker = new Worker("sampleQueue", sampleWorker, {
            connection,
            concurrency: 5,
            removeOnComplete: { count: 1000 },
            removeOnFail: { count: 5000 },
        });

        worker.on("completed", async (job) => {
            console.log(`Job completed for ${job.id}`);
        });
        worker.on("failed", async (job, err) => {
            console.error(`${job?.id} has failed with ${err.message}`);
        });
        worker.on("stalled", (str) => {
            console.log(`Job stalled: ${str}`);
        });
    }
};