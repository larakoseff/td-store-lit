/**
 * @callback Join
 * @param {string} value1
 * @param {string} value2
 */

/**
 * @param {object} props
 * @param {Array<Array<string>>} props.arrays
 * @param {Join} [props.join] If no callback is provided, then will simply combine as is
 */

export const mergeArrays = (props) => {
    const { arrays, join } = props;
    const [first, second] = arrays

    const result = first.flatMap((array1Value) => {
        const inner = second.map((array2Value) => {
            return join
                ? join(array1Value, array2Value)
                : `${array1Value}${array2Value}`;
        });
        return inner
    });

    return result
};






