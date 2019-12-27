/** Declaration file generated by dts-gen */

export class JSONStreamSafe {
    constructor(...args: any[]);

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export class OnlineOffline {
    constructor(...args: any[]);

    create(...args: any[]): void;

    destroy(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export class Queue {
    constructor(...args: any[]);

    dequeue(...args: any[]): void;

    enqueue(...args: any[]): void;

    isEmpty(...args: any[]): void;

    peek(...args: any[]): void;

    removeAll(...args: any[]): void;

    size(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export class RedisMessenger {
    constructor(...args: any[]);

    close(...args: any[]): void;

    destroyD(...args: any[]): void;

    destroyU(...args: any[]): void;

    enableScripts(...args: any[]): void;

    getSessCode(...args: any[]): void;

    getSessCodeFlavor(...args: any[]): void;

    input(...args: any[]): void;

    isValid(...args: any[]): void;

    output(...args: any[]): void;

    putSessCode(...args: any[]): void;

    putSessCodeFlavor(...args: any[]): void;

    replyToFlavorStatus(...args: any[]): void;

    replyToRebootRequest(...args: any[]): void;

    requestFlavorStatus(...args: any[]): void;

    requestReboot(...args: any[]): void;

    setLive(...args: any[]): void;

    subscribeToDestroyD(...args: any[]): void;

    subscribeToDestroyU(...args: any[]): void;

    subscribeToExpired(...args: any[]): void;

    subscribeToFlavorStatus(...args: any[]): void;

    subscribeToInput(...args: any[]): void;

    subscribeToOutput(...args: any[]): void;

    subscribeToRebootRequests(...args: any[]): void;

    touchInput(...args: any[]): void;

    touchOutput(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export class RedisQueue {
    constructor(...args: any[]);

    enqueueMessage(...args: any[]): void;

    reset(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export class StdioMessenger {
    constructor(...args: any[]);

    sendMessage(...args: any[]): void;

    setReadStream(...args: any[]): void;

    setWriteStream(...args: any[]): void;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;

}

export const config: {
    auth: {
        easy: {
            max_token_age: number;
            secret: string;
        };
        google: {
            oauth_key: string;
            oauth_secret: string;
        };
        password: {
            salt_rounds: number;
        };
    };
    client: {
        announcement_display: string;
        announcement_html: string;
        app_name: string;
        description: string;
        gacode: string;
        onboarding: boolean;
        theme_collection: string;
        theme_color: string;
        title: string;
        uservoice: string;
    };
    docker: {
        cpuShares: number;
        cwd: string;
        diskQuotaKiB: number;
        gitdir: string;
        images: {
            filesystemSuffix: string;
            octaveSuffix: string;
        };
        memoryShares: string;
    };
    flavorCommon: {
        blockVolume: boolean;
        defaultClusterSize: number;
        idleTime: number;
        image_uuid: string;
        network_uuid: string;
        statusInterval: number;
    };
    flavors: {
        basic: {
            blockVolume: boolean;
            rackspaceFlavor: string;
        };
        memory: {
            rackspaceFlavor: string;
        };
    };
    front: {
        cookie: {
            max_age: number;
            name: string;
            secret: string;
        };
        flavor_log_interval: number;
        hostname: string;
        listen_port: number;
        port: number;
        protocol: string;
        static_path: string;
    };
    git: {
        author: {
            email: string;
            name: string;
        };
        autoCommitInterval: number;
        commitTimeLimit: number;
        helperUser: string;
        hostname: string;
    };
    mailgun: {
        api_key: string;
        domain: string;
    };
    maintenance: {
        interval: number;
        maxNodesInMaintenance: number;
        minNodesInCluster: number;
        pauseDuration: number;
        requestInterval: number;
        responseWaitTime: number;
    };
    mongo: {
        db: string;
        hostname: string;
        port: number;
    };
    ot: {
        document_expire: {
            interval: number;
            timeout: number;
        };
        operation_expire: number;
        stats_interval: number;
    };
    rackspace: {
        api_key: string;
        identity_base_url: string;
        personality_filename: string;
        servers_base_url: string;
        username: string;
    };
    redis: {
        expire: {
            interval: number;
            timeout: number;
        };
        hostname: string;
        maxPayload: number;
        options: {
            auth_pass: string;
        };
        port: number;
    };
    selinux: {
        cgroup: {
            conf: string;
            cpuPeriod: number;
            cpuQuota: number;
            gid: string;
            name: string;
            uid: string;
        };
        prlimit: {
            addressSpace: number;
        };
    };
    session: {
        countdownExtraTime: number;
        countdownRequestTime: number;
        countdownRequestTimeBuffer: number;
        implementation: string;
        jsonMaxMessageLength: number;
        legalTime: {
            guest: number;
            user: number;
        };
        payloadAcknowledgeDelay: number;
        payloadLimit: {
            guest: number;
            user: number;
        };
        payloadMessageDelay: number;
        textFileSizeLimit: number;
        timeoutTime: number;
        timewarnMessage: string;
        timewarnTime: number;
        urlreadMaxBytes: number;
        urlreadPatterns: string[];
    };
    sessionManager: {
        logInterval: number;
        poolInterval: number;
        poolSize: number;
        startupTimeLimit: number;
    };
    tiers: {
        vip: {
            "selinux.cgroup.name": string;
            "selinux.prlimit.addressSpace": number;
            "session.payloadLimit.user": number;
            "sessionManager.poolSize": number;
        };
    };
    worker: {
        clockInterval: {
            max: number;
            min: number;
        };
        logDir: string;
        maxSessions: number;
        monitorLogs: {
            subdir: string;
        };
        sessionLogs: {
            depth: number;
            subdir: string;
        };
        token: string;
        uid: number;
    };
};

export function asyncCache(getter: any, bufferTime: any): any;

export function logger(id: any): any;

export function onceMessage(emitter: any, messageName: any, next: any): void;

export function silent(messageRegex: any, _next: any, ...args: any[]): any;

export function timeLimit(milliseconds: any, defaults: any, callback: any, ...args: any[]): any;

export namespace JSONStreamSafe {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace OnlineOffline {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace Queue {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace RedisMessenger {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace RedisQueue {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace StdioMessenger {
    class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;

    }

}

export namespace config2 {
    function flavor(flavor: any): any;

    function tier(tier: any): any;

}

export namespace rack {
    function createFlavorServer(flavor: any, next: any): any;

    function deleteSelf(personality: any, next: any): any;

    function getFlavorServers(flavor: any, next: any): any;

    function listFlavors(next: any): void;

}

export namespace redisUtil {
    function createClient(): any;

    function getSessCodeFromChannel(channel: any): any;

    namespace chan {
        const destroyD: string;

        const destroyU: string;

        const needsOctave: string;

        const rebootRequest: string;

        function attachment(id: any): any;

        function flavorStatus(flavor: any): any;

        function input(sessCode: any): any;

        function needsOctaveFlavor(flavor: any): any;

        function output(sessCode: any): any;

        function session(sessCode: any): any;

    }

}

