function [r1,r2,idx1,idx2] = prng46(r1,r2,idx1,idx2)

if nargin == 0
    r1 = rand(256,1);
    r2 = rand(256,1);
    [~,idx1] = sort(r1);
    [~,idx2] = sort(r2);
end

r1 = mod(r1+r2,1);
r2 = mod(r1+r2,1);

a = r1;
r1(idx2) = r2(idx1);
r2(idx1) = a(idx2);

a = idx1;
idx1(idx2) = idx2(idx1);
idx2(idx1) = a(idx2);
