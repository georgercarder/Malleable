### Malleable

Simple demo of replaying a "reflected" signature.

Construction of a reflected signature may be useful for auditors etc

```

let signature = await accounts[0].signMessage(message);

let split = await ethers.utils.splitSignature(signature);

// reflect signature start
if (split.v==27 || split.v==0) {
  split.v = 28;
} else {
  split.v = 27;
}
let C = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141';
let newS = await ethers.utils.hexlify(bn(C).sub(bn(split.s)));
split.s = newS;
// reflect signature end
```
