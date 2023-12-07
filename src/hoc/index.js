export const c = `
#include <stdio.h>

int binary_search(int *array, int size, int target) {
  int low = 0;
  int high = size - 1;
  int mid;

  while (low <= high) {
    mid = (low + high) / 2;

    if (array[mid] == target) {
      return mid;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

int main() {
  int array[] = {34, 43, 28, 21, 90, 33, 12, 16, 10};
  int target = 33;
  int size = sizeof(array) / sizeof(array[0]);

  int index = binary_search(array, size, target);

  if (index != -1) {
    printf("The target element is found at index %d.\n", index);
  } else {
    printf("The target element is not found.\n");
  }

  return 0;
}`;

export const javascript = `
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1; // Element not found
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17];
const target = 13;

const index = binarySearch(arr, target);

if (index !== -1) {
  console.log(\`Target element found at index \${index}\`);
} else {
  console.log('Target element not found');
}`;

export const python = `
def binary_search(data, target):

low = 0
high = len(data) - 1

while low <= high:
    mid = low + (high - low) // 2
    if data[mid] == target:
      return mid
    elif target < data[mid]:
      high = mid - 1
    else:
      low = mid + 1

  return -1

# Example usage
data = [2, 5, 7, 9, 13, 17, 21]
target = 13

index = binary_search(data, target)

if index != -1:
  print(f"Target element found at index {index}")
else:
  print("Target element not found")`;
