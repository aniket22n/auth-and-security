# Authentication & Security

> Check branches to get code for certian level

## Level 1 ( Register Users )

- simply let user register with username and password.
- stored username and password in database without any encryption ( vulnerable ).

## level 2 ( Data Encryption )

- Save encrypted password in database instead saving them as it is.
- mongoose-encryption package is used for encryption [docs](https://www.npmjs.com/package/mongoose-encryption).
- simply plugged in the package [docs](https://mongoosejs.com/docs/plugins.html).

> mongoose plugins: By adding plugins to mongoose Schema we can extend their functionality.

```js
require("dotenv").config();
const encrypt = require("mongoose-encryption");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

// keep the secret in the .env file
const secret = process.env.SECRET;

// plugin the mongoose-encryption package in Schema
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);
```
