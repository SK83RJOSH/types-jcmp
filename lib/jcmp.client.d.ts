// Type definitions for JCMP
// Project: JCMP
// Definitions by: Joshua Wood

/**
 * The EventSystem is used to communicate between client packages and to the server.
 */
declare interface EventSystem {
	/**
	 * Adds an event that can be called from the server.
	 * 
	 * @param {string} name the event name
	 * @param {(...any) => any} handler the function to execute when the event is called
	 * 
	 * @example jcmp.events.AddRemoteCallable('MyEvent', () => {
	 *   print(the server called MyEvent!);
	 * })
	 */
	AddRemoteCallable(name: string, handler: (...any) => any): void;
	/**
	 * Calls an Event on the server scripts. Other than the normal Call function, this function does not return anything.
	 * 
	 * @param {string} name event name
	 * @param {any} ...args event arguments
	 * 
	 * @example // see the serverside documentation of EventSystem#AddRemoteCallable
	 * jcmp.events.CallRemote('MyEvent');
	 */
	CallRemote(name: string, ...args: any[]): void;
}

declare interface Renderer {
	readonly viewportSize: Vector2;
	readonly dtf: number;
	/**
	 * @param {boolean} p1
	 */
	EnableCulling(p1: boolean): void;
	/**
	 * @param {Matrix} p1
	 */
	SetTransform(p1: Matrix): void;
	/**
	 * @param {string} p1 
	 * @param {Vector3} p2 
	 * @param {Vector2} p3 
	 * @param {RGBA} p4 
	 * @param {number} p5 
	 * @param {string} p6
	 */
	DrawText(p1: string, p2: Vector3, p3: Vector2, p4: RGBA, p5: number, p6: string): void;
	/**
	 * @param {string} p1 
	 * @param {number} p2 
	 * @param {string} p3
	 */
	MeasureText(p1: string, p2: number, p3: string): Vector2;
	/**
	 * @param {any} p1 
	 * @param {Vector2} p2 
	 * @param {RGBA} p3
	 */
	DrawRect(p1: any, p2: Vector2, p3: RGBA): void;
	/**
	 * @param {any} p1 
	 * @param {any} p2 
	 * @param {RGBA} p3
	 */
	DrawLine(p1: any, p2: any, p3: RGBA): void;
	/**
	 * @param {Texture} p1 
	 * @param {Array<any>} p2
	 */
	DrawTexture(p1: Texture, p2: Array<any>): void;
}

declare class WebUIWindow {
	/**
	 * Creates an instance of WebUIWindow
	 * 
	 * @param {string} name 
	 * @param {string} location 
	 * @param {Vector2} size
	 */
	public constructor(name: string, location: string, size: Vector2);
	size: Vector2;
	location: string;
	hidden: boolean;
	/**
	 * the WebUIWindow's position in the game world
	 */
	position: Vector2;
	autoResize: boolean;
	captureMouseInput: boolean;
	readonly texture: Texture;
	autoRenderTexture: boolean;
	BringToFront(): void;
	/**
	 * @param {boolean} p1
	 */
	Reload(p1: boolean): void;
	/**
	 * Destroys the WebUIWindow
	 */
	Destroy(): void;
}

declare interface Texture {
	baseColor: RGBA;
	size: Vector2;
}

/**
 * Global JCMP class. Use jcmp in your script.
 */
declare interface JCMPNamespace {
	readonly ui: JCMPUINamespace;
	readonly viewportSize: Vector2;
	readonly world: World;
}

declare interface JCMPUINamespace {
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * @param {string} p1 
	 * @param {(...any) => any} p2
	 */
	AddEvent(p1: string, p2: (...any) => any): void;
	/**
	 * @param {string} p1 
	 * @param {Array<any>} p2
	 */
	CallEvent(p1: string, p2: Array<any>): void;
}

declare interface LocalPlayer {
	/**
	 * the LocalPlayer's position in the game world
	 */
	position: Vector3;
	/**
	 * the LocalPlayer's rotation in the game world
	 */
	rotation: Vector3;
	readonly camera: Camera;
	frozen: boolean;
	controlsEnabled: boolean;
	baseState: number;
	/**
	 * @param {number} p1 
	 * @param {boolean} p2
	 */
	SetAbilityEnabled(p1: number, p2: boolean): void;
	/**
	 * @param {number} p1
	 */
	IsAbilityEnabled(p1: number): boolean;
	/**
	 * @param {string} p1
	 */
	CallGameEvent(p1: string): void;
	/**
	 * @param {number} p1
	 */
	GetRenderPosition(p1: number): Vector3;
	/**
	 * @param {number} p1
	 */
	GetRenderTransform(p1: number): Matrix;
	/**
	 * @param {number} p1 
	 * @param {number} p2
	 */
	GetBoneTransform(p1: number, p2: number): Matrix;
}

declare interface NetworkPlayer {
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the NetworkPlayer's name
	 */
	readonly name: string;
	readonly health: number;
	readonly maxHealth: number;
	readonly localPlayer: boolean;
	/**
	 * the NetworkPlayer's position in the game world
	 */
	readonly position: Vector3;
	/**
	 * the NetworkPlayer's rotation in the game world
	 */
	readonly rotation: Vector3;
	/**
	 * @param {number} p1 
	 * @param {number} p2
	 */
	GetBoneTransform(p1: number, p2: number): Matrix;
	/**
	 * @param {number} p1
	 */
	GetRenderTransform(p1: number): Matrix;
}

/**
 * Class to manipulate the game world.
 */
declare interface World {
	/**
	 * weather id (TODO: link weather types)
	 */
	weather: number;
	weatherVisible: boolean;
	/**
	 * RGBA color of the moon
	 */
	moonColor: RGBA;
	/**
	 * 2D position of the sun
	 */
	sunPosition: Vector2;
	sunHDRScale: number;
	/**
	 * RGBA color of the sun
	 */
	sunColor: RGBA;
	/**
	 * Sets the local world time
	 * 
	 * @param {number} hour hour (0-24)
	 * @param {number} minute minute (0-60)
	 */
	SetTime(hour: number, minute: number): void;
	/**
	 * resets the suns position
	 */
	ResetSunPosition(): void;
}

declare interface Camera {
	/**
	 * the Camera's position in the game world
	 */
	position: Vector3;
	/**
	 * the Camera's rotation in the game world
	 */
	rotation: Vector3;
	fieldOfView: number;
	attachedToPlayer: boolean;
}

/**
 * Just don't use it for now.
 */
declare interface Settings {
	/**
	 * @param {string} p1 
	 * @param {any} p2
	 */
	Set(p1: string, p2: any): void;
	/**
	 * @param {string} p1
	 */
	Get(p1: string): any;
	/**
	 * @param {string} p1
	 */
	Exists(p1: string): boolean;
	/**
	 * @param {string} p1
	 */
	Delete(p1: string): boolean;
	/**
	 * Destroys the Settings
	 */
	Destroy(): void;
}

declare interface localPlayer {
	/**
	 * the localPlayer's position in the game world
	 */
	position: Vector3f;
	/**
	 * the localPlayer's rotation in the game world
	 */
	rotation: Vector3f;
	camera: any;
	frozen: any;
	controlsEnabled: any;
	baseState: any;
	/**
	 * Destroys the localPlayer
	 */
	Destroy(): void;
}

/**
 * Just don't use it for now.
 */
declare interface settings {
	/**
	 * Destroys the settings
	 */
	Destroy(): void;
}

