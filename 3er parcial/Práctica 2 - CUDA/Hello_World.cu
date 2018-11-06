#include <stdio.h>

__global__ void helloCUDA(float e)
{
	printf("Hello, I am thread %d of block %d with value e = %f\n", threadIdx.x, blockIdx.x, e);
}

int main(int argc, char **argv)
{
	helloCUDA<<<3, 4>>>(2.71828f);

	cudaDeviceReset();
	system("pause");
	return(0);
}