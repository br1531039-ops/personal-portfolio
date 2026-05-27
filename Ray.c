#include <stdio.h>

int main() {
    int n, i, num, sum = 0;

    printf("Enter %d numbers:\n", n);
    for(i = 0; i < n; i++) {
        scanf("%d", &num);
        sum += num;
    }
    printf("Sum of the numbers is: %d\n", sum);

    return 0;
}