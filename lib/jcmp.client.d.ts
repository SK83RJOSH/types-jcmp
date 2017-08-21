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
	 * });
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
	/**
	 * Called when a Player'}} enters a {{linked_type 'Checkpoint
	 */
	Add(name: 'CheckpointEnter', handler: (checkpoint: Checkpoint) => any): void;
	/**
	 * Called when a Player'}} leaves a {{linked_type 'Checkpoint
	 */
	Add(name: 'CheckpointLeave', handler: (checkpoint: Checkpoint) => any): void;
	/**
	 * This event is called when a teleport has been requested.
	 */
	Add(name: 'GameTeleportInitiated', handler: () => any): void;
	/**
	 * This event is called when the map is fully loaded after teleporting.
	 */
	Add(name: 'GameTeleportCompleted', handler: () => any): void;
	/**
	 * This event is called when the game 2D rendering has started. This is the perfect place to render to the screen.
	 */
	Add(name: 'GameUpdateRender', handler: (scriptingRenderer: Renderer) => any): void;
	/**
	 * Called every frame (please ask Alex for more details please, we'll appreciate it a lot)
	 */
	Add(name: 'GameRender', handler: (scriptingRenderer: Renderer) => any): void;
	/**
	 * This event is called when the game 2D rendering has started. This is the perfect place to render to the screen.
	 */
	Add(name: 'Render', handler: (scriptingRenderer: Renderer) => any): void;
	/**
	 * Called when the client approved the requested websites (referenced in package.json)
	 */
	Add(name: 'WebsitesApproved', handler: (websites: Array<string>) => any): void;
}

declare interface Renderer {
	readonly viewportSize: Vector2f;
	readonly dtf: number;
	/**
	 * @param {boolean} enabled Enables or disables culling.
	 */
	EnableCulling(enabled: boolean): void;
	/**
	 * Sets the matrix that describes the coordinate system the renderer is drawing to.
	 * 
	 * @param {Matrix} matrix The new transformation 4x4 matrix
	 */
	SetTransform(matrix: Matrix): void;
	/**
	 * Draws a text to the screen or world.
	 * 
	 * @param {string} text The text you want to draw
	 * @param {Vector3f} position The position vector. Set the z-coordinate to 0.5 if you render to the screen.
	 * @param {Vector2f} maxSize Maximum size
	 * @param {RGBA} color Text color
	 * @param {number} fontSize Font size
	 * @param {string} fontName Font name (all Windows fonts are valid here)
	 */
	DrawText(text: string, position: Vector3f, maxSize: Vector2f, color: RGBA, fontSize: number, fontName: string): void;
	/**
	 * Returns the physical dimensions of a text.
	 * 
	 * @param {string} text Text
	 * @param {number} fontSize Font size
	 * @param {string} fontName Font name
	 */
	MeasureText(text: string, fontSize: number, fontName: string): Vector2f;
	/**
	 * Draws a rectangle (behaves similarly to DrawText).
	 * 
	 * @param {any} position Position
	 * @param {Vector2f} size Size
	 * @param {RGBA} color Text color
	 */
	DrawRect(position: any, size: Vector2f, color: RGBA): void;
	/**
	 * Draws a rectangle (behaves similarly to DrawText).
	 * 
	 * @param {any} start Start position
	 * @param {any} end End position
	 * @param {RGBA} color Text color
	 */
	DrawLine(start: any, end: any, color: RGBA): void;
	/**
	 * Draws a texture object.
	 * 
	 * @param {Texture} texture the Texture to draw
	 * @param {any} position Position
	 * @param {Vector2f} size Size
	 */
	DrawTexture(texture: Texture, position: any, size: Vector2f): void;
	/**
	 * @param {Vector3f} p1
	 */
	WorldToScreen(p1: Vector3f): Vector2f;
}

declare interface Checkpoint {
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * model hash of the Checkpoint (TODO: reference to all hashes)
	 */
	readonly modelHash: number;
	readonly type: number;
	/**
	 * the Checkpoint's position in the game world
	 */
	position: Vector3f;
	/**
	 * the Checkpoint's rotation in the game world
	 */
	rotation: Vector3f;
	radius: number;
	/**
	 * whether the Checkpoint is visible to all Players.
	 */
	visible: boolean;
	/**
	 * Destroys the Checkpoint
	 */
	Destroy(): void;
}

declare class WebUIWindow {
	/**
	 * Creates an instance of WebUIWindow
	 * 
	 * @param {string} name the internal name of the CEF UI window
	 * @param {string} location the location of the page which CEF should load
	 * @param {Vector2} size the size of the CEF UI window
	 */
	public constructor(name: string, location: string, size: Vector2);
	/**
	 * the size of the CEF UI window
	 */
	size: Vector2;
	/**
	 * the location of the page which CEF should load
	 */
	location: string;
	/**
	 * whether the UI should be hidden or not
	 */
	hidden: boolean;
	/**
	 * the WebUIWindow's position in the game world
	 */
	position: Vector2;
	/**
	 * whether the CEF UI should resize itself when the game resolution is changed or not
	 */
	autoResize: boolean;
	/**
	 * whether mouse input should be captured by the CEF UI or not
	 */
	captureMouseInput: boolean;
	/**
	 * the CEF UI texture
	 */
	readonly texture: Texture;
	/**
	 * whether the texture is automatically drawn by the renderer or not
	 */
	autoRenderTexture: boolean;
	/**
	 * Brings the CEF UI to the front
	 * 
	 * @example function createMyUI() {
	 *   var firstUI = new WebUIWindow("myFirstUI", "package://myclientpackage/index1.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
	 *   var secondUI = new WebUIWindow("mySecondUI", "package://myclientpackage/index2.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
	 * 
	 *   //Brings "myFirstUI" to the front so it is visible
	 *   //Without this, we would see the second created UI on top and not the first one
	 *   firstUI.BringToFront();
	 * }
	 * createMyUI();
	 */
	BringToFront(): void;
	/**
	 * Reload a certain CEF UI
	 * 
	 * @param {boolean} ignoreCache whether the cache should be ignored
	 * 
	 * @example function createMyUI() {
	 *   var myUI = new WebUIWindow("myUI", "package://myclientpackage/index1.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
	 * 
	 *   //Change the location property and force the UI to reload
	 *   myUI.location = "package://myclientpackage/index2.html";
	 *   myUI.Reload(true);
	 * }
	 * createMyUI();
	 */
	Reload(ignoreCache: boolean): void;
	/**
	 * Calls an Event on the UI that has been added using jcmp.AddEvent
	 * 
	 * @param {string} name event name
	 * @param {any} ...args event arguments
	 */
	CallEvent(name: string, ...args: any[]): undefined;
	/**
	 * Adds an Event Handler so the UI can call it using jcmp.CallLocalEvent
	 * 
	 * @param {string} name event name
	 * @param {(...any) => any} handler handler function
	 */
	AddEvent(name: string, handler: (...any) => any): undefined;
	/**
	 * Destroys the WebUIWindow
	 */
	Destroy(): void;
}

declare class Texture {
	/**
	 * Creates an instance of Texture
	 * 
	 * @param {string} file path to the texture file
	 */
	public constructor(file: string);
	baseColor: RGBA;
	size: Vector2f;
}

/**
 * Global JCMP class. Use jcmp in your script.
 */
declare interface JCMPNamespace {
	readonly approvedWebsites: Array<any>;
	readonly ui: JCMPUINamespace;
	readonly viewportSize: Vector2f;
	readonly localPlayer: LocalPlayer;
	readonly world: World;
	readonly settings: Settings;
	/**
	 * Prints a message to scripting.log.
	 * 
	 * @param {string} message Message to append to scripting.log
	 */
	print(message: string): void;
	/**
	 * Outputs message to a specified file.
	 * 
	 * @param {string} filename Name of the file you want to print to
	 * @param {string} message Message to append to file
	 */
	printLog(filename: string, message: string): void;
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
	ShowHud(): void;
	HideHud(): void;
	IsHudVisible(): boolean;
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
	readonly lookAt: Vector3f;
	/**
	 * the players camera object
	 */
	readonly camera: Camera;
	/**
	 * Whether the players character is frozen or not
	 */
	frozen: boolean;
	/**
	 * Whether the player can control his character or not
	 */
	controlsEnabled: boolean;
	baseState: number;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * world dimension of the LocalPlayer.
	 */
	readonly dimension: number;
	readonly playerStateBits1: number;
	readonly playerStateBits2: number;
	readonly wingsuit: Wingsuit;
	readonly healthEffects: HealthEffect;
	/**
	 * Enable the local player to use certain ingame abilities
	 * 
	 * Available abilities:
	 * | Name | Value |
	 * |:-----|:------|
	 * |GRAPPLING_HOOK|0xCB836D80|
	 * |PARACHUTE|0xCEEFA27A|
	 * |WINGSUIT|0xE060F641|
	 * 
	 * @param {number} ability the designated ability ID (see above)
	 * @param {boolean} enabled set to true to enable the ability, false to disable it
	 * 
	 * @example function disableAllAbilities(){
	 *   jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, false); //Disable grappling
	 *   jcmp.localPlayer.SetAbilityEnabled(0xCEEFA27A, false); //Disable parachute
	 *   jcmp.localPlayer.SetAbilityEnabled(0xE060F641, false); //Disable wingsuit
	 * }
	 * disableAllAbilities();
	 */
	SetAbilityEnabled(ability: number, enabled: boolean): void;
	/**
	 * Check if a certain ingame ability has been enabled for the local player or not
	 * 
	 * @param {number} ability 
	 * 
	 * @example function isWingsuitEnabled(){
	 *   if(jcmp.localPlayer.IsAbilityEnabled(0xE060F641) == true){
	 *     //The Wingsuit is enabled, execute code here
	 *   }
	 * }
	 * isWingsuitEnabled();
	 */
	IsAbilityEnabled(ability: number): boolean;
	/**
	 * returns the render position
	 * 
	 * @param {number} dtf delta timing
	 */
	GetRenderPosition(dtf: number): Vector3f;
	/**
	 * returns the render transform matrix
	 * 
	 * @param {number} dtf delta timing
	 */
	GetRenderTransform(dtf: number): Matrix;
	/**
	 * returns the bone transform matrix
	 * 
	 * Available bones:
	 * | Name | Value |
	 * |:-----|:------|  
	 * |REFERENCE|0x8EB2FD7C|
	 * |OFFSET|0x4AAA87DB|
	 * |HIPS|0x68C6A89F|
	 * |SPINE|0xE28C84B|
	 * |SPINE_2|0xE4DBE36F|
	 * |SPINE_3|0x6FE84908|
	 * |STERNUM|0x9DCAB8BF|
	 * |NECK|0xA1C96158|
	 * |HEAD|0xA877D9CC|
	 * |JAW|0x92F8D847|
	 * |MIDLOWERLIP|0xEA3E047C|
	 * |LEFTMOUTHCORNER|0xE9F7F4C9|
	 * |RIGHTMOUTHCORNER|0xF8C71902|
	 * |NOSE|0x4495EABA|
	 * |MIDUPPERLIP|0x87AE44CB|
	 * |UPPER_LIDS|0xC851BC59|
	 * |LOWER_LIDS|0x9ED86F9E|
	 * |LEFTEYEBROWMID|0xD3FBF46E|
	 * |RIGHTEYEBROWMID|0xE75361A8|
	 * |LEFT_EYE|0x96A32E27|
	 * |RIGHT_EYE|0x24FA932B|
	 * |LEFT_SHOULDER|0x8735207D|
	 * |LEFT_ARM|0x4DF0A2B1|
	 * |LEFTFOREARM|0xDEB7751B|
	 * |LEFT_HAND|0x57C83F95|
	 * |LEFTHANDATTACH|0x4190BFF7|
	 * |LEFTHANDTHUMB|0x3C7AC14F|
	 * |LEFTHANDTHUMB_2|0xEF65A0C0|
	 * |LEFTHANDTHUMB_3|0x2EF7C25D|
	 * |LEFTHANDINDEX|0xFC8B8AE8|
	 * |LEFTHANDINDEX_2|0xB275E0DC|
	 * |LEFTHANDINDEX_3|0xA02A2C09|
	 * |LEFTHANDMIDDLE|0x9B641407|
	 * |LEFTHANDMIDDLE_2|0xBB9B9265|
	 * |LEFTHANDMIDDLE_3|0x40553E55|
	 * |LEFTINHAND_RING|0xF64929C5|
	 * |LEFTHANDRING|0xDF6E85D2|
	 * |LEFTHANDRING_2|0xADD7F8D8|
	 * |LEFTHANDRING_3|0x37EDFBE6|
	 * |LEFTINHAND_PINKY|0x142B3DFF|
	 * |LEFTHANDPINKY|0xC104DEE3|
	 * |LEFTHANDPINKY_2|0x869AB17|
	 * |LEFTHANDPINKY_3|0xE3BBD91D|
	 * |LEFTHANDATTACH_2|0x7DC90FBE|
	 * |LEFTFOREARM_ROLL|0x9C12B794|
	 * |RIGHT_SHOULDER|0x302EEE80|
	 * |RIGHT_ARM|0x19D4B6CF|
	 * |RIGHTFOREARM|0xBD2F01EA|
	 * |RIGHT_HAND|0x69E77FA6|
	 * |RIGHTHANDATTACH|0x65C5D2EB|
	 * |RIGHTHANDTHUMB|0x8F745C4E|
	 * |RIGHTHANDTHUMB_2|0xFADC7D09|
	 * |RIGHTHANDTHUMB_3|0xACA0D4E6|
	 * |RIGHTHANDINDEX|0xB26EE68B|
	 * |RIGHTHANDINDEX_2|0xE64CD51C|
	 * |RIGHTHANDINDEX_3|0x3D143817|
	 * |RIGHTHANDMIDDLE|0x3EF00B1A|
	 * |RIGHTHANDMIDDLE_2|0x4DD19349|
	 * |RIGHTHANDMIDDLE_3|0x92662F93|
	 * |RIGHTINHAND_RING|0x422FF300|
	 * |RIGHTHANDRING|0xC4351CB|
	 * |RIGHTHANDRING_2|0x7165D1D3|
	 * |RIGHTHANDRING_3|0x2EE173DF|
	 * |RIGHTINHAND_PINKY|0x153AD952|
	 * |RIGHTHANDPINKY|0x477CE2E|
	 * |RIGHTHANDPINKY_2|0x197F6405|
	 * |RIGHTHANDPINKY_3|0x7A36193E|
	 * |RIGHTHANDATTACH_2|0x8A9856CD|
	 * |RIGHTFOREARM_ROLL|0xC9FC0323|
	 * |BACK_ATTACH|0x204A8793|
	 * |BACKATTACH2|0xB7D0AD64|
	 * |LEFTUPLEG|0x26392BC2|
	 * |LEFT_LEG|0x782BF8F9|
	 * |LEFT_FOOT|0x661134AC|
	 * |LEFTTOEBASE|0xB31EE9AA|
	 * |LEFTLEGROLL|0x84D5F65C|
	 * |LEFTHOLSTERATTACH|0x63ABE53F|
	 * |LEFTUPLEG_ROLL|0x7CA59BC0|
	 * |RIGHTUPLEG|0x8F232B15|
	 * |RIGHT_LEG|0xA89A815D|
	 * |RIGHT_FOOT|0xFF3E004B|
	 * |RIGHTTOEBASE|0xDD2D6F75|
	 * |RIGHTLEGROLL|0xCFA333AA|
	 * |RIGHTHOLSTERATTACH|0x7BD7F313|
	 * |RIGHTUPLEG_ROLL|0x272175A5|
	 * |LEFTHANDIK_TARGET|0xA73E08C1|
	 * |RIGHTHANDIK_TARGET|0xF7EEABA9|
	 * 
	 * @param {number} boneid a bone id from the list above
	 * @param {number} dtf delta timing
	 */
	GetBoneTransform(boneid: number, dtf: number): Matrix;
}

/**
 * Network Player
 */
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
	readonly playerStateBits1: number;
	readonly playerStateBits2: number;
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

declare interface TimeOfDay {
	readonly hour: number;
	readonly minute: number;
	readonly second: number;
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
	readonly time: TimeOfDay;
	/**
	 * Sets the local world time
	 * 
	 * @param {number} hour hour (0-24)
	 * @param {number} minute minute (0-60)
	 * @param {number} p3
	 */
	SetTime(hour: number, minute: number, p3: number): void;
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
	/**
	 * the cameras field of view
	 */
	fieldOfView: number;
	/**
	 * Whether the camera is attached to the local player or it can be set somewhere else
	 */
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

/**
 * Local Player Wingsuit
 */
declare interface Wingsuit {
	boostEnabled: boolean;
	/**
	 * Boost Cooldown, the game might reset the values if they are above 7, so the property might return a wrong value
	 */
	boostCooldown: number;
	/**
	 * Boost Duration, the game might reset the values if they are above 7, so the property might return a wrong value
	 */
	boostDuration: number;
	/**
	 * Boost Power, the game might reset the values if they are above 7, so the property might return a wrong value
	 */
	boostPower: number;
	/**
	 * Destroys the Wingsuit
	 */
	Destroy(): void;
}

declare interface HealthEffect {
	regenRate: number;
	regenCooldown: number;
	/**
	 * Destroys the HealthEffect
	 */
	Destroy(): void;
}

declare interface POI {
	[customProperty: string]: any;
	[customProperty: number]: any;
	type: number;
	progress: number;
	progressMax: number;
	/**
	 * the POI's position in the game world
	 */
	position: Vector3f;
	minDistance: number;
	maxDistance: number;
	text: string;
	/**
	 * whether the POI is visible to all Players.
	 */
	visible: boolean;
	flashing: boolean;
	clampedToScreen: boolean;
	/**
	 * Destroys the POI
	 */
	Destroy(): void;
}

declare interface NetworkVehicle {
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the NetworkVehicle's current health
	 */
	readonly health: number;
	/**
	 * the NetworkVehicle's max health
	 */
	readonly maxHealth: number;
	readonly aabb: Array<any>;
	/**
	 * the NetworkVehicle's position in the game world
	 */
	readonly position: Vector3f;
	/**
	 * the NetworkVehicle's rotation in the game world
	 */
	readonly rotation: Vector3f;
	readonly angularVelocity: Vector3f;
	readonly linearVelocity: Vector3f;
	readonly aimPosition: Vector3f;
	readonly engineRPM: number;
	readonly type: number;
	/**
	 * model hash of the NetworkVehicle (TODO: reference to all hashes)
	 */
	readonly modelHash: number;
	readonly gear: any;
	readonly nitroEnabled: boolean;
	readonly turboJumpEnabled: boolean;
	readonly speedKph: number;
	/**
	 * @param {number} p1
	 */
	GetRenderTransform(p1: number): Matrix;
}

