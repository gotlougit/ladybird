const TYPED_ARRAYS = [
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float16Array,
    Float32Array,
    Float64Array,
];

const BIGINT_TYPED_ARRAYS = [BigUint64Array, BigInt64Array];

describe("errors", () => {
    test("ArrayBuffer out of bounds", () => {
        TYPED_ARRAYS.forEach(T => {
            let arrayBuffer = new ArrayBuffer(T.BYTES_PER_ELEMENT * 2, {
                maxByteLength: T.BYTES_PER_ELEMENT * 4,
            });

            let typedArray = new T(arrayBuffer, T.BYTES_PER_ELEMENT, 1);
            arrayBuffer.resize(T.BYTES_PER_ELEMENT);

            expect(() => {
                typedArray.fill(0);
            }).toThrowWithMessage(
                TypeError,
                "TypedArray contains a property which references a value at an index not contained within its buffer's bounds"
            );
        });
    });
});

test("basic functionality", () => {
    TYPED_ARRAYS.forEach(T => {
        expect(T.prototype.fill).toHaveLength(1);

        const typedArray = new T(3);
        typedArray[0] = 1;
        typedArray[1] = 2;
        typedArray[2] = 3;

        expect(typedArray.fill(0)).toBe(typedArray);

        expect(typedArray[0]).toBe(0);
        expect(typedArray[1]).toBe(0);
        expect(typedArray[2]).toBe(0);

        expect(typedArray.fill(5, 1, 2)).toBe(typedArray);

        expect(typedArray[0]).toBe(0);
        expect(typedArray[1]).toBe(5);
        expect(typedArray[2]).toBe(0);
    });

    BIGINT_TYPED_ARRAYS.forEach(T => {
        expect(T.prototype.fill).toHaveLength(1);

        const typedArray = new T(3);
        typedArray[0] = 1n;
        typedArray[1] = 2n;
        typedArray[2] = 3n;

        expect(typedArray.fill(0n)).toBe(typedArray);

        expect(typedArray[0]).toBe(0n);
        expect(typedArray[1]).toBe(0n);
        expect(typedArray[2]).toBe(0n);

        expect(typedArray.fill(5n, 1, 2)).toBe(typedArray);

        expect(typedArray[0]).toBe(0n);
        expect(typedArray[1]).toBe(5n);
        expect(typedArray[2]).toBe(0n);
    });
});
