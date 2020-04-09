export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}


export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  var len = array.length,
    i, j, stop;
  for (i = 0; i < len; i++) {
    for (j = 0, stop = len - i - 1; j < stop; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j + 1]]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, array[j + 1]]);

      } else {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j]]);
      }
    }
  }
  return animations;
}

export function getQuickSortAnimations(array) {
  if (array.length <= 1) return array;
  const animations = [];
  quickSortHelp(animations, array, 0, array.length - 1);
  return animations;
}

export function getHeapSortAnimations(array) {
  if (array.length <= 1) return array;
  const animations = [];
  heapHelp(animations, array);
  return animations;
}

function heapHelp(animations, array) {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(animations, array, n, i);
  }
  for (let i = n - 1; i >= 0; i--) {
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, array[i]]);
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([i, array[i]]);
    heapify(animations, array, i, 0);
  }
}

function heapify(animations, array, n, i) {
  let largest = i;
  let left = (2 * i) + 1;
  let right = (2 * i) + 2;
  if (left < n && array[left] >= array[largest]) { largest = left; }
  if (right < n && array[right] >= array[largest]) { largest = right; }
  if (largest !== i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, array[largest]]);
    const swap = array[i];
    array[i] = array[largest];
    array[largest] = swap;
    animations.push([largest, largest]);
    animations.push([largest, largest]);
    animations.push([largest, array[largest]]);
    heapify(animations, array, n, largest);
  }
}

function quickSortHelp(animations, array, low, high) {
  if (low < high) {
    const part = partition(animations, array, low, high);
    quickSortHelp(animations, array, low, part - 1);
    quickSortHelp(animations, array, part + 1, high);
  }
}

function partition(animations, array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;

      animations.push([j, high]);
      animations.push([j, high]);
      animations.push([j, array[i]]);

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([i, array[i]]);
    } else {
      animations.push([j, high]);
      animations.push([j, high]);
      animations.push([j, array[j]]);
    }
  }
  animations.push([high, high]);
  animations.push([high, high]);
  animations.push([high, array[i + 1]]);

  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  animations.push([i + 1, i + 1]);
  animations.push([i + 1, i + 1]);
  animations.push([i + 1, array[i + 1]]);

  return i + 1;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
