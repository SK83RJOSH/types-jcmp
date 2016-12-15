// Type definitions for JCMP Server
// Project: JCMP
// Definitions by: Joshua Wood <me@sk83rjo.sh>

/**
 * Non-API class used only by TypeScript bindings. DO NOT USE.
 */
declare class Streamable {
	protected constructor();
	/**
	 * Network ID of this entity.
	 * NOTE: It is not unique across different entities and will be re-assigned once this entity is destroyed.
	 */
	readonly networkId: number;
	/** Position in the game world. */
	position: Vector3f;
	/** Rotation in the game world. */
	rotation: Vector3f;
	/** Current dimension. */
	dimension: number;
}

/**
 * Non-API class used only by TypeScript bindings. DO NOT USE.
 */
declare class AdvancedStreamable extends Streamable {
	protected constructor();
	/**
	 * Network ID of this entity.
	 * NOTE: It is not unique across different entities and will be re-assigned once this entity is destroyed.
	 */
	readonly networkId: number;
	/** Position in the game world. */
	position: Vector3f;
	/** Rotation in the game world. */
	rotation: Vector3f;
	/** Current dimension. */
	dimension: number;
	/** Whether or not the object is visible to all players. */
	visible: boolean;
	/**
	 * Sets the visibility of the object for a certain Player.
	 *
	 * @param player Target player.
	 * @param visible Whether or not the checkpoint should be visible to the target Player.
	 */
	SetVisibleForPlayer(player: Player, visible: boolean);
	/**
	 * Gets the visibility of the object for a certain Player.
	 *
	 * @param player Target player.
	 * @return Whether or not the object is visible to the target Player.
	 */
	IsVisibleForPlayer(player: Player): boolean;
	/** Destroy the object. */
	Destroy();
}

/**
 * Represents an argument(flag) that has been passed to the server through the commandline (-name=value).
 */
declare class Argument {
	/**
	 * @param key Argument name.
	 * @param key Argument value.
	 */
	constructor(key?: string, value?: string);
	/** Argument name. */
	key: string;
	/** Argument value. */
	value: string;
}

/**
 * Represents a checkpoint in the game world.
 */
declare class Checkpoint extends AdvancedStreamable {
	/** Not documented. */
	constructor();
	/** Model hash of the Checkpoint. */
	modelHash: number;
	/** Radius of the Checkpoint. */
	radius: number;
}

/**
 * The EventSystem is used to communicate between server packages and to clients.
 */
declare interface EventSystem {
	/**
	 * Add an event that can be called from client scripts.
	 * NOTE: First argument in the handler is always Player who triggered the event.
	 *
	 * @param name Name of the event.
	 * @param handler Function to execute when event is fired.
	 */
	AddRemote(name: string, handler: (player: Player, ...args: any[]) => any);
	/**
	 * Calls an Event on the clientside to one or all Players.
	 *
	 * @param name Name of the event to fire.
	 * @param name Target to call the event on. Use null to broadcast to all clients.
	 * @param args Arguments to pass to event.
	 */
	CallRemote(name: string, target?: Player, ...args: any[]);
}

/**
 * Represents the JCMPNamespace.
 */
declare interface JCMPNamspace {
	/** Server instance. */
	readonly server: Server;
	/** All connected Players. */
	readonly players: Array<Player>;
	/** All spawned Vehicles. */
	readonly vehicles: Array<Vehicle>;
	/** All spawned GameObjects. */
	readonly objects: Array<GameObject>;
	/** All spawned POI. */
	readonly poi: Array<POI>;
	/** All spawned Checkpoints. */
	readonly checkpoints: Array<Checkpoint>;
}

/**
 * Represents a GameObject in the game world.
 */
declare class GameObject extends Streamable {
	/**
	 * Create a GameObject.
	 *
	 * @param model The model name (not hash) of the object.
	 * @param position The desired position of the object.
	 * @param rotation The desired rotation of the object.
	 */
	constructor(model: string, position: Vector3f, rotation: Vector3f);
	/** Model name (not hash) of the object. */
	readonly model: string;
	/**
	 * Apply a force to the object.
	 *
	 * @param direction Normalized direction of the force.
	 * @param magnitude Magnitude of the force.
	 */
	applyForce(direction: Vector3f, magnitude: number);
}

/**
 * A point of interest in the game world.
 */
declare class POI extends AdvancedStreamable {
	/** Currently undocumented. */
	constructor(type?: number, position?: Vector3f, text?: string);
	/** POI type. */
	type: number;
	/** Current value of the progress bar (from 0.0 to 1.0). */
	progress: number;
	/** Maximum progress bar value. */
	progressMax: number;
	/** Minimum distance to display the POI on the HUD. */
	minDistance: number;
	/** Maximum distance to display the POI on the HUD. */
	maxDistance: number;
	/** Text to display with the POI. */
	text: string;
	/** Whether or not hte POI should flash on the HUD. */
	flashing: boolean;
	/** Whether or not the POI should be clamped to the HUD. (When out of view, the POI will stick to the edge of the screen.) */
	clampedToScreen: boolean;
}

/**
 * Represents a player.
 */
declare class Player extends Streamable {
	private constructor();
	/** Player's RemoteClient */
	readonly client: RemoteClient;
	/** Player's name. */
	readonly name: string;
	/** Player's health. */
	health: number;
	/** Whether or not the Player is invulnerable to damage. */
	invulnerable: boolean;
	/** Player's respawn position when calling Player#Respawn. */
	respawnPosition: Vector3f;
	/** Player's aim position. */
	aimPosition: Vector3f;
	/** Player's inventory. Will be null if no weapons are carried */
	readonly weapons: Array<PlayerWeapon>;
	/** Player's selected(equipped) weapon. */
	readonly selectedWeapon: PlayerWeapon;
	/** Player's model. */
	model: string;
	/** Player's current Vehicle. Will be null if not in a Vehicle. */
	vehicle: Vehicle;
	/** Player's PlayerWorld. */
	world: PlayerWorld;
	/**
	 * Immediately kicks the Player from the Server.
	 *
	 * @params reason Reason for kicking the player. Currently unused.
	 */
	Kick(reason: string);
	/** Respawns the player at the defined respawn position (Player.respawnPosition). */
	Respawn();
	/**
	 * Gives the player a weapon.
	 *
	 * @param weaponHash Weapon hash.
	 * @param ammo Desired ammunition. If the player already has the weapon, it will increase the carried ammunition by this ammount.
	 * @param equipNow Whether or not the weapon should be equipped automatically.
	 */
	GiveWeapon(weaponHash: number, ammo: number, equipNow: boolean);
	/** Destroy the Player. */
	Destroy();
}

/**
 * Represents a Weapon in a Player's inventory.
 */
declare class PlayerWeapon {
	private constructor();
	/** Model hash of the PlayerWeapon.  */
	modelHash: number;
	/** The weapon slot in the Player's inventory. */
	slotIndex: number;
	/** The ammunition left in the magazine. */
	magazineAmmo: number;
	/** The ammunition left as reserve in the Player's inventory. */
	reserveAmmo: number;
}

/**
 * Represents a Player's game world.
 */
declare class PlayerWorld {
	private constructor();
	/** Current weather. */
	weather: number;
	/** Current timescale (0.1 - 10) */
	timeScale: number;
	/**
	 * Sets the local time.
	 *
	 * @param hour Hour, (0-24)
	 * @param minute Minute. (0-60)
	 * @param second Second. (0-60)
	 */
	SetTime(hour: number, minute: number, second: number);
}

/**
 * Represents a Client connected to the Server.
 */
declare class RemoteClient {
	private constructor();
	/** Client's name. */
	readonly name: string;
	/** Client's IP address. */
	readonly ipAddress: string;
	/** Client's network ID. */
	readonly networkId: number;
	/** Client's ping. */
	readonly ping: number;
	/** Client's Steam64ID. */
	readonly steamId: string;
	/** Whether or not the client is authenticated via Steam. */
	readonly steamAuthenticated: boolean;
	/**
	 * Immediately kick the Client from the Server.
	 *
	 * @param reason Reason for kicking the Client. Currently unused.
	 */
	Kick(reason: string);
	/**
	 * Check whether or no the client owns the specificed DLC.
	 * https://gitlab.nanos.io/jc3mp-docs/scripting-api-docs/blob/master/server/classes/RemoteClient.md#available-dlcs
	 *
	 * @param dlc Target DLC.
	 * @returns Whether or not the client owns the specified DLC.
	 */
	DoesOwnDLC(dlc: number): boolean;
}

/**
 * Information about the Server.
 */
declare class Server {
	private constructor();
	/** Launch arguments. */
	readonly args: Array<Argument>;
	/** JSON encoded config. */
	readonly config: string;
	/** Current FPS. */
	readonly currentTickRate: number;
	/** Total uptime. */
	readonly upTime: string;
	/** Connected clients. */
	readonly clients: Array<RemoteClient>;
	/**
	 * Stops the server.
	 * This is currently marked as UNSTABLE and is not guaranteed to work.
	 */
	Stop();
	/**
	 * Restarts the server.
	 * This is currently marked as UNSTABLE and is not guaranteed to work.
	 */
	Restart();
	/**
	 * Adds a handler for console input.
	 *
	 * @param handler Input handler.
	 * @returns Whether or not to suppress the input.
	 */
	AddInputHandler(handler: (text: string) => boolean);
}

/**
 * Represents a vehicle.
 */
declare class Vehicle extends Streamable {
	/**
	 * Create a Vehicle.
	 *
	 * @param modelHash The model hash (not name) of the vehicle.
	 * @param position The desired position of the vehicle.
	 * @param rotation The desired rotation of the vehicle.
	 */
	constructor(modelHash: number, position: Vector3f, rotation: Vector3f);
	/** The player driving the vehicle. Null if there's no driver. */
	driver: Player;
	/** Vehicle's model hash. */
	modelHash: number;
	/** Vehicle's health. */
	health: number;
	/** Whether or not the vehicle has been destroyed. */
	readonly destroyed: boolean;
	/** Vehicle turrets aiming position. */
	aimPosition: Vector3f;
	/** Vehicle's linear velocity. */
	linearVelocity: Vector3f;
	/** Vehicle's angular velocity. */
	angularVelocity: Vector3f;
	/** Vehicle's primary color ID. */
	primaryColor: number;
	/** Whether or not nitrous is enabled. */
	nitroEnabled: boolean;
	/** Whether or not turbo jumps are enabled. */
	turboJumpsEnabled: boolean;
	/**
	 * Set the occupant of the given vehicle.
	 *
	 * @param seat The target vehicle seat.
	 * @param player The target player.
	 */
	SetOccupant(seat: number, player: Player);
	/**
	 * Set the occupant of the given vehicle.
	 *
	 * @param seat The target vehicle seat.
	 */
	GetOccupant(seat: number): Player;
	/** Repairs the vehicle. */
	Repair();
	/**
	 * Respawns the vehicle at it's original position.
	 * This is currently marked as UNSTABLE and is not guaranteed to work.
	 */
	Repair();
	/** Destroys the vehicle. */
	Destroy();
}
