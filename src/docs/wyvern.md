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
WyvernMC has parallelism.

WyvernMC is paralellized by distinguishing systems into "actor". Each actor runs on it's own thread. An actor is distinguished as: an individual player, a dimension, or a server. Using this mechanism, you can paralellize your server easily and automatically.  

Note that an individual dimension takes up a lot of the server's total load, so you should be careful when having high amount of dimensions running on the same server or machine. It's recommended to keep this to a low amount to not lag out your server.

Tasks are distributed across multiple threads, and use an async runtime to handle the tasks for you. Note that the backend does not use async, but the frontend does. This is so you can do things such as database calls in events, without freezing the rest of the server.

Note that this does create a tradeoff. While WyvernMC has generally less memory usage than a Vanilla Minecraft server, WyvernMC servers tend to perform *much* more computations, even without vanilla features. This is because WyvernMC servers paralellize using the actor system. This means instead of sharing data, threads communicate by sending messages through channels. While the overhead has tried to be minimized, the overhead is not perfect.

This does also mean that deadlocks can happen. While the goal is for WyvernMC to never deadlock (except if it is the fault of user code), it still can from time to time. If you encounter a deadlock using WyvernMC, capture the stack trace of every thread and file a bug report.

# Registries & Components
WyvernMC uses a slight variation on Vanilla mechanisms for storing data.

`Registry<T>` is a map between `Id` and `T`. For example, you can do `Registry::get` to get an `T` from an `Id` in the `Registry<T>`. This is primarily used during `ServerBuilder` construction to define data types such as block states, entity types, entity variants, etc. The future resource pack API will make use of this type more.

Components are split around multiple types. `DataComponentMap` is a map that takes a `DataComponentType<T>` and returns a `T`. The difference between this and `Registry<T>` is that while `DataComponentType<T>` is a thin typed wrapper around `Id`, a `DataComponentMap` can hold data of different types (this is done by downcasting `Any`, which is surprisingly fast, a `DataComponentMap::get` operation only seems to take a few nanoseconds). You can also get a quick diff between two maps using `DataComponentPatch::from_maps`.

What this combination allows is a very structured yet extensible way of manipulating data. For example, on `Entity`, you can create your own `DataComponentType` that is meant for `Entity` to give it custom data. For an example, you can make a `DataComponentType<f64>` for health with:
```rs
pub trait EntityComponentsExt {
    const HEALTH: DataComponentType<f64>;
}

impl EntityComponentsExt for EntityComponents {
    const HEALTH: DataComponentType<f64> = DataComponentType::new(id![minecraft:health]);
}
```
This is just one example, components can be made as simple or complex as you would like.

This does have some differences. While APIs are usually available to abstract over components, they may not always be available.

This differs from ECS (that Valence uses) because ECS is fundamentally reliant on systems and entities. WyvernMC has no notion of a "system" in ECS's terms, it is only aware of tasks. Tasks can loop, be spawned when an event is called, or more. This is lower level compared to ECS's systems but ultimately can allow for more control and knowledge over what exactly your code is doing.

## An Example
Let's say you were making an RPG server and you wanted to track a set of custom items. You could accomplish this by having a `Registry<ItemStack>`.
```rs
pub static ITEMS: LazyLock<Registry<ItemStack>> = LazyLock::new(Registry::new);
```

Then, on some initialization function, you could register items into this registry.
```rs
async fn on_startup(event: Arc<ServerStartEvent>) -> ActorResult<()> {
    ITEMS.insert(id![item:a], ItemStack::new(id![minecraft:diamond]));
    ITEMS.insert(id![item:b], ItemStack::new(id![minecraft:cobblestone]));
    Ok(())
}
```

`ItemStack` implements the `ComponentHolder` trait, allowing you to treat an object as if it was a `DataComponentMap`.

When you want to retrieve an item, you can use `Registry::get` and `Registry::get_entry` to get a direct reference to an entry. To clear a registry, you should use `Registry::clear`. Removing entries from a registry directly is not currently supported.

# Other Values
WyvernMC has a variety of other utility values to help you code your servers.

## ID
An `Id` is a Rust representation of Minecraft's identifier type.

An identifier takes the name of a path and a namespace, with a `:` between them. For example, `minecraft:coal` refers to the `coal` item in the `minecraft` namespace. Paths can also use `/` to distinguish items. For an example of that, `minecraft:wolf/variant` refers to the item `variant` in the `wolf` path in the `minecraft` namespace.

`Id` can be created using a few methods. `Id::new` allows you to create an `Id` with runtime-specified values. `Id::constant` creates an `Id` with statically-known strings. This is possible because `Id` internally uses the `Cow` type, to prevent unnecessary allocations. The ideal way to create an `Id` is to use the `id!` macro. For example, to do `Id::constant("minecraft", "wolf/variant")`, you can also just do `id![minecraft:wolf/variant]`, which is much shorter and concise.

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


