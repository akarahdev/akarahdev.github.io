# WyvernMC Documentation
WyvernMC is a Rust framework for creating Minecraft servers. Unlike most Minecraft server implementations, WyvernMC does not provide any vanilla behavior. It is up to the developer to implement behavior. WyvernMC adds reasonable defaults for login & configuration, but after that you are on your own.

# Server Building
To get started making a server, use the `Server::builder()` method to obtain a `ServerBuilder`.

## Configuring the Server
You can use `ServerBuilder::event` to add an asynchronous function that will be spawned whenever an event is called.

Use `ServerBuilder::registries` to modify the built-in registries, such as adding a new Dimension Type, Painting Variant, etc. Any game data can be modified through this. You must pass in a function that accepts an `&mut RegistryContainer`, enabling you to modify registries. See the `Registries` section for more information.

`ServerBuilder::plugin` can register a plugin to the server - a struct that implements the `Plugin` trait that modifies the passed-in ServerBuilder and returns a new one.

## Running the Server
Once configuration is done, call the `ServerBuilder::run` method to begin running the server. This will block the current thread and run the server using the configuration that has been provided.

For example:
```rs
fn main() {
    Server::builder()
        .run();
}
```

# Events
WyvernMC uses an event system to inform you when something happens.

Each event implements the `Event` trait, and each Event structure contains public fields with metadata about the event. For example, the `PlayerJoinEvent` gives you a `Player` and a `Token<Id>` to determine what dimension the `Player` provided will spawn in.

## Event Handlers
An event handler takes this form:
```rs
async fn f(event: Arc<E>) -> ActorResult<()> { 
    ... 
}
```
`f` can be any function name, and `E` can be any structure that implements the `Event` trait. You can pass these into a `ServerBuilder::event` to register that event handler to the server. The server will now spawn your event handler whenever the event is invoked.

# Concurrency & Paralellism
`todo!()`

# Registries
`todo!()`

# Components
`todo!()`

# Other Values
`todo!()`

## ID
`todo!()`

## NVec
`todo!()`

## Tokens
`todo!()`


# Dimensions
`todo!()`

## Blocks
`todo!()`

# Players
`todo!()`

# Entities
`todo!()`

# Inventory & Items
`todo!()`

# Resource Packs
`todo!()`

# Packets
`todo!()`

# Macros
`todo!()`


