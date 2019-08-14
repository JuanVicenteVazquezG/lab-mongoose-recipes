/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const data = require('./data.js');

const Recipe = require('./models/Recipe.js');

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Gazpacho Andaluz',
  level: 'Easy Peasy',
  ingredients: [
    '1/2 kilo de tomate maduro',
    '1/2 pimiento verde',
    '1 diente de ajo',
    '1/2 pepino',
    '1 dl de aceite de oliva',
    '4 cucharadas de vinagre de vino',
    '1 rebanada de pan blanco',
    'sal fina',
  ],
  cuisine: 'Spanish cuisine',
  dishType: 'Drink',
  image:
    'https://delantaldealces.com/wp-content/uploads/2016/06/receta-gazpacho-6.jpg',
  duration: 10,
  creator: 'Me',
})
  .then((recipeName) => {
    console.log(`Recipe title: ${recipeName.title}`);
    return Recipe.insertMany(data);
  })
  .then((theRecipes) => {
    console.log('Here has the new inserterd Recipes');
    theRecipes.forEach((aRecipe, index) => {
      console.log(`${index} ${aRecipe.title}`);
    });
  })
  .then(() => {
    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
})
  .then(() => {
    console.log('Rigatoni alla Genovese recipe Updated!!!');
    Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake recipe Deleted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`An Error has happened ${err}`);
    mongoose.connection.close();
  });
