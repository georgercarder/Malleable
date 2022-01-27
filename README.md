### Malleable

Simple demo of replaying a "reflected" signature.

Construction of a reflected signature may be useful for auditors etc

```

let signature = await accounts[0].signMessage(message);

let split = await ethers.utils.splitSignature(signature);

// reflect signature start
split.v = 28;
let C = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141';
let newS = await ethers.utils.hexlify(bn(C).sub(bn(split.s)));
split.s = newS;
// reflect signature end
```
