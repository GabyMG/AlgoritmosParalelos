#include <stdio.h>

__global__ void Multiplca_Matrices_GM(float *C,float *A,float *B,int nfil,int ncol)
{
	int idx = blockIdx.x * blockDim.x + threadIdx.x;
	int idy = blockIdx.y * blockDim.y + threadIdx.y;
	int index = idy*ncol+idx;

	if(idy<nfil && idx<ncol)
	{
		float sum=0.0f;

		for(int k=0;k<ncol;k++)
		{
			sum+=A[idy*ncol+k]*B[k*ncol+idx];
		}
		C[index] = sum;
	}
}

int div_up(int a, int b)
{
    if (a % b)  /* does a divide b leaving a remainder? */
        return a / b + 1; /* add in additional block */
    else
        return a / b; /* divides cleanly */
}

int main(void)
{
	float *A_h,*B_h,*C_h;
	float *A_d,*B_d,*C_d;
	int nfil = 12;
	int ncol = 12;
	int BLOCK_SIZE = 4;
	int N=nfil*ncol;

	size_t size=N * sizeof(float);

	A_h = (float *)malloc(size);
	B_h = (float *)malloc(size);
	C_h = (float *)malloc(size);

	for(int i=0; i<nfil; i++)
	{
		for(int j=0;j<ncol;j++)
		{
			A_h[i*ncol+j] = 1.0f;
			B_h[i*ncol+j] = 2.0f;
		}
	}

	cudaMalloc((void **) &A_d, size);
	cudaMalloc((void **) &B_d, size);
	cudaMalloc((void **) &C_d, size);

	cudaMemcpy(A_d, A_h, size, cudaMemcpyHostToDevice);
	cudaMemcpy(B_d, B_h, size, cudaMemcpyHostToDevice);

	dim3 block_size(BLOCK_SIZE,BLOCK_SIZE);
	dim3 n_blocks(div_up(ncol,block_size.x),div_up(nfil,block_size.y));

	Multiplca_Matrices_GM<<< n_blocks, block_size >>> (C_d,A_d,B_d,nfil,ncol);

	cudaMemcpy(C_h,C_d,size,cudaMemcpyDeviceToHost);

	printf("\n\nMatriz c:\n");

	for(int i=0; i<10; i++)
	{
		for(int j=0; j<10; j++)
		{
			printf("%.2f ", C_h[i*ncol+j]);
		}
		printf("\n");
	}

	free(A_h);
	free(B_h);
	free(C_h);

	cudaFree(A_d);
	cudaFree(B_d);
	cudaFree(C_d);

	return(0);
}