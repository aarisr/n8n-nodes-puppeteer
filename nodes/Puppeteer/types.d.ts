// Minimal ambient declarations used during Docker build where `n8n` packages
// (and their type packages) may not be available. Keep these minimal to
// satisfy tsc while building the package in isolation.

declare module '@fye/netsuite-rest-api';

declare module 'n8n-workflow' {
	// Very small subset of types used by this node. Mark everything as `any`
	// to avoid tight coupling with upstream type versions inside the Docker
	// build environment.
	export type IDataObject = { [key: string]: any };
	export type INodeExecutionData = { json: IDataObject; binary?: Record<string, any>; pairedItem?: { item: number } };
	export type INodePropertyOptions = { name: string; value: string; description?: string };
	export type ILoadOptionsFunctions = any;
	export type IExecuteFunctions = any;
	export type INodeType = any;
	export type INodeTypeDescription = any;

	export const NodeConnectionType: {
		readonly Main: string;
		readonly Default: string;
	};

	// Minimal NodeOperationError implementation to allow construction and
	// instanceof checks if needed during build/runtime type checks.
	export class NodeOperationError extends Error {
		constructor(node: any, message?: string, options?: any);
	}

	// Re-export anything else as `any` to be permissive.
	export const NodeHelpers: any;
}
declare module '@fye/netsuite-rest-api';
