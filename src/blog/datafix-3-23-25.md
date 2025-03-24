Posted on: March 23rd, 2025

# What is Datafix?
Datafix is a serialization & deserialization framework for Rust, using `Codec` and `CodecOps`. It also has facilities for allowing you to fix schemas of old data with `TypeRewriteRule`s. Datafix has its roots in Mojang's `DataFixerUpper` library, reimplemented in Rust and updated to be more ergonomic to Rust. The library has also been slightly simplified from `DataFixerUpper`, especially in the `TypeRewriteRule`s.

The reason I originally created it was because I realized the original `DataFixerUpper` did not translate well into Java. While it is a very good library to work with in my opinion, it fell flat due to Java's limitations & type erasure. This also meant there was lots of overhead & pointer chasing. I felt that these issues could be solved very easily in Rust, and I believe I was correct.

# Definitions
Datafix has a few core types:
- `Codec`s are structures that allow you to transform types into eachother. For example, you could turn a user's data into JSON, and vice versa.
- `CodecOps` are helper types that `Codec`s use. It is a trait that defines an interface to facilitate converting between the different types.

# Code Example
Let's say you have a `struct` of `UserData`:

```rs
#[derive(Debug, Clone, PartialEq)]
struct UserData {
    username: String,
    id: i32
}

impl UserData {
    pub fn new(username: String, id: i32) -> Self { ... }
    pub fn username(&self) -> &String { ... }
    pub fn id(&self) -> &i32 { ... }
}
```

You want to be able to serialize & deserialize this to different in-memory formats. This can be accomplished by giving it a `DefaultCodec` implementation.

```rs
impl<OT, O: CodecOps<OT>> DefaultCodec<OT, O> for UserData {
    pub fn codec() -> impl Codec<Self, OT, O> {
        MapCodecBuilder::new()
            .field(String::codec().field_of("username", UserData::username))
            .field(i32::codec().field_of("id", UserData::id))
            .build(UserData::new)
    }
}
```

Now, you can use it with a `CodecOps` to serialize & deserialize.

```rs
let data = UserData::new("Endistic".to_string(), 19);
let encoded = UserData::codec().encode(&JsonOps, &data);
let decoded = UserData::codec().decode(&JsonOps, &encoded);
assert_eq!(data, decoded);
```

In this example, `JsonOps` is provided by datafix as the primary `CodecOps` for transforming values to and from JSON.

`encoded` here is the same as `data`, but encoded in JSON. The value is encoded in JSON due to the `JsonOps` being passed into `encode.`

`decoded` here should be equal to `data`, since `encode` and `decode` are obligated to return the same value with the same inputs.

Given a type `X` with a variable of value `x`, and a `CodecOps` named `ops`:

```rs
assert_eq!(X::codec().encode(ops, X::codec().decode(ops, x)), x);
```
should always hold true. This is important since it ensures purity between encoding & decoding. It also means that even when you change formats, your types should be represented relatively the same across formats.

Using this principle, you can create a test to ensure your `Codec`s work as you want using the following patterns:

```rs
// Test data encoding & decoding
let data = <sample value>;
let encoded = <type>::codec().encode(&JsonOps, &data);
let decoded = <type>::codec().decode(&JsonOps, &encoded);
assert_eq!(encoded, decoded);

// test encoding
let data = <sample value>;
let encoded = <type>::codec().encode(&JsonOps, data);
assert_eq!(encoded, <sample encoded value in Json expected>);

// test decoding
let encoded = <sample encoded value in Json>;
let decoded = <type>::codec().decode(&JsonOps, &encoded);
assert_eq!(<expected value>, decoded);
```

# Built-in Codec Types
However, this is too simplistic for what you may want to do. All of the above are boring transformations that you could probably write yourself in a few minutes. Codecs can be fed into adapters to do more interesting things.

## Adapters
All adapters are usable as `self` methods on `Codec`s.
- To get a codec as a list as opposed to a single instance, eg `T -> Vec<T>`, use the `list_of` method to turn it into a list. (e.g `f64::codec().list_of()` gives a `Codec<Vec<f64>>`)

- To add a mapping function for serializing & deserializing, use `xmap`. `xmap` lets you serialize values from `T` to `U` and vice versa on deserialization. This allows you to store a value of type `T` but expose it as type `U`.

- To turn `(T, U)` into a codec, you should do `T::codec().pair(U::codec())`. This may later be expanded to be a general tuple codec.

- If a codec fails to encode, use the `try_else` adapter to try another codec after and return that. You can also use the `or_else` to fall back to a default value, but `or_else` only works for deserialization.

For an example, `try_else` allows you to have different Codecs for a type built into one. If you have a dynamic map type, you could represent it as a `[(key1, value1), (key2, value2)]`, or a `{ key1: value1, key2: value2 }`. Using `try_else` would allow you to handle both of these cases, defaulting to the first codec passed into `try_else`.

- To make a `Codec` be dynamically dispatched, use the `DynamicCodec` type, obtained by calling the `dynamic` method on a `Codec`. You can also wrap it in a `Box<T>` using `boxed`, and an `Arc<T>` using `arc`.

## Dedicated types
There are also special ways to make `Codec`s using types & methods on `Codecs`.

- `MapCodecBuilder` can be used to make a `Codec` for a `struct`. Adapting a codec with `field_of` can turn it into a field for a map, and `optional_field_of` if the field is not required. If the field is not required and has a default value, use `default_field_of`.

- Use `Codecs::recursive` to define a codec that contains itself. This is useful for things like recursive trees & linked lists.

- Use `Codecs::either` to attempt to serialize & deserialize with two codecs. This will attempt to use the first codec, and if it fails, try the second codec. This returns an `Either<T, U>` so you can have different types in this, unlike `try_else`.

- Use `Codec::dispatch` to delegate behavior to different codecs depending on the input value passed into encoding & decoding steps. The functions generally takes a form of `fn(T) -> Codec`.

## Full list
You can see a current full list of the codecs available in `CodecAdapters` and `Codecs` in the source code [here](https://github.com/akarahdev/datafix/blob/main/src/serialization/mod.rs).

# Datafixing
Datafix, as its name implies, also allows you to fix up data. What does this mean?

Let's say your updating your `UserData` struct from above, and you want to give it a `volume` field with the user's volume level.

Before:

```rs
#[derive(Debug, Clone, PartialEq)]
struct UserData {
    username: String,
    id: i32
}

impl UserData {
    pub fn new(username: String, id: i32) -> Self { ... }
    pub fn username(&self) -> &String { ... }
    pub fn id(&self) -> &i32 { ... }
}
```

And after:

```rs
#[derive(Debug, Clone, PartialEq)]
struct UserData {
    username: String,
    id: i32,
    volume: i32
}

impl UserData {
    pub fn new(username: String, id: i32) -> Self { ... }
    pub fn username(&self) -> &String { ... }
    pub fn id(&self) -> &i32 { ... }
    pub fn volume(&self) -> &i32 { ... }
}
```

You can update your Codec to account for this too:

```rs
impl<OT, O: CodecOps<OT>> DefaultCodec<OT, O> for UserData {
    pub fn codec() -> impl Codec<Self, OT, O> {
        MapCodecBuilder::new()
            .field(String::codec().field_of("username", UserData::username))
            .field(i32::codec().field_of("id", UserData::id))
            // this bounded call restricts the value from 0..100 
            // in serialization & deserialization
            .field(i32::codec().bounded(0..100).field_of("volume", UserData::volume))
            .build(UserData::new)
    }
}
```

However, old data files will still look like this:

```json
{
    "username": "Endistic",
    "id": 19
}
```

So how do you automatically upgrade these old data files? You can use `TypeRewriteRules`.

```rs
fn volume_rule<OT: Clone, O: CodecOps<OT>>() -> impl TypeRewriteRule<OT, O> {
    Rules::new_field(
        "volume",
        // This creates a new i32 value that will be inserted into the DataStructure.
        |ctx: CodecOps<OT>| ctx.create_int(100),
        |_ctx| Type::Int,
    )
}
```

Now, before deserializing your data, you can apply this rule to your data:

```rs
let decoded: JsonValue = unimplemented!();
let fixed = JsonOps.repair(decoded, volume_rule());
let final_value = UserData::codec().decode(&Jsonops, fixed);
```

## Built-in Datafixers
There are a few built-in datafixers:

- `Rules::add_field` lets you add a new field to a map
- `Rules::remove_field` lets you remove a field from a map
- `Rules::apply_to_field` applies a rule to a field inside a map
- `TypeRewriteRule::and_then` allow you to chain `TypeRewriteRule`s together.

### The Future
More will be added for more streamlined manipulation of scalar values & lists. The plan is eventually, `TypeRewriteRule`s will be so abstracted that types can be inferred. You might be able to rewrite the above `volume_rule` as:

```rs
fn volume_rule<OT: Clone, O: CodecOps<OT>>() -> impl TypeRewriteRule<OT, O> {
    Rules::new_field(
        "volume",
        Vals::new_int(100)
    )
}
```
Notice how there is no longer a need to specify a type, and instead it will be inferred. This future model will be chainable too, and be able to use it's context:

```rs
fn complex_rule<OT: Clone, O: CodecOps<OT>>() -> impl TypeRewriteRule<OT, O> {
    Rules::new_field(
        "xp",
        Vals::read_int_from(
            // this would apply to the current object being read
            Vals::field_of("level")
        ).multiply(10)
    )
}
```

# Advantages
In my opinion, this framework does have some advantages compared to alternatives like `serde`:

1. `serde` is very imperative. While this can be helpful, it isn't always desired. The `derive` macro system is declarative, but is limited. `Codec`s try to blend the two together, still remaining as declarative as the `derive` macro system, but with more power.

One example I personally encountered was with WyvernMC's `Id` type. Minecraft needs to be able to serialize it from a single string, e.g `minecraft:my_id` into `Id::new("minecraft", "my_id")`. However, `serde` does not make this easy and forces you to implement the `Serialize` trait. While datafix does a similar thing by forcing you to implement the `DefaultCodec` trait, I would argue it's much easier to reason about structure-based declarative code than the visitor-based imperative code of serde.

2. Due to the heavy generic uses, all uses will boil down into the equivalent code of just transforming it yourself.

3. `datafix`'s data model is much simpler than `serde`s. While `serde` does have more depth in it's data model, even differentiating between newtype structs, tuple structs, normal structs, etc. this is usually not necessary. Keeping it simple, in my opinion, is a big advantage. `CodecOps` seems much simpler to implement than `Serializer`, even though it has more types associated with it.

I would argue this is an advantage due to simplicity. When implementing `CodecOps`, you only need to handle a few fundamental operations. Meanwhile, while Serde's massive data model can be more powerful in expressivity, most formats do not need it, such as JSON, YAML, NBT, etc.

# Disadvantages
There are some downsides:


1. Datafix is definitely not mature. `serde` is still very good for most projects due to it's massive ecosystem and projects already using it, and documentation. Datafix does not have any of this since it is new. (Seriously, do not underestimate the power of a library having an ecosystem around it.)
 
2. Since this is not `serde`, compatibility layers will need to be written to integrate it into codebases already using `serde`. Utilities for this will be provided by `datafix` itself in the near future.

3. Currently, there is no derive macro support for auto-generating `Codec`s. While this isn't necessarily a bad thing, it adds a lot of boilerplate. Additionally, derive macro support is challenging since a type can have multiple `Codec`s for it, and the default behavior is not always desired.

4. Due to lots of generics being used, `datafix` has the potential to explode compile times. Using a `DynamicCodec` does not get around this, since the generic types will still be computed, before the Codec becomes dynamically dispatched. The `DynamicCodec` only is dynamically dispatched once it gets to LLVM, and does not help with generic type computation at all the stages before Rust gets to LLVM.

# Testing
If you are interested in testing and playing with it for yourself, for the moment, you should import it as a git dependency:

```toml
datafix = { git = "https://github.com/akarahdev/datafix.git" }
```
For the moment, do not use `datafix` in production. It is unstable, please try to only use it for experiments at the moment.