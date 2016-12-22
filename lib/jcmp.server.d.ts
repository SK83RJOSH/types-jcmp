// Type definitions for JCMP
// Project: JCMP
// Definitions by: Joshua Wood

/**
 * Global JCMP class. Use jcmp in your script.
 */
declare interface JCMPNamespace {
	/**
	 * the server instance
	 */
	readonly server: Server;
	/**
	 * all connected players
	 */
	readonly players: any;
	/**
	 * all spawned vehicles
	 */
	readonly vehicles: any;
	/**
	 * all spawned objects
	 */
	readonly objects: any;
	/**
	 * all spawned poi (point of interests)
	 */
	readonly poi: any;
	/**
	 * all spawned checkpoints
	 */
	readonly checkpoints: any;
}

/**
 * The EventSystem is used to communicate between server packages and to clients.
 */
declare interface EventSystem {
	/**
	 * Adds an event that can be called from client scripts.
	 * 
	 * The first argument in the handler is the Player from where the event is being called.
	 * 
	 * @param {string} name the event name
	 * @param {(...any) => any} handler the function to execute when the event is called
	 * 
	 * @example jcmp.events.AddRemoteCallable('MyEvent', player => {
	 *   console.log(${player.name} called MyEvent!);
	 * })
	 */
	AddRemoteCallable(name: string, handler: (...any) => any): void;
	/**
	 * Calls an Event on the client side to one or all Players. Other than the normal Call function, this function does not return anything.
	 * 
	 * @param {string} name event name
	 * @param {Player} target target to call the event on. If using null, the event will be broadcasted to all clients.
	 * @param {any} ...args event arguments
	 * 
	 * @example // see the clientside documentation of EventSystem#AddRemoteCallable
	 * jcmp.events.Add('PlayerReady', player => {
	 *   jcmp.events.CallRemote('MyEvent', player);
	 * });
	 */
	CallRemote(name: string, target: Player, ...args: any[]): void;
	/**
	 * Called when a Player enters a Checkpoint
	 */
	Add(name: 'CheckpointEnter', handler: (checkpoint: Checkpoint, player: Player) => any): void;
	/**
	 * Called when a Player leaves a Checkpoint
	 */
	Add(name: 'CheckpointLeave', handler: (checkpoint: Checkpoint, player: Player) => any): void;
	Add(name: 'PlayerReady', handler: (player: Player) => any): void;
	Add(name: 'PlayerDeath', handler: (player: Player, killer: any, reason: Number) => any): void;
	Add(name: 'PlayerRespawn', handler: (player: Player) => any): void;
	/**
	 * called when a Player enters a Vehicle.
	 */
	Add(name: 'PlayerVehicleEntered', handler: (player: Player, vehicle: Vehicle, seatIndex: any) => any): void;
	Add(name: 'PlayerVehicleSeatChange', handler: (this: Player, vehicle: Vehicle, seatIndex: any, seatIndex2: any) => any): void;
	Add(name: 'PlayerVehicleExited', handler: (this: Player, vehicle: Vehicle, seatIndex: any) => any): void;
	Add(name: 'VehicleCreated', handler: (this: Vehicle) => any): void;
	Add(name: 'PlayerHijackVehicle', handler: (occupant: any, this1: Vehicle, currentPlayer: Player) => any): void;
	Add(name: 'VehicleDestroyed', handler: (vehicle: Vehicle) => any): void;
	Add(name: 'PlayerCreated', handler: (player: Player) => any): void;
	Add(name: 'PlayerDestroyed', handler: (player: Player) => any): void;
	/**
	 * Called when a RemoteClient tries to connect to the Server
	 */
	Add(name: 'ClientConnectRequest', handler: (playerName: string, ipAddress: string) => any): void;
	/**
	 * Called when a RemoteClient connected to the Server
	 */
	Add(name: 'ClientConnected', handler: (client: RemoteClient) => any): void;
	/**
	 * Called when a RemoteClient disconnected from the Server
	 */
	Add(name: 'ClientDisconnected', handler: (client: RemoteClient, reason: Number) => any): void;
	/**
	 * Called when a new Package has been added to the Server. Detected packages will not be started automatically
	 */
	Add(name: 'PackageDetected', handler: (pack: Package) => any): void;
}

declare class Checkpoint {
	/**
	 * Creates an instance of Checkpoint
	 * 
	 * @param {number} type the type of the checkpoint
	 * @param {number} modelHash the modelHash the checkpoint should use
	 * @param {Vector3f} position the position, where the checkpoint is created at
	 * @param {Vector3f} rotation the rotation of the checkpoint
	 */
	public constructor(type: number, modelHash: number, position: Vector3f, rotation?: Vector3f);
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * model hash of the Checkpoint (TODO: reference to all hashes)
	 */
	modelHash: number;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the Checkpoint's position in the game world
	 */
	position: Vector3;
	/**
	 * the Checkpoint's rotation in the game world
	 */
	rotation: Vector3;
	/**
	 * radius of the Checkpoint
	 */
	radius: number;
	/**
	 * whether the Checkpoint is visible to all Players.
	 */
	visible: boolean;
	/**
	 * world dimension of the Checkpoint.
	 */
	dimension: number;
	/**
	 * Sets the visibility of the Checkpoint for a certain Player
	 * 
	 * @param {Player} player target Player
	 * @param {boolean} visible whether the Checkpoint should be visible (true = visible, false = not visible)
	 */
	SetVisibleForPlayer(player: Player, visible: boolean): void;
	/**
	 * Returns whether the Checkpoint is visible for a certain Player
	 * true = visible
	 * false = not visible
	 * 
	 * @param {Player} player target Player
	 */
	IsVisibleForPlayer(player: Player): boolean;
	/**
	 * Destroys the Checkpoint
	 */
	Destroy(): void;
}

/**
 * Represents an argument(flag) that has been passed to the server (-name=value)
 */
declare class Argument {
	/**
	 * Creates an instance of Argument
	 * 
	 * @param {string} key Argument key
	 * @param {string} value Argument value
	 */
	public constructor(key?: string, value?: string);
	/**
	 * Argument name
	 */
	key: string;
	/**
	 * Argument value
	 */
	value: string;
}

/**
 * Information about the Server
 */
declare interface Server {
	/**
	 * Server Arguments (flags)
	 */
	readonly args: any;
	/**
	 * JSON-encoded string of the config.json
	 */
	readonly config: string;
	/**
	 * server fps
	 */
	readonly currentTickRate: number;
	/**
	 * connected clients
	 */
	readonly clients: any;
	/**
	 * Stops the Server
	 * 
	 * @example jcmp.server.Stop();
	 */
	Stop(): void;
	/**
	 * Restarts the Server
	 * 
	 * @example jcmp.server.Restart();
	 */
	Restart(): void;
	/**
	 * Adds a handler for the server input (console input)
	 * 
	 * @param {(...any) => any} handler input handler
	 * 
	 * @example jcmp.server.AddInputHandler(text => {
	 *   console.log(input: ${text});
	 * });
	 */
	AddInputHandler(handler: (...any) => any): void;
	/**
	 * @param {string} p1
	 */
	UpdateClientPackage(p1: string): void;
}

/**
 * Game Objects (Props)
 */
declare class GameObject {
	/**
	 * Creates an instance of GameObject
	 * 
	 * @param {string} model the model name (not hash!) of the object
	 * @param {Vector3f} position the desired position of the GameObject
	 * @param {Vector3f} rotation the desired rotation of the GameObject
	 */
	public constructor(model: string, position: Vector3f, rotation?: Vector3f);
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * the model name (not hash!) of the object
	 */
	readonly model: string;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the GameObject's position in the game world
	 */
	position: Vector3;
	/**
	 * the GameObject's rotation in the game world
	 */
	rotation: Vector3;
	/**
	 * world dimension of the GameObject.
	 */
	dimension: number;
	/**
	 * Applies a 3d-force to the GameObject
	 * 
	 * @param {Vector3} direction force direction
	 * @param {number} deltaTime delta time
	 * 
	 * @example var object = new GameObject('glowstick_yellow');
	 * object.ApplyForce(new Vector3f(100, 0, 0), 1);
	 */
	ApplyForce(direction: Vector3, deltaTime: number): void;
	/**
	 * Destroys the GameObject
	 */
	Destroy(): void;
}

/**
 * represents a Client connected to the server.
 */
declare interface RemoteClient {
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * the RemoteClient's name
	 */
	readonly name: string;
	/**
	 * the ip address of the client
	 */
	readonly ipAddress: string;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the client's ping
	 */
	readonly ping: number;
	/**
	 * the Steam64ID of the client
	 */
	readonly steamId: string;
	/**
	 * whether the client is authenticated via Steam
	 */
	readonly steamAuthenticated: boolean;
	/**
	 * Immediately kicks the Client from the Server.
	 * 
	 * @param {string} reason reason for kicking the Client. currently unused (cannot be seen by the user)
	 * 
	 * @example jcmp.events.Add('ClientConnected', client => {
	 *   client.Kick('meow!');
	 * });
	 */
	Kick(reason: string): void;
	/**
	 * Checks whether the client owns the DLC
	 * 
	 * Available DLCs:
	 * | Name | Value |
	 * |:-----|------:|
	 * |SKY_FORTRESS|400551|
	 * |MECHLANDASSAULT|400490|
	 * |BAVARIUMSEAHEIST|442051|
	 * |AIRLANDSEA|401850|
	 * |FIRESTARTER_SKINS|348880|
	 * |CAPSTONEBLOODHOUNDRPG|388294|
	 * |KOUSAVA_RIFLE|442050|
	 * |FINALARGUMENTSNIPER|488293|
	 * |COMBAT_BUGGY|388290|
	 * |MINIGUNRACINGBOAT|388291|
	 * |ROCKETLAUNCHERSPORTS_CAR|388292|
	 * |REAPERMISSILEMECH|442052|
	 * 
	 * @param {number} dlc DLC number
	 * 
	 * @example jcmp.events.Add('ClientConnected', client => {
	 *   if (!client.DoesOwnDLC(400551)) {
	 *     console.log(${client.name} does not own Sky Fortress.);
	 *   }
	 * });
	 */
	DoesOwnDLC(dlc: number): boolean;
}

declare interface Player {
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * the associated RemoteClient of the player
	 */
	readonly client: RemoteClient;
	/**
	 * the Player's name
	 */
	readonly name: string;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the players current health
	 */
	health: number;
	/**
	 * whether the player is invulnerable to damage
	 */
	invulnerable: boolean;
	/**
	 * the Player's position in the game world
	 */
	position: Vector3;
	/**
	 * the position where the player respawns upon calling Player#Respawn
	 */
	respawnPosition: Vector3f;
	/**
	 * the Player's rotation in the game world
	 */
	rotation: Vector3;
	/**
	 * the position the player aims at
	 */
	aimPosition: Vector3f;
	/**
	 * weapons in the inventory
	 */
	readonly weapons: any;
	/**
	 * the currently selected(equipped) weapon
	 */
	readonly selectedWeapon: PlayerWeapon;
	/**
	 * model name of the player
	 */
	model: number;
	/**
	 * world dimension of the Player.
	 */
	dimension: number;
	/**
	 * the players current vehicle
	 */
	readonly vehicle: Vehicle;
	/**
	 * Immediately kicks the Player from the Server.
	 * 
	 * @param {string} reason reason for kicking the Player. currently unused (cannot be seen by the Player)
	 * 
	 * @example jcmp.events.Add('PlayerReady', player => {
	 *   player.Kick('meow!');
	 * });
	 */
	Kick(reason: string): void;
	/**
	 * Respawns the Player. The position is stored in Player.respawnPosition
	 * 
	 * @example jcmp.events.Add('PlayerDeath', player => {
	 *   player.respawnPosition = player.position
	 *   player.Respawn();
	 * });
	 */
	Respawn(): void;
	/**
	 * Gives the Player a weapon.
	 * 
	 * @param {number} weaponHash the weapon's hash
	 * @param {number} ammo desired ammunition. If the Player already has the weapon, it will increase the ammo by this number.
	 * @param {boolean} equipNow whether the weapon should be equipped automatically.
	 * 
	 * @example jcmp.events.Add('PlayerReady', player => {
	 *   player.GiveWeapon(2307691279, 100, true);
	 * });
	 */
	GiveWeapon(weaponHash: number, ammo: number, equipNow: boolean): PlayerWeapon;
}

/**
 * A Weapon that is currently in a Players inventory
 */
declare interface PlayerWeapon {
	/**
	 * model hash of the PlayerWeapon (TODO: reference to all hashes)
	 */
	readonly modelHash: number;
	/**
	 * the weapon slot in the Players inventory
	 */
	readonly slotIndex: number;
	/**
	 * the ammunition left in the magazine
	 */
	magazineAmmo: number;
	/**
	 * the ammunition left as reserve in the inventory
	 */
	reserveAmmo: number;
}

/**
 * Vehicle
 */
declare class Vehicle {
	/**
	 * Creates an instance of Vehicle
	 * 
	 * @param {string} modelHash the model hash (not name!) of the vehicle
	 * @param {Vector3f} position the desired position of the vehicle
	 * @param {Vector3f} rotation the desired rotation of the vehicle
	 */
	public constructor(modelHash: string, position: Vector3f, rotation?: Vector3f);
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * the player driving the vehicle
	 */
	driver: Player;
	/**
	 * model hash of the Vehicle (TODO: reference to all hashes)
	 */
	modelHash: number;
	/**
	 * the vehicles health
	 */
	health: number;
	/**
	 * is the vehicle is destroyed or not (read-only)
	 */
	readonly destroyed: boolean;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the Vehicle's position in the game world
	 */
	position: Vector3;
	/**
	 * the position the vehicles turret is aiming at
	 */
	aimPosition: Vector3;
	/**
	 * the vehicles rotation
	 */
	rotation: Vector3;
	/**
	 * the vehicles positional speed
	 */
	linearVelocity: Vector3f;
	/**
	 * the vehicles rotational speed
	 */
	angularVelocity: Vector3f;
	/**
	 * the vehicles color ID
	 */
	primaryColor: number;
	/**
	 * world dimension of the Vehicle.
	 */
	dimension: number;
	/**
	 * whether the vehicle is equipped with bavarium nitro
	 */
	nitroEnabled: boolean;
	/**
	 * whether the vehicle is equipped with the bavarium jump modification
	 */
	turboJumpEnabled: boolean;
	/**
	 * Set the occupant of the given vehicle
	 * 
	 * @param {number} seat the vehicles seat
	 * @param {Player} player the player entity
	 * 
	 * @example jcmp.events.Add('PlayerReady', player => {
	 *   var vehicle = new Vehicle(28454791, player.position, player.rotation); //Spawn the vehicle at the players position
	 *  vehicle.SetOccupant(0, player); //Assign the player to the driver seat
	 * });
	 */
	SetOccupant(seat: number, player: Player): void;
	/**
	 * Get the occupant of a vehicle seat
	 * 
	 * @param {number} seat the vehicles seat
	 * 
	 * @example jcmp.events.Add('PlayerExitVehicle', (player, vehicle) => {
	 *   if (vehicle.GetOccupant(0)) {
	 *     console.log('There is still a driver in the vehicle.');
	 *   }
	 * });
	 */
	GetOccupant(seat: number): Player;
	/**
	 * Fully repairs the given vehicle
	 * 
	 * @example jcmp.events.Add('VehicleDestroyed', vehicle => {
	 *   vehicle.Repair();
	 * });
	 */
	Repair(): void;
	/**
	 * Respawns the vehicle at its initial spawning position
	 * 
	 * @example jcmp.events.Add('VehicleDestroyed', vehicle => {
	 *   vehicle.Respawn();
	 * });
	 */
	Respawn(): void;
	/**
	 * Destroys the Vehicle
	 */
	Destroy(): void;
}

/**
 * A Point Of Interest in the game
 */
declare class POI {
	/**
	 * Creates an instance of POI
	 * 
	 * @param {number} type the type of the POI
	 * @param {Vector3f} position the position, where the POI is created at
	 * @param {string} text the text/description of the point of interest
	 */
	public constructor(type: number, position: Vector3f, text?: string);
	[customProperty: string]: any;
	[customProperty: number]: any;
	/**
	 * POI type (TODO: link to all available POI types)
	 */
	type: number;
	/**
	 * current value of the progress bar (0.0-1.0)
	 */
	progress: number;
	/**
	 * maximal progress bar value
	 */
	progressMax: number;
	/**
	 * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
	 */
	readonly networkId: number;
	/**
	 * the POI's position in the game world
	 */
	position: Vector3;
	/**
	 * minimum distance to display the POI on the HUD
	 */
	minDistance: number;
	/**
	 * maximal distance to display the POI on the HUD
	 */
	maxDistance: number;
	/**
	 * text for the POI
	 */
	text: string;
	/**
	 * whether the POI is visible to all Players.
	 */
	visible: boolean;
	/**
	 * whether the POI should flash on the HUD
	 */
	flashing: boolean;
	/**
	 * whether the POI should be clamped to the HUD (when not in direct view, they will stay at the edges of the screen)
	 */
	clampedToScreen: boolean;
	/**
	 * world dimension of the POI.
	 */
	dimension: number;
	/**
	 * Sets the visibility of the POI for a certain Player
	 * 
	 * @param {Player} player target Player
	 * @param {boolean} visible whether the POI should be visible (true = visible, false = not visible)
	 * 
	 * @example var myPOI = new POI(0, new Vector3f(0.0,0.0,0.0), "Test POI");
	 * jcmp.events.Add('PlayerReady', player => {
	 *   myPOI.SetVisibleForPlayer(player, true);
	 * });
	 */
	SetVisibleForPlayer(player: Player, visible: boolean): void;
	/**
	 * Returns whether the POI is visible for a certain Player
	 * true = visible
	 * false = not visible
	 * 
	 * @param {Player} player target Player
	 * 
	 * @example var myPOI = new POI(0, new Vector3f(0.0,0.0,0.0), "Test POI");
	 * jcmp.events.Add('PlayerReady', player => {
	 *   if (myPOI.SetVisibleForPlayer(player) == true){
	 *     //POI is currently visible to the player
	 *   }else{
	 *     //POI is not visible to the player
	 *   }
	 * });
	 */
	IsVisibleForPlayer(player: Player): boolean;
	/**
	 * Destroys the POI
	 */
	Destroy(): void;
}

