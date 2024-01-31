const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//all request will be in json
app.use(express.json());

//connect to express app in port
app.use(cors());

//database connection with mongodb
mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.re9gf37.mongodb.net/<dbname>"
);

//api endpoint creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

//creating upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Schema for creating products
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// add products in db
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log("product -> ", product);
  await product.save();
  console.log("product saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api for deleting products in db
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//Schema creating for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Existing user found with same Email Id",
      });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  //saved in db
  await user.save();

  //making jwt authentication
  const data = {
    user: {
      id: user.id,
    },
  };
  //generate token sign(data,salt)
  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});

//creating end point for user-login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });

  //if user available
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
          username:user.name
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong password" });
    }
  }
  //user not available
  else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

//get current user
app.get('/getCurrentUser',async (req, res) => {
  try {
    // Assuming you have a User model
    const user = await Users.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//creating endpoint for new collections data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});

  let newCollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newCollection);
});

//creating endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({category: "women"});
  let popular_in_women = products.slice(0,4)
  console.log("Popular in women fetched");
  res.send(popular_in_women)
});

//creating middleware to fetch user
const fetchUser = async(req,res,next) => {
  const token = req.header('auth-token')
  if(!token){
    res.status(401).send({error:'Please authenticate using a valid token'})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom')
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({error:'Please authenticate using a valid token'})
    }
  }
  
}

//creating end point for adding products in cart data
app.post('/addtocart', fetchUser ,async(req,res) => {
  console.log('Added', req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id})
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send('Added')
})

//creating end point to remove product from cartData
app.post('/removefromcart', fetchUser, async(req,res) => {
  console.log('Removed', req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemId] > 0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send('Removed')
})

//creating end point to get Cart Data
app.post('/getcart' , fetchUser, async(req,res) => {
  console.log('Get Cart');
  let userData = await Users.findOne({_id:req.user.id})
  res.json(userData.cartData);
})

// order Schema
const Orders = mongoose.model('orders', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date,
    default:Date.now()
  },
  isDelivered: {
    type: Boolean,
    default: false
  }
});

app.post('/placeorder', fetchUser, async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
      isPaid,
      paidAt,
      isDelivered,
    } = req.body;

    // Assuming you have a Product model
    const productIds = products.map((product) => ({
      product: product.productId,
      quantity: product.quantity,
    }));

    // Create the order
    const order = new Orders({
      user: req.user.id, // Assuming fetchUser middleware sets user in req
      products: productIds,
      totalPrice,
      shippingAddress,
      paymentMethod,
      isPaid,
      paidAt,
      isDelivered,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log("Error :", error);
  }
});
