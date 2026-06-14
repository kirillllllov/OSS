
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Building
 * 
 */
export type Building = $Result.DefaultSelection<Prisma.$BuildingPayload>
/**
 * Model Premise
 * 
 */
export type Premise = $Result.DefaultSelection<Prisma.$PremisePayload>
/**
 * Model Owner
 * 
 */
export type Owner = $Result.DefaultSelection<Prisma.$OwnerPayload>
/**
 * Model OwnershipRight
 * 
 */
export type OwnershipRight = $Result.DefaultSelection<Prisma.$OwnershipRightPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model EmployeeBuildingAccess
 * 
 */
export type EmployeeBuildingAccess = $Result.DefaultSelection<Prisma.$EmployeeBuildingAccessPayload>
/**
 * Model QuestionLibrary
 * 
 */
export type QuestionLibrary = $Result.DefaultSelection<Prisma.$QuestionLibraryPayload>
/**
 * Model Meeting
 * 
 */
export type Meeting = $Result.DefaultSelection<Prisma.$MeetingPayload>
/**
 * Model AgendaItem
 * 
 */
export type AgendaItem = $Result.DefaultSelection<Prisma.$AgendaItemPayload>
/**
 * Model QuestionAnswer
 * 
 */
export type QuestionAnswer = $Result.DefaultSelection<Prisma.$QuestionAnswerPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Buildings
 * const buildings = await prisma.building.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Buildings
   * const buildings = await prisma.building.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.building`: Exposes CRUD operations for the **Building** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buildings
    * const buildings = await prisma.building.findMany()
    * ```
    */
  get building(): Prisma.BuildingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.premise`: Exposes CRUD operations for the **Premise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Premises
    * const premises = await prisma.premise.findMany()
    * ```
    */
  get premise(): Prisma.PremiseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.owner`: Exposes CRUD operations for the **Owner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Owners
    * const owners = await prisma.owner.findMany()
    * ```
    */
  get owner(): Prisma.OwnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ownershipRight`: Exposes CRUD operations for the **OwnershipRight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OwnershipRights
    * const ownershipRights = await prisma.ownershipRight.findMany()
    * ```
    */
  get ownershipRight(): Prisma.OwnershipRightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeBuildingAccess`: Exposes CRUD operations for the **EmployeeBuildingAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeBuildingAccesses
    * const employeeBuildingAccesses = await prisma.employeeBuildingAccess.findMany()
    * ```
    */
  get employeeBuildingAccess(): Prisma.EmployeeBuildingAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionLibrary`: Exposes CRUD operations for the **QuestionLibrary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionLibraries
    * const questionLibraries = await prisma.questionLibrary.findMany()
    * ```
    */
  get questionLibrary(): Prisma.QuestionLibraryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agendaItem`: Exposes CRUD operations for the **AgendaItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgendaItems
    * const agendaItems = await prisma.agendaItem.findMany()
    * ```
    */
  get agendaItem(): Prisma.AgendaItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionAnswer`: Exposes CRUD operations for the **QuestionAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionAnswers
    * const questionAnswers = await prisma.questionAnswer.findMany()
    * ```
    */
  get questionAnswer(): Prisma.QuestionAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Building: 'Building',
    Premise: 'Premise',
    Owner: 'Owner',
    OwnershipRight: 'OwnershipRight',
    Employee: 'Employee',
    EmployeeBuildingAccess: 'EmployeeBuildingAccess',
    QuestionLibrary: 'QuestionLibrary',
    Meeting: 'Meeting',
    AgendaItem: 'AgendaItem',
    QuestionAnswer: 'QuestionAnswer',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "building" | "premise" | "owner" | "ownershipRight" | "employee" | "employeeBuildingAccess" | "questionLibrary" | "meeting" | "agendaItem" | "questionAnswer" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Building: {
        payload: Prisma.$BuildingPayload<ExtArgs>
        fields: Prisma.BuildingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findFirst: {
            args: Prisma.BuildingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findMany: {
            args: Prisma.BuildingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          create: {
            args: Prisma.BuildingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          createMany: {
            args: Prisma.BuildingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BuildingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          update: {
            args: Prisma.BuildingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          deleteMany: {
            args: Prisma.BuildingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BuildingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          aggregate: {
            args: Prisma.BuildingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuilding>
          }
          groupBy: {
            args: Prisma.BuildingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingCountAggregateOutputType> | number
          }
        }
      }
      Premise: {
        payload: Prisma.$PremisePayload<ExtArgs>
        fields: Prisma.PremiseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremiseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremiseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          findFirst: {
            args: Prisma.PremiseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremiseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          findMany: {
            args: Prisma.PremiseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>[]
          }
          create: {
            args: Prisma.PremiseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          createMany: {
            args: Prisma.PremiseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PremiseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          update: {
            args: Prisma.PremiseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          deleteMany: {
            args: Prisma.PremiseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremiseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PremiseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremisePayload>
          }
          aggregate: {
            args: Prisma.PremiseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremise>
          }
          groupBy: {
            args: Prisma.PremiseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremiseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremiseCountArgs<ExtArgs>
            result: $Utils.Optional<PremiseCountAggregateOutputType> | number
          }
        }
      }
      Owner: {
        payload: Prisma.$OwnerPayload<ExtArgs>
        fields: Prisma.OwnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OwnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OwnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findFirst: {
            args: Prisma.OwnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OwnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findMany: {
            args: Prisma.OwnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          create: {
            args: Prisma.OwnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          createMany: {
            args: Prisma.OwnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OwnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          update: {
            args: Prisma.OwnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          deleteMany: {
            args: Prisma.OwnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OwnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OwnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          aggregate: {
            args: Prisma.OwnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOwner>
          }
          groupBy: {
            args: Prisma.OwnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OwnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OwnerCountArgs<ExtArgs>
            result: $Utils.Optional<OwnerCountAggregateOutputType> | number
          }
        }
      }
      OwnershipRight: {
        payload: Prisma.$OwnershipRightPayload<ExtArgs>
        fields: Prisma.OwnershipRightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OwnershipRightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OwnershipRightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          findFirst: {
            args: Prisma.OwnershipRightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OwnershipRightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          findMany: {
            args: Prisma.OwnershipRightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>[]
          }
          create: {
            args: Prisma.OwnershipRightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          createMany: {
            args: Prisma.OwnershipRightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OwnershipRightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          update: {
            args: Prisma.OwnershipRightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          deleteMany: {
            args: Prisma.OwnershipRightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OwnershipRightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OwnershipRightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnershipRightPayload>
          }
          aggregate: {
            args: Prisma.OwnershipRightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOwnershipRight>
          }
          groupBy: {
            args: Prisma.OwnershipRightGroupByArgs<ExtArgs>
            result: $Utils.Optional<OwnershipRightGroupByOutputType>[]
          }
          count: {
            args: Prisma.OwnershipRightCountArgs<ExtArgs>
            result: $Utils.Optional<OwnershipRightCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      EmployeeBuildingAccess: {
        payload: Prisma.$EmployeeBuildingAccessPayload<ExtArgs>
        fields: Prisma.EmployeeBuildingAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeBuildingAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeBuildingAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          findFirst: {
            args: Prisma.EmployeeBuildingAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeBuildingAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          findMany: {
            args: Prisma.EmployeeBuildingAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>[]
          }
          create: {
            args: Prisma.EmployeeBuildingAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          createMany: {
            args: Prisma.EmployeeBuildingAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployeeBuildingAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          update: {
            args: Prisma.EmployeeBuildingAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeBuildingAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeBuildingAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeBuildingAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeBuildingAccessPayload>
          }
          aggregate: {
            args: Prisma.EmployeeBuildingAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeBuildingAccess>
          }
          groupBy: {
            args: Prisma.EmployeeBuildingAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeBuildingAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeBuildingAccessCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeBuildingAccessCountAggregateOutputType> | number
          }
        }
      }
      QuestionLibrary: {
        payload: Prisma.$QuestionLibraryPayload<ExtArgs>
        fields: Prisma.QuestionLibraryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionLibraryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionLibraryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          findFirst: {
            args: Prisma.QuestionLibraryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionLibraryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          findMany: {
            args: Prisma.QuestionLibraryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>[]
          }
          create: {
            args: Prisma.QuestionLibraryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          createMany: {
            args: Prisma.QuestionLibraryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QuestionLibraryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          update: {
            args: Prisma.QuestionLibraryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          deleteMany: {
            args: Prisma.QuestionLibraryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionLibraryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionLibraryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionLibraryPayload>
          }
          aggregate: {
            args: Prisma.QuestionLibraryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionLibrary>
          }
          groupBy: {
            args: Prisma.QuestionLibraryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionLibraryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionLibraryCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionLibraryCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: Prisma.$MeetingPayload<ExtArgs>
        fields: Prisma.MeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
      AgendaItem: {
        payload: Prisma.$AgendaItemPayload<ExtArgs>
        fields: Prisma.AgendaItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgendaItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgendaItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          findFirst: {
            args: Prisma.AgendaItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgendaItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          findMany: {
            args: Prisma.AgendaItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>[]
          }
          create: {
            args: Prisma.AgendaItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          createMany: {
            args: Prisma.AgendaItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AgendaItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          update: {
            args: Prisma.AgendaItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          deleteMany: {
            args: Prisma.AgendaItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgendaItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgendaItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaItemPayload>
          }
          aggregate: {
            args: Prisma.AgendaItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgendaItem>
          }
          groupBy: {
            args: Prisma.AgendaItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgendaItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgendaItemCountArgs<ExtArgs>
            result: $Utils.Optional<AgendaItemCountAggregateOutputType> | number
          }
        }
      }
      QuestionAnswer: {
        payload: Prisma.$QuestionAnswerPayload<ExtArgs>
        fields: Prisma.QuestionAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          findFirst: {
            args: Prisma.QuestionAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          findMany: {
            args: Prisma.QuestionAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>[]
          }
          create: {
            args: Prisma.QuestionAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          createMany: {
            args: Prisma.QuestionAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QuestionAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          update: {
            args: Prisma.QuestionAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          deleteMany: {
            args: Prisma.QuestionAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionAnswerPayload>
          }
          aggregate: {
            args: Prisma.QuestionAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionAnswer>
          }
          groupBy: {
            args: Prisma.QuestionAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionAnswerCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    building?: BuildingOmit
    premise?: PremiseOmit
    owner?: OwnerOmit
    ownershipRight?: OwnershipRightOmit
    employee?: EmployeeOmit
    employeeBuildingAccess?: EmployeeBuildingAccessOmit
    questionLibrary?: QuestionLibraryOmit
    meeting?: MeetingOmit
    agendaItem?: AgendaItemOmit
    questionAnswer?: QuestionAnswerOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BuildingCountOutputType
   */

  export type BuildingCountOutputType = {
    premises: number
    employeeAccess: number
    meetings: number
  }

  export type BuildingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    premises?: boolean | BuildingCountOutputTypeCountPremisesArgs
    employeeAccess?: boolean | BuildingCountOutputTypeCountEmployeeAccessArgs
    meetings?: boolean | BuildingCountOutputTypeCountMeetingsArgs
  }

  // Custom InputTypes
  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingCountOutputType
     */
    select?: BuildingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeCountPremisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremiseWhereInput
  }

  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeCountEmployeeAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeBuildingAccessWhereInput
  }

  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }


  /**
   * Count Type PremiseCountOutputType
   */

  export type PremiseCountOutputType = {
    ownershipRights: number
  }

  export type PremiseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownershipRights?: boolean | PremiseCountOutputTypeCountOwnershipRightsArgs
  }

  // Custom InputTypes
  /**
   * PremiseCountOutputType without action
   */
  export type PremiseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiseCountOutputType
     */
    select?: PremiseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PremiseCountOutputType without action
   */
  export type PremiseCountOutputTypeCountOwnershipRightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnershipRightWhereInput
  }


  /**
   * Count Type OwnerCountOutputType
   */

  export type OwnerCountOutputType = {
    ownershipRights: number
    answers: number
  }

  export type OwnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownershipRights?: boolean | OwnerCountOutputTypeCountOwnershipRightsArgs
    answers?: boolean | OwnerCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * OwnerCountOutputType without action
   */
  export type OwnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnerCountOutputType
     */
    select?: OwnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OwnerCountOutputType without action
   */
  export type OwnerCountOutputTypeCountOwnershipRightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnershipRightWhereInput
  }

  /**
   * OwnerCountOutputType without action
   */
  export type OwnerCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionAnswerWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    buildingAccess: number
    createdQuestions: number
    initiatedMeetings: number
    auditLogs: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    buildingAccess?: boolean | EmployeeCountOutputTypeCountBuildingAccessArgs
    createdQuestions?: boolean | EmployeeCountOutputTypeCountCreatedQuestionsArgs
    initiatedMeetings?: boolean | EmployeeCountOutputTypeCountInitiatedMeetingsArgs
    auditLogs?: boolean | EmployeeCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountBuildingAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeBuildingAccessWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountCreatedQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionLibraryWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountInitiatedMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type QuestionLibraryCountOutputType
   */

  export type QuestionLibraryCountOutputType = {
    agendaItems: number
  }

  export type QuestionLibraryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendaItems?: boolean | QuestionLibraryCountOutputTypeCountAgendaItemsArgs
  }

  // Custom InputTypes
  /**
   * QuestionLibraryCountOutputType without action
   */
  export type QuestionLibraryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibraryCountOutputType
     */
    select?: QuestionLibraryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionLibraryCountOutputType without action
   */
  export type QuestionLibraryCountOutputTypeCountAgendaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendaItemWhereInput
  }


  /**
   * Count Type MeetingCountOutputType
   */

  export type MeetingCountOutputType = {
    agendaItems: number
  }

  export type MeetingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendaItems?: boolean | MeetingCountOutputTypeCountAgendaItemsArgs
  }

  // Custom InputTypes
  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingCountOutputType
     */
    select?: MeetingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountAgendaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendaItemWhereInput
  }


  /**
   * Count Type AgendaItemCountOutputType
   */

  export type AgendaItemCountOutputType = {
    answers: number
  }

  export type AgendaItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | AgendaItemCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * AgendaItemCountOutputType without action
   */
  export type AgendaItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItemCountOutputType
     */
    select?: AgendaItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgendaItemCountOutputType without action
   */
  export type AgendaItemCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionAnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Building
   */

  export type AggregateBuilding = {
    _count: BuildingCountAggregateOutputType | null
    _avg: BuildingAvgAggregateOutputType | null
    _sum: BuildingSumAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  export type BuildingAvgAggregateOutputType = {
    yearBuilt: number | null
    floors: number | null
    entrances: number | null
    totalArea: number | null
    totalPremises: number | null
  }

  export type BuildingSumAggregateOutputType = {
    yearBuilt: number | null
    floors: number | null
    entrances: number | null
    totalArea: number | null
    totalPremises: number | null
  }

  export type BuildingMinAggregateOutputType = {
    id: string | null
    address: string | null
    cadastralNumber: string | null
    yearBuilt: number | null
    floors: number | null
    entrances: number | null
    totalArea: number | null
    totalPremises: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingMaxAggregateOutputType = {
    id: string | null
    address: string | null
    cadastralNumber: string | null
    yearBuilt: number | null
    floors: number | null
    entrances: number | null
    totalArea: number | null
    totalPremises: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingCountAggregateOutputType = {
    id: number
    address: number
    cadastralNumber: number
    yearBuilt: number
    floors: number
    entrances: number
    totalArea: number
    totalPremises: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuildingAvgAggregateInputType = {
    yearBuilt?: true
    floors?: true
    entrances?: true
    totalArea?: true
    totalPremises?: true
  }

  export type BuildingSumAggregateInputType = {
    yearBuilt?: true
    floors?: true
    entrances?: true
    totalArea?: true
    totalPremises?: true
  }

  export type BuildingMinAggregateInputType = {
    id?: true
    address?: true
    cadastralNumber?: true
    yearBuilt?: true
    floors?: true
    entrances?: true
    totalArea?: true
    totalPremises?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingMaxAggregateInputType = {
    id?: true
    address?: true
    cadastralNumber?: true
    yearBuilt?: true
    floors?: true
    entrances?: true
    totalArea?: true
    totalPremises?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingCountAggregateInputType = {
    id?: true
    address?: true
    cadastralNumber?: true
    yearBuilt?: true
    floors?: true
    entrances?: true
    totalArea?: true
    totalPremises?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuildingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Building to aggregate.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buildings
    **/
    _count?: true | BuildingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BuildingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BuildingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingMaxAggregateInputType
  }

  export type GetBuildingAggregateType<T extends BuildingAggregateArgs> = {
        [P in keyof T & keyof AggregateBuilding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuilding[P]>
      : GetScalarType<T[P], AggregateBuilding[P]>
  }




  export type BuildingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingWhereInput
    orderBy?: BuildingOrderByWithAggregationInput | BuildingOrderByWithAggregationInput[]
    by: BuildingScalarFieldEnum[] | BuildingScalarFieldEnum
    having?: BuildingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingCountAggregateInputType | true
    _avg?: BuildingAvgAggregateInputType
    _sum?: BuildingSumAggregateInputType
    _min?: BuildingMinAggregateInputType
    _max?: BuildingMaxAggregateInputType
  }

  export type BuildingGroupByOutputType = {
    id: string
    address: string
    cadastralNumber: string
    yearBuilt: number | null
    floors: number | null
    entrances: number | null
    totalArea: number
    totalPremises: number
    createdAt: Date
    updatedAt: Date
    _count: BuildingCountAggregateOutputType | null
    _avg: BuildingAvgAggregateOutputType | null
    _sum: BuildingSumAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  type GetBuildingGroupByPayload<T extends BuildingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingGroupByOutputType[P]>
        }
      >
    >


  export type BuildingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    cadastralNumber?: boolean
    yearBuilt?: boolean
    floors?: boolean
    entrances?: boolean
    totalArea?: boolean
    totalPremises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    premises?: boolean | Building$premisesArgs<ExtArgs>
    employeeAccess?: boolean | Building$employeeAccessArgs<ExtArgs>
    meetings?: boolean | Building$meetingsArgs<ExtArgs>
    _count?: boolean | BuildingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["building"]>



  export type BuildingSelectScalar = {
    id?: boolean
    address?: boolean
    cadastralNumber?: boolean
    yearBuilt?: boolean
    floors?: boolean
    entrances?: boolean
    totalArea?: boolean
    totalPremises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuildingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "cadastralNumber" | "yearBuilt" | "floors" | "entrances" | "totalArea" | "totalPremises" | "createdAt" | "updatedAt", ExtArgs["result"]["building"]>
  export type BuildingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    premises?: boolean | Building$premisesArgs<ExtArgs>
    employeeAccess?: boolean | Building$employeeAccessArgs<ExtArgs>
    meetings?: boolean | Building$meetingsArgs<ExtArgs>
    _count?: boolean | BuildingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BuildingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Building"
    objects: {
      premises: Prisma.$PremisePayload<ExtArgs>[]
      employeeAccess: Prisma.$EmployeeBuildingAccessPayload<ExtArgs>[]
      meetings: Prisma.$MeetingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      cadastralNumber: string
      yearBuilt: number | null
      floors: number | null
      entrances: number | null
      totalArea: number
      totalPremises: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["building"]>
    composites: {}
  }

  type BuildingGetPayload<S extends boolean | null | undefined | BuildingDefaultArgs> = $Result.GetResult<Prisma.$BuildingPayload, S>

  type BuildingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingCountAggregateInputType | true
    }

  export interface BuildingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Building'], meta: { name: 'Building' } }
    /**
     * Find zero or one Building that matches the filter.
     * @param {BuildingFindUniqueArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingFindUniqueArgs>(args: SelectSubset<T, BuildingFindUniqueArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Building that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingFindUniqueOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingFindFirstArgs>(args?: SelectSubset<T, BuildingFindFirstArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buildings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buildings
     * const buildings = await prisma.building.findMany()
     * 
     * // Get first 10 Buildings
     * const buildings = await prisma.building.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingWithIdOnly = await prisma.building.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingFindManyArgs>(args?: SelectSubset<T, BuildingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Building.
     * @param {BuildingCreateArgs} args - Arguments to create a Building.
     * @example
     * // Create one Building
     * const Building = await prisma.building.create({
     *   data: {
     *     // ... data to create a Building
     *   }
     * })
     * 
     */
    create<T extends BuildingCreateArgs>(args: SelectSubset<T, BuildingCreateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buildings.
     * @param {BuildingCreateManyArgs} args - Arguments to create many Buildings.
     * @example
     * // Create many Buildings
     * const building = await prisma.building.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingCreateManyArgs>(args?: SelectSubset<T, BuildingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Building.
     * @param {BuildingDeleteArgs} args - Arguments to delete one Building.
     * @example
     * // Delete one Building
     * const Building = await prisma.building.delete({
     *   where: {
     *     // ... filter to delete one Building
     *   }
     * })
     * 
     */
    delete<T extends BuildingDeleteArgs>(args: SelectSubset<T, BuildingDeleteArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Building.
     * @param {BuildingUpdateArgs} args - Arguments to update one Building.
     * @example
     * // Update one Building
     * const building = await prisma.building.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingUpdateArgs>(args: SelectSubset<T, BuildingUpdateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buildings.
     * @param {BuildingDeleteManyArgs} args - Arguments to filter Buildings to delete.
     * @example
     * // Delete a few Buildings
     * const { count } = await prisma.building.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingDeleteManyArgs>(args?: SelectSubset<T, BuildingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buildings
     * const building = await prisma.building.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingUpdateManyArgs>(args: SelectSubset<T, BuildingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Building.
     * @param {BuildingUpsertArgs} args - Arguments to update or create a Building.
     * @example
     * // Update or create a Building
     * const building = await prisma.building.upsert({
     *   create: {
     *     // ... data to create a Building
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Building we want to update
     *   }
     * })
     */
    upsert<T extends BuildingUpsertArgs>(args: SelectSubset<T, BuildingUpsertArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingCountArgs} args - Arguments to filter Buildings to count.
     * @example
     * // Count the number of Buildings
     * const count = await prisma.building.count({
     *   where: {
     *     // ... the filter for the Buildings we want to count
     *   }
     * })
    **/
    count<T extends BuildingCountArgs>(
      args?: Subset<T, BuildingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BuildingAggregateArgs>(args: Subset<T, BuildingAggregateArgs>): Prisma.PrismaPromise<GetBuildingAggregateType<T>>

    /**
     * Group by Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BuildingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingGroupByArgs['orderBy'] }
        : { orderBy?: BuildingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BuildingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Building model
   */
  readonly fields: BuildingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Building.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    premises<T extends Building$premisesArgs<ExtArgs> = {}>(args?: Subset<T, Building$premisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employeeAccess<T extends Building$employeeAccessArgs<ExtArgs> = {}>(args?: Subset<T, Building$employeeAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    meetings<T extends Building$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, Building$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Building model
   */
  interface BuildingFieldRefs {
    readonly id: FieldRef<"Building", 'String'>
    readonly address: FieldRef<"Building", 'String'>
    readonly cadastralNumber: FieldRef<"Building", 'String'>
    readonly yearBuilt: FieldRef<"Building", 'Int'>
    readonly floors: FieldRef<"Building", 'Int'>
    readonly entrances: FieldRef<"Building", 'Int'>
    readonly totalArea: FieldRef<"Building", 'Float'>
    readonly totalPremises: FieldRef<"Building", 'Int'>
    readonly createdAt: FieldRef<"Building", 'DateTime'>
    readonly updatedAt: FieldRef<"Building", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Building findUnique
   */
  export type BuildingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findUniqueOrThrow
   */
  export type BuildingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findFirst
   */
  export type BuildingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findFirstOrThrow
   */
  export type BuildingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findMany
   */
  export type BuildingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Buildings to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building create
   */
  export type BuildingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The data needed to create a Building.
     */
    data: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
  }

  /**
   * Building createMany
   */
  export type BuildingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buildings.
     */
    data: BuildingCreateManyInput | BuildingCreateManyInput[]
  }

  /**
   * Building update
   */
  export type BuildingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The data needed to update a Building.
     */
    data: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
    /**
     * Choose, which Building to update.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building updateMany
   */
  export type BuildingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buildings.
     */
    data: XOR<BuildingUpdateManyMutationInput, BuildingUncheckedUpdateManyInput>
    /**
     * Filter which Buildings to update
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to update.
     */
    limit?: number
  }

  /**
   * Building upsert
   */
  export type BuildingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The filter to search for the Building to update in case it exists.
     */
    where: BuildingWhereUniqueInput
    /**
     * In case the Building found by the `where` argument doesn't exist, create a new Building with this data.
     */
    create: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
    /**
     * In case the Building was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
  }

  /**
   * Building delete
   */
  export type BuildingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter which Building to delete.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building deleteMany
   */
  export type BuildingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buildings to delete
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to delete.
     */
    limit?: number
  }

  /**
   * Building.premises
   */
  export type Building$premisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    where?: PremiseWhereInput
    orderBy?: PremiseOrderByWithRelationInput | PremiseOrderByWithRelationInput[]
    cursor?: PremiseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PremiseScalarFieldEnum | PremiseScalarFieldEnum[]
  }

  /**
   * Building.employeeAccess
   */
  export type Building$employeeAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    where?: EmployeeBuildingAccessWhereInput
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeBuildingAccessScalarFieldEnum | EmployeeBuildingAccessScalarFieldEnum[]
  }

  /**
   * Building.meetings
   */
  export type Building$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Building without action
   */
  export type BuildingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
  }


  /**
   * Model Premise
   */

  export type AggregatePremise = {
    _count: PremiseCountAggregateOutputType | null
    _avg: PremiseAvgAggregateOutputType | null
    _sum: PremiseSumAggregateOutputType | null
    _min: PremiseMinAggregateOutputType | null
    _max: PremiseMaxAggregateOutputType | null
  }

  export type PremiseAvgAggregateOutputType = {
    area: number | null
  }

  export type PremiseSumAggregateOutputType = {
    area: number | null
  }

  export type PremiseMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    number: string | null
    cadastralNumber: string | null
    area: number | null
    ownershipForm: string | null
  }

  export type PremiseMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    number: string | null
    cadastralNumber: string | null
    area: number | null
    ownershipForm: string | null
  }

  export type PremiseCountAggregateOutputType = {
    id: number
    buildingId: number
    number: number
    cadastralNumber: number
    area: number
    ownershipForm: number
    _all: number
  }


  export type PremiseAvgAggregateInputType = {
    area?: true
  }

  export type PremiseSumAggregateInputType = {
    area?: true
  }

  export type PremiseMinAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    cadastralNumber?: true
    area?: true
    ownershipForm?: true
  }

  export type PremiseMaxAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    cadastralNumber?: true
    area?: true
    ownershipForm?: true
  }

  export type PremiseCountAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    cadastralNumber?: true
    area?: true
    ownershipForm?: true
    _all?: true
  }

  export type PremiseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Premise to aggregate.
     */
    where?: PremiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Premises to fetch.
     */
    orderBy?: PremiseOrderByWithRelationInput | PremiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Premises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Premises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Premises
    **/
    _count?: true | PremiseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremiseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremiseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremiseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremiseMaxAggregateInputType
  }

  export type GetPremiseAggregateType<T extends PremiseAggregateArgs> = {
        [P in keyof T & keyof AggregatePremise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremise[P]>
      : GetScalarType<T[P], AggregatePremise[P]>
  }




  export type PremiseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremiseWhereInput
    orderBy?: PremiseOrderByWithAggregationInput | PremiseOrderByWithAggregationInput[]
    by: PremiseScalarFieldEnum[] | PremiseScalarFieldEnum
    having?: PremiseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremiseCountAggregateInputType | true
    _avg?: PremiseAvgAggregateInputType
    _sum?: PremiseSumAggregateInputType
    _min?: PremiseMinAggregateInputType
    _max?: PremiseMaxAggregateInputType
  }

  export type PremiseGroupByOutputType = {
    id: string
    buildingId: string
    number: string
    cadastralNumber: string | null
    area: number
    ownershipForm: string
    _count: PremiseCountAggregateOutputType | null
    _avg: PremiseAvgAggregateOutputType | null
    _sum: PremiseSumAggregateOutputType | null
    _min: PremiseMinAggregateOutputType | null
    _max: PremiseMaxAggregateOutputType | null
  }

  type GetPremiseGroupByPayload<T extends PremiseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremiseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremiseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremiseGroupByOutputType[P]>
            : GetScalarType<T[P], PremiseGroupByOutputType[P]>
        }
      >
    >


  export type PremiseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    number?: boolean
    cadastralNumber?: boolean
    area?: boolean
    ownershipForm?: boolean
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    ownershipRights?: boolean | Premise$ownershipRightsArgs<ExtArgs>
    _count?: boolean | PremiseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["premise"]>



  export type PremiseSelectScalar = {
    id?: boolean
    buildingId?: boolean
    number?: boolean
    cadastralNumber?: boolean
    area?: boolean
    ownershipForm?: boolean
  }

  export type PremiseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "number" | "cadastralNumber" | "area" | "ownershipForm", ExtArgs["result"]["premise"]>
  export type PremiseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    ownershipRights?: boolean | Premise$ownershipRightsArgs<ExtArgs>
    _count?: boolean | PremiseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PremisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Premise"
    objects: {
      building: Prisma.$BuildingPayload<ExtArgs>
      ownershipRights: Prisma.$OwnershipRightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      number: string
      cadastralNumber: string | null
      area: number
      ownershipForm: string
    }, ExtArgs["result"]["premise"]>
    composites: {}
  }

  type PremiseGetPayload<S extends boolean | null | undefined | PremiseDefaultArgs> = $Result.GetResult<Prisma.$PremisePayload, S>

  type PremiseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremiseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PremiseCountAggregateInputType | true
    }

  export interface PremiseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Premise'], meta: { name: 'Premise' } }
    /**
     * Find zero or one Premise that matches the filter.
     * @param {PremiseFindUniqueArgs} args - Arguments to find a Premise
     * @example
     * // Get one Premise
     * const premise = await prisma.premise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremiseFindUniqueArgs>(args: SelectSubset<T, PremiseFindUniqueArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Premise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremiseFindUniqueOrThrowArgs} args - Arguments to find a Premise
     * @example
     * // Get one Premise
     * const premise = await prisma.premise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremiseFindUniqueOrThrowArgs>(args: SelectSubset<T, PremiseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Premise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseFindFirstArgs} args - Arguments to find a Premise
     * @example
     * // Get one Premise
     * const premise = await prisma.premise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremiseFindFirstArgs>(args?: SelectSubset<T, PremiseFindFirstArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Premise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseFindFirstOrThrowArgs} args - Arguments to find a Premise
     * @example
     * // Get one Premise
     * const premise = await prisma.premise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremiseFindFirstOrThrowArgs>(args?: SelectSubset<T, PremiseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Premises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Premises
     * const premises = await prisma.premise.findMany()
     * 
     * // Get first 10 Premises
     * const premises = await prisma.premise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const premiseWithIdOnly = await prisma.premise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PremiseFindManyArgs>(args?: SelectSubset<T, PremiseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Premise.
     * @param {PremiseCreateArgs} args - Arguments to create a Premise.
     * @example
     * // Create one Premise
     * const Premise = await prisma.premise.create({
     *   data: {
     *     // ... data to create a Premise
     *   }
     * })
     * 
     */
    create<T extends PremiseCreateArgs>(args: SelectSubset<T, PremiseCreateArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Premises.
     * @param {PremiseCreateManyArgs} args - Arguments to create many Premises.
     * @example
     * // Create many Premises
     * const premise = await prisma.premise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremiseCreateManyArgs>(args?: SelectSubset<T, PremiseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Premise.
     * @param {PremiseDeleteArgs} args - Arguments to delete one Premise.
     * @example
     * // Delete one Premise
     * const Premise = await prisma.premise.delete({
     *   where: {
     *     // ... filter to delete one Premise
     *   }
     * })
     * 
     */
    delete<T extends PremiseDeleteArgs>(args: SelectSubset<T, PremiseDeleteArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Premise.
     * @param {PremiseUpdateArgs} args - Arguments to update one Premise.
     * @example
     * // Update one Premise
     * const premise = await prisma.premise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremiseUpdateArgs>(args: SelectSubset<T, PremiseUpdateArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Premises.
     * @param {PremiseDeleteManyArgs} args - Arguments to filter Premises to delete.
     * @example
     * // Delete a few Premises
     * const { count } = await prisma.premise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremiseDeleteManyArgs>(args?: SelectSubset<T, PremiseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Premises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Premises
     * const premise = await prisma.premise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremiseUpdateManyArgs>(args: SelectSubset<T, PremiseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Premise.
     * @param {PremiseUpsertArgs} args - Arguments to update or create a Premise.
     * @example
     * // Update or create a Premise
     * const premise = await prisma.premise.upsert({
     *   create: {
     *     // ... data to create a Premise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Premise we want to update
     *   }
     * })
     */
    upsert<T extends PremiseUpsertArgs>(args: SelectSubset<T, PremiseUpsertArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Premises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseCountArgs} args - Arguments to filter Premises to count.
     * @example
     * // Count the number of Premises
     * const count = await prisma.premise.count({
     *   where: {
     *     // ... the filter for the Premises we want to count
     *   }
     * })
    **/
    count<T extends PremiseCountArgs>(
      args?: Subset<T, PremiseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremiseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Premise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremiseAggregateArgs>(args: Subset<T, PremiseAggregateArgs>): Prisma.PrismaPromise<GetPremiseAggregateType<T>>

    /**
     * Group by Premise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremiseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremiseGroupByArgs['orderBy'] }
        : { orderBy?: PremiseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremiseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremiseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Premise model
   */
  readonly fields: PremiseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Premise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremiseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    building<T extends BuildingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BuildingDefaultArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ownershipRights<T extends Premise$ownershipRightsArgs<ExtArgs> = {}>(args?: Subset<T, Premise$ownershipRightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Premise model
   */
  interface PremiseFieldRefs {
    readonly id: FieldRef<"Premise", 'String'>
    readonly buildingId: FieldRef<"Premise", 'String'>
    readonly number: FieldRef<"Premise", 'String'>
    readonly cadastralNumber: FieldRef<"Premise", 'String'>
    readonly area: FieldRef<"Premise", 'Float'>
    readonly ownershipForm: FieldRef<"Premise", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Premise findUnique
   */
  export type PremiseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter, which Premise to fetch.
     */
    where: PremiseWhereUniqueInput
  }

  /**
   * Premise findUniqueOrThrow
   */
  export type PremiseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter, which Premise to fetch.
     */
    where: PremiseWhereUniqueInput
  }

  /**
   * Premise findFirst
   */
  export type PremiseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter, which Premise to fetch.
     */
    where?: PremiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Premises to fetch.
     */
    orderBy?: PremiseOrderByWithRelationInput | PremiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Premises.
     */
    cursor?: PremiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Premises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Premises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Premises.
     */
    distinct?: PremiseScalarFieldEnum | PremiseScalarFieldEnum[]
  }

  /**
   * Premise findFirstOrThrow
   */
  export type PremiseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter, which Premise to fetch.
     */
    where?: PremiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Premises to fetch.
     */
    orderBy?: PremiseOrderByWithRelationInput | PremiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Premises.
     */
    cursor?: PremiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Premises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Premises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Premises.
     */
    distinct?: PremiseScalarFieldEnum | PremiseScalarFieldEnum[]
  }

  /**
   * Premise findMany
   */
  export type PremiseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter, which Premises to fetch.
     */
    where?: PremiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Premises to fetch.
     */
    orderBy?: PremiseOrderByWithRelationInput | PremiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Premises.
     */
    cursor?: PremiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Premises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Premises.
     */
    skip?: number
    distinct?: PremiseScalarFieldEnum | PremiseScalarFieldEnum[]
  }

  /**
   * Premise create
   */
  export type PremiseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * The data needed to create a Premise.
     */
    data: XOR<PremiseCreateInput, PremiseUncheckedCreateInput>
  }

  /**
   * Premise createMany
   */
  export type PremiseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Premises.
     */
    data: PremiseCreateManyInput | PremiseCreateManyInput[]
  }

  /**
   * Premise update
   */
  export type PremiseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * The data needed to update a Premise.
     */
    data: XOR<PremiseUpdateInput, PremiseUncheckedUpdateInput>
    /**
     * Choose, which Premise to update.
     */
    where: PremiseWhereUniqueInput
  }

  /**
   * Premise updateMany
   */
  export type PremiseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Premises.
     */
    data: XOR<PremiseUpdateManyMutationInput, PremiseUncheckedUpdateManyInput>
    /**
     * Filter which Premises to update
     */
    where?: PremiseWhereInput
    /**
     * Limit how many Premises to update.
     */
    limit?: number
  }

  /**
   * Premise upsert
   */
  export type PremiseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * The filter to search for the Premise to update in case it exists.
     */
    where: PremiseWhereUniqueInput
    /**
     * In case the Premise found by the `where` argument doesn't exist, create a new Premise with this data.
     */
    create: XOR<PremiseCreateInput, PremiseUncheckedCreateInput>
    /**
     * In case the Premise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremiseUpdateInput, PremiseUncheckedUpdateInput>
  }

  /**
   * Premise delete
   */
  export type PremiseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
    /**
     * Filter which Premise to delete.
     */
    where: PremiseWhereUniqueInput
  }

  /**
   * Premise deleteMany
   */
  export type PremiseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Premises to delete
     */
    where?: PremiseWhereInput
    /**
     * Limit how many Premises to delete.
     */
    limit?: number
  }

  /**
   * Premise.ownershipRights
   */
  export type Premise$ownershipRightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    where?: OwnershipRightWhereInput
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    cursor?: OwnershipRightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OwnershipRightScalarFieldEnum | OwnershipRightScalarFieldEnum[]
  }

  /**
   * Premise without action
   */
  export type PremiseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Premise
     */
    select?: PremiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Premise
     */
    omit?: PremiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PremiseInclude<ExtArgs> | null
  }


  /**
   * Model Owner
   */

  export type AggregateOwner = {
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  export type OwnerMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    inn: string | null
    snils: string | null
    contacts: string | null
  }

  export type OwnerMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    inn: string | null
    snils: string | null
    contacts: string | null
  }

  export type OwnerCountAggregateOutputType = {
    id: number
    fullName: number
    inn: number
    snils: number
    contacts: number
    _all: number
  }


  export type OwnerMinAggregateInputType = {
    id?: true
    fullName?: true
    inn?: true
    snils?: true
    contacts?: true
  }

  export type OwnerMaxAggregateInputType = {
    id?: true
    fullName?: true
    inn?: true
    snils?: true
    contacts?: true
  }

  export type OwnerCountAggregateInputType = {
    id?: true
    fullName?: true
    inn?: true
    snils?: true
    contacts?: true
    _all?: true
  }

  export type OwnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owner to aggregate.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Owners
    **/
    _count?: true | OwnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnerMaxAggregateInputType
  }

  export type GetOwnerAggregateType<T extends OwnerAggregateArgs> = {
        [P in keyof T & keyof AggregateOwner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwner[P]>
      : GetScalarType<T[P], AggregateOwner[P]>
  }




  export type OwnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnerWhereInput
    orderBy?: OwnerOrderByWithAggregationInput | OwnerOrderByWithAggregationInput[]
    by: OwnerScalarFieldEnum[] | OwnerScalarFieldEnum
    having?: OwnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnerCountAggregateInputType | true
    _min?: OwnerMinAggregateInputType
    _max?: OwnerMaxAggregateInputType
  }

  export type OwnerGroupByOutputType = {
    id: string
    fullName: string
    inn: string | null
    snils: string | null
    contacts: string | null
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  type GetOwnerGroupByPayload<T extends OwnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OwnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnerGroupByOutputType[P]>
            : GetScalarType<T[P], OwnerGroupByOutputType[P]>
        }
      >
    >


  export type OwnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    inn?: boolean
    snils?: boolean
    contacts?: boolean
    ownershipRights?: boolean | Owner$ownershipRightsArgs<ExtArgs>
    answers?: boolean | Owner$answersArgs<ExtArgs>
    _count?: boolean | OwnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["owner"]>



  export type OwnerSelectScalar = {
    id?: boolean
    fullName?: boolean
    inn?: boolean
    snils?: boolean
    contacts?: boolean
  }

  export type OwnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "inn" | "snils" | "contacts", ExtArgs["result"]["owner"]>
  export type OwnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownershipRights?: boolean | Owner$ownershipRightsArgs<ExtArgs>
    answers?: boolean | Owner$answersArgs<ExtArgs>
    _count?: boolean | OwnerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OwnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Owner"
    objects: {
      ownershipRights: Prisma.$OwnershipRightPayload<ExtArgs>[]
      answers: Prisma.$QuestionAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      inn: string | null
      snils: string | null
      contacts: string | null
    }, ExtArgs["result"]["owner"]>
    composites: {}
  }

  type OwnerGetPayload<S extends boolean | null | undefined | OwnerDefaultArgs> = $Result.GetResult<Prisma.$OwnerPayload, S>

  type OwnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OwnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OwnerCountAggregateInputType | true
    }

  export interface OwnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Owner'], meta: { name: 'Owner' } }
    /**
     * Find zero or one Owner that matches the filter.
     * @param {OwnerFindUniqueArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnerFindUniqueArgs>(args: SelectSubset<T, OwnerFindUniqueArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Owner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OwnerFindUniqueOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnerFindUniqueOrThrowArgs>(args: SelectSubset<T, OwnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Owner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnerFindFirstArgs>(args?: SelectSubset<T, OwnerFindFirstArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Owner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnerFindFirstOrThrowArgs>(args?: SelectSubset<T, OwnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Owners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Owners
     * const owners = await prisma.owner.findMany()
     * 
     * // Get first 10 Owners
     * const owners = await prisma.owner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ownerWithIdOnly = await prisma.owner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OwnerFindManyArgs>(args?: SelectSubset<T, OwnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Owner.
     * @param {OwnerCreateArgs} args - Arguments to create a Owner.
     * @example
     * // Create one Owner
     * const Owner = await prisma.owner.create({
     *   data: {
     *     // ... data to create a Owner
     *   }
     * })
     * 
     */
    create<T extends OwnerCreateArgs>(args: SelectSubset<T, OwnerCreateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Owners.
     * @param {OwnerCreateManyArgs} args - Arguments to create many Owners.
     * @example
     * // Create many Owners
     * const owner = await prisma.owner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OwnerCreateManyArgs>(args?: SelectSubset<T, OwnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Owner.
     * @param {OwnerDeleteArgs} args - Arguments to delete one Owner.
     * @example
     * // Delete one Owner
     * const Owner = await prisma.owner.delete({
     *   where: {
     *     // ... filter to delete one Owner
     *   }
     * })
     * 
     */
    delete<T extends OwnerDeleteArgs>(args: SelectSubset<T, OwnerDeleteArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Owner.
     * @param {OwnerUpdateArgs} args - Arguments to update one Owner.
     * @example
     * // Update one Owner
     * const owner = await prisma.owner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OwnerUpdateArgs>(args: SelectSubset<T, OwnerUpdateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Owners.
     * @param {OwnerDeleteManyArgs} args - Arguments to filter Owners to delete.
     * @example
     * // Delete a few Owners
     * const { count } = await prisma.owner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OwnerDeleteManyArgs>(args?: SelectSubset<T, OwnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Owners
     * const owner = await prisma.owner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OwnerUpdateManyArgs>(args: SelectSubset<T, OwnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Owner.
     * @param {OwnerUpsertArgs} args - Arguments to update or create a Owner.
     * @example
     * // Update or create a Owner
     * const owner = await prisma.owner.upsert({
     *   create: {
     *     // ... data to create a Owner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Owner we want to update
     *   }
     * })
     */
    upsert<T extends OwnerUpsertArgs>(args: SelectSubset<T, OwnerUpsertArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerCountArgs} args - Arguments to filter Owners to count.
     * @example
     * // Count the number of Owners
     * const count = await prisma.owner.count({
     *   where: {
     *     // ... the filter for the Owners we want to count
     *   }
     * })
    **/
    count<T extends OwnerCountArgs>(
      args?: Subset<T, OwnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OwnerAggregateArgs>(args: Subset<T, OwnerAggregateArgs>): Prisma.PrismaPromise<GetOwnerAggregateType<T>>

    /**
     * Group by Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OwnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnerGroupByArgs['orderBy'] }
        : { orderBy?: OwnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OwnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Owner model
   */
  readonly fields: OwnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Owner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OwnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ownershipRights<T extends Owner$ownershipRightsArgs<ExtArgs> = {}>(args?: Subset<T, Owner$ownershipRightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    answers<T extends Owner$answersArgs<ExtArgs> = {}>(args?: Subset<T, Owner$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Owner model
   */
  interface OwnerFieldRefs {
    readonly id: FieldRef<"Owner", 'String'>
    readonly fullName: FieldRef<"Owner", 'String'>
    readonly inn: FieldRef<"Owner", 'String'>
    readonly snils: FieldRef<"Owner", 'String'>
    readonly contacts: FieldRef<"Owner", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Owner findUnique
   */
  export type OwnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findUniqueOrThrow
   */
  export type OwnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findFirst
   */
  export type OwnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findFirstOrThrow
   */
  export type OwnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findMany
   */
  export type OwnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owners to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner create
   */
  export type OwnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Owner.
     */
    data: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
  }

  /**
   * Owner createMany
   */
  export type OwnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Owners.
     */
    data: OwnerCreateManyInput | OwnerCreateManyInput[]
  }

  /**
   * Owner update
   */
  export type OwnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Owner.
     */
    data: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
    /**
     * Choose, which Owner to update.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner updateMany
   */
  export type OwnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Owners.
     */
    data: XOR<OwnerUpdateManyMutationInput, OwnerUncheckedUpdateManyInput>
    /**
     * Filter which Owners to update
     */
    where?: OwnerWhereInput
    /**
     * Limit how many Owners to update.
     */
    limit?: number
  }

  /**
   * Owner upsert
   */
  export type OwnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Owner to update in case it exists.
     */
    where: OwnerWhereUniqueInput
    /**
     * In case the Owner found by the `where` argument doesn't exist, create a new Owner with this data.
     */
    create: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
    /**
     * In case the Owner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
  }

  /**
   * Owner delete
   */
  export type OwnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter which Owner to delete.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner deleteMany
   */
  export type OwnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owners to delete
     */
    where?: OwnerWhereInput
    /**
     * Limit how many Owners to delete.
     */
    limit?: number
  }

  /**
   * Owner.ownershipRights
   */
  export type Owner$ownershipRightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    where?: OwnershipRightWhereInput
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    cursor?: OwnershipRightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OwnershipRightScalarFieldEnum | OwnershipRightScalarFieldEnum[]
  }

  /**
   * Owner.answers
   */
  export type Owner$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    where?: QuestionAnswerWhereInput
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    cursor?: QuestionAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionAnswerScalarFieldEnum | QuestionAnswerScalarFieldEnum[]
  }

  /**
   * Owner without action
   */
  export type OwnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
  }


  /**
   * Model OwnershipRight
   */

  export type AggregateOwnershipRight = {
    _count: OwnershipRightCountAggregateOutputType | null
    _avg: OwnershipRightAvgAggregateOutputType | null
    _sum: OwnershipRightSumAggregateOutputType | null
    _min: OwnershipRightMinAggregateOutputType | null
    _max: OwnershipRightMaxAggregateOutputType | null
  }

  export type OwnershipRightAvgAggregateOutputType = {
    shareArea: number | null
  }

  export type OwnershipRightSumAggregateOutputType = {
    shareArea: number | null
  }

  export type OwnershipRightMinAggregateOutputType = {
    id: string | null
    premiseId: string | null
    ownerId: string | null
    share: string | null
    shareArea: number | null
    titleDocument: string | null
    registrationDate: string | null
    basisDocument: string | null
  }

  export type OwnershipRightMaxAggregateOutputType = {
    id: string | null
    premiseId: string | null
    ownerId: string | null
    share: string | null
    shareArea: number | null
    titleDocument: string | null
    registrationDate: string | null
    basisDocument: string | null
  }

  export type OwnershipRightCountAggregateOutputType = {
    id: number
    premiseId: number
    ownerId: number
    share: number
    shareArea: number
    titleDocument: number
    registrationDate: number
    basisDocument: number
    _all: number
  }


  export type OwnershipRightAvgAggregateInputType = {
    shareArea?: true
  }

  export type OwnershipRightSumAggregateInputType = {
    shareArea?: true
  }

  export type OwnershipRightMinAggregateInputType = {
    id?: true
    premiseId?: true
    ownerId?: true
    share?: true
    shareArea?: true
    titleDocument?: true
    registrationDate?: true
    basisDocument?: true
  }

  export type OwnershipRightMaxAggregateInputType = {
    id?: true
    premiseId?: true
    ownerId?: true
    share?: true
    shareArea?: true
    titleDocument?: true
    registrationDate?: true
    basisDocument?: true
  }

  export type OwnershipRightCountAggregateInputType = {
    id?: true
    premiseId?: true
    ownerId?: true
    share?: true
    shareArea?: true
    titleDocument?: true
    registrationDate?: true
    basisDocument?: true
    _all?: true
  }

  export type OwnershipRightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OwnershipRight to aggregate.
     */
    where?: OwnershipRightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnershipRights to fetch.
     */
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OwnershipRightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnershipRights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnershipRights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OwnershipRights
    **/
    _count?: true | OwnershipRightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OwnershipRightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OwnershipRightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnershipRightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnershipRightMaxAggregateInputType
  }

  export type GetOwnershipRightAggregateType<T extends OwnershipRightAggregateArgs> = {
        [P in keyof T & keyof AggregateOwnershipRight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwnershipRight[P]>
      : GetScalarType<T[P], AggregateOwnershipRight[P]>
  }




  export type OwnershipRightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnershipRightWhereInput
    orderBy?: OwnershipRightOrderByWithAggregationInput | OwnershipRightOrderByWithAggregationInput[]
    by: OwnershipRightScalarFieldEnum[] | OwnershipRightScalarFieldEnum
    having?: OwnershipRightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnershipRightCountAggregateInputType | true
    _avg?: OwnershipRightAvgAggregateInputType
    _sum?: OwnershipRightSumAggregateInputType
    _min?: OwnershipRightMinAggregateInputType
    _max?: OwnershipRightMaxAggregateInputType
  }

  export type OwnershipRightGroupByOutputType = {
    id: string
    premiseId: string
    ownerId: string
    share: string | null
    shareArea: number | null
    titleDocument: string | null
    registrationDate: string | null
    basisDocument: string | null
    _count: OwnershipRightCountAggregateOutputType | null
    _avg: OwnershipRightAvgAggregateOutputType | null
    _sum: OwnershipRightSumAggregateOutputType | null
    _min: OwnershipRightMinAggregateOutputType | null
    _max: OwnershipRightMaxAggregateOutputType | null
  }

  type GetOwnershipRightGroupByPayload<T extends OwnershipRightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OwnershipRightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnershipRightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnershipRightGroupByOutputType[P]>
            : GetScalarType<T[P], OwnershipRightGroupByOutputType[P]>
        }
      >
    >


  export type OwnershipRightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    premiseId?: boolean
    ownerId?: boolean
    share?: boolean
    shareArea?: boolean
    titleDocument?: boolean
    registrationDate?: boolean
    basisDocument?: boolean
    premise?: boolean | PremiseDefaultArgs<ExtArgs>
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ownershipRight"]>



  export type OwnershipRightSelectScalar = {
    id?: boolean
    premiseId?: boolean
    ownerId?: boolean
    share?: boolean
    shareArea?: boolean
    titleDocument?: boolean
    registrationDate?: boolean
    basisDocument?: boolean
  }

  export type OwnershipRightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "premiseId" | "ownerId" | "share" | "shareArea" | "titleDocument" | "registrationDate" | "basisDocument", ExtArgs["result"]["ownershipRight"]>
  export type OwnershipRightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    premise?: boolean | PremiseDefaultArgs<ExtArgs>
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }

  export type $OwnershipRightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OwnershipRight"
    objects: {
      premise: Prisma.$PremisePayload<ExtArgs>
      owner: Prisma.$OwnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      premiseId: string
      ownerId: string
      share: string | null
      shareArea: number | null
      titleDocument: string | null
      registrationDate: string | null
      basisDocument: string | null
    }, ExtArgs["result"]["ownershipRight"]>
    composites: {}
  }

  type OwnershipRightGetPayload<S extends boolean | null | undefined | OwnershipRightDefaultArgs> = $Result.GetResult<Prisma.$OwnershipRightPayload, S>

  type OwnershipRightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OwnershipRightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OwnershipRightCountAggregateInputType | true
    }

  export interface OwnershipRightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OwnershipRight'], meta: { name: 'OwnershipRight' } }
    /**
     * Find zero or one OwnershipRight that matches the filter.
     * @param {OwnershipRightFindUniqueArgs} args - Arguments to find a OwnershipRight
     * @example
     * // Get one OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnershipRightFindUniqueArgs>(args: SelectSubset<T, OwnershipRightFindUniqueArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OwnershipRight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OwnershipRightFindUniqueOrThrowArgs} args - Arguments to find a OwnershipRight
     * @example
     * // Get one OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnershipRightFindUniqueOrThrowArgs>(args: SelectSubset<T, OwnershipRightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OwnershipRight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightFindFirstArgs} args - Arguments to find a OwnershipRight
     * @example
     * // Get one OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnershipRightFindFirstArgs>(args?: SelectSubset<T, OwnershipRightFindFirstArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OwnershipRight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightFindFirstOrThrowArgs} args - Arguments to find a OwnershipRight
     * @example
     * // Get one OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnershipRightFindFirstOrThrowArgs>(args?: SelectSubset<T, OwnershipRightFindFirstOrThrowArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OwnershipRights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OwnershipRights
     * const ownershipRights = await prisma.ownershipRight.findMany()
     * 
     * // Get first 10 OwnershipRights
     * const ownershipRights = await prisma.ownershipRight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ownershipRightWithIdOnly = await prisma.ownershipRight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OwnershipRightFindManyArgs>(args?: SelectSubset<T, OwnershipRightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OwnershipRight.
     * @param {OwnershipRightCreateArgs} args - Arguments to create a OwnershipRight.
     * @example
     * // Create one OwnershipRight
     * const OwnershipRight = await prisma.ownershipRight.create({
     *   data: {
     *     // ... data to create a OwnershipRight
     *   }
     * })
     * 
     */
    create<T extends OwnershipRightCreateArgs>(args: SelectSubset<T, OwnershipRightCreateArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OwnershipRights.
     * @param {OwnershipRightCreateManyArgs} args - Arguments to create many OwnershipRights.
     * @example
     * // Create many OwnershipRights
     * const ownershipRight = await prisma.ownershipRight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OwnershipRightCreateManyArgs>(args?: SelectSubset<T, OwnershipRightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OwnershipRight.
     * @param {OwnershipRightDeleteArgs} args - Arguments to delete one OwnershipRight.
     * @example
     * // Delete one OwnershipRight
     * const OwnershipRight = await prisma.ownershipRight.delete({
     *   where: {
     *     // ... filter to delete one OwnershipRight
     *   }
     * })
     * 
     */
    delete<T extends OwnershipRightDeleteArgs>(args: SelectSubset<T, OwnershipRightDeleteArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OwnershipRight.
     * @param {OwnershipRightUpdateArgs} args - Arguments to update one OwnershipRight.
     * @example
     * // Update one OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OwnershipRightUpdateArgs>(args: SelectSubset<T, OwnershipRightUpdateArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OwnershipRights.
     * @param {OwnershipRightDeleteManyArgs} args - Arguments to filter OwnershipRights to delete.
     * @example
     * // Delete a few OwnershipRights
     * const { count } = await prisma.ownershipRight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OwnershipRightDeleteManyArgs>(args?: SelectSubset<T, OwnershipRightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OwnershipRights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OwnershipRights
     * const ownershipRight = await prisma.ownershipRight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OwnershipRightUpdateManyArgs>(args: SelectSubset<T, OwnershipRightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OwnershipRight.
     * @param {OwnershipRightUpsertArgs} args - Arguments to update or create a OwnershipRight.
     * @example
     * // Update or create a OwnershipRight
     * const ownershipRight = await prisma.ownershipRight.upsert({
     *   create: {
     *     // ... data to create a OwnershipRight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OwnershipRight we want to update
     *   }
     * })
     */
    upsert<T extends OwnershipRightUpsertArgs>(args: SelectSubset<T, OwnershipRightUpsertArgs<ExtArgs>>): Prisma__OwnershipRightClient<$Result.GetResult<Prisma.$OwnershipRightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OwnershipRights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightCountArgs} args - Arguments to filter OwnershipRights to count.
     * @example
     * // Count the number of OwnershipRights
     * const count = await prisma.ownershipRight.count({
     *   where: {
     *     // ... the filter for the OwnershipRights we want to count
     *   }
     * })
    **/
    count<T extends OwnershipRightCountArgs>(
      args?: Subset<T, OwnershipRightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnershipRightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OwnershipRight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OwnershipRightAggregateArgs>(args: Subset<T, OwnershipRightAggregateArgs>): Prisma.PrismaPromise<GetOwnershipRightAggregateType<T>>

    /**
     * Group by OwnershipRight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnershipRightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OwnershipRightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnershipRightGroupByArgs['orderBy'] }
        : { orderBy?: OwnershipRightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OwnershipRightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnershipRightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OwnershipRight model
   */
  readonly fields: OwnershipRightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OwnershipRight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OwnershipRightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    premise<T extends PremiseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PremiseDefaultArgs<ExtArgs>>): Prisma__PremiseClient<$Result.GetResult<Prisma.$PremisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    owner<T extends OwnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OwnerDefaultArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OwnershipRight model
   */
  interface OwnershipRightFieldRefs {
    readonly id: FieldRef<"OwnershipRight", 'String'>
    readonly premiseId: FieldRef<"OwnershipRight", 'String'>
    readonly ownerId: FieldRef<"OwnershipRight", 'String'>
    readonly share: FieldRef<"OwnershipRight", 'String'>
    readonly shareArea: FieldRef<"OwnershipRight", 'Float'>
    readonly titleDocument: FieldRef<"OwnershipRight", 'String'>
    readonly registrationDate: FieldRef<"OwnershipRight", 'String'>
    readonly basisDocument: FieldRef<"OwnershipRight", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OwnershipRight findUnique
   */
  export type OwnershipRightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter, which OwnershipRight to fetch.
     */
    where: OwnershipRightWhereUniqueInput
  }

  /**
   * OwnershipRight findUniqueOrThrow
   */
  export type OwnershipRightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter, which OwnershipRight to fetch.
     */
    where: OwnershipRightWhereUniqueInput
  }

  /**
   * OwnershipRight findFirst
   */
  export type OwnershipRightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter, which OwnershipRight to fetch.
     */
    where?: OwnershipRightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnershipRights to fetch.
     */
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnershipRights.
     */
    cursor?: OwnershipRightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnershipRights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnershipRights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnershipRights.
     */
    distinct?: OwnershipRightScalarFieldEnum | OwnershipRightScalarFieldEnum[]
  }

  /**
   * OwnershipRight findFirstOrThrow
   */
  export type OwnershipRightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter, which OwnershipRight to fetch.
     */
    where?: OwnershipRightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnershipRights to fetch.
     */
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnershipRights.
     */
    cursor?: OwnershipRightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnershipRights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnershipRights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnershipRights.
     */
    distinct?: OwnershipRightScalarFieldEnum | OwnershipRightScalarFieldEnum[]
  }

  /**
   * OwnershipRight findMany
   */
  export type OwnershipRightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter, which OwnershipRights to fetch.
     */
    where?: OwnershipRightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnershipRights to fetch.
     */
    orderBy?: OwnershipRightOrderByWithRelationInput | OwnershipRightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OwnershipRights.
     */
    cursor?: OwnershipRightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnershipRights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnershipRights.
     */
    skip?: number
    distinct?: OwnershipRightScalarFieldEnum | OwnershipRightScalarFieldEnum[]
  }

  /**
   * OwnershipRight create
   */
  export type OwnershipRightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * The data needed to create a OwnershipRight.
     */
    data: XOR<OwnershipRightCreateInput, OwnershipRightUncheckedCreateInput>
  }

  /**
   * OwnershipRight createMany
   */
  export type OwnershipRightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OwnershipRights.
     */
    data: OwnershipRightCreateManyInput | OwnershipRightCreateManyInput[]
  }

  /**
   * OwnershipRight update
   */
  export type OwnershipRightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * The data needed to update a OwnershipRight.
     */
    data: XOR<OwnershipRightUpdateInput, OwnershipRightUncheckedUpdateInput>
    /**
     * Choose, which OwnershipRight to update.
     */
    where: OwnershipRightWhereUniqueInput
  }

  /**
   * OwnershipRight updateMany
   */
  export type OwnershipRightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OwnershipRights.
     */
    data: XOR<OwnershipRightUpdateManyMutationInput, OwnershipRightUncheckedUpdateManyInput>
    /**
     * Filter which OwnershipRights to update
     */
    where?: OwnershipRightWhereInput
    /**
     * Limit how many OwnershipRights to update.
     */
    limit?: number
  }

  /**
   * OwnershipRight upsert
   */
  export type OwnershipRightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * The filter to search for the OwnershipRight to update in case it exists.
     */
    where: OwnershipRightWhereUniqueInput
    /**
     * In case the OwnershipRight found by the `where` argument doesn't exist, create a new OwnershipRight with this data.
     */
    create: XOR<OwnershipRightCreateInput, OwnershipRightUncheckedCreateInput>
    /**
     * In case the OwnershipRight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OwnershipRightUpdateInput, OwnershipRightUncheckedUpdateInput>
  }

  /**
   * OwnershipRight delete
   */
  export type OwnershipRightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
    /**
     * Filter which OwnershipRight to delete.
     */
    where: OwnershipRightWhereUniqueInput
  }

  /**
   * OwnershipRight deleteMany
   */
  export type OwnershipRightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OwnershipRights to delete
     */
    where?: OwnershipRightWhereInput
    /**
     * Limit how many OwnershipRights to delete.
     */
    limit?: number
  }

  /**
   * OwnershipRight without action
   */
  export type OwnershipRightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnershipRight
     */
    select?: OwnershipRightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnershipRight
     */
    omit?: OwnershipRightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnershipRightInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    isActive: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    isActive: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: string | null
    isActive: number | null
    lastLogin: string | null
    createdAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: string | null
    isActive: number | null
    lastLogin: string | null
    createdAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    role: number
    isActive: number
    lastLogin: number
    createdAt: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    isActive?: true
  }

  export type EmployeeSumAggregateInputType = {
    isActive?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive: number
    lastLogin: string | null
    createdAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    buildingAccess?: boolean | Employee$buildingAccessArgs<ExtArgs>
    createdQuestions?: boolean | Employee$createdQuestionsArgs<ExtArgs>
    initiatedMeetings?: boolean | Employee$initiatedMeetingsArgs<ExtArgs>
    auditLogs?: boolean | Employee$auditLogsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>



  export type EmployeeSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "fullName" | "role" | "isActive" | "lastLogin" | "createdAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    buildingAccess?: boolean | Employee$buildingAccessArgs<ExtArgs>
    createdQuestions?: boolean | Employee$createdQuestionsArgs<ExtArgs>
    initiatedMeetings?: boolean | Employee$initiatedMeetingsArgs<ExtArgs>
    auditLogs?: boolean | Employee$auditLogsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      buildingAccess: Prisma.$EmployeeBuildingAccessPayload<ExtArgs>[]
      createdQuestions: Prisma.$QuestionLibraryPayload<ExtArgs>[]
      initiatedMeetings: Prisma.$MeetingPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      role: string
      isActive: number
      lastLogin: string | null
      createdAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    buildingAccess<T extends Employee$buildingAccessArgs<ExtArgs> = {}>(args?: Subset<T, Employee$buildingAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdQuestions<T extends Employee$createdQuestionsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$createdQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    initiatedMeetings<T extends Employee$initiatedMeetingsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$initiatedMeetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Employee$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly passwordHash: FieldRef<"Employee", 'String'>
    readonly fullName: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'String'>
    readonly isActive: FieldRef<"Employee", 'Int'>
    readonly lastLogin: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.buildingAccess
   */
  export type Employee$buildingAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    where?: EmployeeBuildingAccessWhereInput
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeBuildingAccessScalarFieldEnum | EmployeeBuildingAccessScalarFieldEnum[]
  }

  /**
   * Employee.createdQuestions
   */
  export type Employee$createdQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    where?: QuestionLibraryWhereInput
    orderBy?: QuestionLibraryOrderByWithRelationInput | QuestionLibraryOrderByWithRelationInput[]
    cursor?: QuestionLibraryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionLibraryScalarFieldEnum | QuestionLibraryScalarFieldEnum[]
  }

  /**
   * Employee.initiatedMeetings
   */
  export type Employee$initiatedMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Employee.auditLogs
   */
  export type Employee$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeBuildingAccess
   */

  export type AggregateEmployeeBuildingAccess = {
    _count: EmployeeBuildingAccessCountAggregateOutputType | null
    _min: EmployeeBuildingAccessMinAggregateOutputType | null
    _max: EmployeeBuildingAccessMaxAggregateOutputType | null
  }

  export type EmployeeBuildingAccessMinAggregateOutputType = {
    employeeId: string | null
    buildingId: string | null
  }

  export type EmployeeBuildingAccessMaxAggregateOutputType = {
    employeeId: string | null
    buildingId: string | null
  }

  export type EmployeeBuildingAccessCountAggregateOutputType = {
    employeeId: number
    buildingId: number
    _all: number
  }


  export type EmployeeBuildingAccessMinAggregateInputType = {
    employeeId?: true
    buildingId?: true
  }

  export type EmployeeBuildingAccessMaxAggregateInputType = {
    employeeId?: true
    buildingId?: true
  }

  export type EmployeeBuildingAccessCountAggregateInputType = {
    employeeId?: true
    buildingId?: true
    _all?: true
  }

  export type EmployeeBuildingAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeBuildingAccess to aggregate.
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeBuildingAccesses to fetch.
     */
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeBuildingAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeBuildingAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeBuildingAccesses
    **/
    _count?: true | EmployeeBuildingAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeBuildingAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeBuildingAccessMaxAggregateInputType
  }

  export type GetEmployeeBuildingAccessAggregateType<T extends EmployeeBuildingAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeBuildingAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeBuildingAccess[P]>
      : GetScalarType<T[P], AggregateEmployeeBuildingAccess[P]>
  }




  export type EmployeeBuildingAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeBuildingAccessWhereInput
    orderBy?: EmployeeBuildingAccessOrderByWithAggregationInput | EmployeeBuildingAccessOrderByWithAggregationInput[]
    by: EmployeeBuildingAccessScalarFieldEnum[] | EmployeeBuildingAccessScalarFieldEnum
    having?: EmployeeBuildingAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeBuildingAccessCountAggregateInputType | true
    _min?: EmployeeBuildingAccessMinAggregateInputType
    _max?: EmployeeBuildingAccessMaxAggregateInputType
  }

  export type EmployeeBuildingAccessGroupByOutputType = {
    employeeId: string
    buildingId: string
    _count: EmployeeBuildingAccessCountAggregateOutputType | null
    _min: EmployeeBuildingAccessMinAggregateOutputType | null
    _max: EmployeeBuildingAccessMaxAggregateOutputType | null
  }

  type GetEmployeeBuildingAccessGroupByPayload<T extends EmployeeBuildingAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeBuildingAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeBuildingAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeBuildingAccessGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeBuildingAccessGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeBuildingAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employeeId?: boolean
    buildingId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeBuildingAccess"]>



  export type EmployeeBuildingAccessSelectScalar = {
    employeeId?: boolean
    buildingId?: boolean
  }

  export type EmployeeBuildingAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"employeeId" | "buildingId", ExtArgs["result"]["employeeBuildingAccess"]>
  export type EmployeeBuildingAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }

  export type $EmployeeBuildingAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeBuildingAccess"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
      building: Prisma.$BuildingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      employeeId: string
      buildingId: string
    }, ExtArgs["result"]["employeeBuildingAccess"]>
    composites: {}
  }

  type EmployeeBuildingAccessGetPayload<S extends boolean | null | undefined | EmployeeBuildingAccessDefaultArgs> = $Result.GetResult<Prisma.$EmployeeBuildingAccessPayload, S>

  type EmployeeBuildingAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeBuildingAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeBuildingAccessCountAggregateInputType | true
    }

  export interface EmployeeBuildingAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeBuildingAccess'], meta: { name: 'EmployeeBuildingAccess' } }
    /**
     * Find zero or one EmployeeBuildingAccess that matches the filter.
     * @param {EmployeeBuildingAccessFindUniqueArgs} args - Arguments to find a EmployeeBuildingAccess
     * @example
     * // Get one EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeBuildingAccessFindUniqueArgs>(args: SelectSubset<T, EmployeeBuildingAccessFindUniqueArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeBuildingAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeBuildingAccessFindUniqueOrThrowArgs} args - Arguments to find a EmployeeBuildingAccess
     * @example
     * // Get one EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeBuildingAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeBuildingAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeBuildingAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessFindFirstArgs} args - Arguments to find a EmployeeBuildingAccess
     * @example
     * // Get one EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeBuildingAccessFindFirstArgs>(args?: SelectSubset<T, EmployeeBuildingAccessFindFirstArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeBuildingAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessFindFirstOrThrowArgs} args - Arguments to find a EmployeeBuildingAccess
     * @example
     * // Get one EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeBuildingAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeBuildingAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeBuildingAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeBuildingAccesses
     * const employeeBuildingAccesses = await prisma.employeeBuildingAccess.findMany()
     * 
     * // Get first 10 EmployeeBuildingAccesses
     * const employeeBuildingAccesses = await prisma.employeeBuildingAccess.findMany({ take: 10 })
     * 
     * // Only select the `employeeId`
     * const employeeBuildingAccessWithEmployeeIdOnly = await prisma.employeeBuildingAccess.findMany({ select: { employeeId: true } })
     * 
     */
    findMany<T extends EmployeeBuildingAccessFindManyArgs>(args?: SelectSubset<T, EmployeeBuildingAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeBuildingAccess.
     * @param {EmployeeBuildingAccessCreateArgs} args - Arguments to create a EmployeeBuildingAccess.
     * @example
     * // Create one EmployeeBuildingAccess
     * const EmployeeBuildingAccess = await prisma.employeeBuildingAccess.create({
     *   data: {
     *     // ... data to create a EmployeeBuildingAccess
     *   }
     * })
     * 
     */
    create<T extends EmployeeBuildingAccessCreateArgs>(args: SelectSubset<T, EmployeeBuildingAccessCreateArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeBuildingAccesses.
     * @param {EmployeeBuildingAccessCreateManyArgs} args - Arguments to create many EmployeeBuildingAccesses.
     * @example
     * // Create many EmployeeBuildingAccesses
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeBuildingAccessCreateManyArgs>(args?: SelectSubset<T, EmployeeBuildingAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmployeeBuildingAccess.
     * @param {EmployeeBuildingAccessDeleteArgs} args - Arguments to delete one EmployeeBuildingAccess.
     * @example
     * // Delete one EmployeeBuildingAccess
     * const EmployeeBuildingAccess = await prisma.employeeBuildingAccess.delete({
     *   where: {
     *     // ... filter to delete one EmployeeBuildingAccess
     *   }
     * })
     * 
     */
    delete<T extends EmployeeBuildingAccessDeleteArgs>(args: SelectSubset<T, EmployeeBuildingAccessDeleteArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeBuildingAccess.
     * @param {EmployeeBuildingAccessUpdateArgs} args - Arguments to update one EmployeeBuildingAccess.
     * @example
     * // Update one EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeBuildingAccessUpdateArgs>(args: SelectSubset<T, EmployeeBuildingAccessUpdateArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeBuildingAccesses.
     * @param {EmployeeBuildingAccessDeleteManyArgs} args - Arguments to filter EmployeeBuildingAccesses to delete.
     * @example
     * // Delete a few EmployeeBuildingAccesses
     * const { count } = await prisma.employeeBuildingAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeBuildingAccessDeleteManyArgs>(args?: SelectSubset<T, EmployeeBuildingAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeBuildingAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeBuildingAccesses
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeBuildingAccessUpdateManyArgs>(args: SelectSubset<T, EmployeeBuildingAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeBuildingAccess.
     * @param {EmployeeBuildingAccessUpsertArgs} args - Arguments to update or create a EmployeeBuildingAccess.
     * @example
     * // Update or create a EmployeeBuildingAccess
     * const employeeBuildingAccess = await prisma.employeeBuildingAccess.upsert({
     *   create: {
     *     // ... data to create a EmployeeBuildingAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeBuildingAccess we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeBuildingAccessUpsertArgs>(args: SelectSubset<T, EmployeeBuildingAccessUpsertArgs<ExtArgs>>): Prisma__EmployeeBuildingAccessClient<$Result.GetResult<Prisma.$EmployeeBuildingAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeBuildingAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessCountArgs} args - Arguments to filter EmployeeBuildingAccesses to count.
     * @example
     * // Count the number of EmployeeBuildingAccesses
     * const count = await prisma.employeeBuildingAccess.count({
     *   where: {
     *     // ... the filter for the EmployeeBuildingAccesses we want to count
     *   }
     * })
    **/
    count<T extends EmployeeBuildingAccessCountArgs>(
      args?: Subset<T, EmployeeBuildingAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeBuildingAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeBuildingAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeBuildingAccessAggregateArgs>(args: Subset<T, EmployeeBuildingAccessAggregateArgs>): Prisma.PrismaPromise<GetEmployeeBuildingAccessAggregateType<T>>

    /**
     * Group by EmployeeBuildingAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeBuildingAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeBuildingAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeBuildingAccessGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeBuildingAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeBuildingAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeBuildingAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeBuildingAccess model
   */
  readonly fields: EmployeeBuildingAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeBuildingAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeBuildingAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    building<T extends BuildingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BuildingDefaultArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeBuildingAccess model
   */
  interface EmployeeBuildingAccessFieldRefs {
    readonly employeeId: FieldRef<"EmployeeBuildingAccess", 'String'>
    readonly buildingId: FieldRef<"EmployeeBuildingAccess", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeBuildingAccess findUnique
   */
  export type EmployeeBuildingAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeBuildingAccess to fetch.
     */
    where: EmployeeBuildingAccessWhereUniqueInput
  }

  /**
   * EmployeeBuildingAccess findUniqueOrThrow
   */
  export type EmployeeBuildingAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeBuildingAccess to fetch.
     */
    where: EmployeeBuildingAccessWhereUniqueInput
  }

  /**
   * EmployeeBuildingAccess findFirst
   */
  export type EmployeeBuildingAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeBuildingAccess to fetch.
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeBuildingAccesses to fetch.
     */
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeBuildingAccesses.
     */
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeBuildingAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeBuildingAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeBuildingAccesses.
     */
    distinct?: EmployeeBuildingAccessScalarFieldEnum | EmployeeBuildingAccessScalarFieldEnum[]
  }

  /**
   * EmployeeBuildingAccess findFirstOrThrow
   */
  export type EmployeeBuildingAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeBuildingAccess to fetch.
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeBuildingAccesses to fetch.
     */
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeBuildingAccesses.
     */
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeBuildingAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeBuildingAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeBuildingAccesses.
     */
    distinct?: EmployeeBuildingAccessScalarFieldEnum | EmployeeBuildingAccessScalarFieldEnum[]
  }

  /**
   * EmployeeBuildingAccess findMany
   */
  export type EmployeeBuildingAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeBuildingAccesses to fetch.
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeBuildingAccesses to fetch.
     */
    orderBy?: EmployeeBuildingAccessOrderByWithRelationInput | EmployeeBuildingAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeBuildingAccesses.
     */
    cursor?: EmployeeBuildingAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeBuildingAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeBuildingAccesses.
     */
    skip?: number
    distinct?: EmployeeBuildingAccessScalarFieldEnum | EmployeeBuildingAccessScalarFieldEnum[]
  }

  /**
   * EmployeeBuildingAccess create
   */
  export type EmployeeBuildingAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeBuildingAccess.
     */
    data: XOR<EmployeeBuildingAccessCreateInput, EmployeeBuildingAccessUncheckedCreateInput>
  }

  /**
   * EmployeeBuildingAccess createMany
   */
  export type EmployeeBuildingAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeBuildingAccesses.
     */
    data: EmployeeBuildingAccessCreateManyInput | EmployeeBuildingAccessCreateManyInput[]
  }

  /**
   * EmployeeBuildingAccess update
   */
  export type EmployeeBuildingAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeBuildingAccess.
     */
    data: XOR<EmployeeBuildingAccessUpdateInput, EmployeeBuildingAccessUncheckedUpdateInput>
    /**
     * Choose, which EmployeeBuildingAccess to update.
     */
    where: EmployeeBuildingAccessWhereUniqueInput
  }

  /**
   * EmployeeBuildingAccess updateMany
   */
  export type EmployeeBuildingAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeBuildingAccesses.
     */
    data: XOR<EmployeeBuildingAccessUpdateManyMutationInput, EmployeeBuildingAccessUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeBuildingAccesses to update
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * Limit how many EmployeeBuildingAccesses to update.
     */
    limit?: number
  }

  /**
   * EmployeeBuildingAccess upsert
   */
  export type EmployeeBuildingAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeBuildingAccess to update in case it exists.
     */
    where: EmployeeBuildingAccessWhereUniqueInput
    /**
     * In case the EmployeeBuildingAccess found by the `where` argument doesn't exist, create a new EmployeeBuildingAccess with this data.
     */
    create: XOR<EmployeeBuildingAccessCreateInput, EmployeeBuildingAccessUncheckedCreateInput>
    /**
     * In case the EmployeeBuildingAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeBuildingAccessUpdateInput, EmployeeBuildingAccessUncheckedUpdateInput>
  }

  /**
   * EmployeeBuildingAccess delete
   */
  export type EmployeeBuildingAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
    /**
     * Filter which EmployeeBuildingAccess to delete.
     */
    where: EmployeeBuildingAccessWhereUniqueInput
  }

  /**
   * EmployeeBuildingAccess deleteMany
   */
  export type EmployeeBuildingAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeBuildingAccesses to delete
     */
    where?: EmployeeBuildingAccessWhereInput
    /**
     * Limit how many EmployeeBuildingAccesses to delete.
     */
    limit?: number
  }

  /**
   * EmployeeBuildingAccess without action
   */
  export type EmployeeBuildingAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeBuildingAccess
     */
    select?: EmployeeBuildingAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeBuildingAccess
     */
    omit?: EmployeeBuildingAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeBuildingAccessInclude<ExtArgs> | null
  }


  /**
   * Model QuestionLibrary
   */

  export type AggregateQuestionLibrary = {
    _count: QuestionLibraryCountAggregateOutputType | null
    _min: QuestionLibraryMinAggregateOutputType | null
    _max: QuestionLibraryMaxAggregateOutputType | null
  }

  export type QuestionLibraryMinAggregateOutputType = {
    id: string | null
    shortTitle: string | null
    protocolText: string | null
    bulletinText: string | null
    quorumType: string | null
    category: string | null
    tags: string | null
    createdByEmployeeId: string | null
    createdAt: Date | null
  }

  export type QuestionLibraryMaxAggregateOutputType = {
    id: string | null
    shortTitle: string | null
    protocolText: string | null
    bulletinText: string | null
    quorumType: string | null
    category: string | null
    tags: string | null
    createdByEmployeeId: string | null
    createdAt: Date | null
  }

  export type QuestionLibraryCountAggregateOutputType = {
    id: number
    shortTitle: number
    protocolText: number
    bulletinText: number
    quorumType: number
    category: number
    tags: number
    createdByEmployeeId: number
    createdAt: number
    _all: number
  }


  export type QuestionLibraryMinAggregateInputType = {
    id?: true
    shortTitle?: true
    protocolText?: true
    bulletinText?: true
    quorumType?: true
    category?: true
    tags?: true
    createdByEmployeeId?: true
    createdAt?: true
  }

  export type QuestionLibraryMaxAggregateInputType = {
    id?: true
    shortTitle?: true
    protocolText?: true
    bulletinText?: true
    quorumType?: true
    category?: true
    tags?: true
    createdByEmployeeId?: true
    createdAt?: true
  }

  export type QuestionLibraryCountAggregateInputType = {
    id?: true
    shortTitle?: true
    protocolText?: true
    bulletinText?: true
    quorumType?: true
    category?: true
    tags?: true
    createdByEmployeeId?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionLibraryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionLibrary to aggregate.
     */
    where?: QuestionLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionLibraries to fetch.
     */
    orderBy?: QuestionLibraryOrderByWithRelationInput | QuestionLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionLibraries
    **/
    _count?: true | QuestionLibraryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionLibraryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionLibraryMaxAggregateInputType
  }

  export type GetQuestionLibraryAggregateType<T extends QuestionLibraryAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionLibrary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionLibrary[P]>
      : GetScalarType<T[P], AggregateQuestionLibrary[P]>
  }




  export type QuestionLibraryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionLibraryWhereInput
    orderBy?: QuestionLibraryOrderByWithAggregationInput | QuestionLibraryOrderByWithAggregationInput[]
    by: QuestionLibraryScalarFieldEnum[] | QuestionLibraryScalarFieldEnum
    having?: QuestionLibraryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionLibraryCountAggregateInputType | true
    _min?: QuestionLibraryMinAggregateInputType
    _max?: QuestionLibraryMaxAggregateInputType
  }

  export type QuestionLibraryGroupByOutputType = {
    id: string
    shortTitle: string
    protocolText: string | null
    bulletinText: string | null
    quorumType: string | null
    category: string | null
    tags: string | null
    createdByEmployeeId: string | null
    createdAt: Date
    _count: QuestionLibraryCountAggregateOutputType | null
    _min: QuestionLibraryMinAggregateOutputType | null
    _max: QuestionLibraryMaxAggregateOutputType | null
  }

  type GetQuestionLibraryGroupByPayload<T extends QuestionLibraryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionLibraryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionLibraryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionLibraryGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionLibraryGroupByOutputType[P]>
        }
      >
    >


  export type QuestionLibrarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortTitle?: boolean
    protocolText?: boolean
    bulletinText?: boolean
    quorumType?: boolean
    category?: boolean
    tags?: boolean
    createdByEmployeeId?: boolean
    createdAt?: boolean
    createdBy?: boolean | QuestionLibrary$createdByArgs<ExtArgs>
    agendaItems?: boolean | QuestionLibrary$agendaItemsArgs<ExtArgs>
    _count?: boolean | QuestionLibraryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionLibrary"]>



  export type QuestionLibrarySelectScalar = {
    id?: boolean
    shortTitle?: boolean
    protocolText?: boolean
    bulletinText?: boolean
    quorumType?: boolean
    category?: boolean
    tags?: boolean
    createdByEmployeeId?: boolean
    createdAt?: boolean
  }

  export type QuestionLibraryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shortTitle" | "protocolText" | "bulletinText" | "quorumType" | "category" | "tags" | "createdByEmployeeId" | "createdAt", ExtArgs["result"]["questionLibrary"]>
  export type QuestionLibraryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | QuestionLibrary$createdByArgs<ExtArgs>
    agendaItems?: boolean | QuestionLibrary$agendaItemsArgs<ExtArgs>
    _count?: boolean | QuestionLibraryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $QuestionLibraryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionLibrary"
    objects: {
      createdBy: Prisma.$EmployeePayload<ExtArgs> | null
      agendaItems: Prisma.$AgendaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shortTitle: string
      protocolText: string | null
      bulletinText: string | null
      quorumType: string | null
      category: string | null
      tags: string | null
      createdByEmployeeId: string | null
      createdAt: Date
    }, ExtArgs["result"]["questionLibrary"]>
    composites: {}
  }

  type QuestionLibraryGetPayload<S extends boolean | null | undefined | QuestionLibraryDefaultArgs> = $Result.GetResult<Prisma.$QuestionLibraryPayload, S>

  type QuestionLibraryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionLibraryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionLibraryCountAggregateInputType | true
    }

  export interface QuestionLibraryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionLibrary'], meta: { name: 'QuestionLibrary' } }
    /**
     * Find zero or one QuestionLibrary that matches the filter.
     * @param {QuestionLibraryFindUniqueArgs} args - Arguments to find a QuestionLibrary
     * @example
     * // Get one QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionLibraryFindUniqueArgs>(args: SelectSubset<T, QuestionLibraryFindUniqueArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionLibrary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionLibraryFindUniqueOrThrowArgs} args - Arguments to find a QuestionLibrary
     * @example
     * // Get one QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionLibraryFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionLibraryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionLibrary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryFindFirstArgs} args - Arguments to find a QuestionLibrary
     * @example
     * // Get one QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionLibraryFindFirstArgs>(args?: SelectSubset<T, QuestionLibraryFindFirstArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionLibrary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryFindFirstOrThrowArgs} args - Arguments to find a QuestionLibrary
     * @example
     * // Get one QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionLibraryFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionLibraryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionLibraries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionLibraries
     * const questionLibraries = await prisma.questionLibrary.findMany()
     * 
     * // Get first 10 QuestionLibraries
     * const questionLibraries = await prisma.questionLibrary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionLibraryWithIdOnly = await prisma.questionLibrary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionLibraryFindManyArgs>(args?: SelectSubset<T, QuestionLibraryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionLibrary.
     * @param {QuestionLibraryCreateArgs} args - Arguments to create a QuestionLibrary.
     * @example
     * // Create one QuestionLibrary
     * const QuestionLibrary = await prisma.questionLibrary.create({
     *   data: {
     *     // ... data to create a QuestionLibrary
     *   }
     * })
     * 
     */
    create<T extends QuestionLibraryCreateArgs>(args: SelectSubset<T, QuestionLibraryCreateArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionLibraries.
     * @param {QuestionLibraryCreateManyArgs} args - Arguments to create many QuestionLibraries.
     * @example
     * // Create many QuestionLibraries
     * const questionLibrary = await prisma.questionLibrary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionLibraryCreateManyArgs>(args?: SelectSubset<T, QuestionLibraryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QuestionLibrary.
     * @param {QuestionLibraryDeleteArgs} args - Arguments to delete one QuestionLibrary.
     * @example
     * // Delete one QuestionLibrary
     * const QuestionLibrary = await prisma.questionLibrary.delete({
     *   where: {
     *     // ... filter to delete one QuestionLibrary
     *   }
     * })
     * 
     */
    delete<T extends QuestionLibraryDeleteArgs>(args: SelectSubset<T, QuestionLibraryDeleteArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionLibrary.
     * @param {QuestionLibraryUpdateArgs} args - Arguments to update one QuestionLibrary.
     * @example
     * // Update one QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionLibraryUpdateArgs>(args: SelectSubset<T, QuestionLibraryUpdateArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionLibraries.
     * @param {QuestionLibraryDeleteManyArgs} args - Arguments to filter QuestionLibraries to delete.
     * @example
     * // Delete a few QuestionLibraries
     * const { count } = await prisma.questionLibrary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionLibraryDeleteManyArgs>(args?: SelectSubset<T, QuestionLibraryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionLibraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionLibraries
     * const questionLibrary = await prisma.questionLibrary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionLibraryUpdateManyArgs>(args: SelectSubset<T, QuestionLibraryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuestionLibrary.
     * @param {QuestionLibraryUpsertArgs} args - Arguments to update or create a QuestionLibrary.
     * @example
     * // Update or create a QuestionLibrary
     * const questionLibrary = await prisma.questionLibrary.upsert({
     *   create: {
     *     // ... data to create a QuestionLibrary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionLibrary we want to update
     *   }
     * })
     */
    upsert<T extends QuestionLibraryUpsertArgs>(args: SelectSubset<T, QuestionLibraryUpsertArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionLibraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryCountArgs} args - Arguments to filter QuestionLibraries to count.
     * @example
     * // Count the number of QuestionLibraries
     * const count = await prisma.questionLibrary.count({
     *   where: {
     *     // ... the filter for the QuestionLibraries we want to count
     *   }
     * })
    **/
    count<T extends QuestionLibraryCountArgs>(
      args?: Subset<T, QuestionLibraryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionLibraryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionLibrary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionLibraryAggregateArgs>(args: Subset<T, QuestionLibraryAggregateArgs>): Prisma.PrismaPromise<GetQuestionLibraryAggregateType<T>>

    /**
     * Group by QuestionLibrary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionLibraryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionLibraryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionLibraryGroupByArgs['orderBy'] }
        : { orderBy?: QuestionLibraryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionLibraryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionLibraryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionLibrary model
   */
  readonly fields: QuestionLibraryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionLibrary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionLibraryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends QuestionLibrary$createdByArgs<ExtArgs> = {}>(args?: Subset<T, QuestionLibrary$createdByArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agendaItems<T extends QuestionLibrary$agendaItemsArgs<ExtArgs> = {}>(args?: Subset<T, QuestionLibrary$agendaItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionLibrary model
   */
  interface QuestionLibraryFieldRefs {
    readonly id: FieldRef<"QuestionLibrary", 'String'>
    readonly shortTitle: FieldRef<"QuestionLibrary", 'String'>
    readonly protocolText: FieldRef<"QuestionLibrary", 'String'>
    readonly bulletinText: FieldRef<"QuestionLibrary", 'String'>
    readonly quorumType: FieldRef<"QuestionLibrary", 'String'>
    readonly category: FieldRef<"QuestionLibrary", 'String'>
    readonly tags: FieldRef<"QuestionLibrary", 'String'>
    readonly createdByEmployeeId: FieldRef<"QuestionLibrary", 'String'>
    readonly createdAt: FieldRef<"QuestionLibrary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuestionLibrary findUnique
   */
  export type QuestionLibraryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionLibrary to fetch.
     */
    where: QuestionLibraryWhereUniqueInput
  }

  /**
   * QuestionLibrary findUniqueOrThrow
   */
  export type QuestionLibraryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionLibrary to fetch.
     */
    where: QuestionLibraryWhereUniqueInput
  }

  /**
   * QuestionLibrary findFirst
   */
  export type QuestionLibraryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionLibrary to fetch.
     */
    where?: QuestionLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionLibraries to fetch.
     */
    orderBy?: QuestionLibraryOrderByWithRelationInput | QuestionLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionLibraries.
     */
    cursor?: QuestionLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionLibraries.
     */
    distinct?: QuestionLibraryScalarFieldEnum | QuestionLibraryScalarFieldEnum[]
  }

  /**
   * QuestionLibrary findFirstOrThrow
   */
  export type QuestionLibraryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionLibrary to fetch.
     */
    where?: QuestionLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionLibraries to fetch.
     */
    orderBy?: QuestionLibraryOrderByWithRelationInput | QuestionLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionLibraries.
     */
    cursor?: QuestionLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionLibraries.
     */
    distinct?: QuestionLibraryScalarFieldEnum | QuestionLibraryScalarFieldEnum[]
  }

  /**
   * QuestionLibrary findMany
   */
  export type QuestionLibraryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionLibraries to fetch.
     */
    where?: QuestionLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionLibraries to fetch.
     */
    orderBy?: QuestionLibraryOrderByWithRelationInput | QuestionLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionLibraries.
     */
    cursor?: QuestionLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionLibraries.
     */
    skip?: number
    distinct?: QuestionLibraryScalarFieldEnum | QuestionLibraryScalarFieldEnum[]
  }

  /**
   * QuestionLibrary create
   */
  export type QuestionLibraryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionLibrary.
     */
    data: XOR<QuestionLibraryCreateInput, QuestionLibraryUncheckedCreateInput>
  }

  /**
   * QuestionLibrary createMany
   */
  export type QuestionLibraryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionLibraries.
     */
    data: QuestionLibraryCreateManyInput | QuestionLibraryCreateManyInput[]
  }

  /**
   * QuestionLibrary update
   */
  export type QuestionLibraryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionLibrary.
     */
    data: XOR<QuestionLibraryUpdateInput, QuestionLibraryUncheckedUpdateInput>
    /**
     * Choose, which QuestionLibrary to update.
     */
    where: QuestionLibraryWhereUniqueInput
  }

  /**
   * QuestionLibrary updateMany
   */
  export type QuestionLibraryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionLibraries.
     */
    data: XOR<QuestionLibraryUpdateManyMutationInput, QuestionLibraryUncheckedUpdateManyInput>
    /**
     * Filter which QuestionLibraries to update
     */
    where?: QuestionLibraryWhereInput
    /**
     * Limit how many QuestionLibraries to update.
     */
    limit?: number
  }

  /**
   * QuestionLibrary upsert
   */
  export type QuestionLibraryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionLibrary to update in case it exists.
     */
    where: QuestionLibraryWhereUniqueInput
    /**
     * In case the QuestionLibrary found by the `where` argument doesn't exist, create a new QuestionLibrary with this data.
     */
    create: XOR<QuestionLibraryCreateInput, QuestionLibraryUncheckedCreateInput>
    /**
     * In case the QuestionLibrary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionLibraryUpdateInput, QuestionLibraryUncheckedUpdateInput>
  }

  /**
   * QuestionLibrary delete
   */
  export type QuestionLibraryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    /**
     * Filter which QuestionLibrary to delete.
     */
    where: QuestionLibraryWhereUniqueInput
  }

  /**
   * QuestionLibrary deleteMany
   */
  export type QuestionLibraryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionLibraries to delete
     */
    where?: QuestionLibraryWhereInput
    /**
     * Limit how many QuestionLibraries to delete.
     */
    limit?: number
  }

  /**
   * QuestionLibrary.createdBy
   */
  export type QuestionLibrary$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * QuestionLibrary.agendaItems
   */
  export type QuestionLibrary$agendaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    where?: AgendaItemWhereInput
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    cursor?: AgendaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendaItemScalarFieldEnum | AgendaItemScalarFieldEnum[]
  }

  /**
   * QuestionLibrary without action
   */
  export type QuestionLibraryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
  }


  /**
   * Model Meeting
   */

  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    number: string | null
    status: string | null
    form: string | null
    startDate: string | null
    endDate: string | null
    inPersonStartTime: string | null
    inPersonAddress: string | null
    ballotAcceptanceAddress: string | null
    noticeAddress: string | null
    resultsDate: string | null
    initiatorEmployeeId: string | null
    extensionReason: string | null
    createdAt: Date | null
    activatedAt: string | null
    completedAt: string | null
    archivedAt: string | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    number: string | null
    status: string | null
    form: string | null
    startDate: string | null
    endDate: string | null
    inPersonStartTime: string | null
    inPersonAddress: string | null
    ballotAcceptanceAddress: string | null
    noticeAddress: string | null
    resultsDate: string | null
    initiatorEmployeeId: string | null
    extensionReason: string | null
    createdAt: Date | null
    activatedAt: string | null
    completedAt: string | null
    archivedAt: string | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    buildingId: number
    number: number
    status: number
    form: number
    startDate: number
    endDate: number
    inPersonStartTime: number
    inPersonAddress: number
    ballotAcceptanceAddress: number
    noticeAddress: number
    resultsDate: number
    initiatorEmployeeId: number
    extensionReason: number
    createdAt: number
    activatedAt: number
    completedAt: number
    archivedAt: number
    _all: number
  }


  export type MeetingMinAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    status?: true
    form?: true
    startDate?: true
    endDate?: true
    inPersonStartTime?: true
    inPersonAddress?: true
    ballotAcceptanceAddress?: true
    noticeAddress?: true
    resultsDate?: true
    initiatorEmployeeId?: true
    extensionReason?: true
    createdAt?: true
    activatedAt?: true
    completedAt?: true
    archivedAt?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    status?: true
    form?: true
    startDate?: true
    endDate?: true
    inPersonStartTime?: true
    inPersonAddress?: true
    ballotAcceptanceAddress?: true
    noticeAddress?: true
    resultsDate?: true
    initiatorEmployeeId?: true
    extensionReason?: true
    createdAt?: true
    activatedAt?: true
    completedAt?: true
    archivedAt?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    buildingId?: true
    number?: true
    status?: true
    form?: true
    startDate?: true
    endDate?: true
    inPersonStartTime?: true
    inPersonAddress?: true
    ballotAcceptanceAddress?: true
    noticeAddress?: true
    resultsDate?: true
    initiatorEmployeeId?: true
    extensionReason?: true
    createdAt?: true
    activatedAt?: true
    completedAt?: true
    archivedAt?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithAggregationInput | MeetingOrderByWithAggregationInput[]
    by: MeetingScalarFieldEnum[] | MeetingScalarFieldEnum
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }

  export type MeetingGroupByOutputType = {
    id: string
    buildingId: string
    number: string
    status: string
    form: string
    startDate: string
    endDate: string | null
    inPersonStartTime: string | null
    inPersonAddress: string | null
    ballotAcceptanceAddress: string | null
    noticeAddress: string | null
    resultsDate: string | null
    initiatorEmployeeId: string | null
    extensionReason: string | null
    createdAt: Date
    activatedAt: string | null
    completedAt: string | null
    archivedAt: string | null
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    number?: boolean
    status?: boolean
    form?: boolean
    startDate?: boolean
    endDate?: boolean
    inPersonStartTime?: boolean
    inPersonAddress?: boolean
    ballotAcceptanceAddress?: boolean
    noticeAddress?: boolean
    resultsDate?: boolean
    initiatorEmployeeId?: boolean
    extensionReason?: boolean
    createdAt?: boolean
    activatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    initiator?: boolean | Meeting$initiatorArgs<ExtArgs>
    agendaItems?: boolean | Meeting$agendaItemsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>



  export type MeetingSelectScalar = {
    id?: boolean
    buildingId?: boolean
    number?: boolean
    status?: boolean
    form?: boolean
    startDate?: boolean
    endDate?: boolean
    inPersonStartTime?: boolean
    inPersonAddress?: boolean
    ballotAcceptanceAddress?: boolean
    noticeAddress?: boolean
    resultsDate?: boolean
    initiatorEmployeeId?: boolean
    extensionReason?: boolean
    createdAt?: boolean
    activatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
  }

  export type MeetingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "number" | "status" | "form" | "startDate" | "endDate" | "inPersonStartTime" | "inPersonAddress" | "ballotAcceptanceAddress" | "noticeAddress" | "resultsDate" | "initiatorEmployeeId" | "extensionReason" | "createdAt" | "activatedAt" | "completedAt" | "archivedAt", ExtArgs["result"]["meeting"]>
  export type MeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    initiator?: boolean | Meeting$initiatorArgs<ExtArgs>
    agendaItems?: boolean | Meeting$agendaItemsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meeting"
    objects: {
      building: Prisma.$BuildingPayload<ExtArgs>
      initiator: Prisma.$EmployeePayload<ExtArgs> | null
      agendaItems: Prisma.$AgendaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      number: string
      status: string
      form: string
      startDate: string
      endDate: string | null
      inPersonStartTime: string | null
      inPersonAddress: string | null
      ballotAcceptanceAddress: string | null
      noticeAddress: string | null
      resultsDate: string | null
      initiatorEmployeeId: string | null
      extensionReason: string | null
      createdAt: Date
      activatedAt: string | null
      completedAt: string | null
      archivedAt: string | null
    }, ExtArgs["result"]["meeting"]>
    composites: {}
  }

  type MeetingGetPayload<S extends boolean | null | undefined | MeetingDefaultArgs> = $Result.GetResult<Prisma.$MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingFindUniqueArgs>(args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingFindFirstArgs>(args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingFindManyArgs>(args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
     */
    create<T extends MeetingCreateArgs>(args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meetings.
     * @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingCreateManyArgs>(args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
     */
    delete<T extends MeetingDeleteArgs>(args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingUpdateArgs>(args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDeleteManyArgs>(args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingUpdateManyArgs>(args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
     */
    upsert<T extends MeetingUpsertArgs>(args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meeting model
   */
  readonly fields: MeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    building<T extends BuildingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BuildingDefaultArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    initiator<T extends Meeting$initiatorArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$initiatorArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agendaItems<T extends Meeting$agendaItemsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$agendaItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meeting model
   */
  interface MeetingFieldRefs {
    readonly id: FieldRef<"Meeting", 'String'>
    readonly buildingId: FieldRef<"Meeting", 'String'>
    readonly number: FieldRef<"Meeting", 'String'>
    readonly status: FieldRef<"Meeting", 'String'>
    readonly form: FieldRef<"Meeting", 'String'>
    readonly startDate: FieldRef<"Meeting", 'String'>
    readonly endDate: FieldRef<"Meeting", 'String'>
    readonly inPersonStartTime: FieldRef<"Meeting", 'String'>
    readonly inPersonAddress: FieldRef<"Meeting", 'String'>
    readonly ballotAcceptanceAddress: FieldRef<"Meeting", 'String'>
    readonly noticeAddress: FieldRef<"Meeting", 'String'>
    readonly resultsDate: FieldRef<"Meeting", 'String'>
    readonly initiatorEmployeeId: FieldRef<"Meeting", 'String'>
    readonly extensionReason: FieldRef<"Meeting", 'String'>
    readonly createdAt: FieldRef<"Meeting", 'DateTime'>
    readonly activatedAt: FieldRef<"Meeting", 'String'>
    readonly completedAt: FieldRef<"Meeting", 'String'>
    readonly archivedAt: FieldRef<"Meeting", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Meeting findUnique
   */
  export type MeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findFirst
   */
  export type MeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }

  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
  }

  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }

  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to delete.
     */
    limit?: number
  }

  /**
   * Meeting.initiator
   */
  export type Meeting$initiatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * Meeting.agendaItems
   */
  export type Meeting$agendaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    where?: AgendaItemWhereInput
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    cursor?: AgendaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendaItemScalarFieldEnum | AgendaItemScalarFieldEnum[]
  }

  /**
   * Meeting without action
   */
  export type MeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
  }


  /**
   * Model AgendaItem
   */

  export type AggregateAgendaItem = {
    _count: AgendaItemCountAggregateOutputType | null
    _avg: AgendaItemAvgAggregateOutputType | null
    _sum: AgendaItemSumAggregateOutputType | null
    _min: AgendaItemMinAggregateOutputType | null
    _max: AgendaItemMaxAggregateOutputType | null
  }

  export type AgendaItemAvgAggregateOutputType = {
    orderNumber: number | null
  }

  export type AgendaItemSumAggregateOutputType = {
    orderNumber: number | null
  }

  export type AgendaItemMinAggregateOutputType = {
    id: string | null
    meetingId: string | null
    questionId: string | null
    orderNumber: number | null
    customProtocolText: string | null
    customBulletinText: string | null
  }

  export type AgendaItemMaxAggregateOutputType = {
    id: string | null
    meetingId: string | null
    questionId: string | null
    orderNumber: number | null
    customProtocolText: string | null
    customBulletinText: string | null
  }

  export type AgendaItemCountAggregateOutputType = {
    id: number
    meetingId: number
    questionId: number
    orderNumber: number
    customProtocolText: number
    customBulletinText: number
    _all: number
  }


  export type AgendaItemAvgAggregateInputType = {
    orderNumber?: true
  }

  export type AgendaItemSumAggregateInputType = {
    orderNumber?: true
  }

  export type AgendaItemMinAggregateInputType = {
    id?: true
    meetingId?: true
    questionId?: true
    orderNumber?: true
    customProtocolText?: true
    customBulletinText?: true
  }

  export type AgendaItemMaxAggregateInputType = {
    id?: true
    meetingId?: true
    questionId?: true
    orderNumber?: true
    customProtocolText?: true
    customBulletinText?: true
  }

  export type AgendaItemCountAggregateInputType = {
    id?: true
    meetingId?: true
    questionId?: true
    orderNumber?: true
    customProtocolText?: true
    customBulletinText?: true
    _all?: true
  }

  export type AgendaItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgendaItem to aggregate.
     */
    where?: AgendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgendaItems to fetch.
     */
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgendaItems
    **/
    _count?: true | AgendaItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgendaItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgendaItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgendaItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgendaItemMaxAggregateInputType
  }

  export type GetAgendaItemAggregateType<T extends AgendaItemAggregateArgs> = {
        [P in keyof T & keyof AggregateAgendaItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgendaItem[P]>
      : GetScalarType<T[P], AggregateAgendaItem[P]>
  }




  export type AgendaItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendaItemWhereInput
    orderBy?: AgendaItemOrderByWithAggregationInput | AgendaItemOrderByWithAggregationInput[]
    by: AgendaItemScalarFieldEnum[] | AgendaItemScalarFieldEnum
    having?: AgendaItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgendaItemCountAggregateInputType | true
    _avg?: AgendaItemAvgAggregateInputType
    _sum?: AgendaItemSumAggregateInputType
    _min?: AgendaItemMinAggregateInputType
    _max?: AgendaItemMaxAggregateInputType
  }

  export type AgendaItemGroupByOutputType = {
    id: string
    meetingId: string
    questionId: string | null
    orderNumber: number
    customProtocolText: string | null
    customBulletinText: string | null
    _count: AgendaItemCountAggregateOutputType | null
    _avg: AgendaItemAvgAggregateOutputType | null
    _sum: AgendaItemSumAggregateOutputType | null
    _min: AgendaItemMinAggregateOutputType | null
    _max: AgendaItemMaxAggregateOutputType | null
  }

  type GetAgendaItemGroupByPayload<T extends AgendaItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgendaItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgendaItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgendaItemGroupByOutputType[P]>
            : GetScalarType<T[P], AgendaItemGroupByOutputType[P]>
        }
      >
    >


  export type AgendaItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    questionId?: boolean
    orderNumber?: boolean
    customProtocolText?: boolean
    customBulletinText?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    question?: boolean | AgendaItem$questionArgs<ExtArgs>
    answers?: boolean | AgendaItem$answersArgs<ExtArgs>
    _count?: boolean | AgendaItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agendaItem"]>



  export type AgendaItemSelectScalar = {
    id?: boolean
    meetingId?: boolean
    questionId?: boolean
    orderNumber?: boolean
    customProtocolText?: boolean
    customBulletinText?: boolean
  }

  export type AgendaItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "meetingId" | "questionId" | "orderNumber" | "customProtocolText" | "customBulletinText", ExtArgs["result"]["agendaItem"]>
  export type AgendaItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    question?: boolean | AgendaItem$questionArgs<ExtArgs>
    answers?: boolean | AgendaItem$answersArgs<ExtArgs>
    _count?: boolean | AgendaItemCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AgendaItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgendaItem"
    objects: {
      meeting: Prisma.$MeetingPayload<ExtArgs>
      question: Prisma.$QuestionLibraryPayload<ExtArgs> | null
      answers: Prisma.$QuestionAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      meetingId: string
      questionId: string | null
      orderNumber: number
      customProtocolText: string | null
      customBulletinText: string | null
    }, ExtArgs["result"]["agendaItem"]>
    composites: {}
  }

  type AgendaItemGetPayload<S extends boolean | null | undefined | AgendaItemDefaultArgs> = $Result.GetResult<Prisma.$AgendaItemPayload, S>

  type AgendaItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgendaItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgendaItemCountAggregateInputType | true
    }

  export interface AgendaItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgendaItem'], meta: { name: 'AgendaItem' } }
    /**
     * Find zero or one AgendaItem that matches the filter.
     * @param {AgendaItemFindUniqueArgs} args - Arguments to find a AgendaItem
     * @example
     * // Get one AgendaItem
     * const agendaItem = await prisma.agendaItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgendaItemFindUniqueArgs>(args: SelectSubset<T, AgendaItemFindUniqueArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgendaItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgendaItemFindUniqueOrThrowArgs} args - Arguments to find a AgendaItem
     * @example
     * // Get one AgendaItem
     * const agendaItem = await prisma.agendaItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgendaItemFindUniqueOrThrowArgs>(args: SelectSubset<T, AgendaItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgendaItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemFindFirstArgs} args - Arguments to find a AgendaItem
     * @example
     * // Get one AgendaItem
     * const agendaItem = await prisma.agendaItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgendaItemFindFirstArgs>(args?: SelectSubset<T, AgendaItemFindFirstArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgendaItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemFindFirstOrThrowArgs} args - Arguments to find a AgendaItem
     * @example
     * // Get one AgendaItem
     * const agendaItem = await prisma.agendaItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgendaItemFindFirstOrThrowArgs>(args?: SelectSubset<T, AgendaItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgendaItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgendaItems
     * const agendaItems = await prisma.agendaItem.findMany()
     * 
     * // Get first 10 AgendaItems
     * const agendaItems = await prisma.agendaItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agendaItemWithIdOnly = await prisma.agendaItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgendaItemFindManyArgs>(args?: SelectSubset<T, AgendaItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgendaItem.
     * @param {AgendaItemCreateArgs} args - Arguments to create a AgendaItem.
     * @example
     * // Create one AgendaItem
     * const AgendaItem = await prisma.agendaItem.create({
     *   data: {
     *     // ... data to create a AgendaItem
     *   }
     * })
     * 
     */
    create<T extends AgendaItemCreateArgs>(args: SelectSubset<T, AgendaItemCreateArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgendaItems.
     * @param {AgendaItemCreateManyArgs} args - Arguments to create many AgendaItems.
     * @example
     * // Create many AgendaItems
     * const agendaItem = await prisma.agendaItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgendaItemCreateManyArgs>(args?: SelectSubset<T, AgendaItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AgendaItem.
     * @param {AgendaItemDeleteArgs} args - Arguments to delete one AgendaItem.
     * @example
     * // Delete one AgendaItem
     * const AgendaItem = await prisma.agendaItem.delete({
     *   where: {
     *     // ... filter to delete one AgendaItem
     *   }
     * })
     * 
     */
    delete<T extends AgendaItemDeleteArgs>(args: SelectSubset<T, AgendaItemDeleteArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgendaItem.
     * @param {AgendaItemUpdateArgs} args - Arguments to update one AgendaItem.
     * @example
     * // Update one AgendaItem
     * const agendaItem = await prisma.agendaItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgendaItemUpdateArgs>(args: SelectSubset<T, AgendaItemUpdateArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgendaItems.
     * @param {AgendaItemDeleteManyArgs} args - Arguments to filter AgendaItems to delete.
     * @example
     * // Delete a few AgendaItems
     * const { count } = await prisma.agendaItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgendaItemDeleteManyArgs>(args?: SelectSubset<T, AgendaItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgendaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgendaItems
     * const agendaItem = await prisma.agendaItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgendaItemUpdateManyArgs>(args: SelectSubset<T, AgendaItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgendaItem.
     * @param {AgendaItemUpsertArgs} args - Arguments to update or create a AgendaItem.
     * @example
     * // Update or create a AgendaItem
     * const agendaItem = await prisma.agendaItem.upsert({
     *   create: {
     *     // ... data to create a AgendaItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgendaItem we want to update
     *   }
     * })
     */
    upsert<T extends AgendaItemUpsertArgs>(args: SelectSubset<T, AgendaItemUpsertArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgendaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemCountArgs} args - Arguments to filter AgendaItems to count.
     * @example
     * // Count the number of AgendaItems
     * const count = await prisma.agendaItem.count({
     *   where: {
     *     // ... the filter for the AgendaItems we want to count
     *   }
     * })
    **/
    count<T extends AgendaItemCountArgs>(
      args?: Subset<T, AgendaItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgendaItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgendaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgendaItemAggregateArgs>(args: Subset<T, AgendaItemAggregateArgs>): Prisma.PrismaPromise<GetAgendaItemAggregateType<T>>

    /**
     * Group by AgendaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgendaItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgendaItemGroupByArgs['orderBy'] }
        : { orderBy?: AgendaItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgendaItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendaItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgendaItem model
   */
  readonly fields: AgendaItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgendaItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgendaItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting<T extends MeetingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeetingDefaultArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends AgendaItem$questionArgs<ExtArgs> = {}>(args?: Subset<T, AgendaItem$questionArgs<ExtArgs>>): Prisma__QuestionLibraryClient<$Result.GetResult<Prisma.$QuestionLibraryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    answers<T extends AgendaItem$answersArgs<ExtArgs> = {}>(args?: Subset<T, AgendaItem$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgendaItem model
   */
  interface AgendaItemFieldRefs {
    readonly id: FieldRef<"AgendaItem", 'String'>
    readonly meetingId: FieldRef<"AgendaItem", 'String'>
    readonly questionId: FieldRef<"AgendaItem", 'String'>
    readonly orderNumber: FieldRef<"AgendaItem", 'Int'>
    readonly customProtocolText: FieldRef<"AgendaItem", 'String'>
    readonly customBulletinText: FieldRef<"AgendaItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgendaItem findUnique
   */
  export type AgendaItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter, which AgendaItem to fetch.
     */
    where: AgendaItemWhereUniqueInput
  }

  /**
   * AgendaItem findUniqueOrThrow
   */
  export type AgendaItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter, which AgendaItem to fetch.
     */
    where: AgendaItemWhereUniqueInput
  }

  /**
   * AgendaItem findFirst
   */
  export type AgendaItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter, which AgendaItem to fetch.
     */
    where?: AgendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgendaItems to fetch.
     */
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgendaItems.
     */
    cursor?: AgendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgendaItems.
     */
    distinct?: AgendaItemScalarFieldEnum | AgendaItemScalarFieldEnum[]
  }

  /**
   * AgendaItem findFirstOrThrow
   */
  export type AgendaItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter, which AgendaItem to fetch.
     */
    where?: AgendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgendaItems to fetch.
     */
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgendaItems.
     */
    cursor?: AgendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgendaItems.
     */
    distinct?: AgendaItemScalarFieldEnum | AgendaItemScalarFieldEnum[]
  }

  /**
   * AgendaItem findMany
   */
  export type AgendaItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter, which AgendaItems to fetch.
     */
    where?: AgendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgendaItems to fetch.
     */
    orderBy?: AgendaItemOrderByWithRelationInput | AgendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgendaItems.
     */
    cursor?: AgendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgendaItems.
     */
    skip?: number
    distinct?: AgendaItemScalarFieldEnum | AgendaItemScalarFieldEnum[]
  }

  /**
   * AgendaItem create
   */
  export type AgendaItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * The data needed to create a AgendaItem.
     */
    data: XOR<AgendaItemCreateInput, AgendaItemUncheckedCreateInput>
  }

  /**
   * AgendaItem createMany
   */
  export type AgendaItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgendaItems.
     */
    data: AgendaItemCreateManyInput | AgendaItemCreateManyInput[]
  }

  /**
   * AgendaItem update
   */
  export type AgendaItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * The data needed to update a AgendaItem.
     */
    data: XOR<AgendaItemUpdateInput, AgendaItemUncheckedUpdateInput>
    /**
     * Choose, which AgendaItem to update.
     */
    where: AgendaItemWhereUniqueInput
  }

  /**
   * AgendaItem updateMany
   */
  export type AgendaItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgendaItems.
     */
    data: XOR<AgendaItemUpdateManyMutationInput, AgendaItemUncheckedUpdateManyInput>
    /**
     * Filter which AgendaItems to update
     */
    where?: AgendaItemWhereInput
    /**
     * Limit how many AgendaItems to update.
     */
    limit?: number
  }

  /**
   * AgendaItem upsert
   */
  export type AgendaItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * The filter to search for the AgendaItem to update in case it exists.
     */
    where: AgendaItemWhereUniqueInput
    /**
     * In case the AgendaItem found by the `where` argument doesn't exist, create a new AgendaItem with this data.
     */
    create: XOR<AgendaItemCreateInput, AgendaItemUncheckedCreateInput>
    /**
     * In case the AgendaItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgendaItemUpdateInput, AgendaItemUncheckedUpdateInput>
  }

  /**
   * AgendaItem delete
   */
  export type AgendaItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
    /**
     * Filter which AgendaItem to delete.
     */
    where: AgendaItemWhereUniqueInput
  }

  /**
   * AgendaItem deleteMany
   */
  export type AgendaItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgendaItems to delete
     */
    where?: AgendaItemWhereInput
    /**
     * Limit how many AgendaItems to delete.
     */
    limit?: number
  }

  /**
   * AgendaItem.question
   */
  export type AgendaItem$questionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionLibrary
     */
    select?: QuestionLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionLibrary
     */
    omit?: QuestionLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionLibraryInclude<ExtArgs> | null
    where?: QuestionLibraryWhereInput
  }

  /**
   * AgendaItem.answers
   */
  export type AgendaItem$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    where?: QuestionAnswerWhereInput
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    cursor?: QuestionAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionAnswerScalarFieldEnum | QuestionAnswerScalarFieldEnum[]
  }

  /**
   * AgendaItem without action
   */
  export type AgendaItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendaItem
     */
    select?: AgendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgendaItem
     */
    omit?: AgendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaItemInclude<ExtArgs> | null
  }


  /**
   * Model QuestionAnswer
   */

  export type AggregateQuestionAnswer = {
    _count: QuestionAnswerCountAggregateOutputType | null
    _avg: QuestionAnswerAvgAggregateOutputType | null
    _sum: QuestionAnswerSumAggregateOutputType | null
    _min: QuestionAnswerMinAggregateOutputType | null
    _max: QuestionAnswerMaxAggregateOutputType | null
  }

  export type QuestionAnswerAvgAggregateOutputType = {
    weight: number | null
  }

  export type QuestionAnswerSumAggregateOutputType = {
    weight: number | null
  }

  export type QuestionAnswerMinAggregateOutputType = {
    ownerId: string | null
    agendaItemId: string | null
    vote: string | null
    weight: number | null
  }

  export type QuestionAnswerMaxAggregateOutputType = {
    ownerId: string | null
    agendaItemId: string | null
    vote: string | null
    weight: number | null
  }

  export type QuestionAnswerCountAggregateOutputType = {
    ownerId: number
    agendaItemId: number
    vote: number
    weight: number
    _all: number
  }


  export type QuestionAnswerAvgAggregateInputType = {
    weight?: true
  }

  export type QuestionAnswerSumAggregateInputType = {
    weight?: true
  }

  export type QuestionAnswerMinAggregateInputType = {
    ownerId?: true
    agendaItemId?: true
    vote?: true
    weight?: true
  }

  export type QuestionAnswerMaxAggregateInputType = {
    ownerId?: true
    agendaItemId?: true
    vote?: true
    weight?: true
  }

  export type QuestionAnswerCountAggregateInputType = {
    ownerId?: true
    agendaItemId?: true
    vote?: true
    weight?: true
    _all?: true
  }

  export type QuestionAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionAnswer to aggregate.
     */
    where?: QuestionAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionAnswers to fetch.
     */
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionAnswers
    **/
    _count?: true | QuestionAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionAnswerMaxAggregateInputType
  }

  export type GetQuestionAnswerAggregateType<T extends QuestionAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionAnswer[P]>
      : GetScalarType<T[P], AggregateQuestionAnswer[P]>
  }




  export type QuestionAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionAnswerWhereInput
    orderBy?: QuestionAnswerOrderByWithAggregationInput | QuestionAnswerOrderByWithAggregationInput[]
    by: QuestionAnswerScalarFieldEnum[] | QuestionAnswerScalarFieldEnum
    having?: QuestionAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionAnswerCountAggregateInputType | true
    _avg?: QuestionAnswerAvgAggregateInputType
    _sum?: QuestionAnswerSumAggregateInputType
    _min?: QuestionAnswerMinAggregateInputType
    _max?: QuestionAnswerMaxAggregateInputType
  }

  export type QuestionAnswerGroupByOutputType = {
    ownerId: string
    agendaItemId: string
    vote: string
    weight: number | null
    _count: QuestionAnswerCountAggregateOutputType | null
    _avg: QuestionAnswerAvgAggregateOutputType | null
    _sum: QuestionAnswerSumAggregateOutputType | null
    _min: QuestionAnswerMinAggregateOutputType | null
    _max: QuestionAnswerMaxAggregateOutputType | null
  }

  type GetQuestionAnswerGroupByPayload<T extends QuestionAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionAnswerGroupByOutputType[P]>
        }
      >
    >


  export type QuestionAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerId?: boolean
    agendaItemId?: boolean
    vote?: boolean
    weight?: boolean
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
    agendaItem?: boolean | AgendaItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionAnswer"]>



  export type QuestionAnswerSelectScalar = {
    ownerId?: boolean
    agendaItemId?: boolean
    vote?: boolean
    weight?: boolean
  }

  export type QuestionAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ownerId" | "agendaItemId" | "vote" | "weight", ExtArgs["result"]["questionAnswer"]>
  export type QuestionAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
    agendaItem?: boolean | AgendaItemDefaultArgs<ExtArgs>
  }

  export type $QuestionAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionAnswer"
    objects: {
      owner: Prisma.$OwnerPayload<ExtArgs>
      agendaItem: Prisma.$AgendaItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ownerId: string
      agendaItemId: string
      vote: string
      weight: number | null
    }, ExtArgs["result"]["questionAnswer"]>
    composites: {}
  }

  type QuestionAnswerGetPayload<S extends boolean | null | undefined | QuestionAnswerDefaultArgs> = $Result.GetResult<Prisma.$QuestionAnswerPayload, S>

  type QuestionAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionAnswerCountAggregateInputType | true
    }

  export interface QuestionAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionAnswer'], meta: { name: 'QuestionAnswer' } }
    /**
     * Find zero or one QuestionAnswer that matches the filter.
     * @param {QuestionAnswerFindUniqueArgs} args - Arguments to find a QuestionAnswer
     * @example
     * // Get one QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionAnswerFindUniqueArgs>(args: SelectSubset<T, QuestionAnswerFindUniqueArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionAnswerFindUniqueOrThrowArgs} args - Arguments to find a QuestionAnswer
     * @example
     * // Get one QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerFindFirstArgs} args - Arguments to find a QuestionAnswer
     * @example
     * // Get one QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionAnswerFindFirstArgs>(args?: SelectSubset<T, QuestionAnswerFindFirstArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerFindFirstOrThrowArgs} args - Arguments to find a QuestionAnswer
     * @example
     * // Get one QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionAnswers
     * const questionAnswers = await prisma.questionAnswer.findMany()
     * 
     * // Get first 10 QuestionAnswers
     * const questionAnswers = await prisma.questionAnswer.findMany({ take: 10 })
     * 
     * // Only select the `ownerId`
     * const questionAnswerWithOwnerIdOnly = await prisma.questionAnswer.findMany({ select: { ownerId: true } })
     * 
     */
    findMany<T extends QuestionAnswerFindManyArgs>(args?: SelectSubset<T, QuestionAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionAnswer.
     * @param {QuestionAnswerCreateArgs} args - Arguments to create a QuestionAnswer.
     * @example
     * // Create one QuestionAnswer
     * const QuestionAnswer = await prisma.questionAnswer.create({
     *   data: {
     *     // ... data to create a QuestionAnswer
     *   }
     * })
     * 
     */
    create<T extends QuestionAnswerCreateArgs>(args: SelectSubset<T, QuestionAnswerCreateArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionAnswers.
     * @param {QuestionAnswerCreateManyArgs} args - Arguments to create many QuestionAnswers.
     * @example
     * // Create many QuestionAnswers
     * const questionAnswer = await prisma.questionAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionAnswerCreateManyArgs>(args?: SelectSubset<T, QuestionAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QuestionAnswer.
     * @param {QuestionAnswerDeleteArgs} args - Arguments to delete one QuestionAnswer.
     * @example
     * // Delete one QuestionAnswer
     * const QuestionAnswer = await prisma.questionAnswer.delete({
     *   where: {
     *     // ... filter to delete one QuestionAnswer
     *   }
     * })
     * 
     */
    delete<T extends QuestionAnswerDeleteArgs>(args: SelectSubset<T, QuestionAnswerDeleteArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionAnswer.
     * @param {QuestionAnswerUpdateArgs} args - Arguments to update one QuestionAnswer.
     * @example
     * // Update one QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionAnswerUpdateArgs>(args: SelectSubset<T, QuestionAnswerUpdateArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionAnswers.
     * @param {QuestionAnswerDeleteManyArgs} args - Arguments to filter QuestionAnswers to delete.
     * @example
     * // Delete a few QuestionAnswers
     * const { count } = await prisma.questionAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionAnswerDeleteManyArgs>(args?: SelectSubset<T, QuestionAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionAnswers
     * const questionAnswer = await prisma.questionAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionAnswerUpdateManyArgs>(args: SelectSubset<T, QuestionAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuestionAnswer.
     * @param {QuestionAnswerUpsertArgs} args - Arguments to update or create a QuestionAnswer.
     * @example
     * // Update or create a QuestionAnswer
     * const questionAnswer = await prisma.questionAnswer.upsert({
     *   create: {
     *     // ... data to create a QuestionAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionAnswer we want to update
     *   }
     * })
     */
    upsert<T extends QuestionAnswerUpsertArgs>(args: SelectSubset<T, QuestionAnswerUpsertArgs<ExtArgs>>): Prisma__QuestionAnswerClient<$Result.GetResult<Prisma.$QuestionAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerCountArgs} args - Arguments to filter QuestionAnswers to count.
     * @example
     * // Count the number of QuestionAnswers
     * const count = await prisma.questionAnswer.count({
     *   where: {
     *     // ... the filter for the QuestionAnswers we want to count
     *   }
     * })
    **/
    count<T extends QuestionAnswerCountArgs>(
      args?: Subset<T, QuestionAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAnswerAggregateArgs>(args: Subset<T, QuestionAnswerAggregateArgs>): Prisma.PrismaPromise<GetQuestionAnswerAggregateType<T>>

    /**
     * Group by QuestionAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionAnswerGroupByArgs['orderBy'] }
        : { orderBy?: QuestionAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionAnswer model
   */
  readonly fields: QuestionAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends OwnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OwnerDefaultArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    agendaItem<T extends AgendaItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgendaItemDefaultArgs<ExtArgs>>): Prisma__AgendaItemClient<$Result.GetResult<Prisma.$AgendaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionAnswer model
   */
  interface QuestionAnswerFieldRefs {
    readonly ownerId: FieldRef<"QuestionAnswer", 'String'>
    readonly agendaItemId: FieldRef<"QuestionAnswer", 'String'>
    readonly vote: FieldRef<"QuestionAnswer", 'String'>
    readonly weight: FieldRef<"QuestionAnswer", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * QuestionAnswer findUnique
   */
  export type QuestionAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuestionAnswer to fetch.
     */
    where: QuestionAnswerWhereUniqueInput
  }

  /**
   * QuestionAnswer findUniqueOrThrow
   */
  export type QuestionAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuestionAnswer to fetch.
     */
    where: QuestionAnswerWhereUniqueInput
  }

  /**
   * QuestionAnswer findFirst
   */
  export type QuestionAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuestionAnswer to fetch.
     */
    where?: QuestionAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionAnswers to fetch.
     */
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionAnswers.
     */
    cursor?: QuestionAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionAnswers.
     */
    distinct?: QuestionAnswerScalarFieldEnum | QuestionAnswerScalarFieldEnum[]
  }

  /**
   * QuestionAnswer findFirstOrThrow
   */
  export type QuestionAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuestionAnswer to fetch.
     */
    where?: QuestionAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionAnswers to fetch.
     */
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionAnswers.
     */
    cursor?: QuestionAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionAnswers.
     */
    distinct?: QuestionAnswerScalarFieldEnum | QuestionAnswerScalarFieldEnum[]
  }

  /**
   * QuestionAnswer findMany
   */
  export type QuestionAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuestionAnswers to fetch.
     */
    where?: QuestionAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionAnswers to fetch.
     */
    orderBy?: QuestionAnswerOrderByWithRelationInput | QuestionAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionAnswers.
     */
    cursor?: QuestionAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionAnswers.
     */
    skip?: number
    distinct?: QuestionAnswerScalarFieldEnum | QuestionAnswerScalarFieldEnum[]
  }

  /**
   * QuestionAnswer create
   */
  export type QuestionAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionAnswer.
     */
    data: XOR<QuestionAnswerCreateInput, QuestionAnswerUncheckedCreateInput>
  }

  /**
   * QuestionAnswer createMany
   */
  export type QuestionAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionAnswers.
     */
    data: QuestionAnswerCreateManyInput | QuestionAnswerCreateManyInput[]
  }

  /**
   * QuestionAnswer update
   */
  export type QuestionAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionAnswer.
     */
    data: XOR<QuestionAnswerUpdateInput, QuestionAnswerUncheckedUpdateInput>
    /**
     * Choose, which QuestionAnswer to update.
     */
    where: QuestionAnswerWhereUniqueInput
  }

  /**
   * QuestionAnswer updateMany
   */
  export type QuestionAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionAnswers.
     */
    data: XOR<QuestionAnswerUpdateManyMutationInput, QuestionAnswerUncheckedUpdateManyInput>
    /**
     * Filter which QuestionAnswers to update
     */
    where?: QuestionAnswerWhereInput
    /**
     * Limit how many QuestionAnswers to update.
     */
    limit?: number
  }

  /**
   * QuestionAnswer upsert
   */
  export type QuestionAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionAnswer to update in case it exists.
     */
    where: QuestionAnswerWhereUniqueInput
    /**
     * In case the QuestionAnswer found by the `where` argument doesn't exist, create a new QuestionAnswer with this data.
     */
    create: XOR<QuestionAnswerCreateInput, QuestionAnswerUncheckedCreateInput>
    /**
     * In case the QuestionAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionAnswerUpdateInput, QuestionAnswerUncheckedUpdateInput>
  }

  /**
   * QuestionAnswer delete
   */
  export type QuestionAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
    /**
     * Filter which QuestionAnswer to delete.
     */
    where: QuestionAnswerWhereUniqueInput
  }

  /**
   * QuestionAnswer deleteMany
   */
  export type QuestionAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionAnswers to delete
     */
    where?: QuestionAnswerWhereInput
    /**
     * Limit how many QuestionAnswers to delete.
     */
    limit?: number
  }

  /**
   * QuestionAnswer without action
   */
  export type QuestionAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionAnswer
     */
    select?: QuestionAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionAnswer
     */
    omit?: QuestionAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionAnswerInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    actionType: string | null
    objectId: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    actionType: string | null
    objectId: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    employeeId: number
    actionType: number
    objectId: number
    oldValue: number
    newValue: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    employeeId?: true
    actionType?: true
    objectId?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    employeeId?: true
    actionType?: true
    objectId?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    employeeId?: true
    actionType?: true
    objectId?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    employeeId: string | null
    actionType: string
    objectId: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    actionType?: boolean
    objectId?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdAt?: boolean
    employee?: boolean | AuditLog$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>



  export type AuditLogSelectScalar = {
    id?: boolean
    employeeId?: boolean
    actionType?: boolean
    objectId?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "actionType" | "objectId" | "oldValue" | "newValue" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | AuditLog$employeeArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string | null
      actionType: string
      objectId: string | null
      oldValue: string | null
      newValue: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends AuditLog$employeeArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$employeeArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly employeeId: FieldRef<"AuditLog", 'String'>
    readonly actionType: FieldRef<"AuditLog", 'String'>
    readonly objectId: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'String'>
    readonly newValue: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.employee
   */
  export type AuditLog$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BuildingScalarFieldEnum: {
    id: 'id',
    address: 'address',
    cadastralNumber: 'cadastralNumber',
    yearBuilt: 'yearBuilt',
    floors: 'floors',
    entrances: 'entrances',
    totalArea: 'totalArea',
    totalPremises: 'totalPremises',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuildingScalarFieldEnum = (typeof BuildingScalarFieldEnum)[keyof typeof BuildingScalarFieldEnum]


  export const PremiseScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    number: 'number',
    cadastralNumber: 'cadastralNumber',
    area: 'area',
    ownershipForm: 'ownershipForm'
  };

  export type PremiseScalarFieldEnum = (typeof PremiseScalarFieldEnum)[keyof typeof PremiseScalarFieldEnum]


  export const OwnerScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    inn: 'inn',
    snils: 'snils',
    contacts: 'contacts'
  };

  export type OwnerScalarFieldEnum = (typeof OwnerScalarFieldEnum)[keyof typeof OwnerScalarFieldEnum]


  export const OwnershipRightScalarFieldEnum: {
    id: 'id',
    premiseId: 'premiseId',
    ownerId: 'ownerId',
    share: 'share',
    shareArea: 'shareArea',
    titleDocument: 'titleDocument',
    registrationDate: 'registrationDate',
    basisDocument: 'basisDocument'
  };

  export type OwnershipRightScalarFieldEnum = (typeof OwnershipRightScalarFieldEnum)[keyof typeof OwnershipRightScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    role: 'role',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const EmployeeBuildingAccessScalarFieldEnum: {
    employeeId: 'employeeId',
    buildingId: 'buildingId'
  };

  export type EmployeeBuildingAccessScalarFieldEnum = (typeof EmployeeBuildingAccessScalarFieldEnum)[keyof typeof EmployeeBuildingAccessScalarFieldEnum]


  export const QuestionLibraryScalarFieldEnum: {
    id: 'id',
    shortTitle: 'shortTitle',
    protocolText: 'protocolText',
    bulletinText: 'bulletinText',
    quorumType: 'quorumType',
    category: 'category',
    tags: 'tags',
    createdByEmployeeId: 'createdByEmployeeId',
    createdAt: 'createdAt'
  };

  export type QuestionLibraryScalarFieldEnum = (typeof QuestionLibraryScalarFieldEnum)[keyof typeof QuestionLibraryScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    number: 'number',
    status: 'status',
    form: 'form',
    startDate: 'startDate',
    endDate: 'endDate',
    inPersonStartTime: 'inPersonStartTime',
    inPersonAddress: 'inPersonAddress',
    ballotAcceptanceAddress: 'ballotAcceptanceAddress',
    noticeAddress: 'noticeAddress',
    resultsDate: 'resultsDate',
    initiatorEmployeeId: 'initiatorEmployeeId',
    extensionReason: 'extensionReason',
    createdAt: 'createdAt',
    activatedAt: 'activatedAt',
    completedAt: 'completedAt',
    archivedAt: 'archivedAt'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const AgendaItemScalarFieldEnum: {
    id: 'id',
    meetingId: 'meetingId',
    questionId: 'questionId',
    orderNumber: 'orderNumber',
    customProtocolText: 'customProtocolText',
    customBulletinText: 'customBulletinText'
  };

  export type AgendaItemScalarFieldEnum = (typeof AgendaItemScalarFieldEnum)[keyof typeof AgendaItemScalarFieldEnum]


  export const QuestionAnswerScalarFieldEnum: {
    ownerId: 'ownerId',
    agendaItemId: 'agendaItemId',
    vote: 'vote',
    weight: 'weight'
  };

  export type QuestionAnswerScalarFieldEnum = (typeof QuestionAnswerScalarFieldEnum)[keyof typeof QuestionAnswerScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    actionType: 'actionType',
    objectId: 'objectId',
    oldValue: 'oldValue',
    newValue: 'newValue',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type BuildingWhereInput = {
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    id?: StringFilter<"Building"> | string
    address?: StringFilter<"Building"> | string
    cadastralNumber?: StringFilter<"Building"> | string
    yearBuilt?: IntNullableFilter<"Building"> | number | null
    floors?: IntNullableFilter<"Building"> | number | null
    entrances?: IntNullableFilter<"Building"> | number | null
    totalArea?: FloatFilter<"Building"> | number
    totalPremises?: IntFilter<"Building"> | number
    createdAt?: DateTimeFilter<"Building"> | Date | string
    updatedAt?: DateTimeFilter<"Building"> | Date | string
    premises?: PremiseListRelationFilter
    employeeAccess?: EmployeeBuildingAccessListRelationFilter
    meetings?: MeetingListRelationFilter
  }

  export type BuildingOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    cadastralNumber?: SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    floors?: SortOrderInput | SortOrder
    entrances?: SortOrderInput | SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    premises?: PremiseOrderByRelationAggregateInput
    employeeAccess?: EmployeeBuildingAccessOrderByRelationAggregateInput
    meetings?: MeetingOrderByRelationAggregateInput
  }

  export type BuildingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    address?: StringFilter<"Building"> | string
    cadastralNumber?: StringFilter<"Building"> | string
    yearBuilt?: IntNullableFilter<"Building"> | number | null
    floors?: IntNullableFilter<"Building"> | number | null
    entrances?: IntNullableFilter<"Building"> | number | null
    totalArea?: FloatFilter<"Building"> | number
    totalPremises?: IntFilter<"Building"> | number
    createdAt?: DateTimeFilter<"Building"> | Date | string
    updatedAt?: DateTimeFilter<"Building"> | Date | string
    premises?: PremiseListRelationFilter
    employeeAccess?: EmployeeBuildingAccessListRelationFilter
    meetings?: MeetingListRelationFilter
  }, "id">

  export type BuildingOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    cadastralNumber?: SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    floors?: SortOrderInput | SortOrder
    entrances?: SortOrderInput | SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuildingCountOrderByAggregateInput
    _avg?: BuildingAvgOrderByAggregateInput
    _max?: BuildingMaxOrderByAggregateInput
    _min?: BuildingMinOrderByAggregateInput
    _sum?: BuildingSumOrderByAggregateInput
  }

  export type BuildingScalarWhereWithAggregatesInput = {
    AND?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    OR?: BuildingScalarWhereWithAggregatesInput[]
    NOT?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Building"> | string
    address?: StringWithAggregatesFilter<"Building"> | string
    cadastralNumber?: StringWithAggregatesFilter<"Building"> | string
    yearBuilt?: IntNullableWithAggregatesFilter<"Building"> | number | null
    floors?: IntNullableWithAggregatesFilter<"Building"> | number | null
    entrances?: IntNullableWithAggregatesFilter<"Building"> | number | null
    totalArea?: FloatWithAggregatesFilter<"Building"> | number
    totalPremises?: IntWithAggregatesFilter<"Building"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Building"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Building"> | Date | string
  }

  export type PremiseWhereInput = {
    AND?: PremiseWhereInput | PremiseWhereInput[]
    OR?: PremiseWhereInput[]
    NOT?: PremiseWhereInput | PremiseWhereInput[]
    id?: StringFilter<"Premise"> | string
    buildingId?: StringFilter<"Premise"> | string
    number?: StringFilter<"Premise"> | string
    cadastralNumber?: StringNullableFilter<"Premise"> | string | null
    area?: FloatFilter<"Premise"> | number
    ownershipForm?: StringFilter<"Premise"> | string
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    ownershipRights?: OwnershipRightListRelationFilter
  }

  export type PremiseOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    cadastralNumber?: SortOrderInput | SortOrder
    area?: SortOrder
    ownershipForm?: SortOrder
    building?: BuildingOrderByWithRelationInput
    ownershipRights?: OwnershipRightOrderByRelationAggregateInput
  }

  export type PremiseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PremiseWhereInput | PremiseWhereInput[]
    OR?: PremiseWhereInput[]
    NOT?: PremiseWhereInput | PremiseWhereInput[]
    buildingId?: StringFilter<"Premise"> | string
    number?: StringFilter<"Premise"> | string
    cadastralNumber?: StringNullableFilter<"Premise"> | string | null
    area?: FloatFilter<"Premise"> | number
    ownershipForm?: StringFilter<"Premise"> | string
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    ownershipRights?: OwnershipRightListRelationFilter
  }, "id">

  export type PremiseOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    cadastralNumber?: SortOrderInput | SortOrder
    area?: SortOrder
    ownershipForm?: SortOrder
    _count?: PremiseCountOrderByAggregateInput
    _avg?: PremiseAvgOrderByAggregateInput
    _max?: PremiseMaxOrderByAggregateInput
    _min?: PremiseMinOrderByAggregateInput
    _sum?: PremiseSumOrderByAggregateInput
  }

  export type PremiseScalarWhereWithAggregatesInput = {
    AND?: PremiseScalarWhereWithAggregatesInput | PremiseScalarWhereWithAggregatesInput[]
    OR?: PremiseScalarWhereWithAggregatesInput[]
    NOT?: PremiseScalarWhereWithAggregatesInput | PremiseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Premise"> | string
    buildingId?: StringWithAggregatesFilter<"Premise"> | string
    number?: StringWithAggregatesFilter<"Premise"> | string
    cadastralNumber?: StringNullableWithAggregatesFilter<"Premise"> | string | null
    area?: FloatWithAggregatesFilter<"Premise"> | number
    ownershipForm?: StringWithAggregatesFilter<"Premise"> | string
  }

  export type OwnerWhereInput = {
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    id?: StringFilter<"Owner"> | string
    fullName?: StringFilter<"Owner"> | string
    inn?: StringNullableFilter<"Owner"> | string | null
    snils?: StringNullableFilter<"Owner"> | string | null
    contacts?: StringNullableFilter<"Owner"> | string | null
    ownershipRights?: OwnershipRightListRelationFilter
    answers?: QuestionAnswerListRelationFilter
  }

  export type OwnerOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    inn?: SortOrderInput | SortOrder
    snils?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    ownershipRights?: OwnershipRightOrderByRelationAggregateInput
    answers?: QuestionAnswerOrderByRelationAggregateInput
  }

  export type OwnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inn?: string
    snils?: string
    contacts?: string
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    fullName?: StringFilter<"Owner"> | string
    ownershipRights?: OwnershipRightListRelationFilter
    answers?: QuestionAnswerListRelationFilter
  }, "id" | "inn" | "snils" | "contacts">

  export type OwnerOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    inn?: SortOrderInput | SortOrder
    snils?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    _count?: OwnerCountOrderByAggregateInput
    _max?: OwnerMaxOrderByAggregateInput
    _min?: OwnerMinOrderByAggregateInput
  }

  export type OwnerScalarWhereWithAggregatesInput = {
    AND?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    OR?: OwnerScalarWhereWithAggregatesInput[]
    NOT?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Owner"> | string
    fullName?: StringWithAggregatesFilter<"Owner"> | string
    inn?: StringNullableWithAggregatesFilter<"Owner"> | string | null
    snils?: StringNullableWithAggregatesFilter<"Owner"> | string | null
    contacts?: StringNullableWithAggregatesFilter<"Owner"> | string | null
  }

  export type OwnershipRightWhereInput = {
    AND?: OwnershipRightWhereInput | OwnershipRightWhereInput[]
    OR?: OwnershipRightWhereInput[]
    NOT?: OwnershipRightWhereInput | OwnershipRightWhereInput[]
    id?: StringFilter<"OwnershipRight"> | string
    premiseId?: StringFilter<"OwnershipRight"> | string
    ownerId?: StringFilter<"OwnershipRight"> | string
    share?: StringNullableFilter<"OwnershipRight"> | string | null
    shareArea?: FloatNullableFilter<"OwnershipRight"> | number | null
    titleDocument?: StringNullableFilter<"OwnershipRight"> | string | null
    registrationDate?: StringNullableFilter<"OwnershipRight"> | string | null
    basisDocument?: StringNullableFilter<"OwnershipRight"> | string | null
    premise?: XOR<PremiseScalarRelationFilter, PremiseWhereInput>
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
  }

  export type OwnershipRightOrderByWithRelationInput = {
    id?: SortOrder
    premiseId?: SortOrder
    ownerId?: SortOrder
    share?: SortOrderInput | SortOrder
    shareArea?: SortOrderInput | SortOrder
    titleDocument?: SortOrderInput | SortOrder
    registrationDate?: SortOrderInput | SortOrder
    basisDocument?: SortOrderInput | SortOrder
    premise?: PremiseOrderByWithRelationInput
    owner?: OwnerOrderByWithRelationInput
  }

  export type OwnershipRightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    premiseId_ownerId?: OwnershipRightPremiseIdOwnerIdCompoundUniqueInput
    AND?: OwnershipRightWhereInput | OwnershipRightWhereInput[]
    OR?: OwnershipRightWhereInput[]
    NOT?: OwnershipRightWhereInput | OwnershipRightWhereInput[]
    premiseId?: StringFilter<"OwnershipRight"> | string
    ownerId?: StringFilter<"OwnershipRight"> | string
    share?: StringNullableFilter<"OwnershipRight"> | string | null
    shareArea?: FloatNullableFilter<"OwnershipRight"> | number | null
    titleDocument?: StringNullableFilter<"OwnershipRight"> | string | null
    registrationDate?: StringNullableFilter<"OwnershipRight"> | string | null
    basisDocument?: StringNullableFilter<"OwnershipRight"> | string | null
    premise?: XOR<PremiseScalarRelationFilter, PremiseWhereInput>
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
  }, "id" | "premiseId_ownerId">

  export type OwnershipRightOrderByWithAggregationInput = {
    id?: SortOrder
    premiseId?: SortOrder
    ownerId?: SortOrder
    share?: SortOrderInput | SortOrder
    shareArea?: SortOrderInput | SortOrder
    titleDocument?: SortOrderInput | SortOrder
    registrationDate?: SortOrderInput | SortOrder
    basisDocument?: SortOrderInput | SortOrder
    _count?: OwnershipRightCountOrderByAggregateInput
    _avg?: OwnershipRightAvgOrderByAggregateInput
    _max?: OwnershipRightMaxOrderByAggregateInput
    _min?: OwnershipRightMinOrderByAggregateInput
    _sum?: OwnershipRightSumOrderByAggregateInput
  }

  export type OwnershipRightScalarWhereWithAggregatesInput = {
    AND?: OwnershipRightScalarWhereWithAggregatesInput | OwnershipRightScalarWhereWithAggregatesInput[]
    OR?: OwnershipRightScalarWhereWithAggregatesInput[]
    NOT?: OwnershipRightScalarWhereWithAggregatesInput | OwnershipRightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OwnershipRight"> | string
    premiseId?: StringWithAggregatesFilter<"OwnershipRight"> | string
    ownerId?: StringWithAggregatesFilter<"OwnershipRight"> | string
    share?: StringNullableWithAggregatesFilter<"OwnershipRight"> | string | null
    shareArea?: FloatNullableWithAggregatesFilter<"OwnershipRight"> | number | null
    titleDocument?: StringNullableWithAggregatesFilter<"OwnershipRight"> | string | null
    registrationDate?: StringNullableWithAggregatesFilter<"OwnershipRight"> | string | null
    basisDocument?: StringNullableWithAggregatesFilter<"OwnershipRight"> | string | null
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    passwordHash?: StringFilter<"Employee"> | string
    fullName?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    isActive?: IntFilter<"Employee"> | number
    lastLogin?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    buildingAccess?: EmployeeBuildingAccessListRelationFilter
    createdQuestions?: QuestionLibraryListRelationFilter
    initiatedMeetings?: MeetingListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    buildingAccess?: EmployeeBuildingAccessOrderByRelationAggregateInput
    createdQuestions?: QuestionLibraryOrderByRelationAggregateInput
    initiatedMeetings?: MeetingOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    passwordHash?: StringFilter<"Employee"> | string
    fullName?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    isActive?: IntFilter<"Employee"> | number
    lastLogin?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    buildingAccess?: EmployeeBuildingAccessListRelationFilter
    createdQuestions?: QuestionLibraryListRelationFilter
    initiatedMeetings?: MeetingListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    email?: StringWithAggregatesFilter<"Employee"> | string
    passwordHash?: StringWithAggregatesFilter<"Employee"> | string
    fullName?: StringWithAggregatesFilter<"Employee"> | string
    role?: StringWithAggregatesFilter<"Employee"> | string
    isActive?: IntWithAggregatesFilter<"Employee"> | number
    lastLogin?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type EmployeeBuildingAccessWhereInput = {
    AND?: EmployeeBuildingAccessWhereInput | EmployeeBuildingAccessWhereInput[]
    OR?: EmployeeBuildingAccessWhereInput[]
    NOT?: EmployeeBuildingAccessWhereInput | EmployeeBuildingAccessWhereInput[]
    employeeId?: StringFilter<"EmployeeBuildingAccess"> | string
    buildingId?: StringFilter<"EmployeeBuildingAccess"> | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
  }

  export type EmployeeBuildingAccessOrderByWithRelationInput = {
    employeeId?: SortOrder
    buildingId?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    building?: BuildingOrderByWithRelationInput
  }

  export type EmployeeBuildingAccessWhereUniqueInput = Prisma.AtLeast<{
    employeeId_buildingId?: EmployeeBuildingAccessEmployeeIdBuildingIdCompoundUniqueInput
    AND?: EmployeeBuildingAccessWhereInput | EmployeeBuildingAccessWhereInput[]
    OR?: EmployeeBuildingAccessWhereInput[]
    NOT?: EmployeeBuildingAccessWhereInput | EmployeeBuildingAccessWhereInput[]
    employeeId?: StringFilter<"EmployeeBuildingAccess"> | string
    buildingId?: StringFilter<"EmployeeBuildingAccess"> | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
  }, "employeeId_buildingId">

  export type EmployeeBuildingAccessOrderByWithAggregationInput = {
    employeeId?: SortOrder
    buildingId?: SortOrder
    _count?: EmployeeBuildingAccessCountOrderByAggregateInput
    _max?: EmployeeBuildingAccessMaxOrderByAggregateInput
    _min?: EmployeeBuildingAccessMinOrderByAggregateInput
  }

  export type EmployeeBuildingAccessScalarWhereWithAggregatesInput = {
    AND?: EmployeeBuildingAccessScalarWhereWithAggregatesInput | EmployeeBuildingAccessScalarWhereWithAggregatesInput[]
    OR?: EmployeeBuildingAccessScalarWhereWithAggregatesInput[]
    NOT?: EmployeeBuildingAccessScalarWhereWithAggregatesInput | EmployeeBuildingAccessScalarWhereWithAggregatesInput[]
    employeeId?: StringWithAggregatesFilter<"EmployeeBuildingAccess"> | string
    buildingId?: StringWithAggregatesFilter<"EmployeeBuildingAccess"> | string
  }

  export type QuestionLibraryWhereInput = {
    AND?: QuestionLibraryWhereInput | QuestionLibraryWhereInput[]
    OR?: QuestionLibraryWhereInput[]
    NOT?: QuestionLibraryWhereInput | QuestionLibraryWhereInput[]
    id?: StringFilter<"QuestionLibrary"> | string
    shortTitle?: StringFilter<"QuestionLibrary"> | string
    protocolText?: StringNullableFilter<"QuestionLibrary"> | string | null
    bulletinText?: StringNullableFilter<"QuestionLibrary"> | string | null
    quorumType?: StringNullableFilter<"QuestionLibrary"> | string | null
    category?: StringNullableFilter<"QuestionLibrary"> | string | null
    tags?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdByEmployeeId?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdAt?: DateTimeFilter<"QuestionLibrary"> | Date | string
    createdBy?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    agendaItems?: AgendaItemListRelationFilter
  }

  export type QuestionLibraryOrderByWithRelationInput = {
    id?: SortOrder
    shortTitle?: SortOrder
    protocolText?: SortOrderInput | SortOrder
    bulletinText?: SortOrderInput | SortOrder
    quorumType?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdByEmployeeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: EmployeeOrderByWithRelationInput
    agendaItems?: AgendaItemOrderByRelationAggregateInput
  }

  export type QuestionLibraryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionLibraryWhereInput | QuestionLibraryWhereInput[]
    OR?: QuestionLibraryWhereInput[]
    NOT?: QuestionLibraryWhereInput | QuestionLibraryWhereInput[]
    shortTitle?: StringFilter<"QuestionLibrary"> | string
    protocolText?: StringNullableFilter<"QuestionLibrary"> | string | null
    bulletinText?: StringNullableFilter<"QuestionLibrary"> | string | null
    quorumType?: StringNullableFilter<"QuestionLibrary"> | string | null
    category?: StringNullableFilter<"QuestionLibrary"> | string | null
    tags?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdByEmployeeId?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdAt?: DateTimeFilter<"QuestionLibrary"> | Date | string
    createdBy?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    agendaItems?: AgendaItemListRelationFilter
  }, "id">

  export type QuestionLibraryOrderByWithAggregationInput = {
    id?: SortOrder
    shortTitle?: SortOrder
    protocolText?: SortOrderInput | SortOrder
    bulletinText?: SortOrderInput | SortOrder
    quorumType?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdByEmployeeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: QuestionLibraryCountOrderByAggregateInput
    _max?: QuestionLibraryMaxOrderByAggregateInput
    _min?: QuestionLibraryMinOrderByAggregateInput
  }

  export type QuestionLibraryScalarWhereWithAggregatesInput = {
    AND?: QuestionLibraryScalarWhereWithAggregatesInput | QuestionLibraryScalarWhereWithAggregatesInput[]
    OR?: QuestionLibraryScalarWhereWithAggregatesInput[]
    NOT?: QuestionLibraryScalarWhereWithAggregatesInput | QuestionLibraryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionLibrary"> | string
    shortTitle?: StringWithAggregatesFilter<"QuestionLibrary"> | string
    protocolText?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    bulletinText?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    quorumType?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    category?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    tags?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    createdByEmployeeId?: StringNullableWithAggregatesFilter<"QuestionLibrary"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QuestionLibrary"> | Date | string
  }

  export type MeetingWhereInput = {
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    id?: StringFilter<"Meeting"> | string
    buildingId?: StringFilter<"Meeting"> | string
    number?: StringFilter<"Meeting"> | string
    status?: StringFilter<"Meeting"> | string
    form?: StringFilter<"Meeting"> | string
    startDate?: StringFilter<"Meeting"> | string
    endDate?: StringNullableFilter<"Meeting"> | string | null
    inPersonStartTime?: StringNullableFilter<"Meeting"> | string | null
    inPersonAddress?: StringNullableFilter<"Meeting"> | string | null
    ballotAcceptanceAddress?: StringNullableFilter<"Meeting"> | string | null
    noticeAddress?: StringNullableFilter<"Meeting"> | string | null
    resultsDate?: StringNullableFilter<"Meeting"> | string | null
    initiatorEmployeeId?: StringNullableFilter<"Meeting"> | string | null
    extensionReason?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    activatedAt?: StringNullableFilter<"Meeting"> | string | null
    completedAt?: StringNullableFilter<"Meeting"> | string | null
    archivedAt?: StringNullableFilter<"Meeting"> | string | null
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    initiator?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    agendaItems?: AgendaItemListRelationFilter
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    status?: SortOrder
    form?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    inPersonStartTime?: SortOrderInput | SortOrder
    inPersonAddress?: SortOrderInput | SortOrder
    ballotAcceptanceAddress?: SortOrderInput | SortOrder
    noticeAddress?: SortOrderInput | SortOrder
    resultsDate?: SortOrderInput | SortOrder
    initiatorEmployeeId?: SortOrderInput | SortOrder
    extensionReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    building?: BuildingOrderByWithRelationInput
    initiator?: EmployeeOrderByWithRelationInput
    agendaItems?: AgendaItemOrderByRelationAggregateInput
  }

  export type MeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    buildingId_number?: MeetingBuildingIdNumberCompoundUniqueInput
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    buildingId?: StringFilter<"Meeting"> | string
    number?: StringFilter<"Meeting"> | string
    status?: StringFilter<"Meeting"> | string
    form?: StringFilter<"Meeting"> | string
    startDate?: StringFilter<"Meeting"> | string
    endDate?: StringNullableFilter<"Meeting"> | string | null
    inPersonStartTime?: StringNullableFilter<"Meeting"> | string | null
    inPersonAddress?: StringNullableFilter<"Meeting"> | string | null
    ballotAcceptanceAddress?: StringNullableFilter<"Meeting"> | string | null
    noticeAddress?: StringNullableFilter<"Meeting"> | string | null
    resultsDate?: StringNullableFilter<"Meeting"> | string | null
    initiatorEmployeeId?: StringNullableFilter<"Meeting"> | string | null
    extensionReason?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    activatedAt?: StringNullableFilter<"Meeting"> | string | null
    completedAt?: StringNullableFilter<"Meeting"> | string | null
    archivedAt?: StringNullableFilter<"Meeting"> | string | null
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    initiator?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    agendaItems?: AgendaItemListRelationFilter
  }, "id" | "buildingId_number">

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    status?: SortOrder
    form?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    inPersonStartTime?: SortOrderInput | SortOrder
    inPersonAddress?: SortOrderInput | SortOrder
    ballotAcceptanceAddress?: SortOrderInput | SortOrder
    noticeAddress?: SortOrderInput | SortOrder
    resultsDate?: SortOrderInput | SortOrder
    initiatorEmployeeId?: SortOrderInput | SortOrder
    extensionReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    OR?: MeetingScalarWhereWithAggregatesInput[]
    NOT?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meeting"> | string
    buildingId?: StringWithAggregatesFilter<"Meeting"> | string
    number?: StringWithAggregatesFilter<"Meeting"> | string
    status?: StringWithAggregatesFilter<"Meeting"> | string
    form?: StringWithAggregatesFilter<"Meeting"> | string
    startDate?: StringWithAggregatesFilter<"Meeting"> | string
    endDate?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    inPersonStartTime?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    inPersonAddress?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    ballotAcceptanceAddress?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    noticeAddress?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    resultsDate?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    initiatorEmployeeId?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    extensionReason?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    activatedAt?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    completedAt?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    archivedAt?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
  }

  export type AgendaItemWhereInput = {
    AND?: AgendaItemWhereInput | AgendaItemWhereInput[]
    OR?: AgendaItemWhereInput[]
    NOT?: AgendaItemWhereInput | AgendaItemWhereInput[]
    id?: StringFilter<"AgendaItem"> | string
    meetingId?: StringFilter<"AgendaItem"> | string
    questionId?: StringNullableFilter<"AgendaItem"> | string | null
    orderNumber?: IntFilter<"AgendaItem"> | number
    customProtocolText?: StringNullableFilter<"AgendaItem"> | string | null
    customBulletinText?: StringNullableFilter<"AgendaItem"> | string | null
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    question?: XOR<QuestionLibraryNullableScalarRelationFilter, QuestionLibraryWhereInput> | null
    answers?: QuestionAnswerListRelationFilter
  }

  export type AgendaItemOrderByWithRelationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    questionId?: SortOrderInput | SortOrder
    orderNumber?: SortOrder
    customProtocolText?: SortOrderInput | SortOrder
    customBulletinText?: SortOrderInput | SortOrder
    meeting?: MeetingOrderByWithRelationInput
    question?: QuestionLibraryOrderByWithRelationInput
    answers?: QuestionAnswerOrderByRelationAggregateInput
  }

  export type AgendaItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    meetingId_orderNumber?: AgendaItemMeetingIdOrderNumberCompoundUniqueInput
    AND?: AgendaItemWhereInput | AgendaItemWhereInput[]
    OR?: AgendaItemWhereInput[]
    NOT?: AgendaItemWhereInput | AgendaItemWhereInput[]
    meetingId?: StringFilter<"AgendaItem"> | string
    questionId?: StringNullableFilter<"AgendaItem"> | string | null
    orderNumber?: IntFilter<"AgendaItem"> | number
    customProtocolText?: StringNullableFilter<"AgendaItem"> | string | null
    customBulletinText?: StringNullableFilter<"AgendaItem"> | string | null
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    question?: XOR<QuestionLibraryNullableScalarRelationFilter, QuestionLibraryWhereInput> | null
    answers?: QuestionAnswerListRelationFilter
  }, "id" | "meetingId_orderNumber">

  export type AgendaItemOrderByWithAggregationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    questionId?: SortOrderInput | SortOrder
    orderNumber?: SortOrder
    customProtocolText?: SortOrderInput | SortOrder
    customBulletinText?: SortOrderInput | SortOrder
    _count?: AgendaItemCountOrderByAggregateInput
    _avg?: AgendaItemAvgOrderByAggregateInput
    _max?: AgendaItemMaxOrderByAggregateInput
    _min?: AgendaItemMinOrderByAggregateInput
    _sum?: AgendaItemSumOrderByAggregateInput
  }

  export type AgendaItemScalarWhereWithAggregatesInput = {
    AND?: AgendaItemScalarWhereWithAggregatesInput | AgendaItemScalarWhereWithAggregatesInput[]
    OR?: AgendaItemScalarWhereWithAggregatesInput[]
    NOT?: AgendaItemScalarWhereWithAggregatesInput | AgendaItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgendaItem"> | string
    meetingId?: StringWithAggregatesFilter<"AgendaItem"> | string
    questionId?: StringNullableWithAggregatesFilter<"AgendaItem"> | string | null
    orderNumber?: IntWithAggregatesFilter<"AgendaItem"> | number
    customProtocolText?: StringNullableWithAggregatesFilter<"AgendaItem"> | string | null
    customBulletinText?: StringNullableWithAggregatesFilter<"AgendaItem"> | string | null
  }

  export type QuestionAnswerWhereInput = {
    AND?: QuestionAnswerWhereInput | QuestionAnswerWhereInput[]
    OR?: QuestionAnswerWhereInput[]
    NOT?: QuestionAnswerWhereInput | QuestionAnswerWhereInput[]
    ownerId?: StringFilter<"QuestionAnswer"> | string
    agendaItemId?: StringFilter<"QuestionAnswer"> | string
    vote?: StringFilter<"QuestionAnswer"> | string
    weight?: FloatNullableFilter<"QuestionAnswer"> | number | null
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
    agendaItem?: XOR<AgendaItemScalarRelationFilter, AgendaItemWhereInput>
  }

  export type QuestionAnswerOrderByWithRelationInput = {
    ownerId?: SortOrder
    agendaItemId?: SortOrder
    vote?: SortOrder
    weight?: SortOrderInput | SortOrder
    owner?: OwnerOrderByWithRelationInput
    agendaItem?: AgendaItemOrderByWithRelationInput
  }

  export type QuestionAnswerWhereUniqueInput = Prisma.AtLeast<{
    ownerId_agendaItemId?: QuestionAnswerOwnerIdAgendaItemIdCompoundUniqueInput
    AND?: QuestionAnswerWhereInput | QuestionAnswerWhereInput[]
    OR?: QuestionAnswerWhereInput[]
    NOT?: QuestionAnswerWhereInput | QuestionAnswerWhereInput[]
    ownerId?: StringFilter<"QuestionAnswer"> | string
    agendaItemId?: StringFilter<"QuestionAnswer"> | string
    vote?: StringFilter<"QuestionAnswer"> | string
    weight?: FloatNullableFilter<"QuestionAnswer"> | number | null
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
    agendaItem?: XOR<AgendaItemScalarRelationFilter, AgendaItemWhereInput>
  }, "ownerId_agendaItemId">

  export type QuestionAnswerOrderByWithAggregationInput = {
    ownerId?: SortOrder
    agendaItemId?: SortOrder
    vote?: SortOrder
    weight?: SortOrderInput | SortOrder
    _count?: QuestionAnswerCountOrderByAggregateInput
    _avg?: QuestionAnswerAvgOrderByAggregateInput
    _max?: QuestionAnswerMaxOrderByAggregateInput
    _min?: QuestionAnswerMinOrderByAggregateInput
    _sum?: QuestionAnswerSumOrderByAggregateInput
  }

  export type QuestionAnswerScalarWhereWithAggregatesInput = {
    AND?: QuestionAnswerScalarWhereWithAggregatesInput | QuestionAnswerScalarWhereWithAggregatesInput[]
    OR?: QuestionAnswerScalarWhereWithAggregatesInput[]
    NOT?: QuestionAnswerScalarWhereWithAggregatesInput | QuestionAnswerScalarWhereWithAggregatesInput[]
    ownerId?: StringWithAggregatesFilter<"QuestionAnswer"> | string
    agendaItemId?: StringWithAggregatesFilter<"QuestionAnswer"> | string
    vote?: StringWithAggregatesFilter<"QuestionAnswer"> | string
    weight?: FloatNullableWithAggregatesFilter<"QuestionAnswer"> | number | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    employeeId?: StringNullableFilter<"AuditLog"> | string | null
    actionType?: StringFilter<"AuditLog"> | string
    objectId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    objectId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    employeeId?: StringNullableFilter<"AuditLog"> | string | null
    actionType?: StringFilter<"AuditLog"> | string
    objectId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    objectId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    employeeId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actionType?: StringWithAggregatesFilter<"AuditLog"> | string
    objectId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type BuildingCreateInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseCreateNestedManyWithoutBuildingInput
    employeeAccess?: EmployeeBuildingAccessCreateNestedManyWithoutBuildingInput
    meetings?: MeetingCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUncheckedCreateInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseUncheckedCreateNestedManyWithoutBuildingInput
    employeeAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutBuildingInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUpdateManyWithoutBuildingNestedInput
    employeeAccess?: EmployeeBuildingAccessUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUncheckedUpdateManyWithoutBuildingNestedInput
    employeeAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingCreateManyInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiseCreateInput = {
    id?: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
    building: BuildingCreateNestedOneWithoutPremisesInput
    ownershipRights?: OwnershipRightCreateNestedManyWithoutPremiseInput
  }

  export type PremiseUncheckedCreateInput = {
    id?: string
    buildingId: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
    ownershipRights?: OwnershipRightUncheckedCreateNestedManyWithoutPremiseInput
  }

  export type PremiseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
    building?: BuildingUpdateOneRequiredWithoutPremisesNestedInput
    ownershipRights?: OwnershipRightUpdateManyWithoutPremiseNestedInput
  }

  export type PremiseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
    ownershipRights?: OwnershipRightUncheckedUpdateManyWithoutPremiseNestedInput
  }

  export type PremiseCreateManyInput = {
    id?: string
    buildingId: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
  }

  export type PremiseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
  }

  export type PremiseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerCreateInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    ownershipRights?: OwnershipRightCreateNestedManyWithoutOwnerInput
    answers?: QuestionAnswerCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUncheckedCreateInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    ownershipRights?: OwnershipRightUncheckedCreateNestedManyWithoutOwnerInput
    answers?: QuestionAnswerUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    ownershipRights?: OwnershipRightUpdateManyWithoutOwnerNestedInput
    answers?: QuestionAnswerUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    ownershipRights?: OwnershipRightUncheckedUpdateManyWithoutOwnerNestedInput
    answers?: QuestionAnswerUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerCreateManyInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
  }

  export type OwnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightCreateInput = {
    id?: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
    premise: PremiseCreateNestedOneWithoutOwnershipRightsInput
    owner: OwnerCreateNestedOneWithoutOwnershipRightsInput
  }

  export type OwnershipRightUncheckedCreateInput = {
    id?: string
    premiseId: string
    ownerId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type OwnershipRightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
    premise?: PremiseUpdateOneRequiredWithoutOwnershipRightsNestedInput
    owner?: OwnerUpdateOneRequiredWithoutOwnershipRightsNestedInput
  }

  export type OwnershipRightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    premiseId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightCreateManyInput = {
    id?: string
    premiseId: string
    ownerId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type OwnershipRightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    premiseId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryUncheckedCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingUncheckedCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUncheckedUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUncheckedUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeBuildingAccessCreateInput = {
    employee: EmployeeCreateNestedOneWithoutBuildingAccessInput
    building: BuildingCreateNestedOneWithoutEmployeeAccessInput
  }

  export type EmployeeBuildingAccessUncheckedCreateInput = {
    employeeId: string
    buildingId: string
  }

  export type EmployeeBuildingAccessUpdateInput = {
    employee?: EmployeeUpdateOneRequiredWithoutBuildingAccessNestedInput
    building?: BuildingUpdateOneRequiredWithoutEmployeeAccessNestedInput
  }

  export type EmployeeBuildingAccessUncheckedUpdateInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeBuildingAccessCreateManyInput = {
    employeeId: string
    buildingId: string
  }

  export type EmployeeBuildingAccessUpdateManyMutationInput = {

  }

  export type EmployeeBuildingAccessUncheckedUpdateManyInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionLibraryCreateInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdAt?: Date | string
    createdBy?: EmployeeCreateNestedOneWithoutCreatedQuestionsInput
    agendaItems?: AgendaItemCreateNestedManyWithoutQuestionInput
  }

  export type QuestionLibraryUncheckedCreateInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdByEmployeeId?: string | null
    createdAt?: Date | string
    agendaItems?: AgendaItemUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionLibraryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: EmployeeUpdateOneWithoutCreatedQuestionsNestedInput
    agendaItems?: AgendaItemUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionLibraryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdByEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendaItems?: AgendaItemUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionLibraryCreateManyInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdByEmployeeId?: string | null
    createdAt?: Date | string
  }

  export type QuestionLibraryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionLibraryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdByEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    building: BuildingCreateNestedOneWithoutMeetingsInput
    initiator?: EmployeeCreateNestedOneWithoutInitiatedMeetingsInput
    agendaItems?: AgendaItemCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: string
    buildingId: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    initiatorEmployeeId?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    agendaItems?: AgendaItemUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    building?: BuildingUpdateOneRequiredWithoutMeetingsNestedInput
    initiator?: EmployeeUpdateOneWithoutInitiatedMeetingsNestedInput
    agendaItems?: AgendaItemUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    initiatorEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    agendaItems?: AgendaItemUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingCreateManyInput = {
    id?: string
    buildingId: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    initiatorEmployeeId?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
  }

  export type MeetingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    initiatorEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgendaItemCreateInput = {
    id?: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    meeting: MeetingCreateNestedOneWithoutAgendaItemsInput
    question?: QuestionLibraryCreateNestedOneWithoutAgendaItemsInput
    answers?: QuestionAnswerCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemUncheckedCreateInput = {
    id?: string
    meetingId: string
    questionId?: string | null
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    answers?: QuestionAnswerUncheckedCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    meeting?: MeetingUpdateOneRequiredWithoutAgendaItemsNestedInput
    question?: QuestionLibraryUpdateOneWithoutAgendaItemsNestedInput
    answers?: QuestionAnswerUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: QuestionAnswerUncheckedUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemCreateManyInput = {
    id?: string
    meetingId: string
    questionId?: string | null
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
  }

  export type AgendaItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgendaItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuestionAnswerCreateInput = {
    vote: string
    weight?: number | null
    owner: OwnerCreateNestedOneWithoutAnswersInput
    agendaItem: AgendaItemCreateNestedOneWithoutAnswersInput
  }

  export type QuestionAnswerUncheckedCreateInput = {
    ownerId: string
    agendaItemId: string
    vote: string
    weight?: number | null
  }

  export type QuestionAnswerUpdateInput = {
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    owner?: OwnerUpdateOneRequiredWithoutAnswersNestedInput
    agendaItem?: AgendaItemUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type QuestionAnswerUncheckedUpdateInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    agendaItemId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type QuestionAnswerCreateManyInput = {
    ownerId: string
    agendaItemId: string
    vote: string
    weight?: number | null
  }

  export type QuestionAnswerUpdateManyMutationInput = {
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type QuestionAnswerUncheckedUpdateManyInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    agendaItemId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuditLogCreateInput = {
    id?: string
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
    employee?: EmployeeCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    employeeId?: string | null
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    employeeId?: string | null
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PremiseListRelationFilter = {
    every?: PremiseWhereInput
    some?: PremiseWhereInput
    none?: PremiseWhereInput
  }

  export type EmployeeBuildingAccessListRelationFilter = {
    every?: EmployeeBuildingAccessWhereInput
    some?: EmployeeBuildingAccessWhereInput
    none?: EmployeeBuildingAccessWhereInput
  }

  export type MeetingListRelationFilter = {
    every?: MeetingWhereInput
    some?: MeetingWhereInput
    none?: MeetingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PremiseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeBuildingAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BuildingCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    cadastralNumber?: SortOrder
    yearBuilt?: SortOrder
    floors?: SortOrder
    entrances?: SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingAvgOrderByAggregateInput = {
    yearBuilt?: SortOrder
    floors?: SortOrder
    entrances?: SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
  }

  export type BuildingMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    cadastralNumber?: SortOrder
    yearBuilt?: SortOrder
    floors?: SortOrder
    entrances?: SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    cadastralNumber?: SortOrder
    yearBuilt?: SortOrder
    floors?: SortOrder
    entrances?: SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingSumOrderByAggregateInput = {
    yearBuilt?: SortOrder
    floors?: SortOrder
    entrances?: SortOrder
    totalArea?: SortOrder
    totalPremises?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BuildingScalarRelationFilter = {
    is?: BuildingWhereInput
    isNot?: BuildingWhereInput
  }

  export type OwnershipRightListRelationFilter = {
    every?: OwnershipRightWhereInput
    some?: OwnershipRightWhereInput
    none?: OwnershipRightWhereInput
  }

  export type OwnershipRightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PremiseCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    cadastralNumber?: SortOrder
    area?: SortOrder
    ownershipForm?: SortOrder
  }

  export type PremiseAvgOrderByAggregateInput = {
    area?: SortOrder
  }

  export type PremiseMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    cadastralNumber?: SortOrder
    area?: SortOrder
    ownershipForm?: SortOrder
  }

  export type PremiseMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    cadastralNumber?: SortOrder
    area?: SortOrder
    ownershipForm?: SortOrder
  }

  export type PremiseSumOrderByAggregateInput = {
    area?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type QuestionAnswerListRelationFilter = {
    every?: QuestionAnswerWhereInput
    some?: QuestionAnswerWhereInput
    none?: QuestionAnswerWhereInput
  }

  export type QuestionAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OwnerCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    inn?: SortOrder
    snils?: SortOrder
    contacts?: SortOrder
  }

  export type OwnerMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    inn?: SortOrder
    snils?: SortOrder
    contacts?: SortOrder
  }

  export type OwnerMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    inn?: SortOrder
    snils?: SortOrder
    contacts?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PremiseScalarRelationFilter = {
    is?: PremiseWhereInput
    isNot?: PremiseWhereInput
  }

  export type OwnerScalarRelationFilter = {
    is?: OwnerWhereInput
    isNot?: OwnerWhereInput
  }

  export type OwnershipRightPremiseIdOwnerIdCompoundUniqueInput = {
    premiseId: string
    ownerId: string
  }

  export type OwnershipRightCountOrderByAggregateInput = {
    id?: SortOrder
    premiseId?: SortOrder
    ownerId?: SortOrder
    share?: SortOrder
    shareArea?: SortOrder
    titleDocument?: SortOrder
    registrationDate?: SortOrder
    basisDocument?: SortOrder
  }

  export type OwnershipRightAvgOrderByAggregateInput = {
    shareArea?: SortOrder
  }

  export type OwnershipRightMaxOrderByAggregateInput = {
    id?: SortOrder
    premiseId?: SortOrder
    ownerId?: SortOrder
    share?: SortOrder
    shareArea?: SortOrder
    titleDocument?: SortOrder
    registrationDate?: SortOrder
    basisDocument?: SortOrder
  }

  export type OwnershipRightMinOrderByAggregateInput = {
    id?: SortOrder
    premiseId?: SortOrder
    ownerId?: SortOrder
    share?: SortOrder
    shareArea?: SortOrder
    titleDocument?: SortOrder
    registrationDate?: SortOrder
    basisDocument?: SortOrder
  }

  export type OwnershipRightSumOrderByAggregateInput = {
    shareArea?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type QuestionLibraryListRelationFilter = {
    every?: QuestionLibraryWhereInput
    some?: QuestionLibraryWhereInput
    none?: QuestionLibraryWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type QuestionLibraryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    isActive?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    isActive?: SortOrder
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type EmployeeBuildingAccessEmployeeIdBuildingIdCompoundUniqueInput = {
    employeeId: string
    buildingId: string
  }

  export type EmployeeBuildingAccessCountOrderByAggregateInput = {
    employeeId?: SortOrder
    buildingId?: SortOrder
  }

  export type EmployeeBuildingAccessMaxOrderByAggregateInput = {
    employeeId?: SortOrder
    buildingId?: SortOrder
  }

  export type EmployeeBuildingAccessMinOrderByAggregateInput = {
    employeeId?: SortOrder
    buildingId?: SortOrder
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type AgendaItemListRelationFilter = {
    every?: AgendaItemWhereInput
    some?: AgendaItemWhereInput
    none?: AgendaItemWhereInput
  }

  export type AgendaItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionLibraryCountOrderByAggregateInput = {
    id?: SortOrder
    shortTitle?: SortOrder
    protocolText?: SortOrder
    bulletinText?: SortOrder
    quorumType?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    createdByEmployeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionLibraryMaxOrderByAggregateInput = {
    id?: SortOrder
    shortTitle?: SortOrder
    protocolText?: SortOrder
    bulletinText?: SortOrder
    quorumType?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    createdByEmployeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionLibraryMinOrderByAggregateInput = {
    id?: SortOrder
    shortTitle?: SortOrder
    protocolText?: SortOrder
    bulletinText?: SortOrder
    quorumType?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    createdByEmployeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type MeetingBuildingIdNumberCompoundUniqueInput = {
    buildingId: string
    number: string
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    status?: SortOrder
    form?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    inPersonStartTime?: SortOrder
    inPersonAddress?: SortOrder
    ballotAcceptanceAddress?: SortOrder
    noticeAddress?: SortOrder
    resultsDate?: SortOrder
    initiatorEmployeeId?: SortOrder
    extensionReason?: SortOrder
    createdAt?: SortOrder
    activatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    status?: SortOrder
    form?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    inPersonStartTime?: SortOrder
    inPersonAddress?: SortOrder
    ballotAcceptanceAddress?: SortOrder
    noticeAddress?: SortOrder
    resultsDate?: SortOrder
    initiatorEmployeeId?: SortOrder
    extensionReason?: SortOrder
    createdAt?: SortOrder
    activatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    number?: SortOrder
    status?: SortOrder
    form?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    inPersonStartTime?: SortOrder
    inPersonAddress?: SortOrder
    ballotAcceptanceAddress?: SortOrder
    noticeAddress?: SortOrder
    resultsDate?: SortOrder
    initiatorEmployeeId?: SortOrder
    extensionReason?: SortOrder
    createdAt?: SortOrder
    activatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type MeetingScalarRelationFilter = {
    is?: MeetingWhereInput
    isNot?: MeetingWhereInput
  }

  export type QuestionLibraryNullableScalarRelationFilter = {
    is?: QuestionLibraryWhereInput | null
    isNot?: QuestionLibraryWhereInput | null
  }

  export type AgendaItemMeetingIdOrderNumberCompoundUniqueInput = {
    meetingId: string
    orderNumber: number
  }

  export type AgendaItemCountOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    questionId?: SortOrder
    orderNumber?: SortOrder
    customProtocolText?: SortOrder
    customBulletinText?: SortOrder
  }

  export type AgendaItemAvgOrderByAggregateInput = {
    orderNumber?: SortOrder
  }

  export type AgendaItemMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    questionId?: SortOrder
    orderNumber?: SortOrder
    customProtocolText?: SortOrder
    customBulletinText?: SortOrder
  }

  export type AgendaItemMinOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    questionId?: SortOrder
    orderNumber?: SortOrder
    customProtocolText?: SortOrder
    customBulletinText?: SortOrder
  }

  export type AgendaItemSumOrderByAggregateInput = {
    orderNumber?: SortOrder
  }

  export type AgendaItemScalarRelationFilter = {
    is?: AgendaItemWhereInput
    isNot?: AgendaItemWhereInput
  }

  export type QuestionAnswerOwnerIdAgendaItemIdCompoundUniqueInput = {
    ownerId: string
    agendaItemId: string
  }

  export type QuestionAnswerCountOrderByAggregateInput = {
    ownerId?: SortOrder
    agendaItemId?: SortOrder
    vote?: SortOrder
    weight?: SortOrder
  }

  export type QuestionAnswerAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type QuestionAnswerMaxOrderByAggregateInput = {
    ownerId?: SortOrder
    agendaItemId?: SortOrder
    vote?: SortOrder
    weight?: SortOrder
  }

  export type QuestionAnswerMinOrderByAggregateInput = {
    ownerId?: SortOrder
    agendaItemId?: SortOrder
    vote?: SortOrder
    weight?: SortOrder
  }

  export type QuestionAnswerSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    actionType?: SortOrder
    objectId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    actionType?: SortOrder
    objectId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    actionType?: SortOrder
    objectId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type PremiseCreateNestedManyWithoutBuildingInput = {
    create?: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput> | PremiseCreateWithoutBuildingInput[] | PremiseUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PremiseCreateOrConnectWithoutBuildingInput | PremiseCreateOrConnectWithoutBuildingInput[]
    createMany?: PremiseCreateManyBuildingInputEnvelope
    connect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
  }

  export type EmployeeBuildingAccessCreateNestedManyWithoutBuildingInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput> | EmployeeBuildingAccessCreateWithoutBuildingInput[] | EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput | EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput[]
    createMany?: EmployeeBuildingAccessCreateManyBuildingInputEnvelope
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
  }

  export type MeetingCreateNestedManyWithoutBuildingInput = {
    create?: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput> | MeetingCreateWithoutBuildingInput[] | MeetingUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutBuildingInput | MeetingCreateOrConnectWithoutBuildingInput[]
    createMany?: MeetingCreateManyBuildingInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type PremiseUncheckedCreateNestedManyWithoutBuildingInput = {
    create?: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput> | PremiseCreateWithoutBuildingInput[] | PremiseUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PremiseCreateOrConnectWithoutBuildingInput | PremiseCreateOrConnectWithoutBuildingInput[]
    createMany?: PremiseCreateManyBuildingInputEnvelope
    connect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
  }

  export type EmployeeBuildingAccessUncheckedCreateNestedManyWithoutBuildingInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput> | EmployeeBuildingAccessCreateWithoutBuildingInput[] | EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput | EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput[]
    createMany?: EmployeeBuildingAccessCreateManyBuildingInputEnvelope
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
  }

  export type MeetingUncheckedCreateNestedManyWithoutBuildingInput = {
    create?: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput> | MeetingCreateWithoutBuildingInput[] | MeetingUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutBuildingInput | MeetingCreateOrConnectWithoutBuildingInput[]
    createMany?: MeetingCreateManyBuildingInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PremiseUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput> | PremiseCreateWithoutBuildingInput[] | PremiseUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PremiseCreateOrConnectWithoutBuildingInput | PremiseCreateOrConnectWithoutBuildingInput[]
    upsert?: PremiseUpsertWithWhereUniqueWithoutBuildingInput | PremiseUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: PremiseCreateManyBuildingInputEnvelope
    set?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    disconnect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    delete?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    connect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    update?: PremiseUpdateWithWhereUniqueWithoutBuildingInput | PremiseUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: PremiseUpdateManyWithWhereWithoutBuildingInput | PremiseUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: PremiseScalarWhereInput | PremiseScalarWhereInput[]
  }

  export type EmployeeBuildingAccessUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput> | EmployeeBuildingAccessCreateWithoutBuildingInput[] | EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput | EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput[]
    upsert?: EmployeeBuildingAccessUpsertWithWhereUniqueWithoutBuildingInput | EmployeeBuildingAccessUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: EmployeeBuildingAccessCreateManyBuildingInputEnvelope
    set?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    disconnect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    delete?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    update?: EmployeeBuildingAccessUpdateWithWhereUniqueWithoutBuildingInput | EmployeeBuildingAccessUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: EmployeeBuildingAccessUpdateManyWithWhereWithoutBuildingInput | EmployeeBuildingAccessUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
  }

  export type MeetingUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput> | MeetingCreateWithoutBuildingInput[] | MeetingUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutBuildingInput | MeetingCreateOrConnectWithoutBuildingInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutBuildingInput | MeetingUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: MeetingCreateManyBuildingInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutBuildingInput | MeetingUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutBuildingInput | MeetingUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type PremiseUncheckedUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput> | PremiseCreateWithoutBuildingInput[] | PremiseUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PremiseCreateOrConnectWithoutBuildingInput | PremiseCreateOrConnectWithoutBuildingInput[]
    upsert?: PremiseUpsertWithWhereUniqueWithoutBuildingInput | PremiseUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: PremiseCreateManyBuildingInputEnvelope
    set?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    disconnect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    delete?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    connect?: PremiseWhereUniqueInput | PremiseWhereUniqueInput[]
    update?: PremiseUpdateWithWhereUniqueWithoutBuildingInput | PremiseUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: PremiseUpdateManyWithWhereWithoutBuildingInput | PremiseUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: PremiseScalarWhereInput | PremiseScalarWhereInput[]
  }

  export type EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput> | EmployeeBuildingAccessCreateWithoutBuildingInput[] | EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput | EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput[]
    upsert?: EmployeeBuildingAccessUpsertWithWhereUniqueWithoutBuildingInput | EmployeeBuildingAccessUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: EmployeeBuildingAccessCreateManyBuildingInputEnvelope
    set?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    disconnect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    delete?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    update?: EmployeeBuildingAccessUpdateWithWhereUniqueWithoutBuildingInput | EmployeeBuildingAccessUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: EmployeeBuildingAccessUpdateManyWithWhereWithoutBuildingInput | EmployeeBuildingAccessUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
  }

  export type MeetingUncheckedUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput> | MeetingCreateWithoutBuildingInput[] | MeetingUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutBuildingInput | MeetingCreateOrConnectWithoutBuildingInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutBuildingInput | MeetingUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: MeetingCreateManyBuildingInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutBuildingInput | MeetingUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutBuildingInput | MeetingUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type BuildingCreateNestedOneWithoutPremisesInput = {
    create?: XOR<BuildingCreateWithoutPremisesInput, BuildingUncheckedCreateWithoutPremisesInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutPremisesInput
    connect?: BuildingWhereUniqueInput
  }

  export type OwnershipRightCreateNestedManyWithoutPremiseInput = {
    create?: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput> | OwnershipRightCreateWithoutPremiseInput[] | OwnershipRightUncheckedCreateWithoutPremiseInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutPremiseInput | OwnershipRightCreateOrConnectWithoutPremiseInput[]
    createMany?: OwnershipRightCreateManyPremiseInputEnvelope
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
  }

  export type OwnershipRightUncheckedCreateNestedManyWithoutPremiseInput = {
    create?: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput> | OwnershipRightCreateWithoutPremiseInput[] | OwnershipRightUncheckedCreateWithoutPremiseInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutPremiseInput | OwnershipRightCreateOrConnectWithoutPremiseInput[]
    createMany?: OwnershipRightCreateManyPremiseInputEnvelope
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BuildingUpdateOneRequiredWithoutPremisesNestedInput = {
    create?: XOR<BuildingCreateWithoutPremisesInput, BuildingUncheckedCreateWithoutPremisesInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutPremisesInput
    upsert?: BuildingUpsertWithoutPremisesInput
    connect?: BuildingWhereUniqueInput
    update?: XOR<XOR<BuildingUpdateToOneWithWhereWithoutPremisesInput, BuildingUpdateWithoutPremisesInput>, BuildingUncheckedUpdateWithoutPremisesInput>
  }

  export type OwnershipRightUpdateManyWithoutPremiseNestedInput = {
    create?: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput> | OwnershipRightCreateWithoutPremiseInput[] | OwnershipRightUncheckedCreateWithoutPremiseInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutPremiseInput | OwnershipRightCreateOrConnectWithoutPremiseInput[]
    upsert?: OwnershipRightUpsertWithWhereUniqueWithoutPremiseInput | OwnershipRightUpsertWithWhereUniqueWithoutPremiseInput[]
    createMany?: OwnershipRightCreateManyPremiseInputEnvelope
    set?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    disconnect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    delete?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    update?: OwnershipRightUpdateWithWhereUniqueWithoutPremiseInput | OwnershipRightUpdateWithWhereUniqueWithoutPremiseInput[]
    updateMany?: OwnershipRightUpdateManyWithWhereWithoutPremiseInput | OwnershipRightUpdateManyWithWhereWithoutPremiseInput[]
    deleteMany?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
  }

  export type OwnershipRightUncheckedUpdateManyWithoutPremiseNestedInput = {
    create?: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput> | OwnershipRightCreateWithoutPremiseInput[] | OwnershipRightUncheckedCreateWithoutPremiseInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutPremiseInput | OwnershipRightCreateOrConnectWithoutPremiseInput[]
    upsert?: OwnershipRightUpsertWithWhereUniqueWithoutPremiseInput | OwnershipRightUpsertWithWhereUniqueWithoutPremiseInput[]
    createMany?: OwnershipRightCreateManyPremiseInputEnvelope
    set?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    disconnect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    delete?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    update?: OwnershipRightUpdateWithWhereUniqueWithoutPremiseInput | OwnershipRightUpdateWithWhereUniqueWithoutPremiseInput[]
    updateMany?: OwnershipRightUpdateManyWithWhereWithoutPremiseInput | OwnershipRightUpdateManyWithWhereWithoutPremiseInput[]
    deleteMany?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
  }

  export type OwnershipRightCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput> | OwnershipRightCreateWithoutOwnerInput[] | OwnershipRightUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutOwnerInput | OwnershipRightCreateOrConnectWithoutOwnerInput[]
    createMany?: OwnershipRightCreateManyOwnerInputEnvelope
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
  }

  export type QuestionAnswerCreateNestedManyWithoutOwnerInput = {
    create?: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput> | QuestionAnswerCreateWithoutOwnerInput[] | QuestionAnswerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutOwnerInput | QuestionAnswerCreateOrConnectWithoutOwnerInput[]
    createMany?: QuestionAnswerCreateManyOwnerInputEnvelope
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
  }

  export type OwnershipRightUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput> | OwnershipRightCreateWithoutOwnerInput[] | OwnershipRightUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutOwnerInput | OwnershipRightCreateOrConnectWithoutOwnerInput[]
    createMany?: OwnershipRightCreateManyOwnerInputEnvelope
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
  }

  export type QuestionAnswerUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput> | QuestionAnswerCreateWithoutOwnerInput[] | QuestionAnswerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutOwnerInput | QuestionAnswerCreateOrConnectWithoutOwnerInput[]
    createMany?: QuestionAnswerCreateManyOwnerInputEnvelope
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
  }

  export type OwnershipRightUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput> | OwnershipRightCreateWithoutOwnerInput[] | OwnershipRightUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutOwnerInput | OwnershipRightCreateOrConnectWithoutOwnerInput[]
    upsert?: OwnershipRightUpsertWithWhereUniqueWithoutOwnerInput | OwnershipRightUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OwnershipRightCreateManyOwnerInputEnvelope
    set?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    disconnect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    delete?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    update?: OwnershipRightUpdateWithWhereUniqueWithoutOwnerInput | OwnershipRightUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OwnershipRightUpdateManyWithWhereWithoutOwnerInput | OwnershipRightUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
  }

  export type QuestionAnswerUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput> | QuestionAnswerCreateWithoutOwnerInput[] | QuestionAnswerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutOwnerInput | QuestionAnswerCreateOrConnectWithoutOwnerInput[]
    upsert?: QuestionAnswerUpsertWithWhereUniqueWithoutOwnerInput | QuestionAnswerUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: QuestionAnswerCreateManyOwnerInputEnvelope
    set?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    disconnect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    delete?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    update?: QuestionAnswerUpdateWithWhereUniqueWithoutOwnerInput | QuestionAnswerUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: QuestionAnswerUpdateManyWithWhereWithoutOwnerInput | QuestionAnswerUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
  }

  export type OwnershipRightUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput> | OwnershipRightCreateWithoutOwnerInput[] | OwnershipRightUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OwnershipRightCreateOrConnectWithoutOwnerInput | OwnershipRightCreateOrConnectWithoutOwnerInput[]
    upsert?: OwnershipRightUpsertWithWhereUniqueWithoutOwnerInput | OwnershipRightUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OwnershipRightCreateManyOwnerInputEnvelope
    set?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    disconnect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    delete?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    connect?: OwnershipRightWhereUniqueInput | OwnershipRightWhereUniqueInput[]
    update?: OwnershipRightUpdateWithWhereUniqueWithoutOwnerInput | OwnershipRightUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OwnershipRightUpdateManyWithWhereWithoutOwnerInput | OwnershipRightUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
  }

  export type QuestionAnswerUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput> | QuestionAnswerCreateWithoutOwnerInput[] | QuestionAnswerUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutOwnerInput | QuestionAnswerCreateOrConnectWithoutOwnerInput[]
    upsert?: QuestionAnswerUpsertWithWhereUniqueWithoutOwnerInput | QuestionAnswerUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: QuestionAnswerCreateManyOwnerInputEnvelope
    set?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    disconnect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    delete?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    update?: QuestionAnswerUpdateWithWhereUniqueWithoutOwnerInput | QuestionAnswerUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: QuestionAnswerUpdateManyWithWhereWithoutOwnerInput | QuestionAnswerUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
  }

  export type PremiseCreateNestedOneWithoutOwnershipRightsInput = {
    create?: XOR<PremiseCreateWithoutOwnershipRightsInput, PremiseUncheckedCreateWithoutOwnershipRightsInput>
    connectOrCreate?: PremiseCreateOrConnectWithoutOwnershipRightsInput
    connect?: PremiseWhereUniqueInput
  }

  export type OwnerCreateNestedOneWithoutOwnershipRightsInput = {
    create?: XOR<OwnerCreateWithoutOwnershipRightsInput, OwnerUncheckedCreateWithoutOwnershipRightsInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutOwnershipRightsInput
    connect?: OwnerWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PremiseUpdateOneRequiredWithoutOwnershipRightsNestedInput = {
    create?: XOR<PremiseCreateWithoutOwnershipRightsInput, PremiseUncheckedCreateWithoutOwnershipRightsInput>
    connectOrCreate?: PremiseCreateOrConnectWithoutOwnershipRightsInput
    upsert?: PremiseUpsertWithoutOwnershipRightsInput
    connect?: PremiseWhereUniqueInput
    update?: XOR<XOR<PremiseUpdateToOneWithWhereWithoutOwnershipRightsInput, PremiseUpdateWithoutOwnershipRightsInput>, PremiseUncheckedUpdateWithoutOwnershipRightsInput>
  }

  export type OwnerUpdateOneRequiredWithoutOwnershipRightsNestedInput = {
    create?: XOR<OwnerCreateWithoutOwnershipRightsInput, OwnerUncheckedCreateWithoutOwnershipRightsInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutOwnershipRightsInput
    upsert?: OwnerUpsertWithoutOwnershipRightsInput
    connect?: OwnerWhereUniqueInput
    update?: XOR<XOR<OwnerUpdateToOneWithWhereWithoutOwnershipRightsInput, OwnerUpdateWithoutOwnershipRightsInput>, OwnerUncheckedUpdateWithoutOwnershipRightsInput>
  }

  export type EmployeeBuildingAccessCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput> | EmployeeBuildingAccessCreateWithoutEmployeeInput[] | EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput | EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeBuildingAccessCreateManyEmployeeInputEnvelope
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
  }

  export type QuestionLibraryCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput> | QuestionLibraryCreateWithoutCreatedByInput[] | QuestionLibraryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutCreatedByInput | QuestionLibraryCreateOrConnectWithoutCreatedByInput[]
    createMany?: QuestionLibraryCreateManyCreatedByInputEnvelope
    connect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
  }

  export type MeetingCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput> | MeetingCreateWithoutInitiatorInput[] | MeetingUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutInitiatorInput | MeetingCreateOrConnectWithoutInitiatorInput[]
    createMany?: MeetingCreateManyInitiatorInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EmployeeBuildingAccessUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput> | EmployeeBuildingAccessCreateWithoutEmployeeInput[] | EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput | EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeBuildingAccessCreateManyEmployeeInputEnvelope
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
  }

  export type QuestionLibraryUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput> | QuestionLibraryCreateWithoutCreatedByInput[] | QuestionLibraryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutCreatedByInput | QuestionLibraryCreateOrConnectWithoutCreatedByInput[]
    createMany?: QuestionLibraryCreateManyCreatedByInputEnvelope
    connect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
  }

  export type MeetingUncheckedCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput> | MeetingCreateWithoutInitiatorInput[] | MeetingUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutInitiatorInput | MeetingCreateOrConnectWithoutInitiatorInput[]
    createMany?: MeetingCreateManyInitiatorInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EmployeeBuildingAccessUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput> | EmployeeBuildingAccessCreateWithoutEmployeeInput[] | EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput | EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeBuildingAccessUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeBuildingAccessUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeBuildingAccessCreateManyEmployeeInputEnvelope
    set?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    disconnect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    delete?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    update?: EmployeeBuildingAccessUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeBuildingAccessUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeBuildingAccessUpdateManyWithWhereWithoutEmployeeInput | EmployeeBuildingAccessUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
  }

  export type QuestionLibraryUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput> | QuestionLibraryCreateWithoutCreatedByInput[] | QuestionLibraryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutCreatedByInput | QuestionLibraryCreateOrConnectWithoutCreatedByInput[]
    upsert?: QuestionLibraryUpsertWithWhereUniqueWithoutCreatedByInput | QuestionLibraryUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QuestionLibraryCreateManyCreatedByInputEnvelope
    set?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    disconnect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    delete?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    connect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    update?: QuestionLibraryUpdateWithWhereUniqueWithoutCreatedByInput | QuestionLibraryUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QuestionLibraryUpdateManyWithWhereWithoutCreatedByInput | QuestionLibraryUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QuestionLibraryScalarWhereInput | QuestionLibraryScalarWhereInput[]
  }

  export type MeetingUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput> | MeetingCreateWithoutInitiatorInput[] | MeetingUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutInitiatorInput | MeetingCreateOrConnectWithoutInitiatorInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutInitiatorInput | MeetingUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: MeetingCreateManyInitiatorInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutInitiatorInput | MeetingUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutInitiatorInput | MeetingUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutEmployeeInput | AuditLogUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutEmployeeInput | AuditLogUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutEmployeeInput | AuditLogUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput> | EmployeeBuildingAccessCreateWithoutEmployeeInput[] | EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput | EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeBuildingAccessUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeBuildingAccessUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeBuildingAccessCreateManyEmployeeInputEnvelope
    set?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    disconnect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    delete?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    connect?: EmployeeBuildingAccessWhereUniqueInput | EmployeeBuildingAccessWhereUniqueInput[]
    update?: EmployeeBuildingAccessUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeBuildingAccessUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeBuildingAccessUpdateManyWithWhereWithoutEmployeeInput | EmployeeBuildingAccessUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
  }

  export type QuestionLibraryUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput> | QuestionLibraryCreateWithoutCreatedByInput[] | QuestionLibraryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutCreatedByInput | QuestionLibraryCreateOrConnectWithoutCreatedByInput[]
    upsert?: QuestionLibraryUpsertWithWhereUniqueWithoutCreatedByInput | QuestionLibraryUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QuestionLibraryCreateManyCreatedByInputEnvelope
    set?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    disconnect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    delete?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    connect?: QuestionLibraryWhereUniqueInput | QuestionLibraryWhereUniqueInput[]
    update?: QuestionLibraryUpdateWithWhereUniqueWithoutCreatedByInput | QuestionLibraryUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QuestionLibraryUpdateManyWithWhereWithoutCreatedByInput | QuestionLibraryUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QuestionLibraryScalarWhereInput | QuestionLibraryScalarWhereInput[]
  }

  export type MeetingUncheckedUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput> | MeetingCreateWithoutInitiatorInput[] | MeetingUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutInitiatorInput | MeetingCreateOrConnectWithoutInitiatorInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutInitiatorInput | MeetingUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: MeetingCreateManyInitiatorInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutInitiatorInput | MeetingUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutInitiatorInput | MeetingUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutEmployeeInput | AuditLogUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutEmployeeInput | AuditLogUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutEmployeeInput | AuditLogUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutBuildingAccessInput = {
    create?: XOR<EmployeeCreateWithoutBuildingAccessInput, EmployeeUncheckedCreateWithoutBuildingAccessInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutBuildingAccessInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BuildingCreateNestedOneWithoutEmployeeAccessInput = {
    create?: XOR<BuildingCreateWithoutEmployeeAccessInput, BuildingUncheckedCreateWithoutEmployeeAccessInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutEmployeeAccessInput
    connect?: BuildingWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutBuildingAccessNestedInput = {
    create?: XOR<EmployeeCreateWithoutBuildingAccessInput, EmployeeUncheckedCreateWithoutBuildingAccessInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutBuildingAccessInput
    upsert?: EmployeeUpsertWithoutBuildingAccessInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutBuildingAccessInput, EmployeeUpdateWithoutBuildingAccessInput>, EmployeeUncheckedUpdateWithoutBuildingAccessInput>
  }

  export type BuildingUpdateOneRequiredWithoutEmployeeAccessNestedInput = {
    create?: XOR<BuildingCreateWithoutEmployeeAccessInput, BuildingUncheckedCreateWithoutEmployeeAccessInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutEmployeeAccessInput
    upsert?: BuildingUpsertWithoutEmployeeAccessInput
    connect?: BuildingWhereUniqueInput
    update?: XOR<XOR<BuildingUpdateToOneWithWhereWithoutEmployeeAccessInput, BuildingUpdateWithoutEmployeeAccessInput>, BuildingUncheckedUpdateWithoutEmployeeAccessInput>
  }

  export type EmployeeCreateNestedOneWithoutCreatedQuestionsInput = {
    create?: XOR<EmployeeCreateWithoutCreatedQuestionsInput, EmployeeUncheckedCreateWithoutCreatedQuestionsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutCreatedQuestionsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type AgendaItemCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput> | AgendaItemCreateWithoutQuestionInput[] | AgendaItemUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutQuestionInput | AgendaItemCreateOrConnectWithoutQuestionInput[]
    createMany?: AgendaItemCreateManyQuestionInputEnvelope
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
  }

  export type AgendaItemUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput> | AgendaItemCreateWithoutQuestionInput[] | AgendaItemUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutQuestionInput | AgendaItemCreateOrConnectWithoutQuestionInput[]
    createMany?: AgendaItemCreateManyQuestionInputEnvelope
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
  }

  export type EmployeeUpdateOneWithoutCreatedQuestionsNestedInput = {
    create?: XOR<EmployeeCreateWithoutCreatedQuestionsInput, EmployeeUncheckedCreateWithoutCreatedQuestionsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutCreatedQuestionsInput
    upsert?: EmployeeUpsertWithoutCreatedQuestionsInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutCreatedQuestionsInput, EmployeeUpdateWithoutCreatedQuestionsInput>, EmployeeUncheckedUpdateWithoutCreatedQuestionsInput>
  }

  export type AgendaItemUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput> | AgendaItemCreateWithoutQuestionInput[] | AgendaItemUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutQuestionInput | AgendaItemCreateOrConnectWithoutQuestionInput[]
    upsert?: AgendaItemUpsertWithWhereUniqueWithoutQuestionInput | AgendaItemUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AgendaItemCreateManyQuestionInputEnvelope
    set?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    disconnect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    delete?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    update?: AgendaItemUpdateWithWhereUniqueWithoutQuestionInput | AgendaItemUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AgendaItemUpdateManyWithWhereWithoutQuestionInput | AgendaItemUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
  }

  export type AgendaItemUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput> | AgendaItemCreateWithoutQuestionInput[] | AgendaItemUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutQuestionInput | AgendaItemCreateOrConnectWithoutQuestionInput[]
    upsert?: AgendaItemUpsertWithWhereUniqueWithoutQuestionInput | AgendaItemUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AgendaItemCreateManyQuestionInputEnvelope
    set?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    disconnect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    delete?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    update?: AgendaItemUpdateWithWhereUniqueWithoutQuestionInput | AgendaItemUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AgendaItemUpdateManyWithWhereWithoutQuestionInput | AgendaItemUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
  }

  export type BuildingCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<BuildingCreateWithoutMeetingsInput, BuildingUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutMeetingsInput
    connect?: BuildingWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutInitiatedMeetingsInput = {
    create?: XOR<EmployeeCreateWithoutInitiatedMeetingsInput, EmployeeUncheckedCreateWithoutInitiatedMeetingsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutInitiatedMeetingsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type AgendaItemCreateNestedManyWithoutMeetingInput = {
    create?: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput> | AgendaItemCreateWithoutMeetingInput[] | AgendaItemUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutMeetingInput | AgendaItemCreateOrConnectWithoutMeetingInput[]
    createMany?: AgendaItemCreateManyMeetingInputEnvelope
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
  }

  export type AgendaItemUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput> | AgendaItemCreateWithoutMeetingInput[] | AgendaItemUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutMeetingInput | AgendaItemCreateOrConnectWithoutMeetingInput[]
    createMany?: AgendaItemCreateManyMeetingInputEnvelope
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
  }

  export type BuildingUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<BuildingCreateWithoutMeetingsInput, BuildingUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutMeetingsInput
    upsert?: BuildingUpsertWithoutMeetingsInput
    connect?: BuildingWhereUniqueInput
    update?: XOR<XOR<BuildingUpdateToOneWithWhereWithoutMeetingsInput, BuildingUpdateWithoutMeetingsInput>, BuildingUncheckedUpdateWithoutMeetingsInput>
  }

  export type EmployeeUpdateOneWithoutInitiatedMeetingsNestedInput = {
    create?: XOR<EmployeeCreateWithoutInitiatedMeetingsInput, EmployeeUncheckedCreateWithoutInitiatedMeetingsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutInitiatedMeetingsInput
    upsert?: EmployeeUpsertWithoutInitiatedMeetingsInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutInitiatedMeetingsInput, EmployeeUpdateWithoutInitiatedMeetingsInput>, EmployeeUncheckedUpdateWithoutInitiatedMeetingsInput>
  }

  export type AgendaItemUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput> | AgendaItemCreateWithoutMeetingInput[] | AgendaItemUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutMeetingInput | AgendaItemCreateOrConnectWithoutMeetingInput[]
    upsert?: AgendaItemUpsertWithWhereUniqueWithoutMeetingInput | AgendaItemUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: AgendaItemCreateManyMeetingInputEnvelope
    set?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    disconnect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    delete?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    update?: AgendaItemUpdateWithWhereUniqueWithoutMeetingInput | AgendaItemUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: AgendaItemUpdateManyWithWhereWithoutMeetingInput | AgendaItemUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
  }

  export type AgendaItemUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput> | AgendaItemCreateWithoutMeetingInput[] | AgendaItemUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: AgendaItemCreateOrConnectWithoutMeetingInput | AgendaItemCreateOrConnectWithoutMeetingInput[]
    upsert?: AgendaItemUpsertWithWhereUniqueWithoutMeetingInput | AgendaItemUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: AgendaItemCreateManyMeetingInputEnvelope
    set?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    disconnect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    delete?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    connect?: AgendaItemWhereUniqueInput | AgendaItemWhereUniqueInput[]
    update?: AgendaItemUpdateWithWhereUniqueWithoutMeetingInput | AgendaItemUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: AgendaItemUpdateManyWithWhereWithoutMeetingInput | AgendaItemUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
  }

  export type MeetingCreateNestedOneWithoutAgendaItemsInput = {
    create?: XOR<MeetingCreateWithoutAgendaItemsInput, MeetingUncheckedCreateWithoutAgendaItemsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutAgendaItemsInput
    connect?: MeetingWhereUniqueInput
  }

  export type QuestionLibraryCreateNestedOneWithoutAgendaItemsInput = {
    create?: XOR<QuestionLibraryCreateWithoutAgendaItemsInput, QuestionLibraryUncheckedCreateWithoutAgendaItemsInput>
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutAgendaItemsInput
    connect?: QuestionLibraryWhereUniqueInput
  }

  export type QuestionAnswerCreateNestedManyWithoutAgendaItemInput = {
    create?: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput> | QuestionAnswerCreateWithoutAgendaItemInput[] | QuestionAnswerUncheckedCreateWithoutAgendaItemInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutAgendaItemInput | QuestionAnswerCreateOrConnectWithoutAgendaItemInput[]
    createMany?: QuestionAnswerCreateManyAgendaItemInputEnvelope
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
  }

  export type QuestionAnswerUncheckedCreateNestedManyWithoutAgendaItemInput = {
    create?: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput> | QuestionAnswerCreateWithoutAgendaItemInput[] | QuestionAnswerUncheckedCreateWithoutAgendaItemInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutAgendaItemInput | QuestionAnswerCreateOrConnectWithoutAgendaItemInput[]
    createMany?: QuestionAnswerCreateManyAgendaItemInputEnvelope
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
  }

  export type MeetingUpdateOneRequiredWithoutAgendaItemsNestedInput = {
    create?: XOR<MeetingCreateWithoutAgendaItemsInput, MeetingUncheckedCreateWithoutAgendaItemsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutAgendaItemsInput
    upsert?: MeetingUpsertWithoutAgendaItemsInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<XOR<MeetingUpdateToOneWithWhereWithoutAgendaItemsInput, MeetingUpdateWithoutAgendaItemsInput>, MeetingUncheckedUpdateWithoutAgendaItemsInput>
  }

  export type QuestionLibraryUpdateOneWithoutAgendaItemsNestedInput = {
    create?: XOR<QuestionLibraryCreateWithoutAgendaItemsInput, QuestionLibraryUncheckedCreateWithoutAgendaItemsInput>
    connectOrCreate?: QuestionLibraryCreateOrConnectWithoutAgendaItemsInput
    upsert?: QuestionLibraryUpsertWithoutAgendaItemsInput
    disconnect?: QuestionLibraryWhereInput | boolean
    delete?: QuestionLibraryWhereInput | boolean
    connect?: QuestionLibraryWhereUniqueInput
    update?: XOR<XOR<QuestionLibraryUpdateToOneWithWhereWithoutAgendaItemsInput, QuestionLibraryUpdateWithoutAgendaItemsInput>, QuestionLibraryUncheckedUpdateWithoutAgendaItemsInput>
  }

  export type QuestionAnswerUpdateManyWithoutAgendaItemNestedInput = {
    create?: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput> | QuestionAnswerCreateWithoutAgendaItemInput[] | QuestionAnswerUncheckedCreateWithoutAgendaItemInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutAgendaItemInput | QuestionAnswerCreateOrConnectWithoutAgendaItemInput[]
    upsert?: QuestionAnswerUpsertWithWhereUniqueWithoutAgendaItemInput | QuestionAnswerUpsertWithWhereUniqueWithoutAgendaItemInput[]
    createMany?: QuestionAnswerCreateManyAgendaItemInputEnvelope
    set?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    disconnect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    delete?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    update?: QuestionAnswerUpdateWithWhereUniqueWithoutAgendaItemInput | QuestionAnswerUpdateWithWhereUniqueWithoutAgendaItemInput[]
    updateMany?: QuestionAnswerUpdateManyWithWhereWithoutAgendaItemInput | QuestionAnswerUpdateManyWithWhereWithoutAgendaItemInput[]
    deleteMany?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
  }

  export type QuestionAnswerUncheckedUpdateManyWithoutAgendaItemNestedInput = {
    create?: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput> | QuestionAnswerCreateWithoutAgendaItemInput[] | QuestionAnswerUncheckedCreateWithoutAgendaItemInput[]
    connectOrCreate?: QuestionAnswerCreateOrConnectWithoutAgendaItemInput | QuestionAnswerCreateOrConnectWithoutAgendaItemInput[]
    upsert?: QuestionAnswerUpsertWithWhereUniqueWithoutAgendaItemInput | QuestionAnswerUpsertWithWhereUniqueWithoutAgendaItemInput[]
    createMany?: QuestionAnswerCreateManyAgendaItemInputEnvelope
    set?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    disconnect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    delete?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    connect?: QuestionAnswerWhereUniqueInput | QuestionAnswerWhereUniqueInput[]
    update?: QuestionAnswerUpdateWithWhereUniqueWithoutAgendaItemInput | QuestionAnswerUpdateWithWhereUniqueWithoutAgendaItemInput[]
    updateMany?: QuestionAnswerUpdateManyWithWhereWithoutAgendaItemInput | QuestionAnswerUpdateManyWithWhereWithoutAgendaItemInput[]
    deleteMany?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
  }

  export type OwnerCreateNestedOneWithoutAnswersInput = {
    create?: XOR<OwnerCreateWithoutAnswersInput, OwnerUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutAnswersInput
    connect?: OwnerWhereUniqueInput
  }

  export type AgendaItemCreateNestedOneWithoutAnswersInput = {
    create?: XOR<AgendaItemCreateWithoutAnswersInput, AgendaItemUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: AgendaItemCreateOrConnectWithoutAnswersInput
    connect?: AgendaItemWhereUniqueInput
  }

  export type OwnerUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<OwnerCreateWithoutAnswersInput, OwnerUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutAnswersInput
    upsert?: OwnerUpsertWithoutAnswersInput
    connect?: OwnerWhereUniqueInput
    update?: XOR<XOR<OwnerUpdateToOneWithWhereWithoutAnswersInput, OwnerUpdateWithoutAnswersInput>, OwnerUncheckedUpdateWithoutAnswersInput>
  }

  export type AgendaItemUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<AgendaItemCreateWithoutAnswersInput, AgendaItemUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: AgendaItemCreateOrConnectWithoutAnswersInput
    upsert?: AgendaItemUpsertWithoutAnswersInput
    connect?: AgendaItemWhereUniqueInput
    update?: XOR<XOR<AgendaItemUpdateToOneWithWhereWithoutAnswersInput, AgendaItemUpdateWithoutAnswersInput>, AgendaItemUncheckedUpdateWithoutAnswersInput>
  }

  export type EmployeeCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<EmployeeCreateWithoutAuditLogsInput, EmployeeUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAuditLogsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<EmployeeCreateWithoutAuditLogsInput, EmployeeUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAuditLogsInput
    upsert?: EmployeeUpsertWithoutAuditLogsInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAuditLogsInput, EmployeeUpdateWithoutAuditLogsInput>, EmployeeUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PremiseCreateWithoutBuildingInput = {
    id?: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
    ownershipRights?: OwnershipRightCreateNestedManyWithoutPremiseInput
  }

  export type PremiseUncheckedCreateWithoutBuildingInput = {
    id?: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
    ownershipRights?: OwnershipRightUncheckedCreateNestedManyWithoutPremiseInput
  }

  export type PremiseCreateOrConnectWithoutBuildingInput = {
    where: PremiseWhereUniqueInput
    create: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput>
  }

  export type PremiseCreateManyBuildingInputEnvelope = {
    data: PremiseCreateManyBuildingInput | PremiseCreateManyBuildingInput[]
  }

  export type EmployeeBuildingAccessCreateWithoutBuildingInput = {
    employee: EmployeeCreateNestedOneWithoutBuildingAccessInput
  }

  export type EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput = {
    employeeId: string
  }

  export type EmployeeBuildingAccessCreateOrConnectWithoutBuildingInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    create: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput>
  }

  export type EmployeeBuildingAccessCreateManyBuildingInputEnvelope = {
    data: EmployeeBuildingAccessCreateManyBuildingInput | EmployeeBuildingAccessCreateManyBuildingInput[]
  }

  export type MeetingCreateWithoutBuildingInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    initiator?: EmployeeCreateNestedOneWithoutInitiatedMeetingsInput
    agendaItems?: AgendaItemCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutBuildingInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    initiatorEmployeeId?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    agendaItems?: AgendaItemUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutBuildingInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput>
  }

  export type MeetingCreateManyBuildingInputEnvelope = {
    data: MeetingCreateManyBuildingInput | MeetingCreateManyBuildingInput[]
  }

  export type PremiseUpsertWithWhereUniqueWithoutBuildingInput = {
    where: PremiseWhereUniqueInput
    update: XOR<PremiseUpdateWithoutBuildingInput, PremiseUncheckedUpdateWithoutBuildingInput>
    create: XOR<PremiseCreateWithoutBuildingInput, PremiseUncheckedCreateWithoutBuildingInput>
  }

  export type PremiseUpdateWithWhereUniqueWithoutBuildingInput = {
    where: PremiseWhereUniqueInput
    data: XOR<PremiseUpdateWithoutBuildingInput, PremiseUncheckedUpdateWithoutBuildingInput>
  }

  export type PremiseUpdateManyWithWhereWithoutBuildingInput = {
    where: PremiseScalarWhereInput
    data: XOR<PremiseUpdateManyMutationInput, PremiseUncheckedUpdateManyWithoutBuildingInput>
  }

  export type PremiseScalarWhereInput = {
    AND?: PremiseScalarWhereInput | PremiseScalarWhereInput[]
    OR?: PremiseScalarWhereInput[]
    NOT?: PremiseScalarWhereInput | PremiseScalarWhereInput[]
    id?: StringFilter<"Premise"> | string
    buildingId?: StringFilter<"Premise"> | string
    number?: StringFilter<"Premise"> | string
    cadastralNumber?: StringNullableFilter<"Premise"> | string | null
    area?: FloatFilter<"Premise"> | number
    ownershipForm?: StringFilter<"Premise"> | string
  }

  export type EmployeeBuildingAccessUpsertWithWhereUniqueWithoutBuildingInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    update: XOR<EmployeeBuildingAccessUpdateWithoutBuildingInput, EmployeeBuildingAccessUncheckedUpdateWithoutBuildingInput>
    create: XOR<EmployeeBuildingAccessCreateWithoutBuildingInput, EmployeeBuildingAccessUncheckedCreateWithoutBuildingInput>
  }

  export type EmployeeBuildingAccessUpdateWithWhereUniqueWithoutBuildingInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    data: XOR<EmployeeBuildingAccessUpdateWithoutBuildingInput, EmployeeBuildingAccessUncheckedUpdateWithoutBuildingInput>
  }

  export type EmployeeBuildingAccessUpdateManyWithWhereWithoutBuildingInput = {
    where: EmployeeBuildingAccessScalarWhereInput
    data: XOR<EmployeeBuildingAccessUpdateManyMutationInput, EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingInput>
  }

  export type EmployeeBuildingAccessScalarWhereInput = {
    AND?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
    OR?: EmployeeBuildingAccessScalarWhereInput[]
    NOT?: EmployeeBuildingAccessScalarWhereInput | EmployeeBuildingAccessScalarWhereInput[]
    employeeId?: StringFilter<"EmployeeBuildingAccess"> | string
    buildingId?: StringFilter<"EmployeeBuildingAccess"> | string
  }

  export type MeetingUpsertWithWhereUniqueWithoutBuildingInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutBuildingInput, MeetingUncheckedUpdateWithoutBuildingInput>
    create: XOR<MeetingCreateWithoutBuildingInput, MeetingUncheckedCreateWithoutBuildingInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutBuildingInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutBuildingInput, MeetingUncheckedUpdateWithoutBuildingInput>
  }

  export type MeetingUpdateManyWithWhereWithoutBuildingInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutBuildingInput>
  }

  export type MeetingScalarWhereInput = {
    AND?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    OR?: MeetingScalarWhereInput[]
    NOT?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    id?: StringFilter<"Meeting"> | string
    buildingId?: StringFilter<"Meeting"> | string
    number?: StringFilter<"Meeting"> | string
    status?: StringFilter<"Meeting"> | string
    form?: StringFilter<"Meeting"> | string
    startDate?: StringFilter<"Meeting"> | string
    endDate?: StringNullableFilter<"Meeting"> | string | null
    inPersonStartTime?: StringNullableFilter<"Meeting"> | string | null
    inPersonAddress?: StringNullableFilter<"Meeting"> | string | null
    ballotAcceptanceAddress?: StringNullableFilter<"Meeting"> | string | null
    noticeAddress?: StringNullableFilter<"Meeting"> | string | null
    resultsDate?: StringNullableFilter<"Meeting"> | string | null
    initiatorEmployeeId?: StringNullableFilter<"Meeting"> | string | null
    extensionReason?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    activatedAt?: StringNullableFilter<"Meeting"> | string | null
    completedAt?: StringNullableFilter<"Meeting"> | string | null
    archivedAt?: StringNullableFilter<"Meeting"> | string | null
  }

  export type BuildingCreateWithoutPremisesInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeAccess?: EmployeeBuildingAccessCreateNestedManyWithoutBuildingInput
    meetings?: MeetingCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUncheckedCreateWithoutPremisesInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutBuildingInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutBuildingInput
  }

  export type BuildingCreateOrConnectWithoutPremisesInput = {
    where: BuildingWhereUniqueInput
    create: XOR<BuildingCreateWithoutPremisesInput, BuildingUncheckedCreateWithoutPremisesInput>
  }

  export type OwnershipRightCreateWithoutPremiseInput = {
    id?: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
    owner: OwnerCreateNestedOneWithoutOwnershipRightsInput
  }

  export type OwnershipRightUncheckedCreateWithoutPremiseInput = {
    id?: string
    ownerId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type OwnershipRightCreateOrConnectWithoutPremiseInput = {
    where: OwnershipRightWhereUniqueInput
    create: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput>
  }

  export type OwnershipRightCreateManyPremiseInputEnvelope = {
    data: OwnershipRightCreateManyPremiseInput | OwnershipRightCreateManyPremiseInput[]
  }

  export type BuildingUpsertWithoutPremisesInput = {
    update: XOR<BuildingUpdateWithoutPremisesInput, BuildingUncheckedUpdateWithoutPremisesInput>
    create: XOR<BuildingCreateWithoutPremisesInput, BuildingUncheckedCreateWithoutPremisesInput>
    where?: BuildingWhereInput
  }

  export type BuildingUpdateToOneWithWhereWithoutPremisesInput = {
    where?: BuildingWhereInput
    data: XOR<BuildingUpdateWithoutPremisesInput, BuildingUncheckedUpdateWithoutPremisesInput>
  }

  export type BuildingUpdateWithoutPremisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeAccess?: EmployeeBuildingAccessUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingUncheckedUpdateWithoutPremisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutBuildingNestedInput
  }

  export type OwnershipRightUpsertWithWhereUniqueWithoutPremiseInput = {
    where: OwnershipRightWhereUniqueInput
    update: XOR<OwnershipRightUpdateWithoutPremiseInput, OwnershipRightUncheckedUpdateWithoutPremiseInput>
    create: XOR<OwnershipRightCreateWithoutPremiseInput, OwnershipRightUncheckedCreateWithoutPremiseInput>
  }

  export type OwnershipRightUpdateWithWhereUniqueWithoutPremiseInput = {
    where: OwnershipRightWhereUniqueInput
    data: XOR<OwnershipRightUpdateWithoutPremiseInput, OwnershipRightUncheckedUpdateWithoutPremiseInput>
  }

  export type OwnershipRightUpdateManyWithWhereWithoutPremiseInput = {
    where: OwnershipRightScalarWhereInput
    data: XOR<OwnershipRightUpdateManyMutationInput, OwnershipRightUncheckedUpdateManyWithoutPremiseInput>
  }

  export type OwnershipRightScalarWhereInput = {
    AND?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
    OR?: OwnershipRightScalarWhereInput[]
    NOT?: OwnershipRightScalarWhereInput | OwnershipRightScalarWhereInput[]
    id?: StringFilter<"OwnershipRight"> | string
    premiseId?: StringFilter<"OwnershipRight"> | string
    ownerId?: StringFilter<"OwnershipRight"> | string
    share?: StringNullableFilter<"OwnershipRight"> | string | null
    shareArea?: FloatNullableFilter<"OwnershipRight"> | number | null
    titleDocument?: StringNullableFilter<"OwnershipRight"> | string | null
    registrationDate?: StringNullableFilter<"OwnershipRight"> | string | null
    basisDocument?: StringNullableFilter<"OwnershipRight"> | string | null
  }

  export type OwnershipRightCreateWithoutOwnerInput = {
    id?: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
    premise: PremiseCreateNestedOneWithoutOwnershipRightsInput
  }

  export type OwnershipRightUncheckedCreateWithoutOwnerInput = {
    id?: string
    premiseId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type OwnershipRightCreateOrConnectWithoutOwnerInput = {
    where: OwnershipRightWhereUniqueInput
    create: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput>
  }

  export type OwnershipRightCreateManyOwnerInputEnvelope = {
    data: OwnershipRightCreateManyOwnerInput | OwnershipRightCreateManyOwnerInput[]
  }

  export type QuestionAnswerCreateWithoutOwnerInput = {
    vote: string
    weight?: number | null
    agendaItem: AgendaItemCreateNestedOneWithoutAnswersInput
  }

  export type QuestionAnswerUncheckedCreateWithoutOwnerInput = {
    agendaItemId: string
    vote: string
    weight?: number | null
  }

  export type QuestionAnswerCreateOrConnectWithoutOwnerInput = {
    where: QuestionAnswerWhereUniqueInput
    create: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput>
  }

  export type QuestionAnswerCreateManyOwnerInputEnvelope = {
    data: QuestionAnswerCreateManyOwnerInput | QuestionAnswerCreateManyOwnerInput[]
  }

  export type OwnershipRightUpsertWithWhereUniqueWithoutOwnerInput = {
    where: OwnershipRightWhereUniqueInput
    update: XOR<OwnershipRightUpdateWithoutOwnerInput, OwnershipRightUncheckedUpdateWithoutOwnerInput>
    create: XOR<OwnershipRightCreateWithoutOwnerInput, OwnershipRightUncheckedCreateWithoutOwnerInput>
  }

  export type OwnershipRightUpdateWithWhereUniqueWithoutOwnerInput = {
    where: OwnershipRightWhereUniqueInput
    data: XOR<OwnershipRightUpdateWithoutOwnerInput, OwnershipRightUncheckedUpdateWithoutOwnerInput>
  }

  export type OwnershipRightUpdateManyWithWhereWithoutOwnerInput = {
    where: OwnershipRightScalarWhereInput
    data: XOR<OwnershipRightUpdateManyMutationInput, OwnershipRightUncheckedUpdateManyWithoutOwnerInput>
  }

  export type QuestionAnswerUpsertWithWhereUniqueWithoutOwnerInput = {
    where: QuestionAnswerWhereUniqueInput
    update: XOR<QuestionAnswerUpdateWithoutOwnerInput, QuestionAnswerUncheckedUpdateWithoutOwnerInput>
    create: XOR<QuestionAnswerCreateWithoutOwnerInput, QuestionAnswerUncheckedCreateWithoutOwnerInput>
  }

  export type QuestionAnswerUpdateWithWhereUniqueWithoutOwnerInput = {
    where: QuestionAnswerWhereUniqueInput
    data: XOR<QuestionAnswerUpdateWithoutOwnerInput, QuestionAnswerUncheckedUpdateWithoutOwnerInput>
  }

  export type QuestionAnswerUpdateManyWithWhereWithoutOwnerInput = {
    where: QuestionAnswerScalarWhereInput
    data: XOR<QuestionAnswerUpdateManyMutationInput, QuestionAnswerUncheckedUpdateManyWithoutOwnerInput>
  }

  export type QuestionAnswerScalarWhereInput = {
    AND?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
    OR?: QuestionAnswerScalarWhereInput[]
    NOT?: QuestionAnswerScalarWhereInput | QuestionAnswerScalarWhereInput[]
    ownerId?: StringFilter<"QuestionAnswer"> | string
    agendaItemId?: StringFilter<"QuestionAnswer"> | string
    vote?: StringFilter<"QuestionAnswer"> | string
    weight?: FloatNullableFilter<"QuestionAnswer"> | number | null
  }

  export type PremiseCreateWithoutOwnershipRightsInput = {
    id?: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
    building: BuildingCreateNestedOneWithoutPremisesInput
  }

  export type PremiseUncheckedCreateWithoutOwnershipRightsInput = {
    id?: string
    buildingId: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
  }

  export type PremiseCreateOrConnectWithoutOwnershipRightsInput = {
    where: PremiseWhereUniqueInput
    create: XOR<PremiseCreateWithoutOwnershipRightsInput, PremiseUncheckedCreateWithoutOwnershipRightsInput>
  }

  export type OwnerCreateWithoutOwnershipRightsInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    answers?: QuestionAnswerCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUncheckedCreateWithoutOwnershipRightsInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    answers?: QuestionAnswerUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type OwnerCreateOrConnectWithoutOwnershipRightsInput = {
    where: OwnerWhereUniqueInput
    create: XOR<OwnerCreateWithoutOwnershipRightsInput, OwnerUncheckedCreateWithoutOwnershipRightsInput>
  }

  export type PremiseUpsertWithoutOwnershipRightsInput = {
    update: XOR<PremiseUpdateWithoutOwnershipRightsInput, PremiseUncheckedUpdateWithoutOwnershipRightsInput>
    create: XOR<PremiseCreateWithoutOwnershipRightsInput, PremiseUncheckedCreateWithoutOwnershipRightsInput>
    where?: PremiseWhereInput
  }

  export type PremiseUpdateToOneWithWhereWithoutOwnershipRightsInput = {
    where?: PremiseWhereInput
    data: XOR<PremiseUpdateWithoutOwnershipRightsInput, PremiseUncheckedUpdateWithoutOwnershipRightsInput>
  }

  export type PremiseUpdateWithoutOwnershipRightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
    building?: BuildingUpdateOneRequiredWithoutPremisesNestedInput
  }

  export type PremiseUncheckedUpdateWithoutOwnershipRightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerUpsertWithoutOwnershipRightsInput = {
    update: XOR<OwnerUpdateWithoutOwnershipRightsInput, OwnerUncheckedUpdateWithoutOwnershipRightsInput>
    create: XOR<OwnerCreateWithoutOwnershipRightsInput, OwnerUncheckedCreateWithoutOwnershipRightsInput>
    where?: OwnerWhereInput
  }

  export type OwnerUpdateToOneWithWhereWithoutOwnershipRightsInput = {
    where?: OwnerWhereInput
    data: XOR<OwnerUpdateWithoutOwnershipRightsInput, OwnerUncheckedUpdateWithoutOwnershipRightsInput>
  }

  export type OwnerUpdateWithoutOwnershipRightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: QuestionAnswerUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerUncheckedUpdateWithoutOwnershipRightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: QuestionAnswerUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type EmployeeBuildingAccessCreateWithoutEmployeeInput = {
    building: BuildingCreateNestedOneWithoutEmployeeAccessInput
  }

  export type EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput = {
    buildingId: string
  }

  export type EmployeeBuildingAccessCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    create: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeBuildingAccessCreateManyEmployeeInputEnvelope = {
    data: EmployeeBuildingAccessCreateManyEmployeeInput | EmployeeBuildingAccessCreateManyEmployeeInput[]
  }

  export type QuestionLibraryCreateWithoutCreatedByInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdAt?: Date | string
    agendaItems?: AgendaItemCreateNestedManyWithoutQuestionInput
  }

  export type QuestionLibraryUncheckedCreateWithoutCreatedByInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdAt?: Date | string
    agendaItems?: AgendaItemUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionLibraryCreateOrConnectWithoutCreatedByInput = {
    where: QuestionLibraryWhereUniqueInput
    create: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput>
  }

  export type QuestionLibraryCreateManyCreatedByInputEnvelope = {
    data: QuestionLibraryCreateManyCreatedByInput | QuestionLibraryCreateManyCreatedByInput[]
  }

  export type MeetingCreateWithoutInitiatorInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    building: BuildingCreateNestedOneWithoutMeetingsInput
    agendaItems?: AgendaItemCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutInitiatorInput = {
    id?: string
    buildingId: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    agendaItems?: AgendaItemUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutInitiatorInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput>
  }

  export type MeetingCreateManyInitiatorInputEnvelope = {
    data: MeetingCreateManyInitiatorInput | MeetingCreateManyInitiatorInput[]
  }

  export type AuditLogCreateWithoutEmployeeInput = {
    id?: string
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutEmployeeInput = {
    id?: string
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput>
  }

  export type AuditLogCreateManyEmployeeInputEnvelope = {
    data: AuditLogCreateManyEmployeeInput | AuditLogCreateManyEmployeeInput[]
  }

  export type EmployeeBuildingAccessUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    update: XOR<EmployeeBuildingAccessUpdateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeBuildingAccessCreateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeBuildingAccessUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeBuildingAccessWhereUniqueInput
    data: XOR<EmployeeBuildingAccessUpdateWithoutEmployeeInput, EmployeeBuildingAccessUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeBuildingAccessUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeBuildingAccessScalarWhereInput
    data: XOR<EmployeeBuildingAccessUpdateManyMutationInput, EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type QuestionLibraryUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: QuestionLibraryWhereUniqueInput
    update: XOR<QuestionLibraryUpdateWithoutCreatedByInput, QuestionLibraryUncheckedUpdateWithoutCreatedByInput>
    create: XOR<QuestionLibraryCreateWithoutCreatedByInput, QuestionLibraryUncheckedCreateWithoutCreatedByInput>
  }

  export type QuestionLibraryUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: QuestionLibraryWhereUniqueInput
    data: XOR<QuestionLibraryUpdateWithoutCreatedByInput, QuestionLibraryUncheckedUpdateWithoutCreatedByInput>
  }

  export type QuestionLibraryUpdateManyWithWhereWithoutCreatedByInput = {
    where: QuestionLibraryScalarWhereInput
    data: XOR<QuestionLibraryUpdateManyMutationInput, QuestionLibraryUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type QuestionLibraryScalarWhereInput = {
    AND?: QuestionLibraryScalarWhereInput | QuestionLibraryScalarWhereInput[]
    OR?: QuestionLibraryScalarWhereInput[]
    NOT?: QuestionLibraryScalarWhereInput | QuestionLibraryScalarWhereInput[]
    id?: StringFilter<"QuestionLibrary"> | string
    shortTitle?: StringFilter<"QuestionLibrary"> | string
    protocolText?: StringNullableFilter<"QuestionLibrary"> | string | null
    bulletinText?: StringNullableFilter<"QuestionLibrary"> | string | null
    quorumType?: StringNullableFilter<"QuestionLibrary"> | string | null
    category?: StringNullableFilter<"QuestionLibrary"> | string | null
    tags?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdByEmployeeId?: StringNullableFilter<"QuestionLibrary"> | string | null
    createdAt?: DateTimeFilter<"QuestionLibrary"> | Date | string
  }

  export type MeetingUpsertWithWhereUniqueWithoutInitiatorInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutInitiatorInput, MeetingUncheckedUpdateWithoutInitiatorInput>
    create: XOR<MeetingCreateWithoutInitiatorInput, MeetingUncheckedCreateWithoutInitiatorInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutInitiatorInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutInitiatorInput, MeetingUncheckedUpdateWithoutInitiatorInput>
  }

  export type MeetingUpdateManyWithWhereWithoutInitiatorInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutInitiatorInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutEmployeeInput, AuditLogUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutEmployeeInput, AuditLogUncheckedUpdateWithoutEmployeeInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutEmployeeInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    employeeId?: StringNullableFilter<"AuditLog"> | string | null
    actionType?: StringFilter<"AuditLog"> | string
    objectId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type EmployeeCreateWithoutBuildingAccessInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    createdQuestions?: QuestionLibraryCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutBuildingAccessInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    createdQuestions?: QuestionLibraryUncheckedCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingUncheckedCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutBuildingAccessInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutBuildingAccessInput, EmployeeUncheckedCreateWithoutBuildingAccessInput>
  }

  export type BuildingCreateWithoutEmployeeAccessInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseCreateNestedManyWithoutBuildingInput
    meetings?: MeetingCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUncheckedCreateWithoutEmployeeAccessInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseUncheckedCreateNestedManyWithoutBuildingInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutBuildingInput
  }

  export type BuildingCreateOrConnectWithoutEmployeeAccessInput = {
    where: BuildingWhereUniqueInput
    create: XOR<BuildingCreateWithoutEmployeeAccessInput, BuildingUncheckedCreateWithoutEmployeeAccessInput>
  }

  export type EmployeeUpsertWithoutBuildingAccessInput = {
    update: XOR<EmployeeUpdateWithoutBuildingAccessInput, EmployeeUncheckedUpdateWithoutBuildingAccessInput>
    create: XOR<EmployeeCreateWithoutBuildingAccessInput, EmployeeUncheckedCreateWithoutBuildingAccessInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutBuildingAccessInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutBuildingAccessInput, EmployeeUncheckedUpdateWithoutBuildingAccessInput>
  }

  export type EmployeeUpdateWithoutBuildingAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdQuestions?: QuestionLibraryUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutBuildingAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdQuestions?: QuestionLibraryUncheckedUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUncheckedUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type BuildingUpsertWithoutEmployeeAccessInput = {
    update: XOR<BuildingUpdateWithoutEmployeeAccessInput, BuildingUncheckedUpdateWithoutEmployeeAccessInput>
    create: XOR<BuildingCreateWithoutEmployeeAccessInput, BuildingUncheckedCreateWithoutEmployeeAccessInput>
    where?: BuildingWhereInput
  }

  export type BuildingUpdateToOneWithWhereWithoutEmployeeAccessInput = {
    where?: BuildingWhereInput
    data: XOR<BuildingUpdateWithoutEmployeeAccessInput, BuildingUncheckedUpdateWithoutEmployeeAccessInput>
  }

  export type BuildingUpdateWithoutEmployeeAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingUncheckedUpdateWithoutEmployeeAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUncheckedUpdateManyWithoutBuildingNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutBuildingNestedInput
  }

  export type EmployeeCreateWithoutCreatedQuestionsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessCreateNestedManyWithoutEmployeeInput
    initiatedMeetings?: MeetingCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutCreatedQuestionsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutEmployeeInput
    initiatedMeetings?: MeetingUncheckedCreateNestedManyWithoutInitiatorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutCreatedQuestionsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutCreatedQuestionsInput, EmployeeUncheckedCreateWithoutCreatedQuestionsInput>
  }

  export type AgendaItemCreateWithoutQuestionInput = {
    id?: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    meeting: MeetingCreateNestedOneWithoutAgendaItemsInput
    answers?: QuestionAnswerCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemUncheckedCreateWithoutQuestionInput = {
    id?: string
    meetingId: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    answers?: QuestionAnswerUncheckedCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemCreateOrConnectWithoutQuestionInput = {
    where: AgendaItemWhereUniqueInput
    create: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput>
  }

  export type AgendaItemCreateManyQuestionInputEnvelope = {
    data: AgendaItemCreateManyQuestionInput | AgendaItemCreateManyQuestionInput[]
  }

  export type EmployeeUpsertWithoutCreatedQuestionsInput = {
    update: XOR<EmployeeUpdateWithoutCreatedQuestionsInput, EmployeeUncheckedUpdateWithoutCreatedQuestionsInput>
    create: XOR<EmployeeCreateWithoutCreatedQuestionsInput, EmployeeUncheckedCreateWithoutCreatedQuestionsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutCreatedQuestionsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutCreatedQuestionsInput, EmployeeUncheckedUpdateWithoutCreatedQuestionsInput>
  }

  export type EmployeeUpdateWithoutCreatedQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUpdateManyWithoutEmployeeNestedInput
    initiatedMeetings?: MeetingUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutCreatedQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeNestedInput
    initiatedMeetings?: MeetingUncheckedUpdateManyWithoutInitiatorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type AgendaItemUpsertWithWhereUniqueWithoutQuestionInput = {
    where: AgendaItemWhereUniqueInput
    update: XOR<AgendaItemUpdateWithoutQuestionInput, AgendaItemUncheckedUpdateWithoutQuestionInput>
    create: XOR<AgendaItemCreateWithoutQuestionInput, AgendaItemUncheckedCreateWithoutQuestionInput>
  }

  export type AgendaItemUpdateWithWhereUniqueWithoutQuestionInput = {
    where: AgendaItemWhereUniqueInput
    data: XOR<AgendaItemUpdateWithoutQuestionInput, AgendaItemUncheckedUpdateWithoutQuestionInput>
  }

  export type AgendaItemUpdateManyWithWhereWithoutQuestionInput = {
    where: AgendaItemScalarWhereInput
    data: XOR<AgendaItemUpdateManyMutationInput, AgendaItemUncheckedUpdateManyWithoutQuestionInput>
  }

  export type AgendaItemScalarWhereInput = {
    AND?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
    OR?: AgendaItemScalarWhereInput[]
    NOT?: AgendaItemScalarWhereInput | AgendaItemScalarWhereInput[]
    id?: StringFilter<"AgendaItem"> | string
    meetingId?: StringFilter<"AgendaItem"> | string
    questionId?: StringNullableFilter<"AgendaItem"> | string | null
    orderNumber?: IntFilter<"AgendaItem"> | number
    customProtocolText?: StringNullableFilter<"AgendaItem"> | string | null
    customBulletinText?: StringNullableFilter<"AgendaItem"> | string | null
  }

  export type BuildingCreateWithoutMeetingsInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseCreateNestedManyWithoutBuildingInput
    employeeAccess?: EmployeeBuildingAccessCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUncheckedCreateWithoutMeetingsInput = {
    id?: string
    address: string
    cadastralNumber: string
    yearBuilt?: number | null
    floors?: number | null
    entrances?: number | null
    totalArea: number
    totalPremises: number
    createdAt?: Date | string
    updatedAt?: Date | string
    premises?: PremiseUncheckedCreateNestedManyWithoutBuildingInput
    employeeAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutBuildingInput
  }

  export type BuildingCreateOrConnectWithoutMeetingsInput = {
    where: BuildingWhereUniqueInput
    create: XOR<BuildingCreateWithoutMeetingsInput, BuildingUncheckedCreateWithoutMeetingsInput>
  }

  export type EmployeeCreateWithoutInitiatedMeetingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryCreateNestedManyWithoutCreatedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutInitiatedMeetingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryUncheckedCreateNestedManyWithoutCreatedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutInitiatedMeetingsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutInitiatedMeetingsInput, EmployeeUncheckedCreateWithoutInitiatedMeetingsInput>
  }

  export type AgendaItemCreateWithoutMeetingInput = {
    id?: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    question?: QuestionLibraryCreateNestedOneWithoutAgendaItemsInput
    answers?: QuestionAnswerCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemUncheckedCreateWithoutMeetingInput = {
    id?: string
    questionId?: string | null
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    answers?: QuestionAnswerUncheckedCreateNestedManyWithoutAgendaItemInput
  }

  export type AgendaItemCreateOrConnectWithoutMeetingInput = {
    where: AgendaItemWhereUniqueInput
    create: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput>
  }

  export type AgendaItemCreateManyMeetingInputEnvelope = {
    data: AgendaItemCreateManyMeetingInput | AgendaItemCreateManyMeetingInput[]
  }

  export type BuildingUpsertWithoutMeetingsInput = {
    update: XOR<BuildingUpdateWithoutMeetingsInput, BuildingUncheckedUpdateWithoutMeetingsInput>
    create: XOR<BuildingCreateWithoutMeetingsInput, BuildingUncheckedCreateWithoutMeetingsInput>
    where?: BuildingWhereInput
  }

  export type BuildingUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: BuildingWhereInput
    data: XOR<BuildingUpdateWithoutMeetingsInput, BuildingUncheckedUpdateWithoutMeetingsInput>
  }

  export type BuildingUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUpdateManyWithoutBuildingNestedInput
    employeeAccess?: EmployeeBuildingAccessUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: StringFieldUpdateOperationsInput | string
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    entrances?: NullableIntFieldUpdateOperationsInput | number | null
    totalArea?: FloatFieldUpdateOperationsInput | number
    totalPremises?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    premises?: PremiseUncheckedUpdateManyWithoutBuildingNestedInput
    employeeAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingNestedInput
  }

  export type EmployeeUpsertWithoutInitiatedMeetingsInput = {
    update: XOR<EmployeeUpdateWithoutInitiatedMeetingsInput, EmployeeUncheckedUpdateWithoutInitiatedMeetingsInput>
    create: XOR<EmployeeCreateWithoutInitiatedMeetingsInput, EmployeeUncheckedCreateWithoutInitiatedMeetingsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutInitiatedMeetingsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutInitiatedMeetingsInput, EmployeeUncheckedUpdateWithoutInitiatedMeetingsInput>
  }

  export type EmployeeUpdateWithoutInitiatedMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUpdateManyWithoutCreatedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutInitiatedMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUncheckedUpdateManyWithoutCreatedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type AgendaItemUpsertWithWhereUniqueWithoutMeetingInput = {
    where: AgendaItemWhereUniqueInput
    update: XOR<AgendaItemUpdateWithoutMeetingInput, AgendaItemUncheckedUpdateWithoutMeetingInput>
    create: XOR<AgendaItemCreateWithoutMeetingInput, AgendaItemUncheckedCreateWithoutMeetingInput>
  }

  export type AgendaItemUpdateWithWhereUniqueWithoutMeetingInput = {
    where: AgendaItemWhereUniqueInput
    data: XOR<AgendaItemUpdateWithoutMeetingInput, AgendaItemUncheckedUpdateWithoutMeetingInput>
  }

  export type AgendaItemUpdateManyWithWhereWithoutMeetingInput = {
    where: AgendaItemScalarWhereInput
    data: XOR<AgendaItemUpdateManyMutationInput, AgendaItemUncheckedUpdateManyWithoutMeetingInput>
  }

  export type MeetingCreateWithoutAgendaItemsInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
    building: BuildingCreateNestedOneWithoutMeetingsInput
    initiator?: EmployeeCreateNestedOneWithoutInitiatedMeetingsInput
  }

  export type MeetingUncheckedCreateWithoutAgendaItemsInput = {
    id?: string
    buildingId: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    initiatorEmployeeId?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
  }

  export type MeetingCreateOrConnectWithoutAgendaItemsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutAgendaItemsInput, MeetingUncheckedCreateWithoutAgendaItemsInput>
  }

  export type QuestionLibraryCreateWithoutAgendaItemsInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdAt?: Date | string
    createdBy?: EmployeeCreateNestedOneWithoutCreatedQuestionsInput
  }

  export type QuestionLibraryUncheckedCreateWithoutAgendaItemsInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdByEmployeeId?: string | null
    createdAt?: Date | string
  }

  export type QuestionLibraryCreateOrConnectWithoutAgendaItemsInput = {
    where: QuestionLibraryWhereUniqueInput
    create: XOR<QuestionLibraryCreateWithoutAgendaItemsInput, QuestionLibraryUncheckedCreateWithoutAgendaItemsInput>
  }

  export type QuestionAnswerCreateWithoutAgendaItemInput = {
    vote: string
    weight?: number | null
    owner: OwnerCreateNestedOneWithoutAnswersInput
  }

  export type QuestionAnswerUncheckedCreateWithoutAgendaItemInput = {
    ownerId: string
    vote: string
    weight?: number | null
  }

  export type QuestionAnswerCreateOrConnectWithoutAgendaItemInput = {
    where: QuestionAnswerWhereUniqueInput
    create: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput>
  }

  export type QuestionAnswerCreateManyAgendaItemInputEnvelope = {
    data: QuestionAnswerCreateManyAgendaItemInput | QuestionAnswerCreateManyAgendaItemInput[]
  }

  export type MeetingUpsertWithoutAgendaItemsInput = {
    update: XOR<MeetingUpdateWithoutAgendaItemsInput, MeetingUncheckedUpdateWithoutAgendaItemsInput>
    create: XOR<MeetingCreateWithoutAgendaItemsInput, MeetingUncheckedCreateWithoutAgendaItemsInput>
    where?: MeetingWhereInput
  }

  export type MeetingUpdateToOneWithWhereWithoutAgendaItemsInput = {
    where?: MeetingWhereInput
    data: XOR<MeetingUpdateWithoutAgendaItemsInput, MeetingUncheckedUpdateWithoutAgendaItemsInput>
  }

  export type MeetingUpdateWithoutAgendaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    building?: BuildingUpdateOneRequiredWithoutMeetingsNestedInput
    initiator?: EmployeeUpdateOneWithoutInitiatedMeetingsNestedInput
  }

  export type MeetingUncheckedUpdateWithoutAgendaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    initiatorEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuestionLibraryUpsertWithoutAgendaItemsInput = {
    update: XOR<QuestionLibraryUpdateWithoutAgendaItemsInput, QuestionLibraryUncheckedUpdateWithoutAgendaItemsInput>
    create: XOR<QuestionLibraryCreateWithoutAgendaItemsInput, QuestionLibraryUncheckedCreateWithoutAgendaItemsInput>
    where?: QuestionLibraryWhereInput
  }

  export type QuestionLibraryUpdateToOneWithWhereWithoutAgendaItemsInput = {
    where?: QuestionLibraryWhereInput
    data: XOR<QuestionLibraryUpdateWithoutAgendaItemsInput, QuestionLibraryUncheckedUpdateWithoutAgendaItemsInput>
  }

  export type QuestionLibraryUpdateWithoutAgendaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: EmployeeUpdateOneWithoutCreatedQuestionsNestedInput
  }

  export type QuestionLibraryUncheckedUpdateWithoutAgendaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdByEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionAnswerUpsertWithWhereUniqueWithoutAgendaItemInput = {
    where: QuestionAnswerWhereUniqueInput
    update: XOR<QuestionAnswerUpdateWithoutAgendaItemInput, QuestionAnswerUncheckedUpdateWithoutAgendaItemInput>
    create: XOR<QuestionAnswerCreateWithoutAgendaItemInput, QuestionAnswerUncheckedCreateWithoutAgendaItemInput>
  }

  export type QuestionAnswerUpdateWithWhereUniqueWithoutAgendaItemInput = {
    where: QuestionAnswerWhereUniqueInput
    data: XOR<QuestionAnswerUpdateWithoutAgendaItemInput, QuestionAnswerUncheckedUpdateWithoutAgendaItemInput>
  }

  export type QuestionAnswerUpdateManyWithWhereWithoutAgendaItemInput = {
    where: QuestionAnswerScalarWhereInput
    data: XOR<QuestionAnswerUpdateManyMutationInput, QuestionAnswerUncheckedUpdateManyWithoutAgendaItemInput>
  }

  export type OwnerCreateWithoutAnswersInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    ownershipRights?: OwnershipRightCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUncheckedCreateWithoutAnswersInput = {
    id?: string
    fullName: string
    inn?: string | null
    snils?: string | null
    contacts?: string | null
    ownershipRights?: OwnershipRightUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type OwnerCreateOrConnectWithoutAnswersInput = {
    where: OwnerWhereUniqueInput
    create: XOR<OwnerCreateWithoutAnswersInput, OwnerUncheckedCreateWithoutAnswersInput>
  }

  export type AgendaItemCreateWithoutAnswersInput = {
    id?: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
    meeting: MeetingCreateNestedOneWithoutAgendaItemsInput
    question?: QuestionLibraryCreateNestedOneWithoutAgendaItemsInput
  }

  export type AgendaItemUncheckedCreateWithoutAnswersInput = {
    id?: string
    meetingId: string
    questionId?: string | null
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
  }

  export type AgendaItemCreateOrConnectWithoutAnswersInput = {
    where: AgendaItemWhereUniqueInput
    create: XOR<AgendaItemCreateWithoutAnswersInput, AgendaItemUncheckedCreateWithoutAnswersInput>
  }

  export type OwnerUpsertWithoutAnswersInput = {
    update: XOR<OwnerUpdateWithoutAnswersInput, OwnerUncheckedUpdateWithoutAnswersInput>
    create: XOR<OwnerCreateWithoutAnswersInput, OwnerUncheckedCreateWithoutAnswersInput>
    where?: OwnerWhereInput
  }

  export type OwnerUpdateToOneWithWhereWithoutAnswersInput = {
    where?: OwnerWhereInput
    data: XOR<OwnerUpdateWithoutAnswersInput, OwnerUncheckedUpdateWithoutAnswersInput>
  }

  export type OwnerUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    ownershipRights?: OwnershipRightUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    inn?: NullableStringFieldUpdateOperationsInput | string | null
    snils?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    ownershipRights?: OwnershipRightUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type AgendaItemUpsertWithoutAnswersInput = {
    update: XOR<AgendaItemUpdateWithoutAnswersInput, AgendaItemUncheckedUpdateWithoutAnswersInput>
    create: XOR<AgendaItemCreateWithoutAnswersInput, AgendaItemUncheckedCreateWithoutAnswersInput>
    where?: AgendaItemWhereInput
  }

  export type AgendaItemUpdateToOneWithWhereWithoutAnswersInput = {
    where?: AgendaItemWhereInput
    data: XOR<AgendaItemUpdateWithoutAnswersInput, AgendaItemUncheckedUpdateWithoutAnswersInput>
  }

  export type AgendaItemUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    meeting?: MeetingUpdateOneRequiredWithoutAgendaItemsNestedInput
    question?: QuestionLibraryUpdateOneWithoutAgendaItemsNestedInput
  }

  export type AgendaItemUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingCreateNestedManyWithoutInitiatorInput
  }

  export type EmployeeUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    isActive?: number
    lastLogin?: string | null
    createdAt?: Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedCreateNestedManyWithoutEmployeeInput
    createdQuestions?: QuestionLibraryUncheckedCreateNestedManyWithoutCreatedByInput
    initiatedMeetings?: MeetingUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type EmployeeCreateOrConnectWithoutAuditLogsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAuditLogsInput, EmployeeUncheckedCreateWithoutAuditLogsInput>
  }

  export type EmployeeUpsertWithoutAuditLogsInput = {
    update: XOR<EmployeeUpdateWithoutAuditLogsInput, EmployeeUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<EmployeeCreateWithoutAuditLogsInput, EmployeeUncheckedCreateWithoutAuditLogsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAuditLogsInput, EmployeeUncheckedUpdateWithoutAuditLogsInput>
  }

  export type EmployeeUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUpdateManyWithoutInitiatorNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: IntFieldUpdateOperationsInput | number
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buildingAccess?: EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeNestedInput
    createdQuestions?: QuestionLibraryUncheckedUpdateManyWithoutCreatedByNestedInput
    initiatedMeetings?: MeetingUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type PremiseCreateManyBuildingInput = {
    id?: string
    number: string
    cadastralNumber?: string | null
    area: number
    ownershipForm: string
  }

  export type EmployeeBuildingAccessCreateManyBuildingInput = {
    employeeId: string
  }

  export type MeetingCreateManyBuildingInput = {
    id?: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    initiatorEmployeeId?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
  }

  export type PremiseUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
    ownershipRights?: OwnershipRightUpdateManyWithoutPremiseNestedInput
  }

  export type PremiseUncheckedUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
    ownershipRights?: OwnershipRightUncheckedUpdateManyWithoutPremiseNestedInput
  }

  export type PremiseUncheckedUpdateManyWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    cadastralNumber?: NullableStringFieldUpdateOperationsInput | string | null
    area?: FloatFieldUpdateOperationsInput | number
    ownershipForm?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeBuildingAccessUpdateWithoutBuildingInput = {
    employee?: EmployeeUpdateOneRequiredWithoutBuildingAccessNestedInput
  }

  export type EmployeeBuildingAccessUncheckedUpdateWithoutBuildingInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeBuildingAccessUncheckedUpdateManyWithoutBuildingInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    initiator?: EmployeeUpdateOneWithoutInitiatedMeetingsNestedInput
    agendaItems?: AgendaItemUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    initiatorEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    agendaItems?: AgendaItemUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateManyWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    initiatorEmployeeId?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightCreateManyPremiseInput = {
    id?: string
    ownerId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type OwnershipRightUpdateWithoutPremiseInput = {
    id?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: OwnerUpdateOneRequiredWithoutOwnershipRightsNestedInput
  }

  export type OwnershipRightUncheckedUpdateWithoutPremiseInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightUncheckedUpdateManyWithoutPremiseInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightCreateManyOwnerInput = {
    id?: string
    premiseId: string
    share?: string | null
    shareArea?: number | null
    titleDocument?: string | null
    registrationDate?: string | null
    basisDocument?: string | null
  }

  export type QuestionAnswerCreateManyOwnerInput = {
    agendaItemId: string
    vote: string
    weight?: number | null
  }

  export type OwnershipRightUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
    premise?: PremiseUpdateOneRequiredWithoutOwnershipRightsNestedInput
  }

  export type OwnershipRightUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    premiseId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OwnershipRightUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    premiseId?: StringFieldUpdateOperationsInput | string
    share?: NullableStringFieldUpdateOperationsInput | string | null
    shareArea?: NullableFloatFieldUpdateOperationsInput | number | null
    titleDocument?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: NullableStringFieldUpdateOperationsInput | string | null
    basisDocument?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuestionAnswerUpdateWithoutOwnerInput = {
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    agendaItem?: AgendaItemUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type QuestionAnswerUncheckedUpdateWithoutOwnerInput = {
    agendaItemId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type QuestionAnswerUncheckedUpdateManyWithoutOwnerInput = {
    agendaItemId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EmployeeBuildingAccessCreateManyEmployeeInput = {
    buildingId: string
  }

  export type QuestionLibraryCreateManyCreatedByInput = {
    id?: string
    shortTitle: string
    protocolText?: string | null
    bulletinText?: string | null
    quorumType?: string | null
    category?: string | null
    tags?: string | null
    createdAt?: Date | string
  }

  export type MeetingCreateManyInitiatorInput = {
    id?: string
    buildingId: string
    number: string
    status?: string
    form: string
    startDate: string
    endDate?: string | null
    inPersonStartTime?: string | null
    inPersonAddress?: string | null
    ballotAcceptanceAddress?: string | null
    noticeAddress?: string | null
    resultsDate?: string | null
    extensionReason?: string | null
    createdAt?: Date | string
    activatedAt?: string | null
    completedAt?: string | null
    archivedAt?: string | null
  }

  export type AuditLogCreateManyEmployeeInput = {
    id?: string
    actionType: string
    objectId?: string | null
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type EmployeeBuildingAccessUpdateWithoutEmployeeInput = {
    building?: BuildingUpdateOneRequiredWithoutEmployeeAccessNestedInput
  }

  export type EmployeeBuildingAccessUncheckedUpdateWithoutEmployeeInput = {
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeBuildingAccessUncheckedUpdateManyWithoutEmployeeInput = {
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionLibraryUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendaItems?: AgendaItemUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionLibraryUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendaItems?: AgendaItemUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionLibraryUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortTitle?: StringFieldUpdateOperationsInput | string
    protocolText?: NullableStringFieldUpdateOperationsInput | string | null
    bulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    quorumType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    building?: BuildingUpdateOneRequiredWithoutMeetingsNestedInput
    agendaItems?: AgendaItemUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
    agendaItems?: AgendaItemUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateManyWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    inPersonAddress?: NullableStringFieldUpdateOperationsInput | string | null
    ballotAcceptanceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    noticeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    resultsDate?: NullableStringFieldUpdateOperationsInput | string | null
    extensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    archivedAt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    objectId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendaItemCreateManyQuestionInput = {
    id?: string
    meetingId: string
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
  }

  export type AgendaItemUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    meeting?: MeetingUpdateOneRequiredWithoutAgendaItemsNestedInput
    answers?: QuestionAnswerUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: QuestionAnswerUncheckedUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgendaItemCreateManyMeetingInput = {
    id?: string
    questionId?: string | null
    orderNumber: number
    customProtocolText?: string | null
    customBulletinText?: string | null
  }

  export type AgendaItemUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    question?: QuestionLibraryUpdateOneWithoutAgendaItemsNestedInput
    answers?: QuestionAnswerUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: QuestionAnswerUncheckedUpdateManyWithoutAgendaItemNestedInput
  }

  export type AgendaItemUncheckedUpdateManyWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: IntFieldUpdateOperationsInput | number
    customProtocolText?: NullableStringFieldUpdateOperationsInput | string | null
    customBulletinText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuestionAnswerCreateManyAgendaItemInput = {
    ownerId: string
    vote: string
    weight?: number | null
  }

  export type QuestionAnswerUpdateWithoutAgendaItemInput = {
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    owner?: OwnerUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type QuestionAnswerUncheckedUpdateWithoutAgendaItemInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type QuestionAnswerUncheckedUpdateManyWithoutAgendaItemInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}