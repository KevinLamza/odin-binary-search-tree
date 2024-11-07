export function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    const half = Math.ceil(array.length / 2);

    const firstHalf = array.slice(0, half);
    const secondHalf = array.slice(half);

    const sortedFirstHalf = mergeSort(firstHalf);
    const sortedSecondHalf = mergeSort(secondHalf);

    const mergedArray = merge(sortedFirstHalf, sortedSecondHalf);

    return mergedArray;
  }
}

export function merge(array1, array2) {
  const mergedArray = [];
  let run = true;
  while (run) {
    if (!array1.length) {
      run = false;
      mergedArray.push(...array2);
    } else if (!array2.length) {
      mergedArray.push(...array1);
      run = false;
    } else {
      if (array1[0] < array2[0]) {
        mergedArray.push(array1.shift());
      } else {
        mergedArray.push(array2.shift());
      }
    }
  }
  return mergedArray;
}
