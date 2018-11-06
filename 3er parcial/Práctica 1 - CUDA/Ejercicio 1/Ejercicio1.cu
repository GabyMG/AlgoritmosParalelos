#include <iostream>

__global__ void kernel( void ) {	
}

int main( void ) {
	kernel <<<1,1>>>();
	printf( "Hellow, World!\n" );
	return 0;
}