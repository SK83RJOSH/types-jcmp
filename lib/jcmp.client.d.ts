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
	Add(name: 'GameTeleportInitiated', handler: () => any): void;
	Add(name: 'GameTeleportCompleted', handler: () => any): void;
	Add(name: 'GameUpdateRender', handler: (scriptingRenderer: Renderer) => any): void;
	Add(name: 'GameRender', handler: (scriptingRenderer: Renderer) => any): void;
	Add(name: 'Render', handler: (scriptingRenderer: Renderer) => any): void;
	Add(name: 'WndProc', handler: (msg: number, wParam: number, lParam: number) => any): void;
	Add(name: 'WebsitesApproved', handler: (websites: Array<string>) => any): void;
	Add(name: 'CEFCommand', handler: (cmd: string, data: string) => any): void;
}

declare interface Renderer {
	readonly viewportSize: Vector2f;
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
	 * @param {Vector3f} p2 
	 * @param {Vector2f} p3 
	 * @param {RGBA} p4 
	 * @param {number} p5 
	 * @param {string} p6
	 */
	DrawText(p1: string, p2: Vector3f, p3: Vector2f, p4: RGBA, p5: number, p6: string): void;
	/**
	 * @param {string} p1 
	 * @param {number} p2 
	 * @param {string} p3
	 */
	MeasureText(p1: string, p2: number, p3: string): Vector2f;
	/**
	 * @param {any} p1 
	 * @param {Vector2f} p2 
	 * @param {RGBA} p3
	 */
	DrawRect(p1: any, p2: Vector2f, p3: RGBA): void;
	/**
	 * @param {any} p1 
	 * @param {any} p2 
	 * @param {RGBA} p3
	 */
	DrawLine(p1: any, p2: any, p3: RGBA): void;
	/**
	 * @param {Texture} p1 the Texture to draw
	 * @param {any} p2
	 */
	DrawTexture(p1: Texture, p2: any): void;
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
	size: Vector2f;
}

/**
 * Global JCMP class. Use jcmp in your script.
 */
declare interface JCMPNamespace {
	readonly ui: JCMPUINamespace;
	readonly viewportSize: Vector2f;
	readonly localPlayer: LocalPlayer;
	readonly world: World;
	readonly settings: Settings;
	/**
	 * @param {string} p1
	 */
	print(p1: string): void;
	/**
	 * @param {string} p1 
	 * @param {string} p2
	 */
	printLog(p1: string, p2: string): void;
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
	position: Vector3f;
	/**
	 * the LocalPlayer's rotation in the game world
	 */
	rotation: Vector3f;
	readonly camera: Camera;
	frozen: boolean;
	controlsEnabled: boolean;
	baseState: number;
	/**
	 * @param {number} ability 
	 * @param {boolean} enabled
	 */
	SetAbilityEnabled(ability: number, enabled: boolean): void;
	/**
	 * @param {number} ability
	 */
	IsAbilityEnabled(ability: number): boolean;
	/**
	 * @param {string} event
	 */
	CallGameEvent(event: string): void;
	/**
	 * @param {number} p1
	 */
	GetRenderPosition(p1: number): Vector3f;
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
	/**
	 * the NetworkPlayer's current health
	 */
	readonly health: number;
	/**
	 * the NetworkPlayer's max health
	 */
	readonly maxHealth: number;
	readonly localPlayer: boolean;
	/**
	 * the NetworkPlayer's position in the game world
	 */
	readonly position: Vector3f;
	/**
	 * the NetworkPlayer's rotation in the game world
	 */
	readonly rotation: Vector3f;
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
	sunPosition: Vector2f;
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
	position: Vector3f;
	/**
	 * the Camera's rotation in the game world
	 */
	rotation: Vector3f;
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

