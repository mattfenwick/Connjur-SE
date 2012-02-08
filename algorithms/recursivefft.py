import math

def fft(x):   
    """ add a doc-string here"""
    N = len(x)   
    M = N / 2 
    if N % 2 :  # avoid implicit boolean conversions
        return x  # should throw exception if the input is wrong
    x_even = x[::2]      
    x_odd  = x[1::2]
    X_even = fft(x_even)
    X_odd  = fft(x_odd)
    X = [0] * N
    M = N / 2
    for k in range(M) :
        twiddle = math.e ** (2j * math.pi * k / N)
        X[k] = X_even[k] + X_odd[k] * twiddle
        X[M+k] = X_even[k] - X_odd[k] * twiddle   
    return X

