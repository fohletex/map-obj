declare namespace mapObject {
	/**
	Function which indicates by returning true, if the value related to the currently iterated `objectKey` shall be recursed (if the corresponding value is a nested object), false otherwise.

	@param objectKey - Any key of the object to map.
	@returns Whether it should recurse for the currently given `objectKey`.

	@example
    ```
    import mapObject = require('map-obj');

    const newObject = mapObject(
        {foo: {bar: 42}, lorem: {ipsum: 'dolor'}},
        (key, value) => [key.toUpperCase(), value],
        {deep: key => key === 'foo'} // Recurses only on nested objects of key `foo`.
    );
	// =>
	//	{
	//		FOO: {
	//			BAR: 42
	//		},
	//		{
	//			LOREM: {
	//				ipsum: 'dolor'
	//			}
	//		}
	//	}
	```
    */
	type DeepKeyFilter = (objectKey: string) => boolean;

	type Mapper<
		SourceObjectType extends {[key: string]: any},
		MappedObjectKeyType extends string,
		MappedObjectValueType
	> = (
		sourceKey: keyof SourceObjectType,
		sourceValue: SourceObjectType[keyof SourceObjectType],
		source: SourceObjectType
	) => [MappedObjectKeyType, MappedObjectValueType];

	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		deep?: boolean | DeepKeyFilter;

		/**
		Target object to map properties on to.

		@default {}
		*/
		target?: {[key: string]: any};
	}

	interface DeepOptions extends Options {
		deep: true | DeepKeyFilter;
	}

	interface TargetOptions<TargetObjectType extends {[key: string]: any}> extends Options {
		target: TargetObjectType;
	}
}

/**
Map object keys and values into a new object.

@param source - Source object to copy properties from.
@param mapper - Mapping function.

@example
```
import mapObject = require('map-obj');

const newObject = mapObject({foo: 'bar'}, (key, value) => [value, key]);
//=> {bar: 'foo'}
```
*/
declare function mapObject<
	SourceObjectType extends object,
	TargetObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.DeepOptions & mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & {[key: string]: unknown};
declare function mapObject<
	SourceObjectType extends object,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.DeepOptions
): {[key: string]: unknown};
declare function mapObject<
	SourceObjectType extends {[key: string]: any},
	TargetObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & {[K in MappedObjectKeyType]: MappedObjectValueType};
declare function mapObject<
	SourceObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options?: mapObject.Options
): {[K in MappedObjectKeyType]: MappedObjectValueType};

export = mapObject;
