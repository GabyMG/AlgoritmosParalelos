#include <stdio.h>
#include <math.h>
#include <mpi.h>

double t0, t1;

double f(double x)
{
	double y;

	y = 1.0 / (sin(x) + 2.0) + 1.0 / (sin(x) * cos(x) + 2.0);

	return y;
}

void leerDatos(double* a_ptr, double* b_ptr, long long* n_ptr, int pid)
{
	float aux_a, aux_b, aux_n;
	int root;

	if(pid == 0)
	{
		printf("Introduce a, b (limites), y n (numero de trapecios):\n");
		scanf("%f %f %f", &aux_a, &aux_b, &aux_n);
		t0 = MPI_Wtime();
	}

	(*a_ptr) = (double)aux_a;
	(*b_ptr) = (double)aux_b;
	(*n_ptr) = (long long)aux_n;

	root = 0;

	MPI_Bcast(a_ptr,1,MPI_DOUBLE,root,MPI_COMM_WORLD);
	MPI_Bcast(b_ptr,1,MPI_DOUBLE,root,MPI_COMM_WORLD);
	MPI_Bcast(n_ptr,1,MPI_LONG_LONG,root,MPI_COMM_WORLD);
}

double Integrar(double a_loc, double b_loc, long long n_loc, double w)
{
	double resul_loc,x;
	long long i;

	resul_loc = (f(a_loc) + f(b_loc))/2.0;
	x = a_loc;

	for(i = 1; i<n_loc;i++)
	{
		x = x+ w;
		resul_loc = resul_loc + f(x);
	}
	resul_loc = resul_loc * w;

	return (resul_loc);
}

int main(int argc, char **argv)
{
	int pid,npr,root;
	double a,b,w,a_loc,b_loc;
	long long n,n_loc;
	double resul_loc, resul;

	MPI_Init(&argc,&argv);
	MPI_Comm_rank(MPI_COMM_WORLD,&pid);
	MPI_Comm_size(MPI_COMM_WORLD,&npr);

	leerDatos(&a,&b,&n,pid);

	w = (b-a)/n;

	n_loc = (pid+1)*n/npr - pid*n/npr;
	a_loc = a + (pid)*n/npr * w;
	b_loc = a + (pid+1)*n/npr * w;

	resul_loc = Integrar(a_loc,b_loc,n_loc,w);
	resul = 0.0;
	root = 0;

	MPI_Reduce(&resul_loc,&resul,1,MPI_DOUBLE,MPI_SUM,root,MPI_COMM_WORLD);

	if(pid == 0)
	{
		t1 = MPI_Wtime();
		printf("Integral de f(a = %1.2f, b = %1.2f, n = %f) = %1.12f\n",a,b,(double)n,resul);
		printf("Tiempo de ejecucion (%d proc) = %1.3f ms\n\n",npr,(t1-t0)*1000);
	}

	MPI_Finalize();
	return 0;
}


