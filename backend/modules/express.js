const bcrypt = require('bcrypt');
const express = require("express");
const cors = require("cors")
const User = require("../models/User")
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.get('/users', async (req, res) => {
    try {
        //const users = await User.find({}, { password: 0, _id: 0, __v: 0});
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        res.status(200).json(user.products);

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

app.delete('/remove/:id/:idProduct', async (req, res) => {
    try {
        const id = req.params.id;
        const idProduct = req.params.idProduct;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const index = user.products.findIndex((produto) => produto._id == idProduct);
        if (index === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        user.products.splice(index, 1);
        await user.save();

        res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});


app.post('/add/product/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const user = await User.findById(id);

        const newProduct = {
            name: name,
        };

        user.products.push(newProduct);
        await user.save();
        res.status(200).json({ message: "Produto adicionado!" });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});



app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        await user.save();
        res.status(201).json({ message: "Usuário cadastrado!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: "Logado com sucesso!", user });
        } else {
            return res.status(400).json({ message: "senha" });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});




app.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})