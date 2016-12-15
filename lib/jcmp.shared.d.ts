// Type definitions for JCMP Shared
// Project: JCMP
// Definitions by: Joshua Wood <me@sk83rjo.sh>

/**
 * The EventSystem is used to communicate between server packages and to clients.
 */
declare interface EventSystem {
	/**
	 * Add an event handler.
	 *
	 * @param name Name of the event.
	 * @param handler Function to execute when event is fired.
	 */
	Add(name: string, handler: (...args: any[]) => any);
	/**
	 * Calls an Event
	 * NOTE: This function returns an array with all return values from all event handlers triggered.
	 *
	 * @param name Name of the event to fire.
	 * @param args Arguments to pass to event.
	 */
	Call(name: string, ...args: any[]): Array<any>;
}

/**
 * Global instance of the EventSystem.
 */
declare const events: EventSystem;

/**
 * Represents the JCMPNamespace.
 */
declare interface JCMPNamspace {
	/** All loaded Packages. */
	readonly packages: Array<Package>;
	/** Current network version of the server. */
	readonly networkVersion: number;
}

/**
 * Global instance of the JCMPNamespace.
 */
declare const jcmp: JCMPNamspace;

/**
 * Represents a loaded Package.
 */
declare class Package {
	private constructor();
	/** Package name. */
	readonly name: string;
	/** Path to the package. */
	readonly dir: string;
	/** Whether or not the configuration of this package is valid. */
	readonly valid: boolean;
	/** JSON encoded config. */
	readonly config: string;
	/**
	 * Starts the package.
	 * This is currently marked as UNSTABLE and is not guaranteed to work.
	 */
	Start(): boolean;
	/**
	 * Stops the package.
	 * This is currently marked as UNSTABLE and is not guaranteed to work.
	 */
	Stop();
}

/**
 * Represents an RGB value.
 */
declare class RGB {
	/**
	 * Construct an RGB valuue.
	 *
	 * @param Red channel value (0-255).
	 * @param green channel value (0-255).
	 * @param Blue channel value (0-255).
	 */
	constructor(r?: number, g?: number, b?: number);
	/** Red channel value (0-255). */
	readonly r: number;
	/** Green channel value (0-255). */
	readonly g: number;
	/** Blue channel value (0-255). */
	readonly b: number;
}

/**
 * Represents an RGBA value.
 */
declare class RGBA {
	/**
	 * Construct an RGB valuue.
	 *
	 * @param Red channel value (0-255).
	 * @param green channel value (0-255).
	 * @param Blue channel value (0-255).
	 * @param Alpha channel value (0-255).
	 */
	constructor(r?: number, g?: number, b?: number, a?: number);
	/** Red channel value (0-255). */
	readonly r: number;
	/** Green channel value (0-255). */
	readonly g: number;
	/** Blue channel value (0-255). */
	readonly b: number;
	/** Alpha channel value (0-255). */
	readonly a: number;
}

declare class Vector2 {
	constructor(x?: number, y?: number);
	readonly x: number;
	readonly y: number;
	readonly length: number;
	Destroy();
}

declare class Vector2f extends Vector2 {
	mul(vector: Vector2f): Vector2f;
	div(vector: Vector2f): Vector2f;
	sub(vector: Vector2f): Vector2f;
	add(vector: Vector2f): Vector2f;
}

declare class Vector3 {
	constructor(x?: number, y?: number, z?: number);
	readonly x: number;
	readonly y: number;
	readonly z: number;
	readonly length: number;
	Destroy();
}

declare class Vector3f extends Vector3 {
	mul(vector: Vector3f): Vector3f;
	div(vector: Vector3f): Vector3f;
	sub(vector: Vector3f): Vector3f;
	add(vector: Vector3f): Vector3f;
}

declare class Vector4 {
	constructor(x?: number, y?: number, z?: number, w?: number);
	readonly x: number;
	readonly y: number;
	readonly z: number;
	readonly w: number;
	readonly length: number;
	Destroy();
}

declare class Vector4f extends Vector4 {
	mul(vector: Vector4f): Vector4f;
	div(vector: Vector4f): Vector4f;
	sub(vector: Vector4f): Vector4f;
	add(vector: Vector4f): Vector4f;
}
