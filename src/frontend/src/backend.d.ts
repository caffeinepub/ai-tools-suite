import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ToolType = string;
export interface HistoryEntry {
    output: string;
    timestamp: Time;
    toolType: ToolType;
    input: string;
}
export type Time = bigint;
export interface backendInterface {
    clearToolHistory(toolType: ToolType): Promise<void>;
    getAllRecentHistory(): Promise<Array<HistoryEntry>>;
    getRecentToolHistory(toolType: ToolType): Promise<Array<HistoryEntry>>;
    getUsageStats(): Promise<Array<[ToolType, bigint]>>;
    saveHistory(toolType: ToolType, input: string, output: string): Promise<void>;
}
