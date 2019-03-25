export interface Power {
    shutdown(): Promise<void> | void;
    restart(): Promise<void> | void;
    start?(): Promise<void> | void;
}