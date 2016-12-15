// Type definitions for JCMP Client
// Project: JCMP
// Definitions by: Joshua Wood <me@sk83rjo.sh>

/**
 * Print debug message to the scripting log.
 */
declare function print(...args: any[]);

/**
 * Print debug message to a userdefined log.
 */
declare function printLog(filename: string, ...args: any[]);

/**
 * Represents a Camera.
 */
declare class Camera {
	private constructor();
	/** The Camera's position in the game world. */
	position: Vector3f;
	/** The Camera's rotation in the game world. */
	rotation: Vector3f;
	/** The Camera's field of view. */
	fieldOfView: number;
	/** Whether or not the Camera is attached to the LocalPlayer. */
	attachedToPlayer: boolean;
}

/**
 * The EventSystem is used to communicate between server packages and to clients.
 */
declare interface EventSystem {
	/**
	 * Add an event that can be called from the server.
	 *
	 * @param name Name of the event.
	 * @param handler Function to execute when event is fired.
	 */
	AddRemoteCallable(name: string, handler: (...args: any[]) => any);
	/**
	 * Calls an Event on the server.
	 *
	 * @param name Name of the event to fire.
	 * @param args Arguments to pass to event.
	 */
	CallRemote(name: string, ...args: any[]);
}

/**
 * Represents the JCMPUINamespace.
 */
declare interface JCMPUINamespace {
	/**
	 * Add an event handler.
	 *
	 * @param name Name of the event.
	 * @param handler Function to execute when event is fired.
	 */
	AddEventHandler(name: string, handler: (...args: any[]) => any);
	/**
	 * Broadcast an event.
	 * NOTE: This function returns an array with all return values from all event handlers triggered.
	 *
	 * @param name Name of the event to fire.
	 * @param args Arguments to pass to event.
	 */
	BroadcastEvent(name: string, ...args: any[]): Array<any>;
}

/**
 * Represents the JCMPNamespace.
 */
declare interface JCMPNamspace {
	/** Global instance of the JCMPUINamespace. */
	readonly ui: JCMPUINamespace;
	/** Global instance of the World. */
	readonly world: World;
}

/**
 * Represents the LocalPlayer.
 */
declare interface LocalPlayer {
	/** LocalPlayer's Camera. */
	camera: Camera;
	/** Whether or not the LocalPlayer is frozen. */
	frozen: boolean;
	/** Whether or not the LocalPlayer's controls are enabled. */
	controlsEnabled: boolean;
}

/**
 * Global instance of the EventSystem.
 */
declare const localPlayer: LocalPlayer;

/**
 * Represents a Matrix.
 */
declare class Matrix {
	public constructor();
	readonly length: number;
	readonly position: Vector3f;
	/**
	 * Rotates the Matrix.
	 */
	Transpose(): Matrix;
	/**
	 * Rotates the Matrix.
	 *
	 * @param factor Amount to rotate the Matrix by.
	 * @param vector Normalized vector to rotate the Matrix by.
	 */
	Rotate(factor: number, vector: Vector3f): Matrix;
	/**
	 * Scales the Matrix.
	 *
	 * @param vector Amount to translate the Matrix by.
	 */
	Translate(vector: Vector3f): Matrix;
	/**
	 * Rotates the Matrix.
	 *
	 * @param position Position of the Matrix.
	 * @param target Position to look at.
	 * @param up Normalized up direction.
	 */
	LookAt(position: Vector3f, target: Vector3f, up: Vector3f): Matrix;
	/**
	 * Multiply the Matrix.
	 *
	 * @param matrix Matrix to multiply the Matrix by.
	 */
	mul(matrix: Matrix): Matrix;
	/**
	 * Divide the Matrix.
	 *
	 * @param matrix Matrix to divide the Matrix by.
	 */
	div(matrix: Matrix): Matrix;
	/**
	 * Subtract from the Matrix.
	 *
	 * @param matrix Matrix to subtract from the Matrix.
	 */
	sub(matrix: Matrix): Matrix;
	/**
	 * Add to the Matrix.
	 *
	 * @param matrix Matrix to add to the Matrix.
	 */
	add(matrix: Matrix): Matrix;
	/**
	 * Destroys the Matrix.
	 */
	Destroy();
}

/**
 * Represents a NetworkPlayer.
 */
declare class NetworkPlayer {
	private constructor();
	/**
	 * Network ID of this entity.
	 * NOTE: It is not unique across diferent entities and will be re-assigned once this entity is destroyed.
	 */
	readonly networkId: number;
	/** Player's name. */
	readonly name: string;
	/** Player's health. */
	readonly health: number;
	/** Player's max health. */
	readonly maxHealth: number;
	/** Whether or not the the Player is the Local Player. */
	readonly localPlayer: boolean;
	GetBoneTransform(bone: number, p2: number): Matrix;
	GetRenderTransform(bone: number, p2: number): Matrix;
}

/**
 * Represents a Renderer.
 */
declare class Renderer {
	private constructor();
	/** Renderer's viewport size. */
	readonly viewportSize: Vector2f;
	readonly dtf: number;
	/**
	 * Enable culling.
	 *
	 * @param enabled Whether or not to enable culling.
	 */
	EnableCulling(enabed: boolean);
	/**
	 * Set the Renderer's transform.
	 *
	 * @param transform The new transform.
	 */
	SetTransform(transform: Matrix);
	DrawText(text: string, position: Vector2f, scale: Vector2f, color: RGBA, fontsize: number, fontname: string);
	MeasureText(text: string, fontsize: number, fontname: string);
	DrawRect(position: Vector2f, size: Vector2f, color: RGBA);
	DrawRect(position: Vector3f, size: Vector2f, color: RGBA);
	DrawLine(start: Vector2f, end: Vector2f, color: RGBA);
	DrawTexture(texture: Texture, position: Vector3f, scale?: Vector2f);
}

/**
 * Represents a Texture.
 */
declare class Texture {
	private constructor();
	baseColor: RGBA;
	size: Vector2f;
}

/**
 * Represents a WebUIWindow.
 */
declare class WebUIWindow {
	public constructor(id: string, url: string, size: Vector2);
	size: Vector2f;
	localtion: string;
	hidden: boolean;
	position: Vector2f;
	autoResize: boolean;
	captureMouseInput: boolean;
	readonly texture: Texture;
	autoRenderTexture: boolean;
	BringToFront();
	Reload(p1: boolean);
	Destroy();
}

/**
 * Represents the game world.
 */
declare class World {
	private constructor();
	weather: number;
	weatherVisible: boolean;
	moonColor: RGBA;
	sunPosition: Vector2f;
	sunHDRScale: number;
	sunColor: RGBA;
	SetTime(hour: number, minute: number);
	ResetSunPosition();
}

/**
 * Global viewport size.
 */
declare const viewportSize: Vector2f;
