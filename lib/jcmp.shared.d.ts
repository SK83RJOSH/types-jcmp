// Type definitions for JCMP
// Project: JCMP
// Definitions by: Joshua Wood

/**
 * The EventSystem is used to communicate between server packages and to clients.
 */
declare interface EventSystem {
	/**
	 * Adds an event handler
	 * 
	 * @param {string} name the event name
	 * @param {(...any) => any} handler the function to execute when the event is called
	 * 
	 * @example jcmp.events.Add('MyEvent', () => {
	 *   console.log('hello world!');
	 * });
	 */
	Add(name: string, handler: (...any) => any): EventInstance;
	/**
	 * Calls an Event.
	 * 
	 * This function always returns an array with all return values from all event handlers for that name.
	 * 
	 * @param {string} name event name
	 * @param {any} ...args event arguments
	 * 
	 * @example jcmp.events.Add('MyEvent', (x = 1) => {
	 *   console.log(the value of x is ${x});
	 *   return x;
	 * });
	 * jcmp.events.Call('MyEvent'); // the value of x is 1
	 * jcmp.events.Call('MyEvent', 5); // the value of x is 5
	 * 
	 * var ret = jcmp.events.Call('MyEvent');
	 * // ret = [1]
	 */
	Call(name: string, ...args: any[]): Array<any>;
	/**
	 * @param {EventInstance} p1
	 */
	Remove(p1: EventInstance): void;
	/**
	 * @param {string} p1
	 */
	RemoveAll(p1: string): void;
	Add(name: 'PackageLoaded', handler: (pack: Package) => any): void;
	Add(name: 'ScriptError', handler: (file: string, line: number, error: any, stringtrace: any) => any): void;
}

declare class Vector3f {
	/**
	 * Creates an instance of Vector3f
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 * @param {number} z Z value
	 */
	public constructor(x?: number, y?: number, z?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * Z value
	 */
	z: number;
	/**
	 * length of the Vector3f
	 */
	readonly length: number;
	/**
	 * @param {Vector3f} vec
	 */
	mul(vec: Vector3f): Vector3f;
	/**
	 * @param {Vector3f} vec
	 */
	div(vec: Vector3f): Vector3f;
	/**
	 * @param {Vector3f} vec
	 */
	sub(vec: Vector3f): Vector3f;
	/**
	 * @param {Vector3f} vec
	 */
	add(vec: Vector3f): Vector3f;
}

declare class RGB {
	/**
	 * Creates an instance of RGB
	 * 
	 * @param {number} r red channel value (0-255)
	 * @param {number} g green channel value (0-255)
	 * @param {number} b blue channel value (0-255)
	 */
	public constructor(r?: number, g?: number, b?: number);
	/**
	 * red channel value (0-255)
	 */
	r: number;
	/**
	 * green channel value (0-255)
	 */
	g: number;
	/**
	 * blue channel value (0-255)
	 */
	b: number;
}

declare interface EventInstance {
	oneShot: boolean;
}

/**
 * Global JCMP class. Use jcmp in your script.
 */
declare interface JCMPNamespace {
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * all loaded packages
	 */
	readonly packages: Array<Package>;
	/**
	 * event system
	 */
	readonly events: EventSystem;
	/**
	 * the current network version of the server
	 */
	readonly networkVersion: number;
	readonly version: string;
	/**
	 * all players
	 */
	readonly players: any;
	readonly vehicles: any;
}

/**
 * A scripting package that is available or running already
 */
declare interface Package {
	/**
	 * the Package's name
	 */
	readonly name: string;
	/**
	 * the path to the package
	 */
	readonly dir: string;
	/**
	 * whether the configuration of the package is valid
	 */
	readonly valid: boolean;
	/**
	 * JSON-encoded string of the package.json
	 */
	readonly config: string;
	/**
	 * Starts the package
	 * 
	 * @example //Start all the packages
	 * function main(){
	 *   jcmp.packages.forEach(p => {
	 *     p.Start()
	 *   });
	 * }
	 * main();
	 */
	Start(): boolean;
	/**
	 * Stops the package
	 * 
	 * @example //Stop all the packages
	 * function main(){
	 *   jcmp.packages.forEach(p => {
	 *     p.Stop()
	 *   });
	 * }
	 * main();
	 */
	Stop(): void;
}

declare class Vector2 {
	/**
	 * Creates an instance of Vector2
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 */
	public constructor(x?: number, y?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * length of the Vector2
	 */
	readonly length: number;
}

declare class RGBA {
	/**
	 * Creates an instance of RGBA
	 * 
	 * @param {number} r red channel value (0-255)
	 * @param {number} g green channel value (0-255)
	 * @param {number} b blue channel value (0-255)
	 * @param {number} a alpha channel value (0-255)
	 */
	public constructor(r?: number, g?: number, b?: number, a?: number);
	/**
	 * red channel value (0-255)
	 */
	readonly r: number;
	/**
	 * green channel value (0-255)
	 */
	readonly g: number;
	/**
	 * blue channel value (0-255)
	 */
	readonly b: number;
	/**
	 * alpha channel value (0-255)
	 */
	readonly a: number;
}

declare class Vector4 {
	/**
	 * Creates an instance of Vector4
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 * @param {number} z Z value
	 * @param {number} w W value
	 */
	public constructor(x?: number, y?: number, z?: number, w?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * Z value
	 */
	z: number;
	/**
	 * W value
	 */
	w: number;
	/**
	 * length of the Vector4
	 */
	readonly length: number;
}

declare class Vector2f {
	/**
	 * Creates an instance of Vector2f
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 */
	public constructor(x?: number, y?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * length of the Vector2f
	 */
	readonly length: number;
	/**
	 * @param {Vector2f} vec
	 */
	mul(vec: Vector2f): Vector2f;
	/**
	 * @param {Vector2f} vec
	 */
	div(vec: Vector2f): Vector2f;
	/**
	 * @param {Vector2f} vec
	 */
	sub(vec: Vector2f): Vector2f;
	/**
	 * @param {Vector2f} vec
	 */
	add(vec: Vector2f): Vector2f;
}

declare class Vector3 {
	/**
	 * Creates an instance of Vector3
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 * @param {number} z Z value
	 */
	public constructor(x?: number, y?: number, z?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * Z value
	 */
	z: number;
	/**
	 * length of the Vector3
	 */
	readonly length: number;
}

declare class Matrix {
	/**
	 * Creates an instance of Matrix
	 */
	public constructor();
	/**
	 * the Matrix's position in the game world
	 */
	readonly position: Vector3f;
	Transpose(): Matrix;
	/**
	 * @param {Vector3f} scale
	 */
	Scale(scale: Vector3f): Matrix;
	/**
	 * @param {number} factor 
	 * @param {Vector3f} rotation
	 */
	Rotate(factor: number, rotation: Vector3f): Matrix;
	/**
	 * @param {Vector3f} translation
	 */
	Translate(translation: Vector3f): Matrix;
	/**
	 * @param {Vector3f} p1 
	 * @param {Vector3f} p2 
	 * @param {Vector3f} p3
	 */
	LookAt(p1: Vector3f, p2: Vector3f, p3: Vector3f): Matrix;
	/**
	 * @param {Matrix} p1
	 */
	mul(p1: Matrix): Matrix;
	/**
	 * @param {Matrix} p1
	 */
	div(p1: Matrix): Matrix;
	/**
	 * @param {Matrix} p1
	 */
	sub(p1: Matrix): Matrix;
	/**
	 * @param {Matrix} p1
	 */
	add(p1: Matrix): Matrix;
}

declare class Vector4f {
	/**
	 * Creates an instance of Vector4f
	 * 
	 * @param {number} x X value
	 * @param {number} y Y value
	 * @param {number} z Z value
	 * @param {number} w W value
	 */
	public constructor(x?: number, y?: number, z?: number, w?: number);
	/**
	 * X value
	 */
	x: number;
	/**
	 * Y value
	 */
	y: number;
	/**
	 * Z value
	 */
	z: number;
	/**
	 * W value
	 */
	w: number;
	/**
	 * length of the Vector4f
	 */
	readonly length: number;
	/**
	 * @param {Vector4f} vec
	 */
	mul(vec: Vector4f): Vector4f;
	/**
	 * @param {Vector4f} vec
	 */
	div(vec: Vector4f): Vector4f;
	/**
	 * @param {Vector4f} vec
	 */
	sub(vec: Vector4f): Vector4f;
	/**
	 * @param {Vector4f} vec
	 */
	add(vec: Vector4f): Vector4f;
}

/**
 * The global instance of the JCMPNamespace.
 */
declare const jcmp: JCMPNamespace;
