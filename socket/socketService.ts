// socket/socketService.ts
import { Server } from 'socket.io'
import Redis, { RedisOptions } from 'ioredis';
import dotenv from "dotenv";
dotenv.config();


export interface ProductUpdateEvent {
    itemName: string;
    quantityAdded: number;
    userName: string;
}
// console.log("REDIS_HOST:", process.env.REDIS_HOST);
// console.log("REDIS_PORT:", process.env.REDIS_PORT);
// console.log("REDIS_USER:", process.env.REDIS_USER);
// console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD ? "****" : "NOT SET");


const REDIS_CONFIG: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
    username: process.env.REDIS_USER, // use 'username' for ioredis auth (Aiven)
    password: process.env.REDIS_PASSWORD,
    // Additional options for better connection handling
    retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        console.log(`Redis retry attempt ${times}, waiting ${delay}ms`);
        return delay;
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    connectTimeout: 0,
    lazyConnect: false, // Don't connect immediately
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates from Aiven
    },
    // healthCheckInterval: 10,
    // socketKeepalive: true,
};

let pub: Redis | null = null;
let sub: Redis | null = null;
let isRedisAvailable = false;

// Use consistent channel name
const CHANNEL_NAME = 'PRODUCT_UPDATES';

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Socket server initialized")
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        })

        this.initRedis();
    }

    private async initRedis() {
        try {
            pub = new Redis(REDIS_CONFIG);
            sub = new Redis(REDIS_CONFIG);

            // Handle Redis errors
            pub.on('error', (err) => {
                console.error('Redis PUB Error:', err.message);
                isRedisAvailable = false;
            });

            sub.on('error', (err) => {
                console.error('Redis SUB Error:', err.message);
                isRedisAvailable = false;
            });

            pub.on('connect', () => {
                console.log('Redis PUB connected');
                isRedisAvailable = true;
            });

            sub.on('connect', () => {
                console.log('Redis SUB connected');
                isRedisAvailable = true;
            });

            pub.on('ready', () => {
                console.log('Redis PUB ready');
            });

            sub.on('ready', () => {
                console.log('Redis SUB ready');
            });

            // Try to connect
            await pub.connect();
            await sub.connect();

            // Subscribe to the channel
            await sub.subscribe(CHANNEL_NAME);
            console.log(`Subscribed to ${CHANNEL_NAME}`);

        } catch (error) {
            console.error('Failed to initialize Redis:', error);
            isRedisAvailable = false;
            // Continue without Redis - will use direct Socket.IO instead
        }
    }

    public initListener() {
        const io = this.io;
        console.log("Initializing socket listeners");

        // Handle Redis pub/sub messages (if Redis is available)
        if (sub) {
            sub.on('message', (channel, message) => {
                if (channel === CHANNEL_NAME) {
                    console.log('Received message from Redis:', message);
                    try {
                        const product = JSON.parse(message);
                        // Broadcast to all connected clients
                        io.emit('product:updated', product);
                    } catch (error) {
                        console.error('Error parsing Redis message:', error);
                    }
                }
            });
        }

        // Handle socket connections
        io.on('connect', socket => {
            console.log("New socket connected:", socket.id);

            // Listen for product additions from clients
            socket.on("product:add", async (product: ProductUpdateEvent) => {
                console.log('Product add request received:', product);

                try {
                    if (isRedisAvailable && pub) {
                        // Try to publish to Redis for multi-server support
                        await pub.publish(CHANNEL_NAME, JSON.stringify(product));
                        console.log('Published to Redis successfully');
                    } else {
                        // Fallback: Direct broadcast if Redis is unavailable
                        console.log('Redis unavailable, using direct broadcast');
                        io.emit('product:updated', product);
                    }
                } catch (error) {
                    console.error('Error publishing to Redis, falling back to direct broadcast:', error);
                    // Fallback to direct Socket.IO broadcast
                    io.emit('product:updated', product);
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected:', socket.id);
            });
        });
    }

    get io() {
        return this._io;
    }

    // Graceful shutdown
    public async close() {
        if (pub) {
            await pub.quit();
        }
        if (sub) {
            await sub.quit();
        }
        this._io.close();
    }
}

export default SocketService;